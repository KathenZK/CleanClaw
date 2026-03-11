import { zh } from "./zh";

export const en: typeof zh = {
  site: {
    brand: "CleanClaw",
    metadataDescription: "CleanClaw helps users remove OpenClaw and its leftovers.",
  },
  nav: {
    home: "Home",
    download: "Download",
    faq: "FAQ",
    legal: "Legal",
  },
  language: {
    zh: "中文",
    en: "EN",
  },
  home: {
    metadata: {
      title: "CleanClaw | Remove OpenClaw cleanly, without leftovers",
      description:
        "Scan and remove OpenClaw installation files, configuration, caches, logs, background services, startup items, and Windows registry leftovers.",
    },
    versionBadgeSuffix: "Built for people who want OpenClaw gone for good.",
    eyebrow: "CleanClaw.icu",
    title: "Remove OpenClaw cleanly, without leftovers.",
    lead: "Scan and remove OpenClaw installation files, configuration, caches, logs, background services, startup items, and Windows registry leftovers.",
    body: "The hard part of uninstalling software is not clicking remove. It is knowing what still remains on disk. CleanClaw finds those leftovers, shows them clearly, and lets you remove them with confidence.",
    primaryCta: "Download for macOS",
    secondaryCta: "More download options",
    detectableTitle: "What it can find",
    detectableFooter:
      "From app files to background services, every match is shown before cleanup. macOS is available now, and Windows is coming soon.",
    processEyebrow: "How it works",
    processTitle: "Clean it up in one click.",
    process: [
      "Scan your device for OpenClaw app files, leftover directories, caches, logs, services, and registry entries.",
      "Show every match by category so it is immediately clear what will be removed.",
      "Clean only after confirmation, then keep a simple report you can review afterward.",
    ],
    principlesEyebrow: "Why it feels safer",
    principlesTitle: "Every step stays clear.",
    principles: [
      {
        label: "Review first",
        title: "See every matched item before cleanup",
        description: "Programs, directories, services, and registry leftovers are listed first, then removed only after confirmation.",
      },
      {
        label: "Confirm once",
        title: "A simple flow with fewer mistakes",
        description: "The flow stays simple. No dense settings screen, no important risk hidden behind advanced options.",
      },
      {
        label: "Review later",
        title: "Keep a clear result after cleanup",
        description: "Successful and failed items stay in the result so you can review what changed afterward.",
      },
    ],
    cleanupTargets: [
      "OpenClaw application bundle",
      "User `.openclaw` directory and profile variants",
      "Cache, log, and configuration directories",
      "macOS LaunchAgents and background services",
      "Windows scheduled tasks and startup entries",
      "Windows registry entries related to OpenClaw",
    ],
  },
  download: {
    metadata: {
      title: "Download CleanClaw",
      description: "Get the latest CleanClaw installer. macOS is available now and Windows is coming soon.",
    },
    eyebrow: "Download",
    title: "Download CleanClaw",
    lead: "Choose the installer for your device, launch the app, scan for OpenClaw leftovers, and clean them after confirmation.",
    versionLabel: "Current version",
    publishedLabel: "Published",
    cards: [
      {
        platform: "macOS",
        architecture: "Apple Silicon",
        description: "A `.dmg` installer built for Apple Silicon Macs.",
        cta: "Download for macOS",
        available: true,
      },
      {
        platform: "Windows",
        architecture: "Coming soon",
        description: "The Windows installer is being packaged and verified.",
        cta: "Windows coming soon",
        available: false,
      },
    ],
    releaseTitle: "Versions and release notes",
    releaseBody: "If you want release notes, older versions, or manual access to all installers, visit the GitHub release page.",
    releaseCta: "Open GitHub release",
  },
  faq: {
    metadata: {
      title: "CleanClaw FAQ",
      description: "Read common questions about CleanClaw, including supported systems, cleanup scope, confirmation, and reports.",
    },
    title: "Frequently asked questions",
    items: [
      {
        question: "Does it scan before deleting?",
        answer: "Yes. CleanClaw shows all matched OpenClaw items first and only starts cleaning after you confirm.",
      },
      {
        question: "What does it remove?",
        answer: "It covers application files, the `.openclaw` directory, configuration, cache, logs, startup items, background services, and related Windows registry entries.",
      },
      {
        question: "Which systems are supported?",
        answer: "The current release includes a macOS installer. Windows support is being prepared for release.",
      },
      {
        question: "Will it generate a cleanup report?",
        answer: "Yes. The desktop app keeps a result list so you can review what was removed and what may still need manual attention.",
      },
    ],
  },
  legal: {
    metadata: {
      title: "CleanClaw privacy and disclaimer",
      description: "Read the CleanClaw privacy notice, disclaimer, and confirmation guidance before cleanup.",
    },
    eyebrow: "Legal",
    title: "Privacy and disclaimer",
    paragraphs: [
      "CleanClaw is a third-party cleanup tool designed to help users scan for and remove OpenClaw-related installation files and leftovers from their own devices.",
      "Nothing is deleted until matched items are shown and confirmed. Please review the results carefully before cleanup and understand the impact of removing related files, services, or registry entries.",
      "The current release does not require login and does not collect account data. If telemetry or error reporting is added later, the website will be updated with a matching privacy notice.",
    ],
  },
};
