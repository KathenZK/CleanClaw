import fs from "node:fs/promises";
import { createRequire } from "node:module";
import path from "node:path";
import { fileURLToPath } from "node:url";
import type { Event, MenuItemConstructorOptions, RenderProcessGoneDetails } from "electron";
import { cleanTargets, formatReport, scanOpenClaw } from "./openclaw";
import type { AppPlatform, CleanupTarget } from "../shared/cleanup";
import { normalizeLang, type Lang } from "../shared/i18n";
import { getMessages } from "../shared/messages";

declare const MAIN_WINDOW_VITE_DEV_SERVER_URL: string | undefined;

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const nodeRequire = createRequire(import.meta.url);
const { app, BrowserWindow, ipcMain, Menu, shell } = nodeRequire("electron") as typeof import("electron");

let mainWindow: InstanceType<typeof BrowserWindow> | null = null;

function getDebugLogPath() {
  try {
    return path.join(app.getPath("desktop"), "CleanClaw-debug.log");
  } catch {
    return path.join(process.cwd(), "CleanClaw-debug.log");
  }
}

async function appendDebugLog(message: string, extra?: unknown) {
  const payload =
    extra === undefined
      ? `${new Date().toISOString()} ${message}\n`
      : `${new Date().toISOString()} ${message} ${JSON.stringify(extra)}\n`;

  try {
    await fs.appendFile(getDebugLogPath(), payload, "utf8");
  } catch {
    // Ignore debug log failures.
  }
}

process.on("uncaughtException", (error) => {
  void appendDebugLog("process:uncaughtException", error instanceof Error ? error.stack ?? error.message : String(error));
});

process.on("unhandledRejection", (reason) => {
  void appendDebugLog("process:unhandledRejection", reason instanceof Error ? reason.stack ?? reason.message : String(reason));
});

function getPlatform(): AppPlatform {
  if (process.platform === "darwin" || process.platform === "win32" || process.platform === "linux") {
    return process.platform;
  }

  return "unknown";
}

function getDevServerUrl() {
  return typeof MAIN_WINDOW_VITE_DEV_SERVER_URL === "undefined"
    ? undefined
    : MAIN_WINDOW_VITE_DEV_SERVER_URL;
}

function getSystemLang(): Lang {
  const preferred =
    typeof app.getPreferredSystemLanguages === "function"
      ? app.getPreferredSystemLanguages()[0]
      : app.getLocale();
  return normalizeLang(preferred);
}

function setApplicationMenu(lang: Lang) {
  const menu = getMessages(lang).menu;
  const template: MenuItemConstructorOptions[] = [
    {
      label: menu.appName,
      submenu: [
        { label: menu.about, role: "about" },
        { type: "separator" },
        { label: menu.services, role: "services" },
        { type: "separator" },
        { label: menu.hide, role: "hide" },
        { label: menu.hideOthers, role: "hideOthers" },
        { label: menu.showAll, role: "unhide" },
        { type: "separator" },
        { label: menu.quit, role: "quit" },
      ],
    },
    {
      label: menu.file,
      submenu: [{ label: menu.close, role: "close" }],
    },
    {
      label: menu.edit,
      submenu: [
        { label: menu.undo, role: "undo" },
        { label: menu.redo, role: "redo" },
        { type: "separator" },
        { label: menu.cut, role: "cut" },
        { label: menu.copy, role: "copy" },
        { label: menu.paste, role: "paste" },
        { label: menu.selectAll, role: "selectAll" },
      ],
    },
    {
      label: menu.view,
      submenu: [
        { label: menu.reload, role: "reload" },
        { label: menu.forceReload, role: "forceReload" },
        { label: menu.toggleDevTools, role: "toggleDevTools" },
        { type: "separator" },
        { label: menu.resetZoom, role: "resetZoom" },
        { label: menu.zoomIn, role: "zoomIn" },
        { label: menu.zoomOut, role: "zoomOut" },
        { type: "separator" },
        { label: menu.toggleFullscreen, role: "togglefullscreen" },
      ],
    },
    {
      label: menu.window,
      submenu: [
        { label: menu.minimize, role: "minimize" },
        { label: menu.close, role: "close" },
        { type: "separator" },
        { label: menu.front, role: "front" },
      ],
    },
    {
      label: menu.help,
      submenu: [
        {
          label: menu.learnMore,
          click: async () => {
            await shell.openExternal("https://cleanclaw.icu");
          },
        },
      ],
    },
  ];

  Menu.setApplicationMenu(Menu.buildFromTemplate(template));
}

async function createWindow() {
  await appendDebugLog("create-window:start");
  try {
    await appendDebugLog("create-window:before-browser-window");

    mainWindow = new BrowserWindow({
      width: 1080,
      height: 760,
      minWidth: 960,
      minHeight: 680,
      title: "",
      backgroundColor: "#f3f6fb",
      webPreferences: {
        preload: path.join(__dirname, "preload.js"),
        contextIsolation: true,
        nodeIntegration: false,
      },
    });

    await appendDebugLog("create-window:after-browser-window");

    mainWindow.on("page-title-updated", (event) => {
      event.preventDefault();
    });

    mainWindow.webContents.on("did-finish-load", async () => {
      mainWindow?.setTitle("");
      await appendDebugLog("did-finish-load");

      try {
        const state = await mainWindow?.webContents.executeJavaScript(
          `JSON.stringify({
            href: window.location.href,
            title: document.title,
            readyState: document.readyState,
            preloadReady: typeof window.__cleanClawPreloadReady !== "undefined",
            hasBridge: typeof window.cleanClaw !== "undefined",
            rootHtml: document.getElementById("root")?.innerHTML ?? "",
            bodyText: document.body?.innerText ?? ""
          })`,
        );

        await appendDebugLog("renderer-state", state);

        const parsed = JSON.parse(String(state)) as {
          hasBridge: boolean;
          rootHtml: string;
        };

        if (!parsed.rootHtml) {
          await mainWindow?.webContents.executeJavaScript(`
            document.body.innerHTML = '<div style="font-family:-apple-system,BlinkMacSystemFont,Segoe UI,sans-serif;padding:32px;background:#f3f6fb;color:#0f172a;"><h1 style="margin:0 0 12px;font-size:28px;">CleanClaw failed to render</h1><p style="margin:0 0 8px;">The desktop window loaded, but the renderer UI did not mount.</p><p style="margin:0;">A debug log was written to: ${getDebugLogPath().replace(/\\/g, "\\\\")}</p></div>';
          `);
          await appendDebugLog("renderer-empty-root");
        }
      } catch (error) {
        await appendDebugLog("renderer-state-error", error instanceof Error ? error.message : String(error));
      }
    });

    mainWindow.webContents.on("dom-ready", async () => {
      await appendDebugLog("dom-ready");
    });

    mainWindow.webContents.on(
      "did-fail-load",
      async (_event: Event, errorCode: number, errorDescription: string, validatedURL: string) => {
        await appendDebugLog("did-fail-load", {
          errorCode,
          errorDescription,
          validatedURL,
        });
      },
    );

    mainWindow.webContents.on("console-message", async (_event: Event, level: number, message: string) => {
      await appendDebugLog("renderer-console", { level, message });
    });

    mainWindow.webContents.on("render-process-gone", async (_event: Event, details: RenderProcessGoneDetails) => {
      await appendDebugLog("render-process-gone", details);
    });

    const devServerUrl = getDevServerUrl();
    const targetUrl = devServerUrl ?? path.join(__dirname, "../dist/index.html");
    await appendDebugLog("create-window:load-target", { targetUrl });

    if (devServerUrl) {
      await mainWindow.loadURL(devServerUrl);
    } else {
      await mainWindow.loadFile(path.join(__dirname, "../dist/index.html"));
    }
    await appendDebugLog("create-window:load-resolved");
  } catch (error) {
    await appendDebugLog("create-window:create-error", error instanceof Error ? error.stack ?? error.message : String(error));
    throw error;
  }
}

ipcMain.handle("cleanclaw:get-platform", async () => getPlatform());

ipcMain.handle("cleanclaw:scan", async (_event, lang: Lang) => scanOpenClaw(lang));

ipcMain.handle("cleanclaw:clean", async (_event, items: CleanupTarget[], lang: Lang) => {
  const results = await cleanTargets(items, lang);
  const reportPath = path.join(
    app.getPath("desktop"),
    `CleanClaw-Report-${new Date().toISOString().replace(/[:.]/g, "-")}.txt`,
  );

  await fs.writeFile(reportPath, formatReport(results, lang), "utf8");

  return {
    finishedAt: new Date().toISOString(),
    items: results,
    reportPath,
  };
});

app.whenReady().then(async () => {
  const lang = getSystemLang();
  app.setName(getMessages(lang).menu.appName);
  setApplicationMenu(lang);
  await createWindow();

  app.on("activate", async () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      await createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
