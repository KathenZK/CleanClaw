import type { MetadataRoute } from "next";
import { locales, siteUrl } from "@/lib/i18n";

const pages = ["/", "/download", "/faq", "/legal"] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  return locales.flatMap((lang) =>
    pages.map((page) => ({
      url: `${siteUrl}/${lang}${page === "/" ? "" : page}`,
      changeFrequency: page === "/" ? "weekly" : "monthly",
      priority: page === "/" ? 1 : 0.7,
    })),
  );
}
