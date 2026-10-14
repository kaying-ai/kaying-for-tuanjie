# kaying-for-tuanjie — WorkBuddy package

Tuanjie Engine (团结引擎) game-development skills for [WorkBuddy](https://www.workbuddy.cn).

WorkBuddy's plugin system is CodeBuddy-compatible, so this package also works in **CodeBuddy
Code**. It follows the `.codebuddy-plugin/` layout and ships 27 **skills**, two **slash
commands** and an always-on **rule**.

WorkBuddy is two different install targets, and they want different shapes:

| Target | What to ship | Built to |
| --- | --- | --- |
| **Plugin manager** (插件 → 添加插件市场) | the `for-workbuddy/` directory itself | — (no archive needed) |
| **Open platform** (开放平台 → 发布管理 → 技能) | **one zip holding one skill** | `dist/tuanjie.zip` |

## Contents

```text
for-workbuddy/
├── .codebuddy-plugin/
│   └── marketplace.json                     # marketplace listing (owner + plugin entry)
├── open-platform/
│   └── skills.zh.json                       # Chinese descriptions (source of truth)
├── plugins/
│   └── tuanjie/                             # the plugin (plugin-manager target)
│       ├── .codebuddy-plugin/plugin.json    # manifest (name, version, author, components)
│       ├── skills/                          # 27 skills — generated, see "Build" below
│       │   └── <skill-name>/SKILL.md
│       ├── commands/skills.md               # /tuanjie:skills
│       ├── commands/doctor.md               # /tuanjie:doctor
│       ├── rules/tuanjie.md                 # always-on Tuanjie deltas + skill routing
│       └── README.md                        # plugin-level docs
├── umbrella/
│   └── tuanjie/                             # the open-platform skill — generated
│       ├── SKILL.md                         # the entry point: routes to an atomic skill
│       ├── references/                      # 85 files
│       ├── templates/                       # 44 files
│       └── scripts/                         # 14 files
├── LICENSE.md
└── README.md
```

Everything except `plugins/tuanjie/skills/` and `umbrella/` is hand-maintained. Those two trees
are generated from the repository's top-level `skills/`, so all six platform builds (Claude
Code, Codex, Pi, ZCode, KayingCode, WorkBuddy) share one source of truth. **Do not edit
anything under `plugins/tuanjie/skills/` or `umbrella/` by hand.**

## Build

From the repository root:

```bash
npm run build:workbuddy
```

That script:

1. copies `skills/` into `plugins/tuanjie/skills/`,
2. syncs the version from `package.json` into `marketplace.json` and `plugin.json`,
3. copies `LICENSE.md` in,
4. rebuilds `umbrella/tuanjie/` — the flattened single-skill package (see below), and
5. writes `dist/tuanjie.zip`, the one archive to upload.

Other modes:

```bash
npm run build:workbuddy -- --check        # verify everything is in sync; write nothing
npm run build:workbuddy -- --no-zip       # sync the sources only, write no archive
npm run build:workbuddy -- --marketplace  # also write dist/kaying-for-tuanjie-workbuddy-<version>.zip
npm run build:workbuddy -- --out DIR      # write archives somewhere other than dist/
```

`--check` is the one to wire into CI — it fails with a non-zero exit code when the committed
package or umbrella has drifted from `skills/`, when a skill has no Chinese description, when a
skill is missing from the routing table, or when a path would exceed the two-level limit.

The archive is written by a dependency-free ZIP writer in the script, so the build works on
macOS, Linux and Windows without `zip`, `python` or any npm package. It is byte-reproducible:
set `SOURCE_DATE_EPOCH` to pin the entry timestamps.

## Upload to the open platform

```bash
npm run build:workbuddy
# → dist/tuanjie.zip
```

`tuanjie.zip` unpacks to exactly one skill, two levels deep:

```text
tuanjie.zip
└── tuanjie/
    ├── SKILL.md
    ├── references/     85 files
    ├── templates/      44 files
    └── scripts/        14 files
```

Then: register and onboard as a developer → complete qualification → **发布管理 → 技能** →
upload the zip → fill in the market category and service category → submit for review.
Requirements change; check [open.workbuddy.cn/docs/skill](https://open.workbuddy.cn/docs/skill)
before uploading.

### Why one umbrella skill, not 27 skills

The 技能 upload parses the archive as a **single skill** and requires `SKILL.md` at one fixed
path — `{skill-name}/SKILL.md`, with `references/`, `scripts/` and `templates/` as the only
recognised second-level directories. It does not recurse, and it rejects anything deeper than
two levels. Every other arrangement was tried and refused:

| Archive shape | Depth | Result |
| --- | --- | --- |
| `plugins/tuanjie/skills/<name>/SKILL.md` | 4 | `未找到 SKILL.md` |
| 27 × `<name>/SKILL.md` at the archive root | 1 | `未找到 SKILL.md` |
| one `<name>/SKILL.md` per zip, 27 zips | 1 | parses, but means 27 uploads |
| `tuanjie/SKILL.md` + flattened buckets | 2 | **accepted** |

So the 27 skills are published as one **umbrella skill**. `SKILL.md` is the entry point — it
does not write code, it classifies the request and loads the matching atomic skill — and every
atomic skill's instructions and attachments live beside it:

```text
tuanjie/references/INDEX.md                     the catalogue
tuanjie/references/ROUTING.md                   request -> skill decision table
tuanjie/references/<skill>.md                   the atomic skill's instructions
tuanjie/references/<skill>--<file>              its reference documents
tuanjie/templates/<skill>--<file>               its C# / HLSL / shader templates
tuanjie/scripts/<skill>--<file>                 its helper scripts
```

`<skill>--` is a namespace prefix, not decoration: without it the 27 skills' `api.md`,
`best-practices.md` and friends would collide in a single flat directory. Every path string
inside the copied text is rewritten to match, so the umbrella resolves end to end — the build
verifies all 387 internal references resolve.

Two packaging details worth knowing:

- **`resources/` is split.** Seven skills ship a `resources/` folder, which is not one of the
  three recognised second-level directories. Its `.md` files move to `references/`, its
  `.cs` / `.hlsl` / `.sh` files move to `templates/`, and links are rewritten to whichever
  bucket actually received the file. The umbrella carries no `resources/` directory.
- **Frontmatter is stripped.** Each `references/<skill>.md` drops the original YAML block and
  gets a provenance header instead. That is why the umbrella does not inherit the four source
  skills (`physics-3d-collision`, `tilemap-ruletile-createfromsegment`, `ui`, `ui-imgui`) whose
  unquoted `description:` scalar contains `": "` and is therefore not valid YAML. The build
  prints a note about those; the plugin-manager copy under `plugins/tuanjie/skills/` still
  carries them verbatim, so a strict YAML reader will reject that frontmatter there.

## Install (plugin manager)

**As a local marketplace (recommended).** In the desktop app open **插件 → + → 添加插件市场**
and point it at this directory; then install **tuanjie** from the *个人* section. From the CLI:

```bash
codebuddy plugin marketplace add ./for-workbuddy
codebuddy plugin install tuanjie kaying-for-tuanjie-marketplace
```

**Load the plugin directly** (no install, good for a try-out):

```bash
codebuddy --plugin-dir ./for-workbuddy/plugins/tuanjie
```

## Use

```
/tuanjie:doctor
/tuanjie:skills add IAP for WeChat Mini Game
```

Or plain language: *"Set up a tilemap level with rule tiles in my Tuanjie 2D game."* The
always-on rule routes the request to the right skill. See
[plugins/tuanjie/README.md](plugins/tuanjie/README.md) for the full skill list.

## Licence

Content derives from Unity's official plugin and is distributed under the
[Unity Companion License](LICENSE.md).
