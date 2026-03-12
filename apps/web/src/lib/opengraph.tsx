import { ImageResponse } from "next/og";
import { getMessages } from "@/lib/messages";
import type { Lang } from "@/lib/i18n";

export function createOpenGraphImage(lang: Lang) {
  const messages = getMessages(lang);
  const { site, home } = messages;
  const highlights =
    lang === "zh"
      ? ["先查看命中项", "确认后再清理", "完成后保留结果记录"]
      : ["Review matched items first", "Clean only after confirmation", "Keep a clear result report"];
  const platforms = ["macOS Intel", "macOS Apple Silicon", "Windows x64", "Windows arm64"];

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          background:
            "radial-gradient(circle at top left, #f8fafc 0%, #eef2f7 32%, #dce7f6 100%)",
          color: "#0f172a",
          fontFamily: "sans-serif",
          padding: "56px 64px",
        }}
      >
        <div
          style={{
            display: "flex",
            width: "100%",
            height: "100%",
            borderRadius: "36px",
            background: "rgba(255,255,255,0.84)",
            border: "1px solid rgba(148,163,184,0.24)",
            boxShadow: "0 30px 120px -56px rgba(15,23,42,0.28)",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              width: "68%",
              padding: "56px",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "24px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "18px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "76px",
                    height: "76px",
                    borderRadius: "22px",
                    background: "#0f172a",
                    color: "#ffffff",
                    fontSize: "34px",
                    fontWeight: 700,
                  }}
                >
                  C
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      fontSize: "18px",
                      letterSpacing: "0.3em",
                      textTransform: "uppercase",
                      color: "#64748b",
                    }}
                  >
                    {site.brand}
                  </div>
                  <div
                    style={{
                      display: "flex",
                      fontSize: "22px",
                      color: "#475569",
                    }}
                  >
                    {home.eyebrow}
                  </div>
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "18px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    fontSize: lang === "zh" ? "60px" : "64px",
                    lineHeight: 1.04,
                    fontWeight: 700,
                    letterSpacing: "-0.05em",
                  }}
                >
                  {home.title}
                </div>
                <div
                  style={{
                    display: "flex",
                    maxWidth: "700px",
                    fontSize: lang === "zh" ? "26px" : "28px",
                    lineHeight: 1.45,
                    color: "#475569",
                  }}
                >
                  {home.lead}
                </div>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "16px",
                flexWrap: "wrap",
              }}
            >
              {platforms.map((item) => (
                <div
                  key={item}
                  style={{
                    display: "flex",
                    borderRadius: "999px",
                    border: "1px solid rgba(148,163,184,0.32)",
                    background: "#f8fafc",
                    padding: "12px 18px",
                    fontSize: "20px",
                    color: "#334155",
                  }}
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div
            style={{
              display: "flex",
              position: "relative",
              width: "32%",
              background:
                "linear-gradient(160deg, rgba(15,23,42,0.98) 0%, rgba(30,41,59,0.98) 45%, rgba(51,65,85,0.96) 100%)",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                display: "flex",
                position: "absolute",
                top: "-72px",
                right: "-64px",
                width: "260px",
                height: "260px",
                borderRadius: "999px",
                background: "rgba(96,165,250,0.18)",
              }}
            />
            <div
              style={{
                display: "flex",
                position: "absolute",
                bottom: "-86px",
                left: "-42px",
                width: "260px",
                height: "260px",
                borderRadius: "999px",
                background: "rgba(248,250,252,0.1)",
              }}
            />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                gap: "26px",
                padding: "48px",
                color: "#e2e8f0",
              }}
            >
              {highlights.map((item) => (
                <div
                  key={item}
                  style={{
                    display: "flex",
                    fontSize: lang === "zh" ? "28px" : "24px",
                    lineHeight: 1.5,
                  }}
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}
