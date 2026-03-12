import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  currentVersion,
  macArm64DownloadUrl,
  macX64DownloadUrl,
  publishedLabel,
  windowsArm64DownloadUrl,
  windowsDownloadUrl,
} from "@/lib/site";
import { getLocalizedPath, isLang, siteUrl, type Lang } from "@/lib/i18n";
import { getLocalizedMetadata } from "@/lib/seo";
import { getMessages } from "@/lib/messages";

interface DownloadPageProps {
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
    title: messages.download.metadata.title,
    description: messages.download.metadata.description,
    path: "/download",
  });
}

export default async function DownloadPage({ params }: DownloadPageProps) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();

  const messages = getMessages(lang);
  const { download } = messages;
  const downloadHrefs = [macArm64DownloadUrl, macX64DownloadUrl, windowsDownloadUrl, windowsArm64DownloadUrl];
  const softwareApplicationSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: messages.site.brand,
    applicationCategory: "UtilitiesApplication",
    applicationSubCategory: "System Cleanup Utility",
    softwareVersion: currentVersion,
    operatingSystem: ["macOS", "Windows"],
    inLanguage: lang,
    url: `${siteUrl}${getLocalizedPath(lang, "/download")}`,
    downloadUrl: downloadHrefs,
    description: download.metadata.description,
    isAccessibleForFree: true,
    offers: download.cards.map((item, index) => ({
      "@type": "Offer",
      name: `${messages.site.brand} ${item.platform} ${item.architecture}`,
      description: item.description,
      url: downloadHrefs[index],
      price: "0",
      priceCurrency: "USD",
      availability: item.available ? "https://schema.org/InStock" : "https://schema.org/PreOrder",
      category: `${item.platform} ${item.architecture}`,
    })),
  };

  return (
    <main className="mx-auto flex w-full max-w-4xl flex-col gap-8 px-6 pb-24 pt-10 lg:px-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationSchema) }}
      />
      <section className="rounded-4xl border border-slate-200 bg-white p-8 shadow-[0_30px_120px_-48px_rgba(15,23,42,0.35)] lg:p-12">
        <p className="text-sm uppercase tracking-[0.2em] text-slate-500">{download.eyebrow}</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-950">{download.title}</h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">{download.lead}</p>
        <div className="mt-8 flex flex-wrap gap-3 text-sm text-slate-500">
          <span className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2">
            {download.versionLabel} {currentVersion}
          </span>
          <span className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2">
            {download.publishedLabel} {publishedLabel}
          </span>
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {download.cards.map((item, index) => (
          <article
            key={`${item.platform}-${item.architecture}`}
            className="flex h-full flex-col rounded-3xl border border-slate-200 bg-white p-8"
          >
            <p className="text-sm uppercase tracking-[0.18em] text-slate-500">{item.platform}</p>
            <h2 className="mt-4 text-2xl font-semibold tracking-tight text-slate-950">{item.architecture}</h2>
            <p className="mt-4 text-base leading-7 text-slate-600">{item.description}</p>
            {item.available ? (
              <a
                href={downloadHrefs[index]}
                target="_blank"
                rel="noreferrer"
                className="mt-auto inline-flex items-center justify-center whitespace-pre-line rounded-full bg-slate-950 px-6 py-3 text-center text-sm leading-5 font-medium text-white transition hover:bg-slate-800"
              >
                {item.cta}
              </a>
            ) : (
              <div className="mt-auto inline-flex items-center justify-center whitespace-pre-line rounded-full border border-slate-200 bg-slate-50 px-6 py-3 text-center text-sm leading-5 font-medium text-slate-500">
                {item.cta}
              </div>
            )}
          </article>
        ))}
      </section>

    </main>
  );
}
