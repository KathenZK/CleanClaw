import d from "node:fs/promises";
import i from "node:path";
import { fileURLToPath as L } from "node:url";
import { ipcMain as C, app as p, BrowserWindow as b } from "electron";
import { execFile as S } from "node:child_process";
import P from "node:os";
import { promisify as W } from "node:util";
const f = W(S);
function o(a) {
  return a.filter(Boolean).join(":");
}
async function v(a) {
  try {
    return await d.access(a), !0;
  } catch {
    return !1;
  }
}
async function u(a, t, e) {
  try {
    return (await d.readdir(a, { withFileTypes: !0 })).filter((c) => t(c.name)).map((c) => e(i.join(a, c.name), c.name));
  } catch {
    return [];
  }
}
async function j(a, t) {
  try {
    return (await f(a, t, { windowsHide: !0 })).stdout;
  } catch {
    return "";
  }
}
async function D(a) {
  try {
    return await f("reg", ["query", a], { windowsHide: !0 }), !0;
  } catch {
    return !1;
  }
}
async function R(a, t) {
  try {
    return await f("reg", ["query", a, "/v", t], { windowsHide: !0 }), !0;
  } catch {
    return !1;
  }
}
async function E() {
  const a = P.homedir(), t = i.join(a, "Library"), e = [
    {
      id: o(["application", "/Applications/OpenClaw.app"]),
      label: "OpenClaw.app",
      description: "OpenClaw macOS 应用本体",
      category: "app",
      kind: "application",
      path: "/Applications/OpenClaw.app"
    },
    {
      id: o(["directory", i.join(a, ".openclaw")]),
      label: "~/.openclaw",
      description: "默认状态与工作目录",
      category: "state",
      kind: "directory",
      path: i.join(a, ".openclaw")
    },
    {
      id: o(["directory", i.join(t, "Application Support", "OpenClaw")]),
      label: "Application Support",
      description: "Application Support/OpenClaw",
      category: "config",
      kind: "directory",
      path: i.join(t, "Application Support", "OpenClaw")
    },
    {
      id: o(["directory", i.join(t, "Caches", "OpenClaw")]),
      label: "OpenClaw cache",
      description: "Library/Caches/OpenClaw",
      category: "cache",
      kind: "directory",
      path: i.join(t, "Caches", "OpenClaw")
    },
    {
      id: o(["directory", i.join(t, "Logs", "OpenClaw")]),
      label: "OpenClaw logs",
      description: "Library/Logs/OpenClaw",
      category: "logs",
      kind: "directory",
      path: i.join(t, "Logs", "OpenClaw")
    }
  ], r = await Promise.all(
    e.map(async (n) => n.path && await v(n.path) ? n : null)
  ), c = await u(
    a,
    (n) => n.startsWith(".openclaw-"),
    (n, l) => ({
      id: o(["directory", n]),
      label: l,
      description: "OpenClaw profile 状态目录",
      category: "state",
      kind: "directory",
      path: n
    })
  ), h = i.join(t, "LaunchAgents"), g = await u(
    h,
    (n) => n.endsWith(".plist") && (n.startsWith("ai.openclaw") || n.startsWith("com.openclaw")),
    (n, l) => ({
      id: o(["launch-agent", n]),
      label: l,
      description: "LaunchAgent 与后台服务入口",
      category: "service",
      kind: "launch-agent",
      path: n,
      serviceLabel: l.replace(/\.plist$/, "")
    })
  ), y = i.join(t, "Preferences"), s = await u(
    y,
    (n) => n.endsWith(".plist") && n.includes("openclaw"),
    (n, l) => ({
      id: o(["file", n]),
      label: l,
      description: "Preference plist",
      category: "config",
      kind: "file",
      path: n
    })
  );
  return [...r.filter(Boolean), ...c, ...g, ...s];
}
async function M() {
  const a = await j("schtasks", ["/Query", "/FO", "CSV", "/NH"]);
  return a ? a.split(/\r?\n/).flatMap((e) => {
    const r = e.match(/^"([^"]+)"/);
    return r?.[1] ? [r[1]] : [];
  }).filter((e) => e.includes("OpenClaw Gateway")).map((e) => ({
    id: o(["scheduled-task", e]),
    label: e,
    description: "Windows Scheduled Task",
    category: "service",
    kind: "scheduled-task",
    taskName: e
  })) : [];
}
async function I() {
  const a = [], t = [
    "HKCU\\Software\\OpenClaw",
    "HKLM\\Software\\OpenClaw",
    "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\OpenClaw",
    "HKLM\\Software\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\OpenClaw"
  ];
  for (const r of t)
    await D(r) && a.push({
      id: o(["registry-key", r]),
      label: r,
      description: "OpenClaw 注册表项",
      category: "registry",
      kind: "registry-key",
      registryPath: r
    });
  const e = [
    { registryPath: "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Run", valueName: "OpenClaw" },
    { registryPath: "HKLM\\Software\\Microsoft\\Windows\\CurrentVersion\\Run", valueName: "OpenClaw" }
  ];
  for (const r of e)
    await R(r.registryPath, r.valueName) && a.push({
      id: o(["registry-value", r.registryPath, r.valueName]),
      label: `${r.registryPath} -> ${r.valueName}`,
      description: "OpenClaw 自启动注册表值",
      category: "startup",
      kind: "registry-value",
      registryPath: r.registryPath,
      registryValueName: r.valueName
    });
  return a;
}
async function T() {
  const a = P.homedir(), t = process.env.LOCALAPPDATA, e = process.env.APPDATA, r = [
    {
      label: "%USERPROFILE%\\.openclaw",
      description: "默认状态与工作目录",
      category: "state",
      path: i.join(a, ".openclaw")
    },
    {
      label: "%LOCALAPPDATA%\\OpenClaw",
      description: "Local AppData/OpenClaw",
      category: "config",
      path: t ? i.join(t, "OpenClaw") : void 0
    },
    {
      label: "%APPDATA%\\OpenClaw",
      description: "Roaming AppData/OpenClaw",
      category: "config",
      path: e ? i.join(e, "OpenClaw") : void 0
    },
    {
      label: "%LOCALAPPDATA%\\Programs\\OpenClaw",
      description: "Programs/OpenClaw",
      category: "app",
      path: t ? i.join(t, "Programs", "OpenClaw") : void 0
    }
  ], c = [];
  for (const s of r)
    s.path && await v(s.path) && c.push({
      id: o(["directory", s.path]),
      label: s.label,
      description: s.description,
      category: s.category,
      kind: "directory",
      path: s.path
    });
  const h = await u(
    a,
    (s) => s.startsWith(".openclaw-"),
    (s, n) => ({
      id: o(["directory", s]),
      label: n,
      description: "OpenClaw profile 状态目录",
      category: "state",
      kind: "directory",
      path: s
    })
  ), g = await M(), y = await I();
  return [...c, ...h, ...g, ...y];
}
async function V() {
  const a = process.platform === "darwin" || process.platform === "win32" || process.platform === "linux" ? process.platform : "unknown";
  let t = [];
  return a === "darwin" ? t = await E() : a === "win32" && (t = await T()), {
    platform: a,
    scannedAt: (/* @__PURE__ */ new Date()).toISOString(),
    items: t.sort((e, r) => e.label.localeCompare(r.label))
  };
}
async function O(a) {
  await d.rm(a, { recursive: !0, force: !0, maxRetries: 2 });
}
async function w(a, t) {
  await f(a, t, { windowsHide: !0 });
}
async function N(a) {
  const t = [];
  for (const e of a)
    try {
      switch (e.kind) {
        case "application":
        case "directory":
        case "file":
          if (!e.path)
            throw new Error("Missing target path.");
          await O(e.path);
          break;
        case "launch-agent": {
          if (!e.path)
            throw new Error("Missing launch agent path.");
          if (e.serviceLabel && typeof process.getuid == "function")
            try {
              await w("launchctl", ["bootout", `gui/${process.getuid()}/${e.serviceLabel}`]);
            } catch {
            }
          await O(e.path);
          break;
        }
        case "scheduled-task":
          if (!e.taskName)
            throw new Error("Missing task name.");
          await w("schtasks", ["/Delete", "/F", "/TN", e.taskName]);
          break;
        case "registry-key":
          if (!e.registryPath)
            throw new Error("Missing registry path.");
          await w("reg", ["delete", e.registryPath, "/f"]);
          break;
        case "registry-value":
          if (!e.registryPath || !e.registryValueName)
            throw new Error("Missing registry value target.");
          await w("reg", ["delete", e.registryPath, "/v", e.registryValueName, "/f"]);
          break;
        default:
          throw new Error("Unsupported cleanup target.");
      }
      t.push({
        target: e,
        success: !0,
        message: "Removed successfully."
      });
    } catch (r) {
      const c = r instanceof Error ? r.message : "Unknown cleanup error.";
      t.push({
        target: e,
        success: !1,
        message: c
      });
    }
  return t;
}
function U(a) {
  const t = [
    "CleanClaw Report",
    `Generated: ${(/* @__PURE__ */ new Date()).toISOString()}`,
    ""
  ];
  for (const e of a)
    t.push(`[${e.success ? "SUCCESS" : "FAILED"}] ${e.target.label}`), t.push(`Type: ${e.target.kind}`), t.push(`Description: ${e.target.description}`), t.push(`Message: ${e.message}`), t.push("");
  return t.join(`
`);
}
const k = i.dirname(L(import.meta.url));
let m = null;
function _() {
  return process.platform === "darwin" || process.platform === "win32" || process.platform === "linux" ? process.platform : "unknown";
}
async function A() {
  m = new b({
    width: 1080,
    height: 760,
    minWidth: 960,
    minHeight: 680,
    title: "CleanClaw",
    backgroundColor: "#f3f6fb",
    webPreferences: {
      preload: i.join(k, "preload.mjs"),
      contextIsolation: !0,
      nodeIntegration: !1
    }
  }), MAIN_WINDOW_VITE_DEV_SERVER_URL ? await m.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL) : await m.loadFile(i.join(k, "../dist/index.html"));
}
C.handle("cleanclaw:get-platform", async () => _());
C.handle("cleanclaw:scan", async () => V());
C.handle("cleanclaw:clean", async (a, t) => {
  const e = await N(t), r = i.join(
    p.getPath("desktop"),
    `CleanClaw-Report-${(/* @__PURE__ */ new Date()).toISOString().replace(/[:.]/g, "-")}.txt`
  );
  return await d.writeFile(r, U(e), "utf8"), {
    finishedAt: (/* @__PURE__ */ new Date()).toISOString(),
    items: e,
    reportPath: r
  };
});
p.whenReady().then(async () => {
  await A(), p.on("activate", async () => {
    b.getAllWindows().length === 0 && await A();
  });
});
p.on("window-all-closed", () => {
  process.platform !== "darwin" && p.quit();
});
