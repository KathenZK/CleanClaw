import Link from "next/link";
import { cleanupTargets, currentVersion, macDownloadUrl } from "@/lib/site";

export default function Home() {
  const principles = [
    {
      label: "先扫描",
      title: "清理前先列出命中项",
      description: "不会上来就删。先把路径、服务、自启动项和注册表残留列给你看，再由你确认。",
    },
    {
      label: "再确认",
      title: "一次确认，避免误删",
      description: "操作流程保持克制，不做复杂配置，也不把风险藏在高级选项里。",
    },
    {
      label: "留结果",
      title: "清理完成后给出结果报告",
      description: "成功项与失败项都会保留在结果列表里，便于复查和继续处理。",
    },
  ] as const;

  const process = [
    "扫描本机中的 OpenClaw 应用本体、目录残留、缓存、日志、服务与注册表项。",
    "把命中项按类别分组展示，方便确认哪些内容会被移除。",
    "用户确认后执行清理，并生成简单的结果报告。",
  ] as const;

  return (
    <main className="mx-auto flex w-full max-w-7xl flex-col gap-16 px-6 pb-28 pt-10 lg:px-10">
      <section className="grid gap-10 border-t border-slate-200 pt-12 lg:grid-cols-[minmax(0,1.25fr)_22rem] lg:gap-16 lg:pt-20">
        <div className="space-y-8">
          <div className="flex flex-wrap items-center gap-3 text-sm text-slate-500">
            <span className="rounded-full border border-slate-200 bg-white px-4 py-2">
              CleanClaw {currentVersion}
            </span>
            <span>For users who want OpenClaw gone for good.</span>
          </div>

          <div className="space-y-6">
            <p className="text-sm tracking-[0.18em] text-slate-500">CleanClaw.icu</p>
            <h1 className="max-w-4xl text-5xl font-semibold tracking-[-0.06em] text-slate-950 md:text-7xl">
              一键彻底清理 OpenClaw
            </h1>
            <p className="max-w-[62ch] text-lg leading-8 text-slate-600 md:text-xl">
              扫描并删除 OpenClaw 的安装产物、配置、缓存、日志、后台服务、自启动项与 Windows 注册表残留。
            </p>
            <p className="max-w-[62ch] text-base leading-7 text-slate-500">
              CleanClaw is built for the boring but important part of uninstalling software: finding
              what is still left on disk, showing it clearly, and letting you remove it deliberately.
            </p>
          </div>

          <div className="flex flex-col gap-3 pt-2 sm:flex-row">
            <a
              href={macDownloadUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-full bg-slate-950 px-6 py-3 text-sm font-medium text-white transition hover:-translate-y-px hover:bg-slate-800"
            >
              下载 macOS 版
            </a>
            <Link
              href="/download"
              className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-medium text-slate-700 transition hover:-translate-y-px hover:border-slate-300 hover:text-slate-950"
            >
              查看全部下载选项
            </Link>
          </div>
        </div>

        <aside className="flex flex-col justify-between gap-8 rounded-3xl bg-[#eef2f6] p-7">
          <div className="space-y-3">
            <p className="text-sm tracking-[0.18em] text-slate-500">What it checks</p>
            <div className="space-y-2">
              {cleanupTargets.slice(0, 4).map((target, index) => (
                <div
                  key={target}
                  className="rounded-2xl border border-white/80 bg-white/80 px-4 py-3 text-sm text-slate-700 shadow-[0_18px_40px_-32px_rgba(15,23,42,0.28)]"
                  style={{ marginLeft: index % 2 === 0 ? "0" : "0.75rem" }}
                >
                  {target}
                </div>
              ))}
            </div>
          </div>

          <div className="border-t border-slate-200 pt-5">
            <p className="text-sm leading-7 text-slate-600">
              清理前会先展示命中项，并再次弹窗确认。首版支持 macOS，Windows 安装包正在补充中。
            </p>
          </div>
        </aside>
      </section>

      <section className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]">
        <article className="rounded-3xl bg-white p-8 shadow-[0_24px_70px_-45px_rgba(15,23,42,0.22)]">
          <p className="text-sm tracking-[0.18em] text-slate-500">How it works</p>
          <h2 className="mt-5 max-w-md text-3xl font-semibold tracking-[-0.04em] text-slate-950">
            清理流程保持克制，而不是复杂。
          </h2>
          <div className="mt-8 space-y-6">
            {process.map((item, index) => (
              <div key={item} className="grid gap-2 border-t border-slate-100 pt-6 first:border-t-0 first:pt-0">
                <span className="text-sm text-slate-400">0{index + 1}</span>
                <p className="max-w-[52ch] text-base leading-7 text-slate-600">{item}</p>
              </div>
            ))}
          </div>
        </article>

        <article className="grid gap-4 rounded-3xl bg-[#f7f4ee] p-8">
          <div className="max-w-lg">
            <p className="text-sm tracking-[0.18em] text-slate-500">Product principles</p>
            <h2 className="mt-5 text-3xl font-semibold tracking-[-0.04em] text-slate-950">
              不抢戏，但把该说明的内容说明白。
            </h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {principles.slice(0, 2).map((item) => (
              <div key={item.label} className="rounded-[1.75rem] bg-white/80 p-6">
                <p className="text-sm text-slate-400">{item.label}</p>
                <h3 className="mt-3 text-xl font-semibold tracking-tight text-slate-950">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">{item.description}</p>
              </div>
            ))}
            <div className="rounded-[1.75rem] bg-slate-950 p-6 text-white md:col-span-2 md:ml-12">
              <p className="text-sm text-slate-400">{principles[2].label}</p>
              <h3 className="mt-3 text-2xl font-semibold tracking-tight">{principles[2].title}</h3>
              <p className="mt-3 max-w-[40ch] text-sm leading-7 text-slate-300">
                {principles[2].description}
              </p>
            </div>
          </div>
        </article>
      </section>

      <section className="grid gap-6 lg:grid-cols-[18rem_minmax(0,1fr)]">
        <div className="pt-2">
          <p className="text-sm tracking-[0.18em] text-slate-500">Coverage</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-slate-950">
            首版聚焦把 OpenClaw 残留清理干净。
          </h2>
        </div>
        <div className="grid gap-3 md:grid-cols-2">
          {cleanupTargets.map((target, index) => (
            <div
              key={target}
              className={`rounded-3xl border border-slate-200 bg-white px-5 py-5 text-sm leading-7 text-slate-700 ${
                index === cleanupTargets.length - 1 ? "md:col-span-2 md:mr-20" : ""
              }`}
            >
              {target}
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
