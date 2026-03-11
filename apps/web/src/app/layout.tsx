import type { Metadata } from "next";
import { siteUrl } from "@/lib/i18n";
import { zh } from "@/messages/zh";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: zh.site.brand,
  description: zh.site.metadataDescription,
  openGraph: {
    images: [
      {
        url: `${siteUrl}/cleanclaw-og.png`,
        width: 1024,
        height: 1024,
        alt: "CleanClaw brand image",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: [`${siteUrl}/cleanclaw-og.png`],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
