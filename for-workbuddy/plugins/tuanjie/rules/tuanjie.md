---
alwaysApply: true
---

## Tuanjie Engine (团结引擎)

Tuanjie Engine (团结引擎) is Unity's China edition — a fork of Unity maintained by Unity China.
It keeps Unity's editor architecture, project layout and C# APIs, so Unity knowledge transfers,
but three things differ. Get these right without being asked:

- **No `unity` CLI.** There is no CLI editor installer, and no install/license/release/project
  commands. Automation goes through the **editor binary** (`Tuanjie.exe` on Windows, inside
  `Tuanjie.app/Contents/MacOS/` on macOS) with Unity's standard editor arguments
  (`-batchmode`, `-quit`, `-projectPath`, `-executeMethod`, `-logFile`, `-buildTarget`).
  Editors are installed through **Tuanjie Hub**. See the `tuanjie-cli` skill.
- **Registry is `packages.unity.cn`,** not `packages.unity.com`. Not every international
  package is mirrored there, so projects migrated from stock Unity often fail to resolve.
- **Unity's global cloud services are unavailable in mainland China** — Relay, Lobby,
  Matchmaker, Vivox, Friends and related UGS offerings are shut down or restricted. Do not
  recommend them for a mainland-targeted Tuanjie project; discuss self-hosted or domestic
  alternatives with the user instead.

### Route Tuanjie work to the bundled skills

When a request touches a Tuanjie (or Unity) project, use the matching skill rather than
answering from general Unity knowledge — the skills carry the Tuanjie-specific deltas:

| Request | Skill |
| --- | --- |
| Headless runs, imports, builds, editor logs, locating the editor | `tuanjie-cli` |
| Add / remove / upgrade / discover UPM packages; registry errors | `tuanjie-package-management` |
| Start a new game or project from scratch | `new-tuanjie-project` |
| Find assets or scene objects in the editor | `generate-editor-search-query` |
| Any game UI (menus, HUDs, screens, panels) | `ui` (routes to `ui-ugui` / `ui-uitk` / `ui-imgui`) |
| 2D, Tilemap, RuleTile, sprites, atlases | `2d-pixel-perfect`, `tilemap-*`, `sprite-*`, `manage-sprite-atlas` |
| Render pipeline migration, post-processing, Shader Graph | `migrate-birp-to-urp`, `urp-postprocessing`, `shader-graph-create-custom-node` |
| Pathfinding, collision, physics symptoms | `initialize-ai-navigation`, `physics-3d-collision` |
| Audio, TextMeshPro, WebGL/WebGPU size and load time | `optimize-audio`, `optimize-text-mesh-pro`, `optimize-web` |
| Monetization and languages, including China channels | `implement-in-app-purchases`, `localization` |

### Conventions

- **Read the version from the project, never assume it:**
  `ProjectSettings/ProjectVersion.txt`. Tuanjie 1.x ≈ Unity 2022 LTS; Tuanjie 2.x ≈ Unity 6
  capability baseline. The file is the source of truth.
- **Never hand-edit `Packages/manifest.json`.** It routinely breaks dependency resolution.
  Drive the C# `UnityEditor.PackageManager.Client` API through `tuanjie-package-management`
  instead.
- **Verify install paths rather than guessing** — the Hub lets users install editors anywhere.
- **Do not invent command names** for Tuanjie AI tooling (the built-in 团结 AI agent, Codely,
  community MCP servers). These are public betas whose naming changes; check what the user has
  installed and prefer batch `-executeMethod` automation as the dependable baseline.
- **Use plain Git** with a Unity-style `.gitignore` (`Library/`, `Temp/`, `obj/`, `Build/`,
  `Logs/`). Tuanjie does not integrate Unity Version Control.
- Distinguish Tuanjie from stock Unity when it matters (version string, editor install path) —
  and when still unsure, ask which engine the user uses rather than guessing.
