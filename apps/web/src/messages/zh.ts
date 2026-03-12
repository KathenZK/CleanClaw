export const zh = {
  site: {
    brand: "CleanClaw",
    metadataDescription: "CleanClaw 帮助用户彻底清理 OpenClaw 及其残留。",
  },
  nav: {
    home: "首页",
    download: "下载",
    faq: "常见问题",
    legal: "免责声明",
  },
  language: {
    zh: "中文",
    en: "EN",
  },
  home: {
    metadata: {
      title: "CleanClaw | 彻底清理 OpenClaw，不留残留",
      description: "扫描并删除 OpenClaw 的安装产物、配置、缓存、日志、后台服务、自启动项与 Windows 注册表残留。",
    },
    versionBadgeSuffix: "把 OpenClaw 及其残留从电脑里清干净。",
    eyebrow: "CleanClaw.icu",
    title: "彻底清理 OpenClaw，不留残留。",
    lead: "扫描并删除 OpenClaw 的安装产物、配置、缓存、日志、后台服务、自启动项与 Windows 注册表残留。",
    body: "卸载软件最麻烦的地方，从来不是点一下删除，而是确认系统里还剩下什么。CleanClaw 把这些残留找出来、列清楚，再交给你决定是否移除。",
    primaryCta: "立即下载",
    secondaryCta: "更多下载方式",
    detectableTitle: "可识别内容",
    detectableFooter: "从主程序到后台服务，命中项都会先展示出来。当前已提供 macOS Intel、macOS Apple Silicon、Windows x64 与 Windows arm64 下载。",
    processEyebrow: "使用方式",
    processTitle: "一键完成清理。",
    process: [
      "扫描设备中与 OpenClaw 相关的主程序、目录残留、缓存、日志、服务与注册表项。",
      "按类别展示命中结果，让你一眼看清哪些内容会被移除。",
      "确认后开始清理，并在完成后生成一份可复查的结果列表。",
    ],
    principlesEyebrow: "为什么更放心",
    principlesTitle: "每一步都清清楚楚。",
    principles: [
      {
        label: "先查看",
        title: "清理前先把命中项列给你看",
        description: "程序、目录、服务和注册表残留都会先展示出来，确认之后才会开始清理。",
      },
      {
        label: "再确认",
        title: "一步确认，减少误删风险",
        description: "流程足够直接，不需要研究复杂设置，也不会把关键风险藏在深层选项里。",
      },
      {
        label: "可复查",
        title: "清理完成后留下结果记录",
        description: "成功项和失败项都会保留在结果里，方便复查，也方便继续手动处理少数异常项。",
      },
    ],
    cleanupTargets: [
      "OpenClaw 应用本体",
      "用户目录下的 `.openclaw` 与 profile 变体",
      "缓存、日志与配置目录",
      "macOS LaunchAgents 与后台服务",
      "Windows Scheduled Task 与自启动项",
      "Windows 相关注册表项",
    ],
  },
  download: {
    metadata: {
      title: "下载 CleanClaw",
      description: "获取 CleanClaw 最新安装包。当前提供 macOS Intel、macOS Apple Silicon、Windows x64 与 Windows arm64 版本。",
    },
    eyebrow: "下载",
    title: "下载 CleanClaw",
    lead: "选择适合你设备的安装包，打开后即可开始扫描 OpenClaw 残留，并在确认后完成清理。",
    versionLabel: "当前版本",
    publishedLabel: "发布时间",
    cards: [
      {
        platform: "macOS",
        architecture: "Apple Silicon",
        description: "适用于 Apple Silicon Mac 的 `.dmg` 安装包。",
        cta: "下载 Apple\nSilicon 版",
        available: true,
      },
      {
        platform: "macOS",
        architecture: "Intel",
        description: "适用于 Intel Mac 的 `.dmg` 安装包。",
        cta: "下载 Intel\n版",
        available: true,
      },
      {
        platform: "Windows",
        architecture: "x64",
        description: "适用于 64 位 Windows 设备的 `.exe` 安装包。",
        cta: "下载 Windows\nx64 版",
        available: true,
      },
      {
        platform: "Windows",
        architecture: "arm64",
        description: "适用于 ARM64 Windows 设备的 `.zip` 安装包。",
        cta: "下载 Windows\narm64 版",
        available: true,
      },
    ],
    releaseTitle: "版本与发布说明",
    releaseBody: "如果你想查看历史版本、发布说明，或手动下载所有安装包，可以前往 GitHub Release 页面。",
    releaseCta: "查看 GitHub Release",
  },
  faq: {
    metadata: {
      title: "CleanClaw 常见问题",
      description: "查看 CleanClaw 的常见问题，包括支持系统、清理范围、确认方式和结果报告。",
    },
    title: "常见问题",
    items: [
      {
        question: "使用流程是怎样的？",
        answer:
          "1. 打开桌面端并点击“开始扫描”。\n2. 查看按类别整理好的命中项列表。\n3. 在确认弹框中再次确认后开始清理。\n4. 清理结束后查看结果报告，确认哪些项目已移除。",
      },
      {
        question: "它会先扫描再删除吗？",
        answer: "会。CleanClaw 会先展示命中的 OpenClaw 项，只有在你确认之后才会开始清理。",
      },
      {
        question: "会清理哪些内容？",
        answer: "包括应用本体、`.openclaw` 目录、配置、缓存、日志、自启动项、后台服务，以及 Windows 注册表相关项。",
      },
      {
        question: "支持哪些系统？",
        answer: "当前版本提供 macOS Intel、macOS Apple Silicon、Windows x64 与 Windows arm64 安装包。",
      },
      {
        question: "会生成清理结果吗？",
        answer: "会。桌面端会生成一份结果列表，方便你核对哪些项目已经移除，哪些项目还需要手动处理。",
      },
    ],
  },
  legal: {
    metadata: {
      title: "CleanClaw 隐私与免责声明",
      description: "查看 CleanClaw 的隐私说明、免责声明，以及清理前的确认提示。",
    },
    eyebrow: "法律信息",
    title: "隐私与免责声明",
    paragraphs: [
      "CleanClaw 是一个第三方清理工具，用于帮助用户扫描并删除本机中与 OpenClaw 相关的安装产物与残留项。",
      "本工具不会在未展示命中项且未获得确认前执行删除操作。请在清理前核对结果，并理解删除相关文件、服务或注册表项可能带来的影响。",
      "当前版本不要求登录，也不采集账号信息。若后续引入统计或错误上报，官网会同步更新相应的隐私说明。",
    ],
  },
  footer: {
    copyright: "© 2026 CleanClaw. All rights reserved.",
    note: "CleanClaw 是独立开发的第三方清理工具。",
  },
};
