import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import "../globals.css";
import { LanguageSwitcher } from "@/components/language-switcher";
import { getLocalizedMetadata } from "@/lib/seo";
import { getLocalizedPath, isLang, locales, type Lang } from "@/lib/i18n";
import { getMessages } from "@/lib/messages";

interface LocaleLayoutProps {
  children: React.ReactNode;
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
  });
}

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { lang } = await params;

  if (!isLang(lang)) {
    notFound();
  }

  const messages = getMessages(lang);
  const navigation = [
    { href: getLocalizedPath(lang, "/"), label: messages.nav.home },
    { href: getLocalizedPath(lang, "/download"), label: messages.nav.download },
    { href: getLocalizedPath(lang, "/faq"), label: messages.nav.faq },
    { href: getLocalizedPath(lang, "/legal"), label: messages.nav.legal },
  ] as const;

  return (
    <html lang={lang}>
      <head>
        <Script src="https://cdn.tailwindcss.com" strategy="beforeInteractive" />
      </head>
      <body className="antialiased">
        <div className="min-h-screen bg-[radial-gradient(circle_at_top,#f8fafc,white_55%)] text-slate-950">
          <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-6 lg:px-10">
            <Link href={`/${lang}`} className="flex items-center gap-3 text-lg font-semibold tracking-tight">
              <span className="relative h-8 w-8 overflow-hidden rounded-[10px] border border-slate-200 bg-white shadow-[0_10px_24px_-18px_rgba(15,23,42,0.45)]">
                <Image
                  src="/cleanclaw-og.png"
                  alt="CleanClaw logo"
                  fill
                  sizes="32px"
                  className="object-cover"
                  style={{ objectPosition: "50% 28%" }}
                  priority
                />
              </span>
              <span>{messages.site.brand}</span>
            </Link>
            <div className="flex items-center gap-4">
              <nav className="hidden items-center gap-6 text-sm text-slate-600 md:flex">
                {navigation.map((item) => (
                  <Link key={item.href} href={item.href} className="transition hover:text-slate-950">
                    {item.label}
                  </Link>
                ))}
              </nav>
              <Suspense fallback={null}>
                <LanguageSwitcher lang={lang} labels={messages.language} />
              </Suspense>
            </div>
          </header>
          {children}
          <footer className="mx-auto mt-8 w-full max-w-6xl border-t border-slate-200 px-6 py-8 lg:px-10">
            <div className="flex flex-col gap-2 text-sm text-slate-500 md:flex-row md:items-center md:justify-between">
              <p>{messages.footer.copyright}</p>
              <p>{messages.footer.note}</p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
