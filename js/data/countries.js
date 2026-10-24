// 国家配置：出生权重与基础统计（近似值，来源 UN WPP 2024 / WHO / 世界银行，MVP 覆盖两国）
export const COUNTRIES = {
  china: {
    id: 'china',
    name: '中国',
    // 全球新生婴儿中的占比（%）——权重抽签用
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
    // 人均 GDP（PPP 国际元）
    gdpPpp: 23000,
    // 货币显示
    currency: '人民币',
    // 年生活费（PPP，按家境分位系数乘 GDP 的比例）
    livingCostBase: 0.45,
    religion: ['无特定信仰', '民间信仰', '佛教', '基督教'],
    religionWeights: [55, 25, 12, 8],
    // 死因分布（WHO GHE 中国粗死亡构成近似，MVP）
    causes: [
      ['脑中风', 22], ['缺血性心脏病', 20], ['肺癌', 13], ['慢阻肺', 9],
      ['胃癌', 6], ['肝癌', 6], ['阿尔茨海默病·失智症', 5], ['交通事故', 3],
      ['糖尿病', 3], ['高血压性心脏病', 3], ['其他原因', 10],
    ],
  },
  india: {
    id: 'india',
    name: '印度',
    birthShare: 17.6,
    code: 'IN',
    regions: [
      { name: '城市', weight: 36 },
      { name: '乡村', weight: 64 },
    ],
    sexRatio: [107, 100],
    wealth: ['最贫困', '不太宽裕', '中等', '较宽裕', '最富裕'],
    gdpPpp: 8900,
    currency: '人民币',
    livingCostBase: 0.75,
    religion: ['印度教', '伊斯兰教', '基督教', '锡克教'],
    religionWeights: [79, 14, 3, 2],
    causes: [
      ['缺血性心脏病', 18], ['脑中风', 10], ['慢阻肺', 9], ['腹泻性疾病', 6],
      ['下呼吸道感染', 7], ['结核病', 5], ['新生儿疾病', 5], ['糖尿病', 5],
      ['交通事故', 5], ['其他原因', 30],
    ],
  },
};

// 出生权重数组（按 COUNTRIES 声明顺序）
export const BIRTH_WEIGHTS = Object.values(COUNTRIES).map(c => c.birthShare);
