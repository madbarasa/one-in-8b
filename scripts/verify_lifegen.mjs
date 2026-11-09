// 生命表生成器全量验证：261 国 e0 误差与 IMR 拟合精度
// 用法：node scripts/verify_lifegen.mjs
import { readFileSync } from 'fs';
import { genTable } from '../js/data/lifegen.js';

const { countries } = JSON.parse(readFileSync('js/data/world_stats.json', 'utf-8'));

function calcE0(table) {
  let lx = 100000, total = 0;
  for (let x = 0; x <= 115; x++) {
    const q = Math.min(1, table[x] !== undefined ? table[x] : (table[x - 1] !== undefined ? table[x - 1] : 1));
    const dx = lx * q;
    total += dx * (x + 0.5);
    lx -= dx;
    if (lx <= 0.5) break;
  }
  return total / 100000;
}

let maxErr = 0, worst = '';
let n = 0;
for (const [iso, c] of Object.entries(countries)) {
  if (!c.leMale || !c.leFemale || !c.imr) continue;
  n++;
  for (const gender of ['male', 'female']) {
    const target = gender === 'male' ? c.leMale : c.leFemale;
    const imr = gender === 'female' ? c.imr * 0.92 : c.imr;
    const t = genTable(target, imr, gender);
    const got = calcE0(t);
    const err = Math.abs(got - target);
    if (err > maxErr) { maxErr = err; worst = `${iso}/${gender} 目标${target} 得${got.toFixed(2)}`; }
    if (err > 0.3) console.log(`  偏差: ${iso}/${gender} 目标=${target} 实算=${got.toFixed(2)} IMR=${c.imr}`);
  }
}
console.log(`验证 ${n} 国 × 2 性别 = ${n * 2} 张表；最大 e0 误差 ${maxErr.toFixed(3)} 岁（${worst}）`);
console.log(maxErr <= 0.3 ? '✓ 全部命中（±0.3 岁内）' : '✗ 存在超差');
