import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getLocalizedMetadata } from "@/lib/seo";
import { isLang, type Lang } from "@/lib/i18n";
import { getMessages } from "@/lib/messages";

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
  const messages = getMessages(resolvedLang);

  return getLocalizedMetadata(resolvedLang, {
    title: messages.docs.metadata.title,
    description: messages.docs.metadata.description,
    path: "/docs",
  });
}

export default async function DocsPage({ params }: DocsPageProps) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();

  const messages = getMessages(lang);
  const { docs, home } = messages;

  return (
    <main className="mx-auto flex w-full max-w-4xl flex-col gap-6 px-6 pb-24 pt-10 lg:px-10">
      <section className="rounded-[2rem] border border-slate-200 bg-white p-8 lg:p-12">
        <p className="text-sm uppercase tracking-[0.2em] text-slate-500">{docs.eyebrow}</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-950">{docs.title}</h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">{docs.lead}</p>
      </section>
      <section className="rounded-[1.5rem] border border-slate-200 bg-white p-8">
        <h2 className="text-xl font-semibold text-slate-950">{docs.coverageTitle}</h2>
        <div className="mt-6 grid gap-3">
          {home.cleanupTargets.map((target) => (
            <div key={target} className="rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3 text-sm text-slate-700">
              {target}
            </div>
          ))}
        </div>
      </section>
      <section className="rounded-[1.5rem] border border-slate-200 bg-white p-8">
        <h2 className="text-xl font-semibold text-slate-950">{docs.flowTitle}</h2>
        <ol className="mt-6 space-y-3 text-base leading-7 text-slate-600">
          {docs.flow.map((item, index) => (
            <li key={item}>
              {index + 1}. {item}
            </li>
          ))}
        </ol>
      </section>
    </main>
  );
}
