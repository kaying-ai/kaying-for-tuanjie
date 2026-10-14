# 原子技能索引（27）

本总入口把上游的 27 个原子技能全部平铺在 `references/` 下（WorkBuddy 技能包只支持两级目录，所以不能保留 `skills/<name>/` 的插件层级）。每个技能的指令文件是 `references/<skill-name>.md`，其随附文件以 `<skill-name>--` 为前缀平铺在 `references/` / `templates/` / `scripts/` 里。

| 领域 | `skill-name` | 展示名称 | 用途 | 随附 | 指令文件 |
|---|---|---|---|---|---|
| 工程搭建 | `new-tuanjie-project` | 新建团结引擎项目 | 从想法到可运行工程的引导式建项流程 | — | `references/new-tuanjie-project.md` |
| 工程搭建 | `tuanjie-cli` | 团结引擎编辑器自动化 | 从终端驱动团结编辑器做无头导入、构建与测试 | — | `references/tuanjie-cli.md` |
| 工程搭建 | `tuanjie-package-management` | 团结引擎包管理（UPM） | 编辑器外程序化增删/升级/校验 UPM 包 | 1 参考 | `references/tuanjie-package-management.md` |
| UI | `ui` | 团结引擎 UI 总入口 | UI 总路由：探测工程所用 UI 系统后分发 | — | `references/ui.md` |
| UI | `ui-uitk` | 团结引擎 UI Toolkit（UXML/USS） | UI Toolkit / UXML / USS / PanelSettings | 7 参考 | `references/ui-uitk.md` |
| UI | `ui-ugui` | 团结引擎 uGUI（Canvas） | Canvas、RectTransform、Layout Group、预制体 UI | 1 参考 | `references/ui-ugui.md` |
| UI | `ui-imgui` | 团结引擎 IMGUI 编辑器 UI | 遗留 OnGUI / EditorWindow / Custom Inspector | 2 参考 | `references/ui-imgui.md` |
| 2D / 精灵 | `2d-pixel-perfect` | 团结引擎 2D 像素完美渲染 | 像素完美渲染的两套实现（URP 与 Built-in） | 5 参考 | `references/2d-pixel-perfect.md` |
| 2D / 精灵 | `sprite-editor` | 团结引擎精灵编辑 | 用 ISpriteEditorDataProvider 改精灵 rect/border/pivot/切图 | 3 参考, 9 脚本 | `references/sprite-editor.md` |
| 2D / 精灵 | `sprite-segment-3x3grid` | 精灵 3×3 网格分析 | 按颜色把精灵切成 3×3 网格并输出文本图案 | 1 脚本 | `references/sprite-segment-3x3grid.md` |
| 2D / 精灵 | `manage-sprite-atlas` | 团结引擎精灵图集 | 预构建管线管理 SpriteAtlas 与变体图集 | 6 参考, 38 模板 | `references/manage-sprite-atlas.md` |
| 瓦片地图 | `tilemap-palette-create` | Tile 调色板创建 | 创建 Tile Palette 资源 | 1 脚本 | `references/tilemap-palette-create.md` |
| 瓦片地图 | `tilemap-ruletile-createempty` | 空 RuleTile 创建 | 创建空白 RuleTile（无精灵输入） | 2 参考 | `references/tilemap-ruletile-createempty.md` |
| 瓦片地图 | `tilemap-ruletile-createfromsegment` | 从精灵生成 RuleTile | 由地形/边缘精灵生成自动拼接 RuleTile | 3 脚本 | `references/tilemap-ruletile-createfromsegment.md` |
| 渲染 | `migrate-birp-to-urp` | 内置管线迁 URP | BiRP 迁 URP 的规划、执行与排障 | 6 参考 | `references/migrate-birp-to-urp.md` |
| 渲染 | `urp-postprocessing` | URP 后处理 | Volume 框架下的 URP 后处理配置与调试 | 2 参考 | `references/urp-postprocessing.md` |
| 渲染 | `validate-urp-render-graph-renderer-feature` | Render Graph RendererFeature 审查 | 审查 Render Graph 版 ScriptableRendererFeature | — | `references/validate-urp-render-graph-renderer-feature.md` |
| 渲染 | `shader-graph-create-custom-node` | Shader Graph 自定义节点 | 把 HLSL 生成 Shader Graph 自定义节点 | 1 模板 | `references/shader-graph-create-custom-node.md` |
| 渲染 | `optimize-web` | WebGL/WebGPU 优化 | 包体、首屏与浏览器运行时优化 | 2 模板 | `references/optimize-web.md` |
| 音频 | `audio-setup-mixers` | 团结引擎音频混音器路由 | 盘点音频并路由进正确的 Audio Mixer Group | 1 参考 | `references/audio-setup-mixers.md` |
| 音频 | `optimize-audio` | 团结引擎音频优化 | 音频导入设置与混音器层面的内存/CPU 优化 | 2 参考 | `references/optimize-audio.md` |
| 文本 | `optimize-text-mesh-pro` | TextMeshPro 优化 | TMP 字体栈、动态图集、SDF 与文本渲染性能 | — | `references/optimize-text-mesh-pro.md` |
| 物理 | `physics-3d-collision` | 3D 物理碰撞排查 | 3D PhysX 碰撞与触发器不生效的诊断 | 1 参考, 1 模板 | `references/physics-3d-collision.md` |
| AI / 寻路 | `initialize-ai-navigation` | AI 导航（NavMesh） | NavMesh 表面、Agent、障碍物、Link 与区域代价 | 1 参考 | `references/initialize-ai-navigation.md` |
| 本地化 | `localization` | 团结引擎本地化 | Locale、String/Asset Table、CJK 字体与 Addressables | 1 参考, 2 模板 | `references/localization.md` |
| 变现 | `implement-in-app-purchases` | 团结引擎内购 IAP | IAP 全流程与原生/第三方计费迁移 | 13 参考 | `references/implement-in-app-purchases.md` |
| 编辑器工具 | `generate-editor-search-query` | Unity Search 查询生成 | 生成 Unity Search 查询做只读资产查找 | 2 参考 | `references/generate-editor-search-query.md` |

合计 27 个原子技能 · 56 份参考文档 · 44 个模板 · 14 个脚本。

上游技能的 `resources/` 目录已被拆开：其中的 `.md` 进 `references/`，`.cs`/`.hlsl`/`.sh` 进 `templates/`。

