import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { currentVersion, getCleanupTargets, macDownloadUrl } from "@/lib/site";
import { getLocalizedMetadata } from "@/lib/seo";
import { isLang, type Lang } from "@/lib/i18n";

interface HomePageProps {
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
    title: resolvedLang === "zh" ? "CleanClaw | 一键彻底清理 OpenClaw" : "CleanClaw | Remove OpenClaw completely",
    description:
      resolvedLang === "zh"
        ? "扫描并删除 OpenClaw 的安装产物、配置、缓存、日志、后台服务、自启动项与 Windows 注册表残留。"
        : "Scan and remove OpenClaw installation files, configuration, caches, logs, background services, startup items, and Windows registry leftovers.",
    path: "/",
  });
}

export default async function HomePage({ params }: HomePageProps) {
  const { lang } = await params;

  if (!isLang(lang)) {
    notFound();
  }

  const cleanupTargets = getCleanupTargets(lang);
  const principles = [
    lang === "zh"
      ? {
          label: "先查看",
          title: "清理前先把命中项列给你看",
          description: "程序、目录、服务和注册表残留都会先展示出来，确认之后才会开始清理。",
        }
      : {
          label: "Review first",
          title: "See every matched item before cleanup",
          description:
            "Programs, directories, services, and registry leftovers are listed first, then removed only after confirmation.",
        },
    lang === "zh"
      ? {
          label: "再确认",
          title: "一步确认，减少误删风险",
          description: "流程足够直接，不需要研究复杂设置，也不会把关键风险藏在深层选项里。",
        }
      : {
          label: "Confirm once",
          title: "A simple flow with fewer mistakes",
          description:
            "The flow stays simple. No dense settings screen, no important risk hidden behind advanced options.",
        },
    lang === "zh"
      ? {
          label: "可复查",
          title: "清理完成后留下结果记录",
          description: "成功项和失败项都会保留在结果里，方便复查，也方便继续手动处理少数异常项。",
        }
      : {
          label: "Review later",
          title: "Keep a clear result after cleanup",
          description:
            "Successful and failed items stay in the result so you can review what changed afterward.",
        },
  ] as const;

  const process =
    lang === "zh"
      ? [
          "扫描设备中与 OpenClaw 相关的主程序、目录残留、缓存、日志、服务与注册表项。",
          "按类别展示命中结果，让你一眼看清哪些内容会被移除。",
          "确认后开始清理，并在完成后生成一份可复查的结果列表。",
        ]
      : [
          "Scan your device for OpenClaw app files, leftover directories, caches, logs, services, and registry entries.",
          "Show every match by category so it is immediately clear what will be removed.",
          "Clean only after confirmation, then keep a simple report you can review afterward.",
        ];

  return (
    <main className="mx-auto flex w-full max-w-7xl flex-col gap-16 px-6 pb-28 pt-10 lg:px-10">
      <section className="grid gap-10 border-t border-slate-200 pt-12 lg:grid-cols-[minmax(0,1.25fr)_22rem] lg:gap-16 lg:pt-20">
        <div className="space-y-8">
          <div className="flex flex-wrap items-center gap-3 text-sm text-slate-500">
            <span className="rounded-full border border-slate-200 bg-white px-4 py-2">
              CleanClaw {currentVersion}
            </span>
            <span>
              {lang === "zh"
                ? "把 OpenClaw 及其残留从电脑里清干净。"
                : "Built for people who want OpenClaw gone for good."}
            </span>
          </div>

          <div className="space-y-6">
            <p className="text-sm tracking-[0.18em] text-slate-500">CleanClaw.icu</p>
            <h1 className="max-w-4xl text-5xl font-semibold tracking-[-0.06em] text-slate-950 md:text-7xl">
              {lang === "zh" ? "彻底清理 OpenClaw，不留残留。" : "Remove OpenClaw cleanly, without leftovers."}
            </h1>
            <p className="max-w-[62ch] text-lg leading-8 text-slate-600 md:text-xl">
              {lang === "zh"
                ? "扫描并删除 OpenClaw 的安装产物、配置、缓存、日志、后台服务、自启动项与 Windows 注册表残留。"
                : "Scan and remove OpenClaw installation files, configuration, caches, logs, background services, startup items, and Windows registry leftovers."}
            </p>
            <p className="max-w-[62ch] text-base leading-7 text-slate-500">
              {lang === "zh"
                ? "卸载软件最麻烦的地方，从来不是点一下删除，而是确认系统里还剩下什么。CleanClaw 把这些残留找出来、列清楚，再交给你决定是否移除。"
                : "The hard part of uninstalling software is not clicking remove. It is knowing what still remains on disk. CleanClaw finds those leftovers, shows them clearly, and lets you remove them with confidence."}
            </p>
          </div>

          <div className="flex flex-col gap-3 pt-2 sm:flex-row">
            <a
              href={macDownloadUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-full bg-slate-950 px-6 py-3 text-sm font-medium text-white transition hover:-translate-y-px hover:bg-slate-800"
            >
              {lang === "zh" ? "立即下载 macOS 版" : "Download for macOS"}
            </a>
            <Link
              href={`/${lang}/download`}
              className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-medium text-slate-700 transition hover:-translate-y-px hover:border-slate-300 hover:text-slate-950"
            >
              {lang === "zh" ? "查看下载方式" : "See download options"}
            </Link>
          </div>
        </div>

        <aside className="flex flex-col justify-between gap-8 rounded-3xl bg-[#eef2f6] p-7">
          <div className="space-y-3">
            <p className="text-sm tracking-[0.18em] text-slate-500">
              {lang === "zh" ? "可识别内容" : "What it can find"}
            </p>
            <div className="space-y-2">
              {cleanupTargets.map((target, index) => (
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
              {lang === "zh"
                ? "从主程序到后台服务，命中项都会先展示出来。首版已提供 macOS 下载，Windows 版本即将提供。"
                : "From app files to background services, every match is shown before cleanup. macOS is available now, and Windows is coming soon."}
            </p>
          </div>
        </aside>
      </section>

      <section className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]">
        <article className="rounded-3xl bg-white p-8 shadow-[0_24px_70px_-45px_rgba(15,23,42,0.22)]">
          <p className="text-sm tracking-[0.18em] text-slate-500">
            {lang === "zh" ? "使用方式" : "How it works"}
          </p>
          <h2 className="mt-5 max-w-md text-3xl font-semibold tracking-[-0.04em] text-slate-950">
            {lang === "zh" ? "三步完成清理，不需要额外学习成本。" : "Three steps, with no extra learning curve."}
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
            <p className="text-sm tracking-[0.18em] text-slate-500">
              {lang === "zh" ? "为什么更放心" : "Why it feels safer"}
            </p>
            <h2 className="mt-5 text-3xl font-semibold tracking-[-0.04em] text-slate-950">
              {lang === "zh" ? "每一步都尽量清楚，不把风险藏起来。" : "Every important action stays visible and understandable."}
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
              <p className="mt-3 max-w-[40ch] text-sm leading-7 text-slate-300">{principles[2].description}</p>
            </div>
          </div>
        </article>
      </section>

    </main>
  );
}
