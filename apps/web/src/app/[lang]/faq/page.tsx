import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getLocalizedPath, isLang, siteUrl, type Lang } from "@/lib/i18n";
import { getLocalizedMetadata } from "@/lib/seo";
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
  const faqPageSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: lang,
    url: `${siteUrl}${getLocalizedPath(lang, "/faq")}`,
    mainEntity: faq.items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <main className="mx-auto flex w-full max-w-4xl flex-col gap-6 px-6 pb-24 pt-10 lg:px-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageSchema) }} />
      <section className="rounded-4xl border border-slate-200 bg-white p-8 lg:p-12">
        <p className="text-sm uppercase tracking-[0.2em] text-slate-500">FAQ</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-950">{faq.title}</h1>
      </section>
      {faq.items.map((item) => (
        <article key={item.question} className="rounded-3xl border border-slate-200 bg-white p-8">
          <h2 className="text-xl font-semibold text-slate-950">{item.question}</h2>
          <p className="mt-3 whitespace-pre-line text-base leading-7 text-slate-600">{item.answer}</p>
        </article>
      ))}
    </main>
  );
}
