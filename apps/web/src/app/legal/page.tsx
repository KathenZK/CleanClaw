import { getRequestLang } from "@/lib/i18n";

export default async function LegalPage() {
  const lang = await getRequestLang();

  return (
    <main className="mx-auto flex w-full max-w-4xl flex-col gap-6 px-6 pb-24 pt-10 lg:px-10">
      <section className="rounded-[2rem] border border-slate-200 bg-white p-8 lg:p-12">
        <p className="text-sm uppercase tracking-[0.2em] text-slate-500">{lang === "zh" ? "法律信息" : "Legal"}</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-950">
          {lang === "zh" ? "隐私与免责声明" : "Privacy and disclaimer"}
        </h1>
      </section>
      <section className="rounded-[1.5rem] border border-slate-200 bg-white p-8 text-base leading-7 text-slate-600">
        {lang === "zh" ? (
          <>
            <p>
              CleanClaw 是一个第三方清理工具，用于帮助用户扫描并删除本机中与 OpenClaw 相关的安装产物与残留项。
            </p>
            <p className="mt-4">
              本工具不会在未展示命中项且未获得确认前执行删除操作。请在清理前核对结果，并自行承担因删除相关文件、服务或注册表项可能带来的影响。
            </p>
            <p className="mt-4">
              首版不采集账号数据，也不要求登录。若未来引入统计或错误上报，官网应同步补充相应隐私说明。
            </p>
          </>
        ) : (
          <>
            <p>
              CleanClaw is a third-party cleanup tool designed to help users scan for and remove OpenClaw-related installation files and leftovers from their own devices.
            </p>
            <p className="mt-4">
              Nothing is deleted until matched items are shown and confirmed. Please review the results carefully before cleanup and understand the impact of removing related files, services, or registry entries.
            </p>
            <p className="mt-4">
              The first release does not require login and does not collect account data. If telemetry or error reporting is added later, the site should be updated with a matching privacy notice.
            </p>
          </>
        )}
      </section>
    </main>
  );
}
