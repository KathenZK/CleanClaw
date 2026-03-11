import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { macDownloadUrl } from "@/lib/site";
import { getLocalizedMetadata } from "@/lib/seo";
import { isLang, type Lang } from "@/lib/i18n";
import { getMessages } from "@/lib/messages";

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
  const messages = getMessages(resolvedLang);

  return getLocalizedMetadata(resolvedLang, {
    title: messages.home.metadata.title,
    description: messages.home.metadata.description,
    path: "/",
  });
}

export default async function HomePage({ params }: HomePageProps) {
  const { lang } = await params;

  if (!isLang(lang)) {
    notFound();
  }

  const messages = getMessages(lang);
  const { home } = messages;

  return (
    <main className="mx-auto flex w-full max-w-7xl flex-col gap-16 px-6 pb-28 pt-6 lg:px-10">
      <section className="grid gap-10 border-t border-slate-200 pt-8 lg:grid-cols-[minmax(0,1.25fr)_22rem] lg:gap-16 lg:pt-12">
        <div className="space-y-6">
          <div className="space-y-6">
            <p className="text-sm tracking-[0.18em] text-slate-500">{home.eyebrow}</p>
            <h1 className="max-w-4xl text-5xl font-semibold tracking-[-0.06em] text-slate-950 md:text-7xl">
              {home.title}
            </h1>
            <p className="max-w-[62ch] text-lg leading-8 text-slate-600 md:text-xl">{home.lead}</p>
            <p className="max-w-[62ch] text-base leading-7 text-slate-500">{home.body}</p>
          </div>

          <div className="flex flex-col gap-3 pt-2 sm:flex-row">
            <a
              href={macDownloadUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-full bg-slate-950 px-6 py-3 text-sm font-medium text-white transition hover:-translate-y-px hover:bg-slate-800"
            >
              {home.primaryCta}
            </a>
            <Link
              href={`/${lang}/download`}
              className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-medium text-slate-700 transition hover:-translate-y-px hover:border-slate-300 hover:text-slate-950"
            >
              {home.secondaryCta}
            </Link>
          </div>
        </div>

        <aside className="flex flex-col justify-between gap-8 rounded-3xl bg-[#eef2f6] p-7">
          <div className="space-y-3">
            <p className="text-sm tracking-[0.18em] text-slate-500">{home.detectableTitle}</p>
            <div className="space-y-2">
              {home.cleanupTargets.map((target, index) => (
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
            <p className="text-sm leading-7 text-slate-600">{home.detectableFooter}</p>
          </div>
        </aside>
      </section>

      <section className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]">
        <article className="rounded-3xl bg-white p-8 shadow-[0_24px_70px_-45px_rgba(15,23,42,0.22)]">
          <p className="text-sm tracking-[0.18em] text-slate-500">{home.processEyebrow}</p>
          <h2 className="mt-5 max-w-md text-3xl font-semibold tracking-[-0.04em] text-slate-950">
            {home.processTitle}
          </h2>
          <div className="mt-8 space-y-6">
            {home.process.map((item, index) => (
              <div key={item} className="grid gap-2 border-t border-slate-100 pt-6 first:border-t-0 first:pt-0">
                <span className="text-sm text-slate-400">0{index + 1}</span>
                <p className="max-w-[52ch] text-base leading-7 text-slate-600">{item}</p>
              </div>
            ))}
          </div>
        </article>

        <article className="grid gap-4 rounded-3xl bg-[#f7f4ee] p-8">
          <div className="max-w-lg">
            <p className="text-sm tracking-[0.18em] text-slate-500">{home.principlesEyebrow}</p>
            <h2 className="mt-5 text-3xl font-semibold tracking-[-0.04em] text-slate-950">{home.principlesTitle}</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {home.principles.slice(0, 2).map((item) => (
              <div key={item.label} className="rounded-[1.75rem] bg-white/80 p-6">
                <p className="text-sm text-slate-400">{item.label}</p>
                <h3 className="mt-3 text-xl font-semibold tracking-tight text-slate-950">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">{item.description}</p>
              </div>
            ))}
            <div className="rounded-[1.75rem] bg-slate-950 p-6 text-white md:col-span-2 md:ml-12">
              <p className="text-sm text-slate-400">{home.principles[2].label}</p>
              <h3 className="mt-3 text-2xl font-semibold tracking-tight">{home.principles[2].title}</h3>
              <p className="mt-3 max-w-[40ch] text-sm leading-7 text-slate-300">{home.principles[2].description}</p>
            </div>
          </div>
        </article>
      </section>
    </main>
  );
}
