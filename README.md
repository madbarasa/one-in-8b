<div align="center">

# 八十亿分之一 · One in 8B

> 你出生在哪个国家、是男是女、能活多久、会遇到什么——在你意识到之前，大部分已经被概率决定了。

**纯前端的「人生概率模拟器」**：每次开局，你被随机投生到 80 亿人中的某一个位置，然后带着这个出身走完一生。

[![在线体验](https://img.shields.io/badge/在线体验- GitHub%20Pages-1D4E5F?style=for-the-badge&logo=github)](https://madbarasa.github.io/one-in-8b/)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
![Version](https://img.shields.io/badge/version-v0.9.5-blue)
![Events](https://img.shields.io/badge/事件库-3079%20条-2EA043)
![Choices](https://img.shields.io/badge/文化圈专属抉择-1001%20条-E8B04B)
![Dependencies](https://img.shields.io/badge/依赖-0-8B5CF6)
![Vanilla JS](https://img.shields.io/badge/Vanilla%20JS-ESM-F7DF1E?logo=javascript&logoColor=black)

[探索文档](docs/ROADMAP.md) · [报告问题](https://github.com/madbarasa/one-in-8b/issues) · [提出建议](https://github.com/madbarasa/one-in-8b/issues)

### 在线体验：**https://madbarasa.github.io/one-in-8b/**

无需注册，直接开玩。

<img src="assets/art-reference/share-card-template.png" alt="人生海报" width="420">

</div>

## ✨ 特性

- 🌍 **217 国真实统计**：出生权重、分国分性别生命表（校准至世行预期寿命 ±0.3 岁内）、婴儿死亡率、死因构成、城市化率、人均 GDP（PPP）——全部来自世界银行 API 最新数据
- 🎭 **3079 条人生事件**：通用线 + 国别特色（中国 176 / 美国 94 / 印度 64 / 印尼巴 87）+ **22 文化圈 500+ 条本土事件**（西非命名礼、之角咖啡仪式、东非 M-PESA、阿拉伯斋月、波斯诺鲁孜、儒家补习、东南亚布施、西语亡灵节、巴西狂欢节、太平洋海平面……），全部手写文案 + 真实数据出处
- 🎯 **1001 条文化圈专属抉择**：24 种决策骨架铺满 22 个文化圈——只有这里的人会面对的人生关口（高考志愿表上的两行字 / 六个钱包和一套房 / Kota 复读的独木桥 / 朝觐与婚房 / 牛群聘礼 / 环礁海平面 / 贫民窟与茶田……），同骨架智能冷却保证一生不重样
- 🎲 **年代世界（1950-2026）**：按出生年真实统计出生——1968 年的印度预期寿命 47.9 岁，1960 年生的印度人 4% 活不过 5 岁。历史时代事件（登月/柏林墙/911/新冠疫情）随年代触发
- 👶 **同龄人陪跑**：同一秒出生的另外 4 个婴儿与你并肩走完一生——他们离世后，你可以在结算页**体验他们的人生**（接管完整状态机，链式体验，随时返回自己）
- 🧘 **人生暂停点**：5/15/30/50/70 岁停下来回答一个问题，你的留言保存在本地
- 🛫 **移民抉择**：出国换一个国家继续人生——生命表、收入基准、事件池全部切换
- 🏫 **教室模式**：一键缓和沉重主题（战争/成瘾/暴力事件降权），死亡卡附各国心理援助热线
- 🎨 **程序化像素皮肤**：像素小人随年龄进化、五态头像、七地区组国服配色、城市天际线与乡村地貌按出生国切换、时代色调——全部 SVG 程序生成，**零外部素材**
- ⚡ **零依赖纯前端**：Vanilla JS（ESM），无框架、无构建、无后端、无追踪
- 📦 **可离线**：附单文件构建脚本，打包出一个 HTML 走哪玩哪

## 🧰 Built With

| 层 | 选型 |
|---|---|
| 页面 | 原生 HTML + CSS |
| 逻辑 | Vanilla JavaScript（ESM 模块） |
| 图形 | SVG 程序化生成（像素小人 / 生命年轮 / 城市天际线 / 分享海报 Canvas） |
| 数据 | 事件库 / 国家库 / 生命表均为独立 JS 模块，世界银行 API 实时校准 |
| 部署 | GitHub Pages |

```
js/
├── data/        # 事件、国家、生命表、姓名库、文化圈素材（14 个批量素材文件）
├── engine/      # 人生推演引擎（出生/逐年推进/抉择调度/同骨架冷却）
├── ui/          # 界面渲染（结算页/生命年轮/像素小人/分享卡）
├── rng.js       # 随机数
└── main.js      # 入口与流程编排
scripts/build_standalone.js   # 单文件打包
```

## 🚀 本地运行

直接用静态服务器伺服仓库根目录（ESM 模块不能 `file://` 直开）：

```bash
npx serve .
# 或
python3 -m http.server
```

生成单文件离线版：

```bash
node scripts/build_standalone.js
```

## 🎮 玩法

1. **出生**：拖动滑块选出生年份（默认 1990），按那一年的真实世界分布抽签——出生国、性别、城乡、家境、宗教全部按真实概率
2. **人生**：逐年推进，随机遭遇人生事件——学业、求职、恋爱、疾病、灾害、战争、时代洪流
3. **抉择**：移民、升学、创业、婚姻——重大节点自己选，选错的代价也是人生的一部分
4. **陪跑**：同一秒出生的另外 4 个婴儿与你并肩走完一生——结算页可以体验他们的人生
5. **结算**：走到死亡那天，回顾这一生——死亡纪录、生命年轮、时代印记、人生海报，与你同龄的人对照

## 🗺️ Roadmap

- [x] 事件库 150 → 3079 条（v0.5.0 → v0.9.5）
- [x] 217 国全覆盖（v0.6.0，官方功能全线复刻）
- [x] 文化圈事件本土化：22 圈 500+ 条（v0.7.0）
- [x] 程序化像素皮肤（v0.4.0）
- [x] 年代世界：1950-2026 出生可选（v0.8.0）
- [x] 时代专属里程碑 + 事件卡动效 + 分享传播（v0.9.3-v0.9.4）
- [x] 体验同龄人：接管同秒婴儿的完整人生（v0.9.5）
- [x] 文化圈专属抉择破千（v0.9.5）
- [ ] 界面多语言扩展（19 语种）
- [ ] 更多文化圈深度事件（西欧贵族线/东亚职场线/拉美足球青训线）

详见 [ROADMAP.md](docs/ROADMAP.md)。

## 📂 项目文档

- [路线图 Roadmap](docs/ROADMAP.md) —— 版本历史与待办
- [美术提升计划](docs/ART_PLAN.md) —— P0-P3 分档
- [数据口径说明](docs/DATA.md) —— 所有数字从哪来 + 校验脚本

## 🤝 贡献

欢迎 Issue 与 PR。事件文案贡献请参考现有条目的格式：场景具体、冲突来自文化本身、标注真实数据出处。

## 📄 License

[MIT](LICENSE) © 2026 madbarasa

## 🙏 致谢

- [1in8b.life](https://1in8b.life) —— 灵感来源，向原作者的创意致敬
- [World Bank Open Data API](https://data.worldbank.org/) —— 217 国人口统计实时数据
- [Best-README-Template](https://github.com/othneildrew/Best-README-Template) —— 本 README 的结构参考

<div align="center">

**如果这个项目让你重新看了一眼自己的人生——给它一个 Star ⭐**

</div>
