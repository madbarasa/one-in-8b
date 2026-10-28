// 五国出生抽签冒烟测试：全池抽 3000 次按国家分组，验证姓名/寿命/职业/兄弟数分布
import { rollBirth } from '../js/engine/birth.js';
import { makeRng } from '../js/rng.js';
import { COUNTRIES } from '../js/data/countries.js';

const rng = makeRng(20261028);
const byC = {};
for (let i = 0; i < 3000; i++) {
  const b = rollBirth(rng, 2026);
  (byC[b.country] = byC[b.country] || []).push(b);
}

const share = Object.entries(byC).map(([c, arr]) => `${c}:${(arr.length / 30).toFixed(1)}%`).join('  ');
console.log(`五国分布（全球池 3000 抽）：${share}\n`);
for (const [cid, arr] of Object.entries(byC)) {
  const n = arr.length;
  const names = new Set(arr.map(s => s.name));
  const avgSib = (arr.reduce((a, s) => a + s.siblings.length, 0) / n).toFixed(1);
  const avgLife = (arr.reduce((a, s) => a + s.lifeExpectancy, 0) / n).toFixed(1);
  const female = (arr.filter(s => s.gender === 'female').length / n * 100).toFixed(0);
  const sample = arr[0];
  console.log(`${cid.padEnd(10)} n=${n}  姓名uniq=${names.size}/${n}  兄弟均=${avgSib}  女=${female}%  寿命表=${avgLife}  例:${sample.name}(${sample.wealth},${sample.region})`);
}

// 目标占比对照
const target = Object.values(COUNTRIES).map(c => `${c.id}:${c.birthShare}`).join('  ');
console.log(`\n目标占比：${target}`);
