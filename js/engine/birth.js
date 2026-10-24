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
  const father = { name: genFamilyName(rng, country.id, 'male'), age: rng.int(20, 45), job: parentJob(rng, wealthIdx), alive: true };
  const mother = { name: genFamilyName(rng, country.id, 'female'), age: rng.int(18, 38), job: wealthIdx >= 3 ? '职员' : parentJob(rng, wealthIdx), alive: true };

  // 8. 兄弟姐妹（家境越好、城市越可能少生）
  const sibBase = country.id === 'china' ? 0.35 : 0.75;
  const sibCount = rng.chance(sibBase - wealthIdx * 0.05) ? rng.int(1, country.id === 'china' ? 2 : 4) : 0;
  const siblings = [];
  for (let i = 0; i < sibCount; i++) {
    const g = rng.chance(0.5) ? 'male' : 'female';
    siblings.push({ name: genFamilyName(rng, country.id, g), gender: g, age: rng.int(1, 8) });
  }

  // 9. 初始四维（家境与出身修正）
  const wealthBonus = (wealthIdx - 2) * 5;
  const stats = {
    hp: Math.min(95, 80 + wealthBonus + (country.id === 'china' ? 5 : 0)),
    hap: Math.min(95, 65 + wealthBonus),
    know: 50,
    rel: 60,
  };

  return {
    birthYear, country: country.id, countryName: country.name, code: country.code,
    region: region.name, gender, wealthIdx, wealth, name, religion,
    father, mother, siblings,
    stats, seed: rng, rng,
    lifeExpectancy: country.id === 'china' ? 78 : 70.5,
    gdpPpp: country.gdpPpp,
  };
}

function parentJob(rng, wealthIdx) {
  const poor = ['小农', '短工', '小贩', '杂工'];
  const mid = ['工人', '小生意人', '司机', '店员'];
  const rich = ['职员', '教师', '工程师', '医生', '商人'];
  const pool = wealthIdx <= 1 ? poor : wealthIdx === 2 ? mid : rich;
  return pool[rng.int(0, pool.length)];
}

// 出生编号：CN-2026-xxxxxx
export function birthCardNo(rng, code, year) {
  return `${code}-${year}-${String(rng.int(0, 999999)).padStart(6, '0')}`;
}
