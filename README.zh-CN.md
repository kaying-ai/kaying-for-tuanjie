# kaying-for-tuanjie（团结引擎开发技能）

[English](README.md) | [简体中文](README.zh-CN.md)

面向**团结引擎（Tuanjie Engine，Unity 中国版）**的编码代理技能包。基于 Unity 官方
agent 插件（[Unity-Technologies/unity-agent-plugin](https://github.com/Unity-Technologies/unity-agent-plugin)）
移植，并针对团结引擎完成工具链改造：Tuanjie 编辑器二进制自动化、`packages.unity.cn`
包注册表、微信小游戏与国内渠道指引。内含 27 个技能，覆盖 UI、2D/Tilemap、AI 导航、
3D 物理、URP、音频、内购与本地化。

支持 **WorkBuddy**、**KayingCode**、**ZCode**、**Claude Code**、**Codex** 与 **Pi**。

## 安装

**WorkBuddy** — 打开 **插件 → + → 添加插件市场**，选择 `for-workbuddy` 目录，然后在
*个人* 分区安装 **tuanjie**。命令行方式：

```bash
codebuddy plugin marketplace add ./for-workbuddy
codebuddy plugin install tuanjie kaying-for-tuanjie-marketplace
```

开放平台（**开放平台 → 发布管理 → 技能**）上传下面命令产出的压缩包：

```bash
npm run build:workbuddy     # → dist/tuanjie.zip
```

**KayingCode / ZCode** — 在客户端打开 **插件市场（Discover 页）→ `+` 添加市场**，粘贴
`for-kayingcode`（或 `for-zcode`）目录路径，然后安装 **kaying-for-tuanjie**。

**Claude Code** — 在会话内输入：

```
/plugin marketplace add ./for-claude
/plugin install tuanjie@kaying-for-tuanjie
```

**Codex**

```bash
codex plugin marketplace add ./for-codex
codex plugin add tuanjie@kaying-for-tuanjie-marketplace
```

**Pi**

```bash
pi install ./kaying-for-tuanjie
# 或：  pi install npm:kaying-for-tuanjie
# 或：  pi install git:github.com/kaying-studio/kaying-for-tuanjie
```

## 使用方法

在团结引擎项目中提出相关请求时技能会自动触发。例如：

- 「把一个 Unity 2022 项目迁移到团结引擎，处理包管理器报错」→ `tuanjie-package-management`
- 「帮我接入内购，渠道是微信小游戏和苹果商店」→ `implement-in-app-purchases`
- 「用批处理模式导入资源并生成 .meta 文件」→ `tuanjie-cli`

## 许可

内容源自 Unity 官方插件，遵循 [Unity Companion License](LICENSE.md)。
