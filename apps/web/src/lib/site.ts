export const releaseUrl =
  process.env.NEXT_PUBLIC_RELEASES_URL ?? "https://github.com/KathenZK/CleanClaw/releases/tag/v0.1.0";

export const macDownloadUrl =
  process.env.NEXT_PUBLIC_MAC_DOWNLOAD_URL ??
  "https://github.com/KathenZK/CleanClaw/releases/download/v0.1.0/CleanClaw-0.1.0-arm64.dmg";

export const windowsDownloadUrl = process.env.NEXT_PUBLIC_WINDOWS_DOWNLOAD_URL ?? "";

export const currentVersion = "v0.1.0";
export const publishedLabel = "2026-03-10";

export const navigation = [
  { href: "/", label: "首页 Home" },
  { href: "/download", label: "下载 Download" },
  { href: "/faq", label: "FAQ" },
  { href: "/docs", label: "清理说明 Docs" },
  { href: "/legal", label: "免责声明 Legal" },
] as const;

export const cleanupTargets = [
  "OpenClaw 应用本体 / app bundle",
  "用户目录下的 .openclaw 与 profile 变体",
  "缓存、日志、配置目录",
  "macOS LaunchAgents 与后台服务",
  "Windows Scheduled Task 与自启动项",
  "Windows 相关注册表项",
] as const;

export const downloads = [
  {
    platform: "macOS",
    architecture: "Apple Silicon",
    description: "适用于 Apple Silicon Mac 的 `.dmg` 安装包。",
    href: macDownloadUrl,
    cta: "下载 macOS 版",
    available: true,
  },
  {
    platform: "Windows",
    architecture: "Coming soon",
    description: "Windows 安装包正在补打包与验证流程，稍后提供。",
    href: windowsDownloadUrl,
    cta: "Windows 即将提供",
    available: false,
  },
] as const;
