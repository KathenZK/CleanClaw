import type { Metadata } from "next";
import { zh } from "@/messages/zh";

export const metadata: Metadata = {
  title: zh.site.brand,
  description: zh.site.metadataDescription,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
