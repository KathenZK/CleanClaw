export const releaseUrl =
  process.env.NEXT_PUBLIC_RELEASES_URL ?? "https://github.com/KathenZK/CleanClaw/releases/tag/v0.1.0";

export const macArm64DownloadUrl =
  process.env.NEXT_PUBLIC_MAC_ARM64_DOWNLOAD_URL ??
  process.env.NEXT_PUBLIC_MAC_DOWNLOAD_URL ??
  "https://github.com/KathenZK/CleanClaw/releases/download/v0.1.0/CleanClaw-0.1.0-arm64.dmg";

export const macX64DownloadUrl =
  process.env.NEXT_PUBLIC_MAC_X64_DOWNLOAD_URL ??
  "https://github.com/KathenZK/CleanClaw/releases/download/v0.1.0/CleanClaw-0.1.0-x64.dmg";

export const windowsDownloadUrl =
  process.env.NEXT_PUBLIC_WINDOWS_X64_DOWNLOAD_URL ??
  process.env.NEXT_PUBLIC_WINDOWS_DOWNLOAD_URL ??
  "https://github.com/KathenZK/CleanClaw/releases/download/v0.1.0/CleanClaw%20Setup%200.1.0.exe";

export const currentVersion = "v0.1.0";
export const publishedLabel = "2026-03-10";
