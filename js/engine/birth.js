// 出生抽签：按真实统计权重生成一个「此刻出生的婴儿」
import { COUNTRIES, BIRTH_WEIGHTS } from '../data/countries.js';
import { genName, genFamilyName } from '../data/names.js';

export function rollBirth(rng, birthYear) {
  // 1. 抽国家（按全球新生儿占比）
  const ci = rng.weighted(BIRTH_WEIGHTS);
  const country = Object.values(COUNTRIES)[ci];

  // 2. 抽性别（出生性别比）
  const [m, f] = country.sexRatio;
  const gender = rng.weighted([m, f]) === 0 ? 'male' : 'female';

  // 3. 抽城乡
  const region = country.regions[rng.weighted(country.regions.map(r => r.weight))];

  // 4. 抽家境五分位（近似均匀）
  const wealthIdx = rng.int(0, 5);
  const wealth = country.wealth[wealthIdx];

  // 5. 姓名
  const name = genName(rng, country.id, gender);

  // 6. 宗教
  const religion = country.religion[rng.weighted(country.religionWeights)];

  // 7. 父母（母亲 18-40，父亲 20-50）
  const father = { name: genFamilyName(rng, country.id, 'male'), age: rng.int(20, 45), job: parentJob(rng, country.id, wealthIdx), alive: true };
  const mother = { name: genFamilyName(rng, country.id, 'female'), age: rng.int(18, 38), job: wealthIdx >= 3 ? (country.id === 'usa' ? '护士' : '职员') : parentJob(rng, country.id, wealthIdx), alive: true };

  // 8. 兄弟姐妹（家境越好越可能少生；各国生育文化差异用 sibBase/sibMax 控制）
  const sibBase = country.sibBase ?? 0.7;
  const sibCount = rng.chance(sibBase - wealthIdx * 0.05) ? rng.int(1, country.sibMax ?? 3) : 0;
  const siblings = [];
  for (let i = 0; i < sibCount; i++) {
    const g = rng.chance(0.5) ? 'male' : 'female';
    siblings.push({ name: genFamilyName(rng, country.id, g), gender: g, age: rng.int(1, 8) });
  }

  // 9. 初始四维（家境与出身修正）
  const wealthBonus = (wealthIdx - 2) * 5;
  const stats = {
    hp: Math.min(95, 80 + wealthBonus + (country.birthHpBonus ?? 0)),
    hap: Math.min(95, 65 + wealthBonus),
    know: 50,
    rel: 60,
  };

  return {
    birthYear, country: country.id, countryName: country.name, code: country.code,
    region: region.name, gender, wealthIdx, wealth, name, religion,
    father, mother, siblings,
    stats, seed: rng, rng,
    lifeExpectancy: country.lifeExp,
    gdpPpp: country.gdpPpp,
  };
}

// 各国父辈职业池（本土化）
const PARENT_JOBS = {
  china:    { poor: ['小农', '短工', '小贩', '杂工'], mid: ['工人', '小生意人', '司机', '店员'], rich: ['职员', '教师', '工程师', '医生', '商人'] },
  india:    { poor: ['小农', '短工', '小贩', '杂工'], mid: ['工人', '小生意人', '司机', '店员'], rich: ['职员', '教师', '工程师', '医生', '商人'] },
  usa:      { poor: ['快餐店员', '仓库临时工', '清洁工', '收银员'], mid: ['卡车司机', '技工', '文员', '店员'], rich: ['教师', '护士', '工程师', '经理', '律师'] },
  indonesia:{ poor: ['小农', '小贩', '渔夫', '帮工'], mid: ['摩托车司机', '工厂工人', '店员', '小生意人'], rich: ['教师', '公务员', '职员', '商人'] },
  pakistan: { poor: ['小农', '短工', '小贩', '人力车夫'], mid: ['工人', '司机', '店员', '小生意人'], rich: ['教师', '职员', '军官', '商人'] },
};

function parentJob(rng, countryId, wealthIdx) {
  const pool = PARENT_JOBS[countryId] || PARENT_JOBS.china;
  const tier = wealthIdx <= 1 ? pool.poor : wealthIdx === 2 ? pool.mid : pool.rich;
  return tier[rng.int(0, tier.length)];
}

// 出生编号：CN-2026-xxxxxx
export function birthCardNo(rng, code, year) {
  return `${code}-${year}-${String(rng.int(0, 999999)).padStart(6, '0')}`;
}
