import Link from "next/link";
import { cleanupTargets, releaseUrl } from "@/lib/site";

export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-24 px-6 pb-24 pt-16 lg:px-10">
      <section className="grid gap-12 rounded-[2rem] border border-white/70 bg-white/80 p-8 shadow-[0_30px_120px_-48px_rgba(15,23,42,0.35)] backdrop-blur lg:grid-cols-[1.2fr_0.8fr] lg:p-16">
        <div className="space-y-8">
          <div className="inline-flex rounded-full border border-slate-200 bg-white px-4 py-1 text-sm text-slate-600">
            For users who want OpenClaw gone for good.
          </div>
          <div className="space-y-5">
            <p className="text-sm font-medium tracking-[0.2em] text-slate-500 uppercase">
              CleanClaw.icu
            </p>
            <h1 className="max-w-3xl text-5xl font-semibold tracking-tight text-slate-950 md:text-7xl">
              一键彻底清理 OpenClaw
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-slate-600 md:text-xl">
              扫描并删除 OpenClaw 的安装产物、配置、缓存、日志、后台服务、自启动项与 Windows
              注册表残留。
            </p>
            <p className="max-w-2xl text-base leading-7 text-slate-500">
              Scan first. Review every match. Confirm once. CleanClaw removes OpenClaw leftovers on
              macOS and Windows with a minimal desktop experience.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <a
              href={releaseUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-full bg-slate-950 px-6 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
            >
              下载桌面版 Download
            </a>
            <Link
              href="/docs"
              className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:text-slate-950"
            >
              查看清理说明
            </Link>
          </div>
        </div>
        <div className="rounded-[1.75rem] border border-slate-200 bg-slate-950 p-6 text-white shadow-2xl shadow-slate-200/50">
          <div className="mb-5 flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-red-400" />
            <span className="h-3 w-3 rounded-full bg-amber-300" />
            <span className="h-3 w-3 rounded-full bg-green-400" />
          </div>
          <div className="space-y-4">
            <p className="text-sm text-slate-400">Scan preview</p>
            {cleanupTargets.map((target) => (
              <div key={target} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                <p className="text-sm text-slate-100">{target}</p>
              </div>
            ))}
            <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-300">
              清理前会先展示命中项，并再次弹窗确认。
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-3">
        {[
          {
            title: "Review before remove",
            zh: "清理前先确认",
            body: "先展示扫描命中项，再由你确认是否清理，过程更透明，也更安心。",
          },
          {
            title: "Clear and simple",
            zh: "简单直接的体验",
            body: "打开应用后即可开始扫描，确认后执行清理，并生成一份简洁的结果报告。",
          },
          {
            title: "Made for complete cleanup",
            zh: "面向完整清理",
            body: "覆盖 OpenClaw 的应用本体、目录残留、缓存、日志、服务、自启动项与注册表项。",
          },
        ].map((item) => (
          <article key={item.title} className="rounded-[1.75rem] border border-slate-200 bg-white p-8">
            <p className="text-sm text-slate-500">{item.title}</p>
            <h2 className="mt-4 text-2xl font-semibold tracking-tight text-slate-950">{item.zh}</h2>
            <p className="mt-4 text-base leading-7 text-slate-600">{item.body}</p>
          </article>
        ))}
      </section>
    </main>
  );
}
