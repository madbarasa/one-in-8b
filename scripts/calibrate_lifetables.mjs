// 生命表校准：计算各国各性别出生期望寿命 e0，与官方口径对齐验证
// 用法：node scripts/calibrate_lifetables.mjs
import { LIFETABLES } from '../js/data/lifetables.js';

function e0(table) {
  // lx 递推：l0=100000，dx = lx*qx；e0 = Σ dx*(x+0.5) / l0
  let lx = 100000, total = 0;
  for (let x = 0; x <= 115; x++) {
    const q = table[x] ?? table[Math.max(...Object.keys(table).map(Number).filter(a => a <= x))] ?? 1;
    const dx = lx * q;
    total += dx * (x + 0.5);
    lx -= dx;
    if (lx <= 0) break;
  }
  return total / 100000;
}

// 官方口径参考（WHO 2023 / NCHS 2023 / countryeconomy 2024）
const TARGET = {
  china:     { male: 75.1, female: 80.9, src: 'UN WPP 2023' },
  india:     { male: 69.4, female: 72.0, src: 'UN WPP 2023' },
  usa:       { male: 75.8, female: 81.1, src: 'NCHS 2023' },
  indonesia: { male: 69.2, female: 73.4, src: 'countryeconomy 2024' },
  pakistan:  { male: 66.5, female: 69.9, src: 'WHO 2023' },
};

let ok = true;
for (const [country, tables] of Object.entries(LIFETABLES)) {
  for (const gender of ['male', 'female']) {
    const got = e0(tables[gender]);
    const target = TARGET[country][gender];
    const diff = got - target;
    const flag = Math.abs(diff) <= 1.5 ? 'OK ' : '*** 偏差过大';
    if (Math.abs(diff) > 1.5) ok = false;
    console.log(`${flag} ${country.padEnd(10)} ${gender.padEnd(6)} e0=${got.toFixed(1)}  目标=${target}  差=${diff >= 0 ? '+' : ''}${diff.toFixed(1)}  (${TARGET[country].src})`);
  }
}
console.log(ok ? '\n全部对齐（±1.5 岁内）' : '\n存在偏差，需调整 variant 倍率');
process.exit(ok ? 0 : 1);
