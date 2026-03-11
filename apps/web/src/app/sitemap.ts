import type { MetadataRoute } from "next";
import { locales, siteUrl } from "@/lib/i18n";

const pages = ["/", "/download", "/faq", "/docs", "/legal"] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return locales.flatMap((lang) =>
    pages.map((page) => ({
      url: `${siteUrl}/${lang}${page === "/" ? "" : page}`,
      lastModified: now,
      changeFrequency: page === "/" ? "weekly" : "monthly",
      priority: page === "/" ? 1 : 0.7,
    })),
  );
}
