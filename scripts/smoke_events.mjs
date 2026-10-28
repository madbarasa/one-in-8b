// 事件库校验 + 五国全人生模拟冒烟
// 1. 事件总数与 id 唯一性
// 2. choice 事件必须有 options；log 事件必须有 text
// 3. cond 在完整 state 骨架上不抛错
// 4. 五国各跑 3 条完整人生，输出事件触发统计
import { EVENTS, filterEvents } from '../js/data/events.js';
import { createLifeState } from '../js/engine/life.js';
import { rollBirth } from '../js/engine/birth.js';
import { makeRng } from '../js/rng.js';
import { COUNTRIES } from '../js/data/countries.js';

const ids = new Set();
const problems = [];
for (const ev of EVENTS) {
  if (ids.has(ev.id)) problems.push(`id 重复: ${ev.id}`);
  ids.add(ev.id);
  if (ev.type === 'choice' && (!ev.options || !ev.options.length)) problems.push(`choice 缺 options: ${ev.id}`);
  if (ev.type === 'log' && !ev.text) problems.push(`log 缺 text: ${ev.id}`);
}

// 用真实出生档案当 state 骨架（保证字段完整）
const rngProbe = makeRng(1);
const probeState = createLifeState(rollBirth(rngProbe, 2026));
if (probeState.interests === undefined) probeState.interests = [];
if (probeState.children === undefined) probeState.children = [];
for (const ev of EVENTS) {
  if (ev.cond) {
    try { ev.cond(probeState); }
    catch (err) { problems.push(`cond 抛错: ${ev.id} → ${err.message}`); }
  }
}
console.log(`事件总数: ${EVENTS.length}（id 去重后 ${ids.size}）`);
console.log(problems.length ? `问题:\n  ${problems.join('\n  ')}` : '结构校验全部通过');

// 按 id 前缀统计各国事件量
const byPrefix = {};
for (const id of ids) {
  const pfx = id.split('-')[0];
  byPrefix[pfx] = (byPrefix[pfx] || 0) + 1;
}
console.log('分类统计:', JSON.stringify(byPrefix));

// 全人生模拟：用真实 state 骨架逐年跑事件过滤
const rng = makeRng(999);
for (const cid of Object.keys(COUNTRIES)) {
  const st = createLifeState(rollBirth(makeRng(20261028), 2026));
  st.country = cid; st.countryName = COUNTRIES[cid].name;
  const fired = new Set();
  const evs = [];
  for (let age = 0; age <= 80; age++) {
    st.age = age;
    st.inSchool = age >= 6 && age <= 22;
    st.job = age > 22 && age < 60 ? '工人' : null;
    st.firedEvents = fired;
    for (const ev of filterEvents(EVENTS, st)) {
      if (ev.type === 'log' && rng.chance(0.35)) { fired.add(ev.id); evs.push(ev.id); }
    }
  }
  const PREFIX = { china: 'cn', india: 'in', usa: 'us', indonesia: 'id', pakistan: 'pk' };
  const native = evs.filter(e => e.startsWith(PREFIX[cid]));
  console.log(`${cid.padEnd(10)} 一生触发 ${evs.length} 条（国别特色 ${native.length} 条）例: ${evs.slice(0, 6).join(', ')}`);
}
