---
description: List the Tuanjie skills this plugin ships, or route a request to the right one
argument-hint: "[optional: what you want to do, e.g. 'set up a tilemap level']"
---

# /tuanjie:skills — Tuanjie skill index

The plugin bundles 27 Tuanjie Engine (团结引擎) skills under `skills/`. This command either
lists them or picks the one that fits what the user asked for.

## No argument — list the skills

Read the `name` and `description` frontmatter from every `skills/*/SKILL.md` in this plugin and
present them as a table, grouped by area:

| Area | Skills |
| --- | --- |
| Tooling | `tuanjie-cli`, `tuanjie-package-management`, `new-tuanjie-project`, `generate-editor-search-query` |
| UI | `ui`, `ui-ugui`, `ui-uitk`, `ui-imgui` |
| 2D / Tilemap | `2d-pixel-perfect`, `tilemap-palette-create`, `tilemap-ruletile-createempty`, `tilemap-ruletile-createfromsegment`, `sprite-editor`, `sprite-segment-3x3grid`, `manage-sprite-atlas` |
| Rendering | `migrate-birp-to-urp`, `urp-postprocessing`, `validate-urp-render-graph-renderer-feature`, `shader-graph-create-custom-node` |
| Gameplay | `initialize-ai-navigation`, `physics-3d-collision`, `audio-setup-mixers` |
| Optimization | `optimize-audio`, `optimize-text-mesh-pro`, `optimize-web` |
| Ship / China market | `implement-in-app-purchases`, `localization` |

Then point at the three entry points: `/tuanjie:doctor` to check the project, plain language to
trigger a skill, and `README.md` for the full description of each skill.

## With an argument — route the request

1. Match `$ARGUMENTS` against the skill descriptions in `skills/*/SKILL.md`.
2. If one skill clearly wins, say which one and follow it — read its `SKILL.md` in full and
   execute its workflow.
3. If two or three are plausible, name them with one line each and ask which the user wants;
   never run a skill on a guess.
4. If nothing matches, say so and suggest the closest tooling skill rather than improvising.

For anything about a brand-new project, prefer `new-tuanjie-project` — it owns the setup flow
and delegates the mechanics to `tuanjie-cli` and `tuanjie-package-management`.
