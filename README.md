# kaying-for-tuanjie (Tuanjie Engine skills)

[English](README.md) | [简体中文](README.zh-CN.md)

Game-development skills for coding agents targeting **Tuanjie Engine (团结引擎, Unity's China
edition)**. Ported from Unity's official agent plugin
([Unity-Technologies/unity-agent-plugin](https://github.com/Unity-Technologies/unity-agent-plugin))
and adapted for Tuanjie: editor-binary automation, the `packages.unity.cn` registry, WeChat Mini
Game awareness, and China-market guidance. 27 skills covering UI, 2D/Tilemap, AI navigation, 3D
physics, URP, audio, IAP and localization.

Available for **WorkBuddy**, **KayingCode**, **ZCode**, **Claude Code**, **Codex**, and **Pi**.

## Install

**WorkBuddy** — open **插件 → + → 添加插件市场**, point it at the `for-workbuddy` directory,
then install **tuanjie** from the *个人* section. From the CLI:

```bash
codebuddy plugin marketplace add ./for-workbuddy
codebuddy plugin install tuanjie kaying-for-tuanjie-marketplace
```

For the open platform (开放平台 → 发布管理 → 技能), upload the archive built by:

```bash
npm run build:workbuddy     # → dist/tuanjie.zip
```

**KayingCode / ZCode** — in the client open **Plugin Marketplace (Discover) → `+` Add
Marketplace** and paste the `for-kayingcode` (or `for-zcode`) directory path, then install
**kaying-for-tuanjie**.

**Claude Code** — in a session:

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
# or:  pi install npm:kaying-for-tuanjie
# or:  pi install git:github.com/kaying-studio/kaying-for-tuanjie
```

## Usage

Skills trigger automatically on relevant requests in a Tuanjie project. Examples:

- "Migrate a Unity 2022 project to Tuanjie Engine and fix package resolution" →
  `tuanjie-package-management`
- "Add IAP for WeChat Mini Game and the Apple App Store" → `implement-in-app-purchases`
- "Import assets headlessly and generate .meta files" → `tuanjie-cli`

## License

Content derives from Unity's official plugin and is distributed under the
[Unity Companion License](LICENSE.md).
