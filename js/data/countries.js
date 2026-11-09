// 国家库 v0.6.0：5 国手工深度配置 + 212 国从世行数据程序化展开
// 手工国保留：宗教/死因/姓名语言/事件组/货币/父母职业等全部细节
// 生成国：出生权重/预期寿命/IMR/Gini/城市化/GDP 来自世行 API（最新值），其余按地区组默认
import { WORLD_STATS } from './world_stats.js';

export const COUNTRIES = {
  china: {
    id: 'china', iso3: 'CHN',
    name: '中国',
    birthShare: 6.7,
    code: 'CN',
    regions: [
      { name: '城市', weight: 65 },
      { name: '乡村', weight: 35 },
    ],
    sexRatio: [111, 100],
    wealth: ['最贫困', '不太宽裕', '中等', '较宽裕', '最富裕'],
    gdpPpp: 23000,
    currency: '人民币',
    livingCostBase: 0.45,
    religion: ['无特定信仰', '民间信仰', '佛教', '基督教'],
    religionWeights: [55, 25, 12, 8],
    sibBase: 0.35,
    sibMax: 2,
    birthHpBonus: 5,
    lifeExp: 78.6,
    infantCause: '意外窒息',
    causes: [
      ['脑中风', 22], ['缺血性心脏病', 20], ['肺癌', 13], ['慢阻肺', 9],
      ['胃癌', 6], ['肝癌', 6], ['阿尔茨海默病·失智症', 5], ['交通事故', 3],
      ['糖尿病', 3], ['高血压性心脏病', 3], ['其他原因', 10],
    ],
  },
  india: {
    id: 'india', iso3: 'IND',
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
    sibBase: 0.75,
    sibMax: 4,
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
    id: 'pakistan', iso3: 'PAK',
    name: '巴基斯坦',
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
  indonesia: {
    id: 'indonesia', iso3: 'IDN',
    name: '印度尼西亚',
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
    livingCostBase: 0.55,
    religion: ['伊斯兰教', '基督教', '印度教', '佛教'],
    religionWeights: [87, 10, 2, 1],
    sibBase: 0.7,
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
  usa: {
    id: 'usa', iso3: 'USA',
    name: '美国',
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
    livingCostBase: 0.35,
    religion: ['基督教', '无宗教', '天主教', '犹太教'],
    religionWeights: [46, 29, 20, 2],
    sibBase: 0.55,
    sibMax: 2,
    birthHpBonus: 5,
    lifeExp: 78.9,
    infantCause: '先天异常',
    causes: [
      ['缺血性心脏病', 20], ['阿尔茨海默病·失智症', 8], ['肺癌', 7], ['意外伤害', 7],
      ['脑中风', 5], ['慢阻肺', 5], ['糖尿病', 3], ['肾病', 3],
      ['自杀', 2], ['其他原因', 30],
    ],
  },
};

// ── 生成国：从世行数据展开 212 国 ──
const HAND_IDS = new Set(Object.values(COUNTRIES).map(c => c.iso3));

// 地区组默认配置（宗教/死因/家庭结构按地区现实近似）
const GROUP_DEFAULTS = {
  EAS: { religion: ['无特定信仰', '佛教', '基督教', '民间信仰'], religionWeights: [45, 20, 18, 17], sibBase: 0.5, sibMax: 2, namePool: 'eas', causes: [['脑中风', 20], ['缺血性心脏病', 18], ['肺癌', 12], ['慢阻肺', 8], ['胃癌', 6], ['肝癌', 5], ['交通事故', 4], ['阿尔茨海默病·失智症', 4], ['其他原因', 23]], currency: '当地货币' },
  SAS: { religion: ['印度教', '伊斯兰教', '基督教', '锡克教'], religionWeights: [62, 24, 8, 4], sibBase: 0.8, sibMax: 5, namePool: 'sas', causes: [['缺血性心脏病', 17], ['脑中风', 10], ['慢阻肺', 9], ['下呼吸道感染', 7], ['腹泻性疾病', 6], ['新生儿疾病', 5], ['结核病', 5], ['糖尿病', 5], ['交通事故', 4], ['其他原因', 32]], currency: '当地货币' },
  SSF: { religion: ['基督教', '伊斯兰教', '传统信仰'], religionWeights: [48, 40, 12], sibBase: 0.85, sibMax: 6, namePool: 'ssf', causes: [['下呼吸道感染', 11], ['腹泻性疾病', 8], ['新生儿疾病', 9], ['疟疾', 8], ['缺血性心脏病', 8], ['脑中风', 6], ['艾滋病', 6], ['结核病', 5], ['交通事故', 3], ['其他原因', 36]], currency: '当地货币' },
  LCN: { religion: ['天主教', '基督教', '无特定信仰'], religionWeights: [62, 18, 20], sibBase: 0.65, sibMax: 4, namePool: 'lcn', causes: [['缺血性心脏病', 16], ['脑中风', 12], ['糖尿病', 7], ['交通事故', 6], ['肝病', 4], ['高血压性心脏病', 5], ['肺癌', 4], ['肾病', 3], ['凶杀', 3], ['其他原因', 40]], currency: '当地货币' },
  ECS: { religion: ['基督教', '无特定信仰', '伊斯兰教', '东正教'], religionWeights: [52, 28, 14, 6], sibBase: 0.45, sibMax: 2, namePool: 'ecs', causes: [['缺血性心脏病', 22], ['脑中风', 14], ['肺癌', 7], ['慢阻肺', 5], ['阿尔茨海默病·失智症', 5], ['下呼吸道感染', 4], ['交通事故', 3], ['消化系统疾病', 4], ['自杀', 2], ['其他原因', 34]], currency: '当地货币' },
  MEA: { religion: ['伊斯兰教', '基督教', '其他'], religionWeights: [90, 7, 3], sibBase: 0.7, sibMax: 4, namePool: 'mena', causes: [['缺血性心脏病', 20], ['脑中风', 12], ['糖尿病', 6], ['下呼吸道感染', 5], ['交通事故', 5], ['肾病', 4], ['新生儿疾病', 4], ['先天性异常', 3], ['肝病', 3], ['其他原因', 38]], currency: '当地货币' },
  NAC: { religion: ['基督教', '无特定信仰', '其他'], religionWeights: [63, 29, 8], sibBase: 0.5, sibMax: 3, namePool: 'nac', causes: [['缺血性心脏病', 20], ['肺癌', 7], ['意外伤害', 7], ['阿尔茨海默病·失智症', 8], ['脑中风', 5], ['慢阻肺', 5], ['糖尿病', 3], ['肾病', 3], ['自杀与药物过量', 4], ['其他原因', 38]], currency: '当地货币' },
};

// 城市化率 → 城乡权重
const urbanRegions = (urban) => {
  const u = Math.max(10, Math.min(95, urban || 50));
  return [
    { name: '城市', weight: Math.round(u) },
    { name: '乡村', weight: 100 - Math.round(u) },
  ];
};

// 全球年出生（世行 217 国合计）
const GLOBAL_BIRTHS = WORLD_STATS.meta.globalBirths;

for (const [iso3, s] of Object.entries(WORLD_STATS.countries)) {
  if (HAND_IDS.has(iso3)) continue; // 手工五国已就位
  const def = GROUP_DEFAULTS[s.wbRegion] || GROUP_DEFAULTS.EAS;
  const urban = s.urban || 50;
  const e0 = s.le || 70;
  // 兄弟姐妹概率随贫富/地区微调：高生育地区 sibBase 高
  COUNTRIES[iso3.toLowerCase()] = {
    id: iso3.toLowerCase(),
    iso3,
    name: s.name,
    birthShare: +((s.births / GLOBAL_BIRTHS) * 100).toFixed(2),
    code: s.iso2 || iso3.slice(0, 2),
    regions: urbanRegions(urban),
    sexRatio: (s.wbRegion === 'EAS' || s.wbRegion === 'SAS') ? [106, 100] : [104, 100],
    wealth: def.wealthRef || ['最贫困', '不太宽裕', '中等', '较宽裕', '最富裕'],
    gdpPpp: Math.round(s.gdpPpp || 5000),
    currency: def.currency,
    livingCostBase: e0 > 75 ? 0.5 : 0.65,
    religion: def.religion,
    religionWeights: def.religionWeights,
    sibBase: def.sibBase,
    sibMax: def.sibMax,
    namePool: def.namePool,
    birthHpBonus: e0 > 72 ? 3 : 0,
    lifeExp: +e0.toFixed(1),
    infantCause: s.imr > 25 ? '新生儿疾病' : '先天异常',
    causes: def.causes,
    generated: true,
    leMale: s.leMale,
    leFemale: s.leFemale,
    imr: s.imr || 25,
    gini: s.gini,
    group: s.wbRegion,
    income: s.income,
  };
}

// 手工国补 group 字段（事件组触发用）
COUNTRIES.china.group = 'EAS';
COUNTRIES.india.group = 'SAS';
COUNTRIES.usa.group = 'NAC';
COUNTRIES.indonesia.group = 'EAS';
COUNTRIES.pakistan.group = 'SAS';

// 全球出生权重数组（按 COUNTRIES 声明顺序）
export const BIRTH_WEIGHTS = Object.values(COUNTRIES).map(c => c.birthShare);

// 按组查国家 id 集合（事件组触发用）
export const GROUP_MEMBERS = {};
for (const c of Object.values(COUNTRIES)) {
  (GROUP_MEMBERS[c.group] = GROUP_MEMBERS[c.group] || []).push(c.id);
}

export const COUNTRY_COUNT = Object.keys(COUNTRIES).length;
