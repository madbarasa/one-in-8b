// 出生抽签：按真实统计权重生成一个「此刻出生的婴儿」
// v0.8.0 支持年代世界：birthYear < 2026 时按该年真实出生数加权（世行 1960-2025 序列）
import { COUNTRIES, BIRTH_WEIGHTS } from '../data/countries.js';
import { genName, genFamilyName } from '../data/names.js';
import { WORLD_HISTORY } from '../data/world_history.js';
import { lifeExpAt } from '../data/lifetables.js';

// ── Gini 收入分布：对数正态反解 ──
// σ = √2 · Φ⁻¹((G+1)/2)；收入 = exp(μ + σ·z)，μ 由人均 GDP 定
function probit(p) {
  // Beasley-Springer-Moro 近似（误差 < 1e-9）
  const a = [0, -3.969683028665376e+01, 2.209460984245205e+02, -2.759285104469687e+02, 1.383577518672690e+02, -3.066479806614716e+01, 2.506628277459239e+00];
  const b = [0, -5.447609898112200e+01, 2.336849474268436e+02, -2.494832034085621e+02, 1.530243454066790e+02, -4.240093584966496e+01, 1.000000000000000e+00];
  const c = [0, 7.984156045341246e-04, 3.523208490473923e-02, 3.032529673276067e-01, 8.317370458509600e-01, 1.534495956074812e+00, 3.316820404716731e+00];
  const pLow = 0.02425;
  let q, r;
  if (p < pLow) { q = Math.sqrt(-2 * Math.log(p)); return (((((c[1]*q+c[2])*q+c[3])*q+c[4])*q+c[5])*q+c[6]) / ((((d[1]*q+d[2])*q+d[3])*q+d[4])*q+1); }
  if (p <= 1 - pLow) { q = p - 0.5; r = q * q; return (((((a[1]*r+a[2])*r+a[3])*r+a[4])*r+a[5])*r+a[6])*q / (((((b[1]*r+b[2])*r+b[3])*r+b[4])*r+b[5])*r+1); }
  q = Math.sqrt(-2 * Math.log(1 - p));
  return -(((((c[1]*q+c[2])*q+c[3])*q+c[4])*q+c[5])*q+c[6]) / ((((d[1]*q+d[2])*q+d[3])*q+d[4])*q+1);
}
const d = [0, 1.501409405487456e+01, 8.067474305929746e+01, 1.596046287059222e+02, 8.552870603748228e+01, 1.826674975280760e+01];

export function giniToSigma(g) { return Math.SQRT2 * probit(Math.min(0.999, (g + 1) / 2)); }

// 五分位 → 家庭年收入（PPP 国际元）+ 美元购买力参照
export function householdIncome(gdpPpp, gini, wealthIdx) {
  const sigma = giniToSigma(gini || 38);
  const mu = Math.log(gdpPpp * 0.55);       // 劳动收入份额近似
  const quantile = (wealthIdx + 0.5) / 5;   // 五分位中点
  const z = probit(quantile);
  const ppp = Math.round(Math.exp(mu + sigma * z - sigma * sigma / 2));
  const usd = Math.round(ppp / 0.42);       // PPP→美元购买力近似换算系数
  return { ppp, usd };
}

// 历史年份出生权重（世行 births 序列，缺失取最近年份，1960 前用 1960 值）
export function historicalWeights(year) {
  if (!year || year >= 2026) return BIRTH_WEIGHTS;
  const countries = Object.values(COUNTRIES);
  return countries.map(c => {
    const s = WORLD_HISTORY.series[c.iso3];
    if (!s || !s.births) return c.birthShare;
    let best = null, bestDist = 1e9;
    for (const y of Object.keys(s.births)) {
      const d = Math.abs(+y - year);
      if (d < bestDist) { bestDist = d; best = s.births[y]; }
    }
    return best != null ? Math.max(1, best) : c.birthShare;
  });
}

export function rollBirth(rng, birthYear) {
  // 1. 抽国家（按该年全球新生儿占比；今日世界用最新值）
  const ci = rng.weighted(historicalWeights(birthYear));
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
    iso3: country.iso3,
    region: region.name, gender, wealthIdx, wealth, name, religion,
    father, mother, siblings,
    stats, seed: rng, rng,
    lifeExpectancy: lifeExpAt(country.iso3, birthYear, country.lifeExp),
    gdpPpp: country.gdpPpp,
    group: country.group,
    culture: country.culture,
    historical: birthYear < 2026,
    household: householdIncome(country.gdpPpp, country.gini, wealthIdx),
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
