import Link from "next/link";
import Script from "next/script";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import "../globals.css";
import { LanguageSwitcher } from "@/components/language-switcher";
import { getNavigation } from "@/lib/site";
import { getLocalizedMetadata } from "@/lib/seo";
import { isLang, locales, type Lang } from "@/lib/i18n";

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

  return getLocalizedMetadata(resolvedLang, {
    title: resolvedLang === "zh" ? "CleanClaw | 一键彻底清理 OpenClaw" : "CleanClaw | Remove OpenClaw completely",
    description:
      resolvedLang === "zh"
        ? "扫描并删除 OpenClaw 的安装产物、配置、缓存、日志、后台服务、自启动项与 Windows 注册表残留。"
        : "Scan and remove OpenClaw installation files, configuration, caches, logs, background services, startup items, and Windows registry leftovers.",
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

  const navigation = getNavigation(lang);

  return (
    <html lang={lang}>
      <head>
        <Script src="https://cdn.tailwindcss.com" strategy="beforeInteractive" />
      </head>
      <body className="antialiased">
        <div className="min-h-screen bg-[radial-gradient(circle_at_top,#f8fafc,white_55%)] text-slate-950">
          <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-6 lg:px-10">
            <Link href={`/${lang}`} className="text-lg font-semibold tracking-tight">
              CleanClaw
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
                <LanguageSwitcher lang={lang} />
              </Suspense>
            </div>
          </header>
          {children}
        </div>
      </body>
    </html>
  );
}
