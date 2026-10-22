# kaying-for-tuanjie — Codex package

Tuanjie Engine (团结引擎) game-development skills for Codex.

## Contents

```text
for-codex/
├── .agents/
│   └── plugins/
│       └── marketplace.json        # marketplace listing (marketplace root = for-codex/)
├── plugins/
│   └── tuanjie/                    # the plugin (source "./plugins/tuanjie")
│       ├── .codex-plugin/plugin.json
│       └── skills/                 # 27 skills — generated, see "Build" below
└── README.md
```

`plugins/tuanjie/skills/` is generated from the repository's top-level `skills/` — the
single source of truth shared by all six platform builds. **Do not edit it by hand**;
run `npm run build:plugins` after changing a skill, and `npm run check:plugins` in CI
to catch drift.

## Install

```bash
codex plugin marketplace add ./for-codex
codex plugin add tuanjie@kaying-for-tuanjie-marketplace
```

## Verify

Run `codex plugin list`:

```
PLUGIN                                    STATUS              VERSION
tuanjie@kaying-for-tuanjie-marketplace    installed, enabled  0.1.0
```
