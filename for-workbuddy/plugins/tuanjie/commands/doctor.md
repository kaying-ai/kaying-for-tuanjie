---
description: Check that the current project is a Tuanjie Engine project and report its engine version, package registry and editor install
argument-hint: "[optional project path; defaults to the current directory]"
---

# /tuanjie:doctor — Tuanjie project check

Inspect the project at `$ARGUMENTS` (or the current working directory when no argument is given)
and report what the Tuanjie skills need to know. Report findings only — do not modify the project.

## 1. Is this a Tuanjie / Unity project?

A project has both `Assets/` and `ProjectSettings/`. Check them:

```bash
PROJECT="${ARGUMENTS:-$PWD}"
test -d "$PROJECT/Assets" && test -d "$PROJECT/ProjectSettings" \
  && echo "project: yes" || echo "project: no"
```

If it is not a project, say so and stop.

## 2. Which engine version?

The version file is the source of truth — never assume:

```bash
cat "$PROJECT/ProjectSettings/ProjectVersion.txt"
```

Read `m_EditorVersion` and map it against this table:

| Tuanjie line | Unity baseline | Notes |
| --- | --- | --- |
| Tuanjie 1.x | Unity 2022 LTS | First generation; WeChat Mini Game, OpenHarmony, automotive |
| Tuanjie 2.x | Unity 6 capability baseline | Unity 6 is no longer distributed in mainland China |

China builds carry a `cN` suffix on the 1.x line (e.g. `2022.3.xxfNcN`). Report the raw version
string **and** the mapped line, and flag it when the version looks like stock Unity rather than
Tuanjie — then ask the user which engine they use instead of guessing.

## 3. Which package registry?

Tuanjie resolves packages from Unity China's registry, not Unity's global one:

```bash
cat "$PROJECT/Packages/manifest.json" 2>/dev/null
```

- Expect `packages.unity.cn` / `packages-v2.unity.cn` in the scoped registries or
  `registry` field.
- If the manifest still points at `packages.unity.com`, this is a migrated Unity project: warn
  that some packages will fail to resolve and hand off to the `tuanjie-package-management`
  skill to fix it. Do **not** hand-edit `Packages/manifest.json` — that skill drives the C#
  `UnityEditor.PackageManager.Client` API instead, which resolves dependencies correctly.

## 4. Where is the editor?

Tuanjie ships no `unity` CLI, so there is no registry command to query. Check, in order, and
**verify rather than assume** — the Hub lets users install anywhere:

1. `C:\Program Files\Tuanjie\Hub Editor\<version>` (Windows).
2. `/Applications/Tuanjie/...` (macOS) — look inside `Tuanjie.app/Contents/MacOS/`.
3. Ask the user for the install path or the editor they normally launch.

The executable is `Editor/Tuanjie.exe` on Windows. If the name differs on the installed
version, list the folder to find it.

## 5. Report

```markdown
## Tuanjie doctor
- **Project** — path, and yes/no
- **Engine** — `m_EditorVersion` value, mapped Tuanjie line, Tuanjie vs stock Unity
- **Registry** — packages.unity.cn / packages.unity.com / not found
- **Editor** — resolved `Tuanjie.exe` path, or "not found — ask the user"
- **Next step** — the skill to run for whatever is wrong, or "ready"
```

If the project is healthy, say so in one line and stop — do not pad the report.
