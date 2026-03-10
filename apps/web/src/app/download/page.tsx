import { releaseUrl } from "@/lib/site";

export default function DownloadPage() {
  const needsSetup = releaseUrl.includes("<your-org>");

  return (
    <main className="mx-auto flex w-full max-w-4xl flex-col gap-8 px-6 pb-24 pt-10 lg:px-10">
      <section className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-[0_30px_120px_-48px_rgba(15,23,42,0.35)] lg:p-12">
        <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Download</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-950">
          下载 CleanClaw
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
          安装包通过 GitHub Releases 分发。首版提供 macOS 与 Windows 桌面端，打开后先扫描命中项，再确认清理。
        </p>
        <a
          href={releaseUrl}
          target="_blank"
          rel="noreferrer"
          className="mt-8 inline-flex items-center justify-center rounded-full bg-slate-950 px-6 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
        >
          前往 GitHub Releases
        </a>
        {needsSetup ? (
          <p className="mt-4 text-sm text-amber-700">
            部署前请把 `NEXT_PUBLIC_RELEASES_URL` 设置为你的 GitHub Releases 地址。
          </p>
        ) : null}
      </section>
    </main>
  );
}
