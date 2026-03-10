import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import type { Event, RenderProcessGoneDetails } from "electron";
import { cleanTargets, formatReport, scanOpenClaw } from "./openclaw";
import type { AppPlatform, CleanupTarget } from "../shared/cleanup";

declare const MAIN_WINDOW_VITE_DEV_SERVER_URL: string | undefined;

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const { app, BrowserWindow, ipcMain } = require("electron") as typeof import("electron");

let mainWindow: InstanceType<typeof BrowserWindow> | null = null;

function getPlatform(): AppPlatform {
  if (process.platform === "darwin" || process.platform === "win32" || process.platform === "linux") {
    return process.platform;
  }

  return "unknown";
}

async function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1080,
    height: 760,
    minWidth: 960,
    minHeight: 680,
    title: "CleanClaw",
    backgroundColor: "#f3f6fb",
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    await mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
  } else {
    await mainWindow.loadFile(path.join(__dirname, "../dist/index.html"));
  }

  mainWindow.webContents.on("did-finish-load", () => {
    console.log("[CleanClaw] did-finish-load");
  });

  mainWindow.webContents.on(
    "did-fail-load",
    (_event: Event, errorCode: number, errorDescription: string, validatedURL: string) => {
      console.error("[CleanClaw] did-fail-load", {
        errorCode,
        errorDescription,
        validatedURL,
      });
    },
  );

  mainWindow.webContents.on("console-message", (_event: Event, level: number, message: string) => {
    console.log("[CleanClaw] renderer-console", { level, message });
  });

  mainWindow.webContents.on("render-process-gone", (_event: Event, details: RenderProcessGoneDetails) => {
    console.error("[CleanClaw] render-process-gone", details);
  });
}

ipcMain.handle("cleanclaw:get-platform", async () => getPlatform());

ipcMain.handle("cleanclaw:scan", async () => scanOpenClaw());

ipcMain.handle("cleanclaw:clean", async (_event, items: CleanupTarget[]) => {
  const results = await cleanTargets(items);
  const reportPath = path.join(
    app.getPath("desktop"),
    `CleanClaw-Report-${new Date().toISOString().replace(/[:.]/g, "-")}.txt`,
  );

  await fs.writeFile(reportPath, formatReport(results), "utf8");

  return {
    finishedAt: new Date().toISOString(),
    items: results,
    reportPath,
  };
});

app.whenReady().then(async () => {
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
