import Link from "next/link";
import Script from "next/script";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { navigation } from "@/lib/site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CleanClaw",
  description: "一键彻底清理 OpenClaw。CleanClaw helps users remove OpenClaw and its leftovers.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script src="https://cdn.tailwindcss.com" strategy="beforeInteractive" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="min-h-screen bg-[radial-gradient(circle_at_top,#f8fafc,white_55%)] text-slate-950">
          <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-6 lg:px-10">
            <Link href="/" className="text-lg font-semibold tracking-tight">
              CleanClaw
            </Link>
            <nav className="hidden items-center gap-6 text-sm text-slate-600 md:flex">
              {navigation.map((item) => (
                <Link key={item.href} href={item.href} className="transition hover:text-slate-950">
                  {item.label}
                </Link>
              ))}
            </nav>
          </header>
          {children}
        </div>
      </body>
    </html>
  );
}
