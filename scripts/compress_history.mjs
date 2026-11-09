// 历史数据压缩：年份键 → 数组索引（1960-2025），精度 1 位小数 → 体积 ~45%
// 用法：node scripts/compress_history.mjs
import { readFileSync, writeFileSync } from 'fs';

const { WORLD_HISTORY } = await import('../js/data/world_history.js');
const MIN = 1960, MAX = 2025;

function packSeries(s) {
  const out = {};
  for (const key of ['birthRate', 'pop', 'leMale', 'leFemale', 'imr', 'births']) {
    const src = s[key];
    if (!src) continue;
    const arr = new Array(MAX - MIN + 1);
    for (const [y, v] of Object.entries(src)) {
      const i = +y - MIN;
      if (i < 0 || i > MAX - MIN) continue;
      arr[i] = key === 'pop' || key === 'births' ? Math.round(v) : Math.round(v * 10) / 10;
    }
    // 去尾部空位（越晚开始统计的国家越短）
    while (arr.length && arr[arr.length - 1] == null) arr.pop();
    // 前导起点（世界银行多数国家 1960 起，个别 1970+）
    let start = 0;
    while (start < arr.length && arr[start] == null) start++;
    if (start >= arr.length) continue;
    out[key] = { start: MIN + start, v: arr.slice(start) };
  }
  return Object.keys(out).length ? out : undefined;
}

const packed = {};
for (const [iso, s] of Object.entries(WORLD_HISTORY.series)) {
  const p = packSeries(s);
  if (p) packed[iso] = p;
}

const out = { meta: { ...WORLD_HISTORY.meta, minYear: MIN, maxYear: MAX, packed: true }, series: packed };
const json = JSON.stringify(out, null, 0);
console.log('压缩后体积:', (json.length / 1024).toFixed(0), 'KB（原', (JSON.stringify(WORLD_HISTORY).length / 1024).toFixed(0), 'KB）');
const js = '// 自动生成（压缩版）：世行历史序列 1960-2025\n// 格式：series.ISO3.指标 = { start: 起始年, v: 数组（索引0=start年） }；年份缺失=null\nexport const WORLD_HISTORY = ' + json + ';\n';
writeFileSync('js/data/world_history.js', js);
console.log('已覆写 js/data/world_history.js');
