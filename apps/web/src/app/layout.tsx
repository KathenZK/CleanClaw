import type { Metadata } from "next";
import { defaultLang, getLocalizedPath, siteUrl } from "@/lib/i18n";
import { zh } from "@/messages/zh";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: zh.site.brand,
  description: zh.site.metadataDescription,
  openGraph: {
    images: [
      {
        url: `${siteUrl}${getLocalizedPath(defaultLang, "/opengraph-image")}`,
        width: 1200,
        height: 630,
        alt: "CleanClaw brand image",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: [`${siteUrl}${getLocalizedPath(defaultLang, "/opengraph-image")}`],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
