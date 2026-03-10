export const releaseUrl =
  process.env.NEXT_PUBLIC_RELEASES_URL ?? "https://github.com/<your-org>/CleanClaw/releases/latest";

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
