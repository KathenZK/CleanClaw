import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCleanupTargets } from "@/lib/site";
import { getLocalizedMetadata } from "@/lib/seo";
import { isLang, type Lang } from "@/lib/i18n";

interface DocsPageProps {
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
    title: resolvedLang === "zh" ? "CleanClaw 清理说明" : "CleanClaw cleanup guide",
    description:
      resolvedLang === "zh"
        ? "了解 CleanClaw 会扫描哪些内容、如何确认，以及清理完成后会留下什么结果。"
        : "Learn what CleanClaw scans, how confirmation works, and what result is kept after cleanup.",
    path: "/docs",
  });
}

export default async function DocsPage({ params }: DocsPageProps) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  const cleanupTargets = getCleanupTargets(lang);

  return (
    <main className="mx-auto flex w-full max-w-4xl flex-col gap-6 px-6 pb-24 pt-10 lg:px-10">
      <section className="rounded-[2rem] border border-slate-200 bg-white p-8 lg:p-12">
        <p className="text-sm uppercase tracking-[0.2em] text-slate-500">{lang === "zh" ? "说明" : "Docs"}</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-950">
          {lang === "zh" ? "清理说明" : "Cleanup guide"}
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
          {lang === "zh"
            ? "CleanClaw 只处理能够明确识别为 OpenClaw 相关的路径、服务、任务和注册表项，不会用模糊关键词在系统里胡乱匹配。"
            : "CleanClaw only removes paths, services, tasks, and registry entries that can be clearly identified as related to OpenClaw. It does not rely on vague keyword matching."}
        </p>
      </section>
      <section className="rounded-[1.5rem] border border-slate-200 bg-white p-8">
        <h2 className="text-xl font-semibold text-slate-950">{lang === "zh" ? "当前扫描范围" : "Current coverage"}</h2>
        <div className="mt-6 grid gap-3">
          {cleanupTargets.map((target) => (
            <div key={target} className="rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3 text-sm text-slate-700">
              {target}
            </div>
          ))}
        </div>
      </section>
      <section className="rounded-[1.5rem] border border-slate-200 bg-white p-8">
        <h2 className="text-xl font-semibold text-slate-950">{lang === "zh" ? "使用流程" : "How to use it"}</h2>
        <ol className="mt-6 space-y-3 text-base leading-7 text-slate-600">
          {lang === "zh" ? (
            <>
              <li>1. 打开桌面端并点击“开始扫描”。</li>
              <li>2. 查看按类别整理好的命中项列表。</li>
              <li>3. 在确认弹框中再次确认后开始清理。</li>
              <li>4. 清理结束后查看结果报告，确认哪些项目已移除。</li>
            </>
          ) : (
            <>
              <li>1. Open the desktop app and click “Start scan”.</li>
              <li>2. Review the matched items grouped by category.</li>
              <li>3. Confirm again in the dialog before cleanup begins.</li>
              <li>4. Review the result report to see what was removed.</li>
            </>
          )}
        </ol>
      </section>
    </main>
  );
}
