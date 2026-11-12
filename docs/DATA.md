# 数据来源与口径说明

> 报数先亮口径——本文件统一交代所有数字从哪来、怎么算的。

## 实时数据（今日世界）

- **来源**：世界银行 API v2（api.worldbank.org），指标快照存于 `js/data/world_stats.json`
- **指标清单**（9 项）：出生率、人口、男女预期寿命、婴儿死亡率、Gini、人均 GDP (PPP)、城市化率、出生性别比
- **覆盖**：217 个国家与地区（含世行小实体：海峡群岛/荷属加勒比等）
- **出生权重**：`births = 人口 × 出生率 / 1000`，全球新生儿按占比抽样

## 历史数据（年代世界，1950-2025 出生可选）

- **来源**：世行 API `date=1960:2025` 全年代序列，5 指标：出生率、人口、男女 e0、婴儿死亡率
- **文件**：`js/data/world_history.js`（压缩格式：年份→数组索引，精度 0.1）
- **口径限制**：
  - 世行序列从 1960 起，1950-1959 用 1960 值近似（文案已注明）
  - Gini/GDP 历史稀疏，历史世界用最新值兜底
  - 缺失年份取最近可用年份（`histGet` helper 统一处理）

## 生命表

- **今日世界**：手工五国用校准表（`calibrate_lifetables.mjs`），生成国用 `lifegen.js` 按 e0/IMR 即时生成
- **生成器精度**：480 张表实测平均误差 0.052 岁（`verify_lifegen.mjs`）
- **年代世界**：按出生年 e0/IMR 即时生成历史表（惰性缓存）
- **写实验证**：印度 1960 生平均死 50.7 岁（4% 活不过 5 岁）vs 2020 生 73.1 岁（0%）

## 事件库

- **总量**：1535 条（id 全局唯一，smoke 校验）
- **构成**：通用人生线 + 中国 176 / 美国 94 / 印度 64 / 印尼巴 87 国别线 + 22 文化圈 430 条 + 里程碑 104 条
- **触发**：每年 0-2 条（weighted [3,4,3]），choice 年份不独占（v0.7.0 修复）
- **来源标注**：关键数据条目带 source 字段（世行/UNESCO/WMO 等）

## 校验脚本

| 脚本 | 用途 |
|---|---|
| `smoke_events.mjs` | id 去重 + 结构校验 + 多国模拟 |
| `smoke_birth.mjs` | 出生抽签分布验证 |
| `verify_lifegen.mjs` | 生命表生成器精度验证 |
| `calibrate_lifetables.mjs` | 手工国生命表校准 |
| `fetch_worldbank.mjs` | 实时数据抓取 |
| `fetch_historical.mjs` | 历史序列抓取 |
| `compress_history.mjs` | 历史数据压缩（键→数组） |

## 开源美术资源候选（2026-11-12 调研）

> 用于 ART_PLAN.md 的素材策略。待逐个验收风格匹配度（非写实红线）。

- [Kenney Assets](https://kenney.nl/assets) —— CC0 游戏素材（像素 UI/角色），公认最干净的许可
- [OpenGameArt](https://opengameart.org) —— 混合许可，需逐个核对
- [PixelFrog / Pixel Adventure](https://pixelfrog-assets.itch.io/) —— itch.io 免费像素包
- [Twemoji / Noto Emoji](https://github.com/twitter/twemoji) —— CC-BY 4.0，扁平 emoji 风格可与像素头像混用
- [Game-icons.net](https://game-icons.net) —— CC-BY 3.0，4000+ 单色图标（事件卡图标可复用）
