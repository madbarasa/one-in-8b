// 国家配置：出生权重与基础统计
// 来源：UN WPP 2024（出生数/出生性别比）、WHO GHE 2024（死因构成）、世界银行 2024（GDP PPP/城市化率）、Pew 研究中心（宗教构成）
// v0.3.0 覆盖五国：全球新生儿覆盖率约 35%，人口约 37 亿

export const COUNTRIES = {
  china: {
    id: 'china',
    name: '中国',
    // 全球新生婴儿中的占比（%）——权重抽签用。年出生约 880 万 / 全球 1.32 亿
    birthShare: 6.7,
    code: 'CN',
    regions: [
      { name: '城市', weight: 65 },
      { name: '乡村', weight: 35 },
    ],
    // 出生性别比（男:女）
    sexRatio: [111, 100],
    // 家境五分位标签与权重（真实分布近似均匀，MVP 均匀抽取）
    wealth: ['最贫困', '不太宽裕', '中等', '较宽裕', '最富裕'],
    // 人均 GDP（PPP 国际元，世行 2024）
    gdpPpp: 23000,
    // 货币显示
    currency: '人民币',
    // 年生活费（PPP，按家境分位系数乘 GDP 的比例）
    livingCostBase: 0.45,
    religion: ['无特定信仰', '民间信仰', '佛教', '基督教'],
    religionWeights: [55, 25, 12, 8],
    // 兄弟姐妹概率参数（有兄弟姐妹的概率基数，越富越少）
    sibBase: 0.35,
    sibMax: 2,
    // 出生健康加成
    birthHpBonus: 5,
    // 预期寿命（出生时，总口径，用于出生卡展示）
    lifeExp: 78.6,
    // 婴幼儿期死因特化（腹泻 or 意外窒息）
    infantCause: '意外窒息',
    // 死因分布（WHO GHE 中国粗死亡构成近似）
    causes: [
      ['脑中风', 22], ['缺血性心脏病', 20], ['肺癌', 13], ['慢阻肺', 9],
      ['胃癌', 6], ['肝癌', 6], ['阿尔茨海默病·失智症', 5], ['交通事故', 3],
      ['糖尿病', 3], ['高血压性心脏病', 3], ['其他原因', 10],
    ],
  },
  india: {
    id: 'india',
    name: '印度',
    // 年出生约 2320 万
    birthShare: 17.6,
    code: 'IN',
    regions: [
      { name: '城市', weight: 36 },
      { name: '乡村', weight: 64 },
    ],
    sexRatio: [107, 100],
    wealth: ['最贫困', '不太宽裕', '中等', '较宽裕', '最富裕'],
    gdpPpp: 8900,
    currency: '卢比',
    livingCostBase: 0.75,
    religion: ['印度教', '伊斯兰教', '基督教', '锡克教'],
    religionWeights: [79, 14, 3, 2],
    sibBase: 0.75,
    sibMax: 4,
    birthHpBonus: 0,
    lifeExp: 70.8,
    infantCause: '腹泻性疾病',
    causes: [
      ['缺血性心脏病', 18], ['脑中风', 10], ['慢阻肺', 9], ['腹泻性疾病', 6],
      ['下呼吸道感染', 7], ['结核病', 5], ['新生儿疾病', 5], ['糖尿病', 5],
      ['交通事故', 5], ['其他原因', 30],
    ],
  },
  usa: {
    id: 'usa',
    name: '美国',
    // 年出生约 363 万（CDC 2024 终值 3,628,934）
    birthShare: 2.7,
    code: 'US',
    regions: [
      { name: '城市', weight: 83 },
      { name: '乡村', weight: 17 },
    ],
    sexRatio: [105, 100],
    wealth: ['最贫困', '不太宽裕', '中等', '较宽裕', '最富裕'],
    gdpPpp: 86000,
    currency: '美元',
    livingCostBase: 0.55,
    religion: ['基督教', '无特定信仰', '天主教', '犹太教'],
    religionWeights: [40, 29, 20, 2],
    sibBase: 0.5,
    sibMax: 2,
    birthHpBonus: 3,
    lifeExp: 78.4,
    infantCause: '早产并发症',
    causes: [
      ['缺血性心脏病', 20], ['阿尔茨海默病·失智症', 8], ['肺癌', 7],
      ['意外伤害·药物过量', 7], ['脑中风', 5], ['慢阻肺', 5], ['下呼吸道感染', 3],
      ['肾病', 3], ['糖尿病', 3], ['高血压性心脏病', 3], ['自杀', 2], ['其他原因', 34],
    ],
  },
  indonesia: {
    id: 'indonesia',
    name: '印度尼西亚',
    // 年出生约 440 万
    birthShare: 3.3,
    code: 'ID',
    regions: [
      { name: '城市', weight: 58 },
      { name: '乡村', weight: 42 },
    ],
    sexRatio: [106, 100],
    wealth: ['最贫困', '不太宽裕', '中等', '较宽裕', '最富裕'],
    gdpPpp: 15600,
    currency: '印尼盾',
    livingCostBase: 0.65,
    religion: ['伊斯兰教', '基督教', '天主教', '印度教', '佛教'],
    religionWeights: [87, 7, 3, 2, 1],
    sibBase: 0.8,
    sibMax: 3,
    birthHpBonus: 0,
    lifeExp: 71.3,
    infantCause: '新生儿疾病',
    causes: [
      ['脑中风', 21], ['缺血性心脏病', 13], ['慢阻肺', 5], ['糖尿病', 5],
      ['下呼吸道感染', 4], ['结核病', 4], ['肾病', 3], ['肝病', 3],
      ['交通事故', 3], ['其他原因', 39],
    ],
  },
  pakistan: {
    id: 'pakistan',
    name: '巴基斯坦',
    // 年出生约 620 万
    birthShare: 4.7,
    code: 'PK',
    regions: [
      { name: '城市', weight: 38 },
      { name: '乡村', weight: 62 },
    ],
    sexRatio: [105, 100],
    wealth: ['最贫困', '不太宽裕', '中等', '较宽裕', '最富裕'],
    gdpPpp: 6500,
    currency: '卢比',
    livingCostBase: 0.7,
    religion: ['伊斯兰教', '基督教', '印度教'],
    religionWeights: [96, 2, 1],
    sibBase: 0.9,
    sibMax: 5,
    birthHpBonus: 0,
    lifeExp: 68.2,
    infantCause: '新生儿疾病',
    causes: [
      ['缺血性心脏病', 13], ['脑中风', 10], ['下呼吸道感染', 9], ['围产期疾病', 7],
      ['腹泻性疾病', 6], ['结核病', 5], ['肝病', 4], ['肾病', 4],
      ['交通事故', 3], ['其他原因', 39],
    ],
  },
};

// 出生权重数组（按 COUNTRIES 声明顺序）
export const BIRTH_WEIGHTS = Object.values(COUNTRIES).map(c => c.birthShare);
