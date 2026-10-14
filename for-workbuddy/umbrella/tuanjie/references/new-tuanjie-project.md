# new-tuanjie-project — 新建团结引擎项目

> 源：团结引擎技能包 `kaying-for-tuanjie@0.1.0` 的 `skills/new-tuanjie-project/SKILL.md`。
> 本技能的随附文件已平铺到本技能包的 `references/`、`templates/`、`scripts/` 下，文件名统一带 `<skill-name>--` 前缀（本技能为 `new-tuanjie-project--`）。随附：无。
> 适用与触发：从零开始一个全新的团结引擎游戏或项目：引导式流程会先收集创意、目标平台与变现方式，确认团结编辑器已安装，然后创建项目、初始化版本控制并安装依赖包。触发词：新建游戏、创建项目、从零做游戏、项目脚手架、做原型、Game Jam、空项目、项目初始化。不生成玩法代码。

---
> 本技能由团结引擎官方插件移植并适配为 WorkBuddy 总入口技能包，正文与随附资料保持原样，仅对清单字段与子目录命名做了适配。

---

# New Tuanjie Project (团结引擎)

A guided flow from an idea to a running, version-controlled Tuanjie Engine project. This skill
owns the **flow** — the questions, their ordering, and the handoffs. It deliberately does **not**
re-document commands; it delegates the mechanics to other skills.

**Delegates to (read these for the actual commands — don't reinvent them):**
- **`tuanjie-cli`** — detecting the Tuanjie install, editor binary location, headless runs,
  version mapping (Tuanjie 1.x ≈ Unity 2022 LTS, 2.x ≈ Unity 6 baseline), logs.
- **`tuanjie-package-management`** — installing packages via the C# PackageManager Client API
  against the Tuanjie registry, and choosing packages by genre / platform / monetization.
- **`implement-in-app-purchases`** — IAP integration (invoked at the end when chosen).

**Work one step at a time.** Ask only the current step's questions and wait for the user before
moving on — platform and monetization answers change what you install, so don't gather everything
up front or scaffold before they're settled.

## The flow

1. **Concept** — what they're building.
2. **Platforms & monetization** — then confirm the Tuanjie editor install while you keep talking
   (unlike Unity's CLI-driven install, Tuanjie editors come from **Tuanjie Hub**; the user may
   need to download one — use that waiting time to keep asking).
3. **Project + source control** — create from a matching template; init git.
4. **Packages** — install via the C# Client API.
5. **Save & first commit.**
6. **Hand off** monetization integration.

## Step 1 — Concept

Use `AskUserQuestion` so the user can pick fast, but let them answer freely too. Cover:

- **Genre / core loop** — platformer, top-down shooter, puzzle, idle, RPG, racing, card, tower
  defense, sim, hyper-casual, first-person, etc.
- **Dimension & look** — 2D or 3D; art style (pixel, low-poly, stylized, realistic, UI-only).
- **Gameplay** — the one-sentence "what the player does moment to moment."
- **Scope** — single-screen prototype vs. multi-scene game; single-player or multiplayer.

Also settle on a **project name**. Write a 2–4 line **project brief**, read it back to confirm.
The brief drives template choice (Step 3) and packages (Step 4).

## Step 2 — Platforms & monetization, then confirm the editor

Two decisions, because both change what you install:

- **Target platforms** (multi-select): Desktop (Win/macOS/Linux), Mobile (iOS/Android), WeChat
  Mini Game (微信小游戏), WebGL, OpenHarmony. On Tuanjie, WeChat Mini Game and OpenHarmony are
  first-class targets — prefer them over plain WebGL when the user means 国内小游戏渠道.
- **Monetization**: none / premium / in-app purchases / ads / mix. IAP works via
  `com.unity.purchasing` (see `implement-in-app-purchases`); for ads and backend services, flag
  up front that Unity's global ad-mediation and UGS backends are shut down for mainland China —
  the user needs a domestic provider, which is outside this plugin's current skills.

Then confirm which **Tuanjie editor** to use (default: the newest installed; a new 2.x line
editor for Unity 6-level features, 1.x for Unity 2022 LTS parity). Check what is installed —
there is no CLI installer; editors come from **Tuanjie Hub**:

```bash
cat "<project-or-templates>/ProjectSettings/ProjectVersion.txt"   # if any project exists
```

If no editor is installed yet, ask the user to install the right line via Tuanjie Hub now
(pick the platform modules matching Step 2's targets — Android/iOS/OpenHarmony support is a
module choice in the Hub), and continue the conversation while they do. Locate the editor
binary per the `tuanjie-cli` skill once it's ready.

## Step 3 — Create the project + source control

- Create the project from the Tuanjie Hub with a template matching the brief (2D/3D, render
  pipeline — prefer **URP** unless the user wants built-in). Let the Hub do the creation, or
  create headlessly with the editor binary once the path is known (see `tuanjie-cli`).
- Set up source control — **ask the user which they want**, don't assume: GitHub / GitLab, or a
  purely local `git init` with a Unity-style `.gitignore` (`Library/`, `Temp/`, `obj/`,
  `Build/`, `Logs/`). Do not commit `Library/`.

## Step 4 — Packages

Map the brief to a concrete package list and install it via the **`tuanjie-package-management`**
skill (C# PackageManager Client API — **never** hand-edit `manifest.json`). Read that skill for
the genre/platform/monetization → package mapping, the installer script, the `-quit` gotcha, and
the Tuanjie registry caveats (`packages.unity.cn`; some international packages are unavailable).
Read the final list back to the user before installing; verify `manifest.json` afterward.

## Step 5 — Save & first commit

Open the project once in the Tuanjie editor (or run the headless import script from
`tuanjie-package-management`) so the editor imports the assets and generates every `.meta`
file, then make the first commit:

```bash
cd "<project-path>"
git add -A
git status                    # Library/ Temp/ obj/ Build/ must NOT be staged
git commit -m "Initial Tuanjie project: <Name>"
```

Every `.cs`/asset must be committed together with its `.meta`.

## Step 6 — Hand off

- IAP → **implement-in-app-purchases** (plus China channel notes: WeChat/Douyin mini-game
  payments, domestic Android stores).
- Ads / backend services → no bundled skill for mainland alternatives; discuss the user's
  provider choice directly.

Report the project path, editor version, installed packages, and next steps.

## Scope — what this skill does NOT do

- **No gameplay scaffolding.** It gets you to a running, empty-but-wired project; building the
  actual game (scenes, controllers, art) is the next conversation — iterate there with the
  editor. Generic genre skeletons tend to produce throwaway mocked primitives, so this skill
  intentionally stops at a clean starting point.
- **No command reference.** Syntax lives in `tuanjie-cli` / `tuanjie-package-management`.

## Checklist

- [ ] Concept brief captured and confirmed (genre, look, gameplay, scope, name)
- [ ] Platforms + monetization recorded; Tuanjie editor line chosen
- [ ] Editor installed via Tuanjie Hub with the right platform modules; binary located
- [ ] Project created from a matching template; git initialized with a Unity-style `.gitignore`
- [ ] Packages installed via the C# Client API; `manifest.json` verified against the Tuanjie registry
- [ ] Project opened/saved so `.meta` files exist; first commit made; `Library/` excluded
- [ ] Handed off monetization/backend guidance if applicable

## Common mistakes

- **Assuming the `unity` CLI exists** — it does not in Tuanjie; use the editor binary directly
  (see `tuanjie-cli`).
- **Gathering all questions up front** — platform/monetization answers change the modules and packages.
- **Hand-editing `manifest.json`** instead of using the Client API (see `tuanjie-package-management`).
- **Committing `Library/`/`Temp/`/`obj/`/`Build/`**, or scripts without their `.meta` files.
- **Recommending Unity global services (UGS/Relay/Lobby/Vivox) for a mainland project** — they
  are shut down there; raise domestic alternatives instead.
