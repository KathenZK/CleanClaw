import { cleanupTargets } from "@/lib/site";

export default function DocsPage() {
  return (
    <main className="mx-auto flex w-full max-w-4xl flex-col gap-6 px-6 pb-24 pt-10 lg:px-10">
      <section className="rounded-[2rem] border border-slate-200 bg-white p-8 lg:p-12">
        <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Docs</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-950">
          清理说明
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
          CleanClaw 只对明确识别为 OpenClaw 的路径、任务、服务和注册表项执行操作，不做模糊关键词全盘扫描。
        </p>
      </section>
      <section className="rounded-[1.5rem] border border-slate-200 bg-white p-8">
        <h2 className="text-xl font-semibold text-slate-950">当前扫描范围</h2>
        <div className="mt-6 grid gap-3">
          {cleanupTargets.map((target) => (
            <div key={target} className="rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3 text-sm text-slate-700">
              {target}
            </div>
          ))}
        </div>
      </section>
      <section className="rounded-[1.5rem] border border-slate-200 bg-white p-8">
        <h2 className="text-xl font-semibold text-slate-950">使用流程</h2>
        <ol className="mt-6 space-y-3 text-base leading-7 text-slate-600">
          <li>1. 打开桌面端并点击“开始扫描”。</li>
          <li>2. 查看命中项列表。</li>
          <li>3. 在确认弹框中再次确认。</li>
          <li>4. 清理完成后查看简单报告列表。</li>
        </ol>
      </section>
    </main>
  );
}
