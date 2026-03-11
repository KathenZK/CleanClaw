import type { Lang } from "@/lib/i18n";

export const releaseUrl =
  process.env.NEXT_PUBLIC_RELEASES_URL ?? "https://github.com/KathenZK/CleanClaw/releases/tag/v0.1.0";

export const macDownloadUrl =
  process.env.NEXT_PUBLIC_MAC_DOWNLOAD_URL ??
  "https://github.com/KathenZK/CleanClaw/releases/download/v0.1.0/CleanClaw-0.1.0-arm64.dmg";

export const windowsDownloadUrl = process.env.NEXT_PUBLIC_WINDOWS_DOWNLOAD_URL ?? "";

export const currentVersion = "v0.1.0";
export const publishedLabel = "2026-03-10";

export function getNavigation(lang: Lang) {
  return [
    { href: "/", label: lang === "zh" ? "首页" : "Home" },
    { href: "/download", label: lang === "zh" ? "下载" : "Download" },
    { href: "/faq", label: "FAQ" },
    { href: "/docs", label: lang === "zh" ? "清理说明" : "Docs" },
    { href: "/legal", label: lang === "zh" ? "免责声明" : "Legal" },
  ] as const;
}

export function getCleanupTargets(lang: Lang) {
  return lang === "zh"
    ? [
        "OpenClaw 应用本体",
        "用户目录下的 `.openclaw` 与 profile 变体",
        "缓存、日志与配置目录",
        "macOS LaunchAgents 与后台服务",
        "Windows Scheduled Task 与自启动项",
        "Windows 相关注册表项",
      ]
    : [
        "OpenClaw application bundle",
        "User `.openclaw` directory and profile variants",
        "Cache, log, and configuration directories",
        "macOS LaunchAgents and background services",
        "Windows scheduled tasks and startup entries",
        "Windows registry entries related to OpenClaw",
      ];
}

export function getDownloads(lang: Lang) {
  return [
    {
      platform: "macOS",
      architecture: lang === "zh" ? "Apple Silicon" : "Apple Silicon",
      description:
        lang === "zh"
          ? "适用于 Apple Silicon Mac 的 `.dmg` 安装包。"
          : "A `.dmg` installer built for Apple Silicon Macs.",
      href: macDownloadUrl,
      cta: lang === "zh" ? "下载 macOS 版" : "Download for macOS",
      available: true,
    },
    {
      platform: "Windows",
      architecture: lang === "zh" ? "即将提供" : "Coming soon",
      description:
        lang === "zh"
          ? "Windows 安装包正在补打包与验证流程，稍后提供。"
          : "The Windows installer is being packaged and verified.",
      href: windowsDownloadUrl,
      cta: lang === "zh" ? "Windows 即将提供" : "Windows coming soon",
      available: false,
    },
  ] as const;
}
