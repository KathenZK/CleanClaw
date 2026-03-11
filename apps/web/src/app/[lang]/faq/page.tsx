import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getLocalizedMetadata } from "@/lib/seo";
import { isLang, type Lang } from "@/lib/i18n";
import { getMessages } from "@/lib/messages";

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
  const messages = getMessages(resolvedLang);

  return getLocalizedMetadata(resolvedLang, {
    title: messages.faq.metadata.title,
    description: messages.faq.metadata.description,
    path: "/faq",
  });
}

export default async function FaqPage({ params }: FaqPageProps) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();

  const messages = getMessages(lang);
  const { faq } = messages;

  return (
    <main className="mx-auto flex w-full max-w-4xl flex-col gap-6 px-6 pb-24 pt-10 lg:px-10">
      <section className="rounded-[2rem] border border-slate-200 bg-white p-8 lg:p-12">
        <p className="text-sm uppercase tracking-[0.2em] text-slate-500">FAQ</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-950">{faq.title}</h1>
      </section>
      {faq.items.map((item) => (
        <article key={item.question} className="rounded-[1.5rem] border border-slate-200 bg-white p-8">
          <h2 className="text-xl font-semibold text-slate-950">{item.question}</h2>
          <p className="mt-3 whitespace-pre-line text-base leading-7 text-slate-600">{item.answer}</p>
        </article>
      ))}
    </main>
  );
}
