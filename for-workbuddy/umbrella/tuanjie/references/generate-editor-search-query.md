# generate-editor-search-query — Unity Search 查询生成

> 源：团结引擎技能包 `kaying-for-tuanjie@0.1.0` 的 `skills/generate-editor-search-query/SKILL.md`。
> 本技能的随附文件已平铺到本技能包的 `references/`、`templates/`、`scripts/` 下，文件名统一带 `<skill-name>--` 前缀（本技能为 `generate-editor-search-query--`）。随附：2 参考。
> 适用与触发：为只读的编辑器资源与场景对象查找生成 Unity Search（Quick Search）查询语句并打开搜索窗口。触发词：查找资源、搜索资源、定位、筛选、列出材质/贴图/预制体/场景/脚本/着色器/游戏对象/组件/灯光/相机/UI 对象/资产类型。不适用于项目结构综述、代码问题、网页搜索与文件系统搜索。

---
> 本技能由团结引擎官方插件移植并适配为 WorkBuddy 总入口技能包，正文与随附资料保持原样，仅对清单字段与子目录命名做了适配。

---

> **Tuanjie Engine note (团结引擎)**: adapted from Unity's official agent plugin; applies to Tuanjie Engine (Unity's China edition). Version mapping — Tuanjie 2.x ≈ Unity 6 capabilities, Tuanjie 1.x ≈ Unity 2022 LTS; read `ProjectSettings/ProjectVersion.txt` rather than assuming. Unity's standalone `unity` CLI does not exist in Tuanjie — for command-line automation use the `tuanjie-cli` skill's editor-binary workflow.

Translate natural-language Unity Editor search requests into useful Unity Search queries, explain them briefly, and open the Unity Search window with the query when appropriate.

## Default Behavior

If the prompt explicitly says Unity Search, Quick Search, Search window, open Search, or asks for a Unity Search query, handle the search request with this skill even when the target belongs to another domain such as lighting, UI, physics, audio, or animation.

For requests such as "find", "search", "locate", "list", "filter", "look up", "where is", "which assets use", or "what references" concrete Unity assets or scene objects:

1. Determine whether the request is primarily about project assets, scene objects, or both.
2. Build one concise Unity Search query.
3. Show the query in the response before or while opening Search.
4. Open Unity Search by running the Editor-side snippet unless the user explicitly asks for query text only.
5. If opening Search fails, return the query and tell the user to paste it into Unity Search manually.

Do not open Search when the user says "do not open Search", "query only", "what query should I use", "just give me the query", or similar.

If the user asks for a general explanation, project overview, folder-structure summary, architecture walkthrough, gameplay-system summary, or "how do I" programming answer, do not use this skill unless the prompt explicitly asks for Unity Search, a Search query, or opening the Search window.

If the user refers to "this", "selected", or "current" without an attached asset, scene object, visible name, or path, ask for the name/path instead of inventing one.

## Scope

Scope read-only Unity Search / Quick Search queries to:

- project assets such as materials, textures, prefabs, scenes, scripts, shaders, audio clips, sprites, meshes, models, animations, fonts, render textures, and ScriptableObject assets
- scene objects and components such as Cameras, Lights, Rigidbodies, Colliders, Renderers, Canvas objects, UI components, ParticleSystems, AudioSources, Animators, Terrain objects, and named GameObjects
- path, label, type, filename, keyword, and reference-oriented asset searches
- selected or named assets when the name/path is available from the conversation or attachment

Do not install packages, run menu commands, edit assets, modify scenes, search external documentation, search repository text, inspect build logs, delete results, fix search results, or perform dependency graph analysis. If the user asks to act on results, first open Search or provide the query, then ask for confirmation before any separate modifying skill or workflow.

## References

Before generating non-trivial queries, read [references/generate-editor-search-query--query-patterns.md](references/generate-editor-search-query--query-patterns.md).

Before opening the Search window, read [references/generate-editor-search-query--open-search-window.md](references/generate-editor-search-query--open-search-window.md).

Official English references:

- [Unity Search](https://docs.unity3d.com/Manual/search-overview.html)
- [Search expressions](https://docs.unity3d.com/Manual/search-expressions.html)
- [SearchService.ShowWindow](https://docs.unity3d.com/6000.0/Documentation/ScriptReference/Search.SearchService.ShowWindow.html)

## Passing C# to `eval`

`eval` compiles a **statement block, not a file**. Two consequences, both compile errors:

- **No `using` directives.** The compiler reads `using UnityEditor;` as a resource-disposal
  statement and rejects it (`CS0210`).
- **Types must be fully qualified.** A bare `SearchService` does not resolve (`CS0246`), and a
  bare `Object` is ambiguous with `object` (`CS0104`).

On Tuanjie there is no live-Editor `eval` channel: `com.unity.pipeline` is not part of Tuanjie's package offering, and Unity's `unity` CLI does not exist. **The `tuanjie-cli` skill owns getting you there** — locating the installed Tuanjie editor binary and running the project headless; follow it first and don't re-derive any of it here. Every C# step below that the Unity original ran via `unity command eval` runs on Tuanjie with the batch pattern below. If a step's purpose is to *open an editor window* for the user rather than compute a result, hand the user instructions to do it in their open editor instead.

## Query Generation Rules

Use the simplest query that is likely to produce the requested result.

- Prefer type filters for asset and component requests, such as `t:material`, `t:texture`, `t:prefab`, `t:scene`, `t:script`, `t:shader`, `t:Light`, or `t:Rigidbody`.
- Preserve user-provided names and keywords as plain query terms unless they need quoting.
- Use `dir:` when the user gives a folder or says "in Assets/..." or "under ...".
- Use `l:` when the user asks for a Unity asset label.
- Use `ref=` when the user asks what references, uses, depends on, contains, or is connected to an asset.
- Use Search expressions only when they clearly improve the query, such as `t:prefab ref={t:texture}` or `t:scene ref={t:prefab}`.
- For selected/current wording, use the known selected asset name or path only if it is present in the chat context; otherwise ask for it.
- For broad relationship requests such as "where is Rigidbody used", use a simple keyword or component query first, then mention that a scripted audit is separate if the user needs exhaustive code/property analysis.
- For requests that mix Search with repair work, generate and open the query first; do not modify results unless the user explicitly confirms a separate follow-up action.
- Do not invent unsupported filters for uncertain requests. If a request cannot be expressed reliably with Unity Search syntax, open the closest safe query and state the limitation.

## Opening Unity Search

Run C# in the Editor only to open the Search window. This is an Editor UI action and must not change project assets or scene contents.

When opening Search:

1. Escape the query safely in the generated C# string.
2. Prefer asset and scene providers for this v1 skill.
3. Fall back to active providers if a provider is unavailable.
4. Log the query that was opened.
5. Never claim Search opened if the command failed.

## Response Format

Keep the user-facing response short:

```text
Query: `t:material`
Opened Unity Search with that query.
```

If not opening Search:

```text
Query: `t:prefab ref={t:texture}`
Paste this into Unity Search.
```

If the request is ambiguous but still searchable, choose the most likely query and mention the assumption. Ask a question only when the search target cannot be inferred, such as "find the thing" with no asset, scene, type, name, or context.

## Validation Checklist

Before reporting success:

- the generated query is shown to the user
- the query targets assets, scene objects, or both
- Search was opened only when the user did not opt out
- any fallback or uncertainty is stated plainly
- no asset, scene, package, project setting, or search result was modified
