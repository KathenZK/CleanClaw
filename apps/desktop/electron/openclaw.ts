import { execFile } from "node:child_process";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { promisify } from "node:util";
import type { AppPlatform, CleanupReportItem, CleanupTarget, ScanResult } from "../shared/cleanup";
import type { Lang } from "../shared/i18n";
import { getMessages } from "../shared/messages";

const execFileAsync = promisify(execFile);

function targetId(parts: Array<string | undefined>) {
  return parts.filter(Boolean).join(":");
}

async function exists(targetPath: string) {
  try {
    await fs.access(targetPath);
    return true;
  } catch {
    return false;
  }
}

async function listMatchingPaths(
  baseDir: string,
  matcher: (entryName: string) => boolean,
  factory: (entryPath: string, entryName: string) => CleanupTarget,
) {
  try {
    const entries = await fs.readdir(baseDir, { withFileTypes: true });
    return entries.filter((entry) => matcher(entry.name)).map((entry) => factory(path.join(baseDir, entry.name), entry.name));
  } catch {
    return [];
  }
}

async function queryCommand(command: string, args: string[]) {
  try {
    const result = await execFileAsync(command, args, { windowsHide: true });
    return result.stdout;
  } catch {
    return "";
  }
}

async function queryRegistryKey(registryPath: string) {
  try {
    await execFileAsync("reg", ["query", registryPath], { windowsHide: true });
    return true;
  } catch {
    return false;
  }
}

async function queryRegistryValue(registryPath: string, valueName: string) {
  try {
    await execFileAsync("reg", ["query", registryPath, "/v", valueName], { windowsHide: true });
    return true;
  } catch {
    return false;
  }
}

async function scanMacPaths(lang: Lang) {
  const messages = getMessages(lang);
  const home = os.homedir();
  const library = path.join(home, "Library");
  const candidates: CleanupTarget[] = [
    {
      id: targetId(["application", "/Applications/OpenClaw.app"]),
      label: "OpenClaw.app",
      description: messages.scan.applicationBundle,
      category: "app",
      kind: "application",
      path: "/Applications/OpenClaw.app",
    },
    {
      id: targetId(["directory", path.join(home, ".openclaw")]),
      label: "~/.openclaw",
      description: messages.scan.stateDirectory,
      category: "state",
      kind: "directory",
      path: path.join(home, ".openclaw"),
    },
    {
      id: targetId(["directory", path.join(library, "Application Support", "OpenClaw")]),
      label: "Application Support",
      description: messages.scan.applicationSupport,
      category: "config",
      kind: "directory",
      path: path.join(library, "Application Support", "OpenClaw"),
    },
    {
      id: targetId(["directory", path.join(library, "Caches", "OpenClaw")]),
      label: "OpenClaw cache",
      description: messages.scan.cacheDirectory,
      category: "cache",
      kind: "directory",
      path: path.join(library, "Caches", "OpenClaw"),
    },
    {
      id: targetId(["directory", path.join(library, "Logs", "OpenClaw")]),
      label: "OpenClaw logs",
      description: messages.scan.logsDirectory,
      category: "logs",
      kind: "directory",
      path: path.join(library, "Logs", "OpenClaw"),
    },
  ];

  const matches = await Promise.all(
    candidates.map(async (candidate) => ((candidate.path && (await exists(candidate.path))) ? candidate : null)),
  );

  const profileDirs = await listMatchingPaths(
    home,
    (entryName) => entryName.startsWith(".openclaw-"),
    (entryPath, entryName) => ({
      id: targetId(["directory", entryPath]),
      label: entryName,
      description: messages.scan.profileState,
      category: "state",
      kind: "directory",
      path: entryPath,
    }),
  );

  const launchAgentDir = path.join(library, "LaunchAgents");
  const launchAgents = await listMatchingPaths(
    launchAgentDir,
    (entryName) =>
      entryName.endsWith(".plist") &&
      (entryName.startsWith("ai.openclaw") || entryName.startsWith("com.openclaw")),
    (entryPath, entryName) => ({
      id: targetId(["launch-agent", entryPath]),
      label: entryName,
      description: messages.scan.launchAgent,
      category: "service",
      kind: "launch-agent",
      path: entryPath,
      serviceLabel: entryName.replace(/\.plist$/, ""),
    }),
  );

  const preferencesDir = path.join(library, "Preferences");
  const preferences = await listMatchingPaths(
    preferencesDir,
    (entryName) => entryName.endsWith(".plist") && entryName.includes("openclaw"),
    (entryPath, entryName) => ({
      id: targetId(["file", entryPath]),
      label: entryName,
      description: messages.scan.preferenceFile,
      category: "config",
      kind: "file",
      path: entryPath,
    }),
  );

  return [...matches.filter(Boolean), ...profileDirs, ...launchAgents, ...preferences] as CleanupTarget[];
}

async function scanWindowsTasks(lang: Lang): Promise<CleanupTarget[]> {
  const messages = getMessages(lang);
  const output = await queryCommand("schtasks", ["/Query", "/FO", "CSV", "/NH"]);
  if (!output) {
    return [];
  }

  const taskNames = output
    .split(/\r?\n/)
    .flatMap((line) => {
      const match = line.match(/^"([^"]+)"/);
      return match?.[1] ? [match[1]] : [];
    })
    .filter((taskName) => taskName.includes("OpenClaw Gateway"));

  return taskNames.map((taskName) => ({
      id: targetId(["scheduled-task", taskName]),
      label: taskName,
      description: messages.scan.windowsTask,
      category: "service" as const,
      kind: "scheduled-task" as const,
      taskName,
    }));
}

async function scanWindowsRegistry(lang: Lang) {
  const messages = getMessages(lang);
  const registryTargets: CleanupTarget[] = [];
  const keys = [
    "HKCU\\Software\\OpenClaw",
    "HKLM\\Software\\OpenClaw",
    "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\OpenClaw",
    "HKLM\\Software\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\OpenClaw",
  ];

  for (const registryPath of keys) {
    if (await queryRegistryKey(registryPath)) {
      registryTargets.push({
        id: targetId(["registry-key", registryPath]),
        label: registryPath,
        description: messages.scan.registryKey,
        category: "registry",
        kind: "registry-key",
        registryPath,
      });
    }
  }

  const values = [
    { registryPath: "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Run", valueName: "OpenClaw" },
    { registryPath: "HKLM\\Software\\Microsoft\\Windows\\CurrentVersion\\Run", valueName: "OpenClaw" },
  ];

  for (const item of values) {
    if (await queryRegistryValue(item.registryPath, item.valueName)) {
      registryTargets.push({
        id: targetId(["registry-value", item.registryPath, item.valueName]),
        label: `${item.registryPath} -> ${item.valueName}`,
        description: messages.scan.startupRegistryValue,
        category: "startup",
        kind: "registry-value",
        registryPath: item.registryPath,
        registryValueName: item.valueName,
      });
    }
  }

  return registryTargets;
}

async function scanWindowsPaths(lang: Lang) {
  const messages = getMessages(lang);
  const home = os.homedir();
  const localAppData = process.env.LOCALAPPDATA;
  const roamingAppData = process.env.APPDATA;
  const candidates = [
    {
      label: "%USERPROFILE%\\.openclaw",
      description: messages.scan.stateDirectory,
      category: "state" as const,
      path: path.join(home, ".openclaw"),
    },
    {
      label: "%LOCALAPPDATA%\\OpenClaw",
      description: messages.scan.windowsLocalAppData,
      category: "config" as const,
      path: localAppData ? path.join(localAppData, "OpenClaw") : undefined,
    },
    {
      label: "%APPDATA%\\OpenClaw",
      description: messages.scan.windowsRoamingAppData,
      category: "config" as const,
      path: roamingAppData ? path.join(roamingAppData, "OpenClaw") : undefined,
    },
    {
      label: "%LOCALAPPDATA%\\Programs\\OpenClaw",
      description: messages.scan.windowsPrograms,
      category: "app" as const,
      path: localAppData ? path.join(localAppData, "Programs", "OpenClaw") : undefined,
    },
  ];

  const results: CleanupTarget[] = [];

  for (const candidate of candidates) {
    if (candidate.path && (await exists(candidate.path))) {
      results.push({
        id: targetId(["directory", candidate.path]),
        label: candidate.label,
        description: candidate.description,
        category: candidate.category,
        kind: "directory",
        path: candidate.path,
      });
    }
  }

  const profiles = await listMatchingPaths(
    home,
    (entryName) => entryName.startsWith(".openclaw-"),
    (entryPath, entryName) => ({
      id: targetId(["directory", entryPath]),
      label: entryName,
      description: messages.scan.profileState,
      category: "state",
      kind: "directory",
      path: entryPath,
    }),
  );

  const tasks = await scanWindowsTasks(lang);
  const registry = await scanWindowsRegistry(lang);

  return [...results, ...profiles, ...tasks, ...registry];
}

export async function scanOpenClaw(lang: Lang): Promise<ScanResult> {
  const platform: AppPlatform =
    process.platform === "darwin" || process.platform === "win32" || process.platform === "linux"
      ? process.platform
      : "unknown";
  let items: CleanupTarget[] = [];

  if (platform === "darwin") {
    items = await scanMacPaths(lang);
  } else if (platform === "win32") {
    items = await scanWindowsPaths(lang);
  }

  return {
    platform,
    scannedAt: new Date().toISOString(),
    items: items.sort((a, b) => a.label.localeCompare(b.label)),
  };
}

async function removePath(targetPath: string) {
  await fs.rm(targetPath, { recursive: true, force: true, maxRetries: 2 });
}

async function runCommand(command: string, args: string[]) {
  await execFileAsync(command, args, { windowsHide: true });
}

export async function cleanTargets(items: CleanupTarget[], lang: Lang) {
  const messages = getMessages(lang);
  const results: CleanupReportItem[] = [];

  for (const item of items) {
    try {
      switch (item.kind) {
        case "application":
        case "directory":
        case "file":
          if (!item.path) {
            throw new Error("Missing target path.");
          }
          await removePath(item.path);
          break;
        case "launch-agent": {
          if (!item.path) {
            throw new Error("Missing launch agent path.");
          }

          if (item.serviceLabel && typeof process.getuid === "function") {
            try {
              await runCommand("launchctl", ["bootout", `gui/${process.getuid()}/${item.serviceLabel}`]);
            } catch {
              // Ignore bootout errors; the file removal is still useful.
            }
          }

          await removePath(item.path);
          break;
        }
        case "scheduled-task":
          if (!item.taskName) {
            throw new Error("Missing task name.");
          }
          await runCommand("schtasks", ["/Delete", "/F", "/TN", item.taskName]);
          break;
        case "registry-key":
          if (!item.registryPath) {
            throw new Error("Missing registry path.");
          }
          await runCommand("reg", ["delete", item.registryPath, "/f"]);
          break;
        case "registry-value":
          if (!item.registryPath || !item.registryValueName) {
            throw new Error("Missing registry value target.");
          }
          await runCommand("reg", ["delete", item.registryPath, "/v", item.registryValueName, "/f"]);
          break;
        default:
          throw new Error("Unsupported cleanup target.");
      }

      results.push({
        target: item,
        success: true,
        message: messages.report.removedSuccessfully,
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : messages.report.unknownCleanupError;
      results.push({
        target: item,
        success: false,
        message,
      });
    }
  }

  return results;
}

export function formatReport(items: CleanupReportItem[], lang: Lang) {
  const messages = getMessages(lang);
  const lines = [
    messages.report.title,
    `${messages.report.generatedAt}: ${new Date().toISOString()}`,
    "",
  ];

  for (const item of items) {
    lines.push(`[${item.success ? messages.report.success : messages.report.failed}] ${item.target.label}`);
    lines.push(`${messages.report.type}: ${item.target.kind}`);
    lines.push(`${messages.report.description}: ${item.target.description}`);
    lines.push(`${messages.report.message}: ${item.message}`);
    lines.push("");
  }

  return lines.join("\n");
}
