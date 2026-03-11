import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { currentVersion, getDownloads, publishedLabel, releaseUrl } from "@/lib/site";
import { getLocalizedMetadata } from "@/lib/seo";
import { isLang, type Lang } from "@/lib/i18n";

interface DownloadPageProps {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const resolvedLang: Lang = isLang(lang) ? lang : "zh";

  return getLocalizedMetadata(resolvedLang, {
    title: resolvedLang === "zh" ? "下载 CleanClaw" : "Download CleanClaw",
    description:
      resolvedLang === "zh"
        ? "获取 CleanClaw 的最新安装包。当前提供 macOS 版本，Windows 版本即将提供。"
        : "Download the latest CleanClaw installer. macOS is available now and Windows is coming soon.",
    path: "/download",
  });
}

export default async function DownloadPage({ params }: DownloadPageProps) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();

  const downloads = getDownloads(lang);

  return (
    <main className="mx-auto flex w-full max-w-4xl flex-col gap-8 px-6 pb-24 pt-10 lg:px-10">
      <section className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-[0_30px_120px_-48px_rgba(15,23,42,0.35)] lg:p-12">
        <p className="text-sm uppercase tracking-[0.2em] text-slate-500">{lang === "zh" ? "下载" : "Download"}</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-950">
          {lang === "zh" ? "下载 CleanClaw" : "Download CleanClaw"}
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
          {lang === "zh"
            ? "安装包通过 GitHub Releases 分发。打开应用后先扫描命中项，再确认清理，并在完成后生成简单报告。"
            : "Installers are distributed through GitHub Releases. The app scans first, asks for confirmation, then generates a simple report after cleanup."}
        </p>
        <div className="mt-8 flex flex-wrap gap-3 text-sm text-slate-500">
          <span className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2">
            {lang === "zh" ? "当前版本" : "Current version"} {currentVersion}
          </span>
          <span className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2">
            {lang === "zh" ? "发布时间" : "Published"} {publishedLabel}
          </span>
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-2">
        {downloads.map((item) => (
          <article key={item.platform} className="rounded-[1.5rem] border border-slate-200 bg-white p-8">
            <p className="text-sm uppercase tracking-[0.18em] text-slate-500">{item.platform}</p>
            <h2 className="mt-4 text-2xl font-semibold tracking-tight text-slate-950">{item.architecture}</h2>
            <p className="mt-4 text-base leading-7 text-slate-600">{item.description}</p>
            {item.available ? (
              <a
                href={item.href}
                target="_blank"
                rel="noreferrer"
                className="mt-8 inline-flex items-center justify-center rounded-full bg-slate-950 px-6 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
              >
                {item.cta}
              </a>
            ) : (
              <div className="mt-8 inline-flex items-center justify-center rounded-full border border-slate-200 bg-slate-50 px-6 py-3 text-sm font-medium text-slate-500">
                {item.cta}
              </div>
            )}
          </article>
        ))}
      </section>

      <section className="rounded-[1.5rem] border border-slate-200 bg-white p-8">
        <h2 className="text-xl font-semibold text-slate-950">{lang === "zh" ? "Release 页面" : "Release notes"}</h2>
        <p className="mt-3 max-w-2xl text-base leading-7 text-slate-600">
          {lang === "zh"
            ? "需要查看完整发布说明、后续版本或手动下载资产时，可以前往 GitHub Releases 页面。"
            : "For full release notes, later versions, or manual asset downloads, visit the GitHub Releases page."}
        </p>
        <a
          href={releaseUrl}
          target="_blank"
          rel="noreferrer"
          className="mt-6 inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:text-slate-950"
        >
          {lang === "zh" ? "查看 Release 页面" : "Open release page"}
        </a>
      </section>
    </main>
  );
}
