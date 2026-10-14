# tuanjie — WorkBuddy plugin

Tuanjie Engine (团结引擎) game-development skills for [WorkBuddy](https://www.workbuddy.cn).
Port of Unity's official agent plugin, adapted for Tuanjie: editor-binary automation, the
`packages.unity.cn` registry, WeChat Mini Game awareness and China-market guidance.

This plugin ships a **skill collection (27 skills)**, two **slash commands** and an always-on
**rule**. It has no MCP server and needs no API key.

| Component | Path | What it adds |
| --- | --- | --- |
| Skills | `skills/*/SKILL.md` | 27 Tuanjie skills — see the table below |
| Command | `commands/skills.md` | `/tuanjie:skills [what you want to do]` |
| Command | `commands/doctor.md` | `/tuanjie:doctor [project path]` |
| Rule | `rules/tuanjie.md` | Always-on: Tuanjie deltas and skill routing |

## Install

WorkBuddy's plugin system is CodeBuddy-compatible, so this package also loads in **CodeBuddy
Code**.

**Option 1 — as a local marketplace (recommended).** Adds the plugin to the plugin manager so
you can install, enable and update it:

```bash
codebuddy plugin marketplace add ./for-workbuddy
codebuddy plugin install tuanjie kaying-for-tuanjie-marketplace
```

In the desktop app: **插件 → + → 添加插件市场**, point it at the `for-workbuddy` directory,
then install **tuanjie** from the *个人* section.

**Option 2 — load the plugin directly (no install).** Good for a quick try:

```bash
codebuddy --plugin-dir ./for-workbuddy/plugins/tuanjie
```

**Option 3 — from the packaged zip.** See the [package README](../README.md) for the
`npm run build:workbuddy` command that produces the uploadable zip.

## Use

```
/tuanjie:doctor
/tuanjie:skills set up a tilemap level with rule tiles
```

Or just ask in plain language — the always-on rule routes the request to the right skill:

- "Migrate a Unity 2022 project to Tuanjie Engine and fix package resolution" →
  `tuanjie-package-management`
- "Add IAP for WeChat Mini Game and the Apple App Store" → `implement-in-app-purchases`
- "Import assets headlessly and generate .meta files" → `tuanjie-cli`
- "My magenta materials after switching to URP" → `migrate-birp-to-urp`

## The 27 skills

| Area | Skills |
| --- | --- |
| Tooling | `tuanjie-cli`, `tuanjie-package-management`, `new-tuanjie-project`, `generate-editor-search-query` |
| UI | `ui`, `ui-ugui`, `ui-uitk`, `ui-imgui` |
| 2D / Tilemap | `2d-pixel-perfect`, `tilemap-palette-create`, `tilemap-ruletile-createempty`, `tilemap-ruletile-createfromsegment`, `sprite-editor`, `sprite-segment-3x3grid`, `manage-sprite-atlas` |
| Rendering | `migrate-birp-to-urp`, `urp-postprocessing`, `validate-urp-render-graph-renderer-feature`, `shader-graph-create-custom-node` |
| Gameplay | `initialize-ai-navigation`, `physics-3d-collision`, `audio-setup-mixers` |
| Optimization | `optimize-audio`, `optimize-text-mesh-pro`, `optimize-web` |
| Ship / China market | `implement-in-app-purchases`, `localization` |

## Behaviour

Two conventions the skills, the commands and the always-on rule all follow:

1. **Read the engine version from the project, never assume it** —
   `ProjectSettings/ProjectVersion.txt` is the source of truth. Tuanjie 1.x ≈ Unity 2022 LTS;
   Tuanjie 2.x ≈ Unity 6 capability baseline.
2. **Never hand-edit `Packages/manifest.json`.** It breaks dependency resolution; the
   `tuanjie-package-management` skill drives the C# `UnityEditor.PackageManager.Client` API
   instead.

Two Tuanjie constraints worth knowing before you start:

- **There is no `unity` CLI.** Automation goes through the editor binary
  (`Editor/Tuanjie.exe`), and editors are installed through **Tuanjie Hub**.
- **Unity's global cloud services are unavailable in mainland China** — Relay, Lobby,
  Matchmaker, Vivox and Friends are shut down or restricted. The four Unity-cloud skills
  (build-live-game, setup-multiplayer-services, setup-vivox-voice-chat,
  levelplay-unity-integration) are therefore **not** included in this port.

## Notes

- The skills are plain Agent Skills (`SKILL.md` folders) and are identical to the ones the
  Claude Code, Codex, Pi, ZCode and KayingCode builds of this plugin ship — one source of
  truth under the repository's `skills/`. `npm run build:workbuddy` copies them in; do not edit
  the copies under `skills/` here by hand.
- `npm run build:workbuddy` also rebuilds `for-workbuddy/umbrella/tuanjie/` and zips it to
  `dist/tuanjie.zip`, for the WorkBuddy open platform's 技能 upload. That entry takes **one
  skill per archive, at most two directory levels deep** (`{skill-name}/SKILL.md`) and does not
  recurse, so all 27 skills ship as one umbrella skill: `SKILL.md` routes a request to the
  matching atomic skill, and each atomic skill's instructions and attachments are flattened
  into `references/`, `templates/` and `scripts/` under a `<skill>--` filename prefix. See the
  [package README](../../README.md) for the layout and the upload steps.
- Version anchors inside a few skills (`optimize-text-mesh-pro`, `urp-postprocessing`) are
  still phrased as Unity baselines until Tuanjie 2.0's exact Unity base is confirmed.

## Licence

Content derives from Unity's official plugin and is distributed under the
[Unity Companion License](../../LICENSE.md).