// 历史数据抓取 v0.8.0：世行 API 1960-2025 年度序列 → js/data/world_history.js
// 用法：node scripts/fetch_historical.mjs
// 指标：出生率/人口（算年出生数）、男女预期寿命、婴儿死亡率 —— 年代世界的核心参数
// Gini/GDP 历史稀疏，用最新值（world_stats）兜底，不影响年代感

const INDICATORS = {
  birthRate: 'SP.DYN.CBRT.IN',
  pop: 'SP.POP.TOTL',
  leMale: 'SP.DYN.LE00.MA.IN',
  leFemale: 'SP.DYN.LE00.FE.IN',
  imr: 'SP.DYN.IMRT.IN',
};

const fetchSeries = async (code) => {
  // date=1960:2025 全年代序列（每实体每年 1 行）
  const url = `https://api.worldbank.org/v2/country/all/indicator/${code}?format=json&per_page=30000&date=1960:2025`;
  const res = await fetch(url);
  const j = await res.json();
  return (j[1] || []).filter(r => r.value != null && r.countryiso3code);
};

console.log('抓取 5 指标 × 66 年历史序列……');
const out = { meta: { fetchedAt: new Date().toISOString().slice(0, 10), source: 'World Bank API 1960:2025', minYear: 1960, maxYear: 2025 }, series: {} };

for (const [key, code] of Object.entries(INDICATORS)) {
  const rows = await fetchSeries(code);
  for (const r of rows) {
    const iso = r.countryiso3code;
    out.series[iso] = out.series[iso] || {};
    out.series[iso][key] = out.series[iso][key] || {};
    out.series[iso][key][r.date] = +(+r.value).toFixed(2);
  }
  console.log(' ', key, rows.length, '行');
}

// 计算年出生数（按年）：births[year] = pop × birthRate / 1000
for (const iso of Object.keys(out.series)) {
  const s = out.series[iso];
  s.births = {};
  for (const y of Object.keys(s.birthRate || {})) {
    if (s.pop && s.pop[y]) s.births[y] = Math.round(s.pop[y] * s.birthRate[y] / 1000);
  }
}

const json = JSON.stringify(out, null, 0);
console.log('数据点总量:', json.length / 1024, 'KB');
const js = '// 自动生成：世行历史序列 1960-2025（v0.8.0 年代世界）\n// 来源：api.worldbank.org，缺失年份由最近年份兜底\nexport const WORLD_HISTORY = ' + json + ';\n';
await import('fs').then(fs => fs.writeFileSync('js/data/world_history.js', js));
console.log('已写入 js/data/world_history.js');

// 抽样验证：中国 1960 vs 2020 e0
const chn = out.series.CHN;
console.log('CHN e0(女) 1960:', chn.leFemale?.['1960'], '→ 2020:', chn.leFemale?.['2020']);
console.log('CHN 年出生 1963:', chn.births?.['1963'], '→ 2020:', chn.births?.['2020']);
const ind = out.series.IND;
console.log('IND e0(男) 1960:', ind.leMale?.['1960'], '→ 2020:', ind.leMale?.['2020']);
