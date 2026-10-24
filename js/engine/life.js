// 人生推进引擎：逐年模拟 + 事件调度 + 死亡判定
import { qx } from '../data/lifetables.js';
import { COUNTRIES } from '../data/countries.js';
import { EVENTS, filterEvents } from '../data/events.js';
import { genFamilyName } from '../data/names.js';

// 由出生档案构建完整可变状态
export function createLifeState(birth) {
  const st = {
    ...birth,
    age: 0,
    alive: true,
    deathInfo: null,
    inSchool: false,
    degree: '学龄前',
    vocational: false,
    job: null,
    income: 0,          // 年收入（PPP 国际元）
    money: 0,           // 净资产
    spouse: null,
    engaged: false,
    children: [],
    house: false,
    retired: false,
    childcareDone: false,
    focus: null,        // 年度重心：study/social/family/sport/hobby
    firedEvents: new Set(),
    timeline: [],       // [{age, year, text, source, negative}]
    interests: [],      // [{name, lv}]
    pendingChoices: [], // 本年待处理的抉择
    rng: birth.rng,
  };
  // 家人引用age化
  st.engage = () => {
    st.engaged = true;
    st.spouseTarget = genFamilyName(st.rng, st.country, st.gender === 'male' ? 'female' : 'male');
  };
  st.marry = () => {
    st.spouse = st.spouseTarget || genFamilyName(st.rng, st.country, st.gender === 'male' ? 'female' : 'male');
    st.spouseAge = st.rng.int(st.age - 5, st.age + 3);
  };
  st.haveChild = () => {
    const g = st.rng.chance(0.5) ? 'male' : 'female';
    st.children.push({ name: genFamilyName(st.rng, st.country, g), gender: g, age: 0 });
  };
  st.spouseDies = () => { st.spouse = null; };
  st.parentDies = () => {
    if (st.rng.chance(0.5) && st.father.alive) st.father.alive = false;
    else if (st.mother.alive) st.mother.alive = false;
    else st.father.alive = false;
  };
  return st;
}

// 推进一年；返回 { choice?: event } —— 有抉择则暂停等 UI 回调
export function advanceYear(st) {
  if (!st.alive) throw new Error('人物已死亡，不能再推进');

  st.age += 1;
  // 家人年长
  if (st.father.alive) st.father.age += 1;
  if (st.mother.alive) st.mother.age += 1;
  st.siblings.forEach(s => s.age += 1);
  st.children.forEach(c => c.age += 1);
  if (st.spouse) st.spouseAge = (st.spouseAge || st.age) + 1;

  // 重心效果（3 岁起有重心）
  applyFocus(st);

  // 死亡判定（生命表 qx + 健康-50 以下加成风险）
  const baseQx = qx(st.country, st.gender, st.age);
  const hpRisk = st.stats.hp < 50 ? (50 - st.stats.hp) * 0.002 : 0;
  if (st.rng.chance(baseQx + hpRisk)) {
    die(st);
    return { died: true };
  }

  // 生活收支
  applyEconomy(st);

  // 事件调度
  const pool = filterEvents(EVENTS, st);
  const choices = pool.filter(e => e.type === 'choice');
  const logs = pool.filter(e => e.type === 'log');

  // 抉择事件：同一年只触发一个（权重取第一个命中的固定年龄事件）
  if (choices.length > 0) {
    const ev = choices[0];
    st.firedEvents.add(ev.id);
    return { choice: ev };
  }

  // 概率事件：抽 0-2 条
  const n = st.rng.weighted([3, 4, 3]); // 0/1/2 条
  const picked = pickDistinct(logs, n, st.rng);
  for (const ev of picked) {
    st.firedEvents.add(ev.id);
    applyLogEvent(st, ev);
  }

  // 状态回归：健康每年自然小幅回归 55-85 区间
  st.stats.hp = clamp(st.stats.hp + (st.stats.hp < 60 ? 1 : 0));
  st.stats.hap = clamp(st.stats.hap + (st.rng.chance(0.3) ? 1 : -1));

  return { died: false };
}

// 抉择选择完成后的效果结算
export function resolveChoice(st, ev, option) {
  st.pendingChoices = st.pendingChoices.filter(e => e !== ev);
  const eff = option.effect || {};
  applyEffect(st, eff);
  if (option.setSchool !== undefined) {
    st.inSchool = option.setSchool;
    if (option.setSchool) st.degree = st.age >= 15 ? '高中' : '初中';
    else if (!option.setVocational) st.degree = st.age >= 15 ? '（辍学）' : '小学';
  }
  if (option.setVocational) st.degree = '职业学校';
  if (option.setDegree) st.degree = option.setDegree;
  if (option.job !== undefined) { st.job = option.job; st.income = option.income || 0; }
  if (option.marry) st.marry();
  if (option.haveChild) st.haveChild();
  if (option.childcareDone) st.childcareDone = true;
  if (option.jobBreak) st.income = Math.round(st.income * 0.3);
  if (option.buyHouse) st.house = true;
  if (option.retire !== undefined) st.retired = option.retire;
  if (option.raiseIncome) st.income = Math.round(st.income * (1 + option.raiseIncome));

  // 记录时间线
  st.timeline.push({
    age: st.age, year: st.birthYear + st.age,
    text: `${option.outcome}`, source: ev.source || null, negative: totalEffect(eff) < 0,
  });
}

// 自动事件（log 类）结算
function applyLogEvent(st, ev) {
  const eff = {};
  // 文本填充
  let text = ev.text;
  const fills = {};
  if (ev.fill) {
    for (const [k, arr] of Object.entries(ev.fill)) fills[k] = arr[st.rng.int(0, arr.length)];
  }
  if (ev.moneyText) {
    for (const [k, [lo, hi]] of Object.entries(ev.moneyText)) fills[k] = st.rng.int(lo, hi);
  }
  text = text.replace(/\{(\w+)\}/g, (_, k) => fills[k] ?? st[k] ?? '?');
  if (ev.applyRaise) {
    const raise = Math.round(st.income * 0.2);
    st.income += raise;
    text = text.replace('{raise}', String(st.rng.int(2000, 8000)));
  }
  if (ev.action) ev.action(st);
  applyEffect(st, ev.effect || {});
  st.timeline.push({ age: st.age, year: st.birthYear + st.age, text, source: ev.source || null, negative: totalEffect(ev.effect || {}) < 0 });
}

function applyFocus(st) {
  const f = st.focus;
  if (!f) return;
  const d = {
    study: { know: 1, hap: 1 }, social: { rel: 2, hap: 1 }, family: { rel: 1, know: -1 },
    sport: { hp: 2 }, hobby: { hap: 2 },
  }[f];
  if (d) for (const [k, v] of Object.entries(d)) st.stats[k === 'know' ? 'know' : k] = clamp(st.stats[k === 'know' ? 'know' : k] + v);
}

function applyEconomy(st) {
  const c = COUNTRIES[st.country];
  if (st.age <= 17) {
    // 未成年：家境决定供养，学费开销
    const support = Math.round(c.gdpPpp * c.livingCostBase * (0.4 + st.wealthIdx * 0.15));
    st.money += Math.round(support * 0.2); // 简化：家庭结余的一部分算给孩子
    st.stats.money = st.money;
    return;
  }
  const income = st.retired ? Math.round(c.gdpPpp * 0.15) : st.income;
  const cost = Math.round(c.gdpPpp * c.livingCostBase * (0.6 + st.wealthIdx * 0.1) / 5);
  st.money += income - cost;
  st.yearlyIncome = income;
  st.yearlyCost = cost;
}

function die(st) {
  st.alive = false;
  const country = COUNTRIES[st.country];
  const causes = country.causes;
  const idx = st.rng.weighted(causes.map(c => c[1]));
  let cause = causes[idx][0];
  // 婴幼儿期死因替换（真实统计：新生儿与感染性疾病为主）
  if (st.age <= 4) {
    cause = st.rng.chance(0.6) ? '新生儿疾病' : (st.country === 'india' ? '腹泻性疾病' : '意外窒息');
  }
  st.deathInfo = { age: st.age, year: st.birthYear + st.age, cause };
}

function pickDistinct(pool, n, rng) {
  const arr = [...pool];
  const out = [];
  while (out.length < n && arr.length) {
    const i = rng.weighted(arr.map(() => 1));
    out.push(arr.splice(i, 1)[0]);
  }
  return out;
}

function applyEffect(st, eff) {
  for (const [k, v] of Object.entries(eff)) {
    if (k === 'money') { st.money += v; continue; }
    if (k in st.stats) st.stats[k] = clamp(st.stats[k] + v);
  }
}

function totalEffect(eff) {
  return (eff.hp || 0) + (eff.hap || 0) + (eff.know || 0) + (eff.rel || 0);
}

const clamp = (v) => Math.max(0, Math.min(100, v));

// 生平总结（死亡纪录用）
export function summarize(st) {
  const parts = [];
  parts.push(`出生在${st.countryName}的${st.region === '城市' ? '城市' : '乡村'}一个${st.wealth}的家庭，是个${st.gender === 'male' ? '男孩' : '女孩'}。`);
  parts.push(schoolSummary(st));
  if (st.job) parts.push(`当${st.job}${st.retired ? '直到退休' : ''}。`);
  if (st.spouse) parts.push(`与${st.spouse}共同生活。`);
  if (st.children.length) parts.push(`养育了${st.children.length}个孩子。`);
  return parts.join('');
}

function schoolSummary(st) {
  if (st.degree === '学龄前') return '';
  const map = { '（辍学）': '中途辍学', '职业学校': '读了职业学校', '大学': '读完大学' };
  return (map[st.degree] || `读了${st.degree}`) + '。';
}
