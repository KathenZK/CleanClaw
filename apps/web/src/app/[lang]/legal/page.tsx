import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getLocalizedMetadata } from "@/lib/seo";
import { isLang, type Lang } from "@/lib/i18n";
import { getMessages } from "@/lib/messages";

interface LegalPageProps {
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
    title: messages.legal.metadata.title,
    description: messages.legal.metadata.description,
    path: "/legal",
  });
}

export default async function LegalPage({ params }: LegalPageProps) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();

  const messages = getMessages(lang);
  const { legal } = messages;

  return (
    <main className="mx-auto flex w-full max-w-4xl flex-col gap-6 px-6 pb-24 pt-10 lg:px-10">
      <section className="rounded-[2rem] border border-slate-200 bg-white p-8 lg:p-12">
        <p className="text-sm uppercase tracking-[0.2em] text-slate-500">{legal.eyebrow}</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-950">{legal.title}</h1>
      </section>
      <section className="rounded-[1.5rem] border border-slate-200 bg-white p-8 text-base leading-7 text-slate-600">
        {legal.paragraphs.map((paragraph, index) => (
          <p key={paragraph} className={index === 0 ? "" : "mt-4"}>
            {paragraph}
          </p>
        ))}
      </section>
    </main>
  );
}
