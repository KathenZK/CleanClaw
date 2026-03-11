import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CleanClaw",
  description: "CleanClaw helps users remove OpenClaw and its leftovers.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
