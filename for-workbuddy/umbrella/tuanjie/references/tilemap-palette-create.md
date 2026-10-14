# tilemap-palette-create — Tile 调色板创建

> 源：团结引擎技能包 `kaying-for-tuanjie@0.1.0` 的 `skills/tilemap-palette-create/SKILL.md`。
> 本技能的随附文件已平铺到本技能包的 `references/`、`templates/`、`scripts/` 下，文件名统一带 `<skill-name>--` 前缀（本技能为 `tilemap-palette-create--`）。随附：1 脚本。
> 适用与触发：创建 Tile Palette（瓦片调色板）资源，供 2D 关卡搭建整理瓦片使用，可指定矩形、六边形、等距等网格布局。触发词：创建瓦片调色板、Tile Palette、2D 关卡设计、整理瓦片。

---
> **WorkBuddy 运行前置**：原始技能清单声明的 UPM 前置包为 `com.unity.2d.tilemap: ">=1.0.0"`。WorkBuddy 不做强制校验，执行前请自行确认工程 `Packages/manifest.json` 已包含上述包，缺失时先安装（可参考 `tuanjie-package-management` 技能）。

> 本技能由团结引擎官方插件移植并适配为 WorkBuddy 总入口技能包，正文与随附资料保持原样，仅对清单字段与子目录命名做了适配。

---

> **Tuanjie Engine note (团结引擎)**: adapted from Unity's official agent plugin; applies to Tuanjie Engine (Unity's China edition). Version mapping — Tuanjie 2.x ≈ Unity 6 capabilities, Tuanjie 1.x ≈ Unity 2022 LTS; read `ProjectSettings/ProjectVersion.txt` rather than assuming.

# Tilemap Palette Creation

## Workflow

### Step 1: Parameter Gathering
WAIT for the user to specify the following parameters if not already provided:
- **Palette Name**: The name of the asset.
- **Grid Type**: Rectangular, Hexagonal, or Isometric.
- **Cell Size**: Optional (defaults based on Grid Type).
- **Sort Axis**: Required for Isometric palettes.

### Step 2: Asset Creation
Utilise `UnityEditor.Tilemaps.GridPaletteUtility.CreateNewPalette` to create the Tile Palette asset.

## Branching Logic (Grid Types)

### Path A: Rectangular
- Use **Automatic** cell sizing. Use cell size: `(1, 1, 0)` as a default.

### Path B: Hexagonal
- Use cell size: `(0.8659766, 1, 1)`.

### Path C: Isometric
- Use cell size: `(1, 0.5, 1)`.
- Use a **Custom Sort Axis** with value `(0, 0, 1)`.

### Path D: Isometric Z As Y
- Use cell size: `(1, 0.5, 1)`.
- Use a **Custom Sort Axis** with value `(0, 0, 1)`.

## Post-Creation
Ensure that there is a `GridPalette` as a sub-asset of the Tile Palette asset.

## References

Code Template: "scripts/tilemap-palette-create--CreatePaletteTemplate.cs"