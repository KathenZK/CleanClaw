import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getLocalizedMetadata } from "@/lib/seo";
import { isLang, type Lang } from "@/lib/i18n";

interface FaqPageProps {
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
    title: resolvedLang === "zh" ? "CleanClaw 常见问题" : "CleanClaw FAQ",
    description:
      resolvedLang === "zh"
        ? "查看 CleanClaw 的常见问题，包括支持系统、清理范围、确认方式和结果报告。"
        : "Read common questions about CleanClaw, including supported systems, cleanup scope, confirmation, and reports.",
    path: "/faq",
  });
}

export default async function FaqPage({ params }: FaqPageProps) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();

  const faqs =
    lang === "zh"
      ? [
          {
            question: "它会先扫描再删除吗？",
            answer: "会。CleanClaw 会先展示命中的 OpenClaw 项，只有在你确认之后才会开始清理。",
          },
          {
            question: "会清理哪些内容？",
            answer: "包括应用本体、`.openclaw` 目录、配置、缓存、日志、自启动项、后台服务，以及 Windows 注册表相关项。",
          },
          {
            question: "支持哪些系统？",
            answer: "当前版本提供 macOS 安装包，Windows 版本正在整理与发布中。",
          },
          {
            question: "会生成清理结果吗？",
            answer: "会。桌面端会生成一份结果列表，方便你核对哪些项目已经移除，哪些项目还需要手动处理。",
          },
        ]
      : [
          {
            question: "Does it scan before deleting?",
            answer: "Yes. CleanClaw shows all matched OpenClaw items first and only starts cleaning after you confirm.",
          },
          {
            question: "What does it remove?",
            answer: "It covers application files, the `.openclaw` directory, configuration, cache, logs, startup items, background services, and related Windows registry entries.",
          },
          {
            question: "Which systems are supported?",
            answer: "The current release includes a macOS installer. Windows support is being prepared for release.",
          },
          {
            question: "Will it generate a cleanup report?",
            answer: "Yes. The desktop app keeps a result list so you can review what was removed and what may still need manual attention.",
          },
        ];

  return (
    <main className="mx-auto flex w-full max-w-4xl flex-col gap-6 px-6 pb-24 pt-10 lg:px-10">
      <section className="rounded-[2rem] border border-slate-200 bg-white p-8 lg:p-12">
        <p className="text-sm uppercase tracking-[0.2em] text-slate-500">FAQ</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-950">
          {lang === "zh" ? "常见问题" : "Frequently asked questions"}
        </h1>
      </section>
      {faqs.map((faq) => (
        <article key={faq.question} className="rounded-[1.5rem] border border-slate-200 bg-white p-8">
          <h2 className="text-xl font-semibold text-slate-950">{faq.question}</h2>
          <p className="mt-3 text-base leading-7 text-slate-600">{faq.answer}</p>
        </article>
      ))}
    </main>
  );
}
