# kaying-for-tuanjie — KayingCode package

Tuanjie Engine (团结引擎) game-development skills for KayingCode.

## Contents

```text
for-kayingcode/
├── .claude-plugin/
│   └── marketplace.json            # marketplace listing (marketplace root = for-kayingcode/)
├── plugins/
│   └── tuanjie/                    # the plugin (source "./plugins/tuanjie")
│       ├── .kayingcode-plugin/plugin.json
│       └── skills/                 # 27 skills — generated, see "Build" below
└── README.md
```

KayingCode looks for the marketplace manifest at `.claude-plugin/marketplace.json` (or a
root-level `marketplace.json`) and for the plugin manifest at
`.kayingcode-plugin/plugin.json`. Plugin component paths must stay inside the plugin
root — `..` is rejected — so `plugins/tuanjie/skills/` is a generated copy of the
repository's top-level `skills/`, the single source of truth shared by all six platform
builds. The manifests are the ZCode ones with KayingCode-facing copy; the plugin ID is
identical (`tuanjie@kaying-for-tuanjie-marketplace`).

**Do not edit the copy by hand**; run `npm run build:plugins` after changing a skill,
and `npm run check:plugins` in CI to catch drift.

## Install

Same as ZCode, but add the `for-kayingcode` directory as the marketplace, then find
**kaying-for-tuanjie** and click **Install**.

## Verify

Same as ZCode: **Settings → Plugin Management** shows `tuanjie` enabled; the
`tuanjie:`-prefixed skills appear under `/` and **Settings → Skills**, and trigger
automatically on Tuanjie-related requests.
