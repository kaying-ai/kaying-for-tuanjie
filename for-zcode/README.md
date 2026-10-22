# kaying-for-tuanjie — ZCode package

Tuanjie Engine (团结引擎) game-development skills for ZCode.

## Contents

```text
for-zcode/
├── .claude-plugin/
│   └── marketplace.json            # marketplace listing (marketplace root = for-zcode/)
├── plugins/
│   └── tuanjie/                    # the plugin (source "./plugins/tuanjie")
│       ├── .zcode-plugin/plugin.json
│       └── skills/                 # 27 skills — generated, see "Build" below
└── README.md
```

ZCode looks for the marketplace manifest at `.claude-plugin/marketplace.json` (or a
root-level `marketplace.json`) and for the plugin manifest at
`.zcode-plugin/plugin.json`. Plugin component paths must stay inside the plugin root —
`..` is rejected — so `plugins/tuanjie/skills/` is a generated copy of the repository's
top-level `skills/`, the single source of truth shared by all six platform builds.

**Do not edit the copy by hand**; run `npm run build:plugins` after changing a skill,
and `npm run check:plugins` in CI to catch drift.

## Install

In the ZCode client: **Plugin Marketplace (Discover tab) → `+` Add Marketplace**, paste
the `for-zcode` directory path, then find **kaying-for-tuanjie** in the market and click
**Install**.

## Verify

Open **Settings → Plugin Management** and confirm `tuanjie` shows as enabled on the
Installed tab. In a session, type `/` or check **Settings → Skills**: the
`tuanjie:`-prefixed skills (e.g. `tuanjie:tuanjie-cli`,
`tuanjie:tilemap-palette-create`) should be listed. The plugin is enabled by default
and triggers automatically on Tuanjie-related requests.
