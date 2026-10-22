# kaying-for-tuanjie — Claude Code package

Tuanjie Engine (团结引擎) game-development skills for
[Claude Code](https://code.claude.com/docs/en/plugins).

## Contents

```text
for-claude/
├── .claude-plugin/
│   └── marketplace.json            # marketplace listing (marketplace root = for-claude/)
├── plugins/
│   └── tuanjie/                    # the plugin (source "./plugins/tuanjie")
│       ├── .claude-plugin/plugin.json
│       └── skills/                 # 27 skills — generated, see "Build" below
└── README.md
```

`plugins/tuanjie/skills/` is generated from the repository's top-level `skills/` — the
single source of truth shared by all six platform builds. **Do not edit it by hand**;
run `npm run build:plugins` after changing a skill, and `npm run check:plugins` in CI
to catch drift.

## Install

In a Claude Code session:

```
/plugin marketplace add ./for-claude
/plugin install tuanjie@kaying-for-tuanjie
```

From a terminal (takes effect next session, or after `/reload-plugins`):

```bash
claude plugin marketplace add ./for-claude
claude plugin install tuanjie@kaying-for-tuanjie
```

To try it for one session without installing:

```bash
claude --plugin-dir ./for-claude/plugins/tuanjie
```

## Verify

Type `/tuanjie:` — the skills appear in the command list. `/plugin` shows `tuanjie`
as installed and enabled.
