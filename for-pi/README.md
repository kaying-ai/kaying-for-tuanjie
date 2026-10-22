# kaying-for-tuanjie — Pi package

Tuanjie Engine (团结引擎) game-development skills for [Pi](https://pi.dev).

Pi installs the **repository root** as its package (`package.json` with the `pi` key,
`pi.skills` → `skills/`, `pi.extensions` → `extensions/tuanjie.ts`). This directory
holds the Pi-side manifest, with all paths resolved relative to the repository root:

```text
for-pi/
├── .pi-plugin/
│   └── plugin.json                 # Pi-side manifest (mirrors the other platforms)
└── README.md
```

The manifest is read by `extensions/tuanjie.ts`; the 27 skills are loaded straight
from the repository's top-level `skills/` — no copy, no build step.

## Install

```bash
pi install /absolute/path/to/kaying-for-tuanjie
# or:  pi install ./kaying-for-tuanjie           (relative to your project)
# or:  pi install npm:kaying-for-tuanjie
# or:  pi install git:github.com/kaying-studio/kaying-for-tuanjie
```

`install` writes to user settings (`~/.pi/agent/settings.json`); pass `-l` to write to
project settings (`.pi/settings.json`) so the whole team shares it. To try it for a
single run without installing:

```bash
pi -e ./kaying-for-tuanjie
```

## Verify

Run `pi list` to see the package, then inside a session type `/tuanjie skills` to
enumerate the bundled skills. `/tuanjie doctor` reports whether the current directory
is a Tuanjie project and the engine version from
`ProjectSettings/ProjectVersion.txt`.
