// 世行数据抓取 v2：9 指标 × 全部实体 → 过滤真实国家 → js/data/world_stats.json
// 用法：node scripts/fetch_worldbank.mjs
import { writeFileSync } from 'fs';

const INDICATORS = {
  birthRate: 'SP.DYN.CBRT.IN',      // 粗出生率（‰）
  pop: 'SP.POP.TOTL',               // 人口
  le: 'SP.DYN.LE00.IN',             // 预期寿命（总）
  leMale: 'SP.DYN.LE00.MA.IN',      // 预期寿命（男）
  leFemale: 'SP.DYN.LE00.FE.IN',    // 预期寿命（女）
  imr: 'SP.DYN.IMRT.IN',            // 婴儿死亡率（‰）
  gini: 'SI.POV.GINI',              // 基尼系数
  urban: 'SP.URB.TOTL.IN.ZS',       // 城市化率（%）
  gdpPpp: 'NY.GDP.PCAP.PP.CD',      // 人均 GDP（PPP 现价国际元）
};

const fetchInd = async (code) => {
  const url = `https://api.worldbank.org/v2/country/all/indicator/${code}?format=json&per_page=20000&mrv=5`;
  const res = await fetch(url);
  const j = await res.json();
  const rows = (j[1] || []).filter(r => r.value != null);
  const best = new Map();
  for (const r of rows) {
    const iso3 = r.countryiso3code;
    if (!iso3) continue;
    if (!best.has(iso3) || best.get(iso3).date < r.date) best.set(iso3, r);
  }
  return [...best.values()];
};

console.log('抓取国家元数据……');
const metaRes = await fetch('https://api.worldbank.org/v2/country?format=json&per_page=400');
const metaJ = await metaRes.json();
const META = {};
for (const m of (metaJ[1] || [])) {
  META[m.id] = { name: m.name, regionId: m.region?.id || '', regionName: (m.region?.value || '').trim(), income: m.incomeLevel?.id || '', iso2: m.iso2Code };
}
console.log('元数据实体:', Object.keys(META).length);

console.log('抓取 9 个指标……');
const stats = {};
for (const [key, code] of Object.entries(INDICATORS)) {
  const rows = await fetchInd(code);
  console.log(`  ${key}: ${rows.length} 条`);
  for (const r of rows) {
    const iso3 = r.countryiso3code;
    if (!stats[iso3]) stats[iso3] = {};
    stats[iso3][key] = r.value;
    stats[iso3].dataYear = r.date;
  }
}

// 补充国家名与地区组
for (const [iso3, c] of Object.entries(stats)) {
  const m = META[iso3];
  if (m) { c.name = m.name; c.wbRegion = m.regionId; c.wbRegionName = m.regionName; c.income = m.income; c.iso2 = m.iso2; }
}

// 计算年出生数
for (const c of Object.values(stats)) {
  if (c.birthRate && c.pop) c.births = Math.round(c.pop * c.birthRate / 1000);
}

// 过滤真实国家：有地区组（排除 Aggregates）且出生数+预期寿命齐全
const usable = {};
for (const [iso3, c] of Object.entries(stats)) {
  if (!c.wbRegion || c.wbRegion === 'NA') continue;
  if (c.births > 0 && c.le) usable[iso3] = c;
}

console.log(`真实国家/地区: ${Object.keys(usable).length}`);
const totalBirths = Object.values(usable).reduce((a, c) => a + c.births, 0);
console.log(`全球年出生合计: ${(totalBirths / 1e8).toFixed(3)} 亿`);

const out = {
  meta: { fetchedAt: new Date().toISOString().slice(0, 10), source: 'World Bank API (mrv=5, 最新非空)', globalBirths: totalBirths },
  countries: usable,
};
writeFileSync('js/data/world_stats.json', JSON.stringify(out, null, 0));
console.log('已写入 js/data/world_stats.json，大小:', (JSON.stringify(out).length / 1024).toFixed(1) + 'KB');

for (const iso of ['CHN', 'IND', 'USA', 'NGA', 'BRA', 'JPN', 'DEU', 'ETH']) {
  const c = usable[iso];
  if (c) console.log(`  ${iso} ${c.name}: 年生${(c.births / 10000).toFixed(0)}万 e0=${c.le}(男${c.leMale}/女${c.leFemale}) IMR=${c.imr} Gini=${c.gini} 组=${c.wbRegion} GDP=${Math.round(c.gdpPpp)}`);
}
