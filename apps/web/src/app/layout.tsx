import Link from "next/link";
import Script from "next/script";
import type { Metadata } from "next";
import "./globals.css";
import { getNavigation } from "@/lib/site";
import { getRequestLang } from "@/lib/i18n";
import { LanguageSwitcher } from "@/components/language-switcher";

export const metadata: Metadata = {
  title: "CleanClaw",
  description: "CleanClaw helps users remove OpenClaw and its leftovers.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const lang = await getRequestLang();
  const navigation = getNavigation(lang);

  return (
    <html lang={lang}>
      <head>
        <Script src="https://cdn.tailwindcss.com" strategy="beforeInteractive" />
      </head>
      <body className="antialiased">
        <div className="min-h-screen bg-[radial-gradient(circle_at_top,#f8fafc,white_55%)] text-slate-950">
          <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-6 lg:px-10">
            <Link href="/" className="text-lg font-semibold tracking-tight">
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
              <LanguageSwitcher lang={lang} />
            </div>
          </header>
          {children}
        </div>
      </body>
    </html>
  );
}
