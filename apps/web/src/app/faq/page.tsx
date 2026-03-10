const faqs = [
  {
    question: "它会先扫描再删除吗？",
    answer: "会。CleanClaw 会先展示命中的 OpenClaw 项，用户确认后才执行清理。",
  },
  {
    question: "会清理哪些内容？",
    answer: "应用本体、.openclaw 目录、配置、缓存、日志、自启动、后台服务，以及 Windows 注册表相关项。",
  },
  {
    question: "支持哪些系统？",
    answer: "首版支持 macOS 和 Windows。",
  },
  {
    question: "会生成清理结果吗？",
    answer: "会。桌面端会生成一份简单列表格式的清理报告，便于用户核对结果。",
  },
] as const;

export default function FaqPage() {
  return (
    <main className="mx-auto flex w-full max-w-4xl flex-col gap-6 px-6 pb-24 pt-10 lg:px-10">
      <section className="rounded-[2rem] border border-slate-200 bg-white p-8 lg:p-12">
        <p className="text-sm uppercase tracking-[0.2em] text-slate-500">FAQ</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-950">
          常见问题
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
