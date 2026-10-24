// UI 渲染层：所有 DOM 绘制
import { COUNTRIES } from '../data/countries.js';
import { summarize } from '../engine/life.js';

const $app = () => document.getElementById('app');
const $modal = () => document.getElementById('modal-root');

export const FOCUS_LABELS = {
  study: '读书', social: '朋友·玩耍', family: '帮家里', sport: '运动', hobby: '兴趣',
};

const esc = (s) => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

// ── 首页 ──
export function renderHome(onBirth) {
  $app().innerHTML = `
  <div class="screen-home">
    <div class="home-hero">
      <div class="kicker">人生模拟 · 随机出生 · 基于真实统计</div>
      <h1 class="hero-title">八十亿分之一</h1>
      <p class="hero-sub">就在此刻，每秒大约有四个婴儿诞生。你将成为其中一个，把仅此一次的人生走到最后。<br>在哪里出生、成为谁的孩子，都无法选择。就像你当初一样。</p>
      <button class="btn-birth" id="btn-birth">出　生</button>
      <p class="home-note">复刻研究版 · 数据近似整理自 UN WPP 2024 / WHO / 世界银行 · 目前覆盖中国与印度</p>
    </div>
    <div class="home-distro">
      <h2>如果你是此刻出生的婴儿</h2>
      ${Object.values(COUNTRIES).map(c => `
        <div class="distro-row">
          <span class="d-name">${c.name}</span>
          <div class="d-bar"><i style="width:${c.birthShare * 5}%"></i></div>
          <span class="d-pct">${c.birthShare}%</span>
        </div>`).join('')}
      <div class="distro-row">
        <span class="d-name">其余国家与地区</span>
        <div class="d-bar"><i style="width:${(100 - 24.3) * 0.95}%"></i></div>
        <span class="d-pct">75.7%</span>
      </div>
      <p class="src">全球 2023 年出生约 1.32 亿人（UN《世界人口展望 2024》）</p>
    </div>
  </div>`;
  document.getElementById('btn-birth').onclick = onBirth;
}

// ── 出生登记卡 ──
export function renderBirthCard(b, cardNo, onStart) {
  const g = b.gender === 'male' ? '男孩' : '女孩';
  $app().innerHTML = `
  <div class="screen-birth">
    <div class="birth-card">
      <div class="bc-head"><span class="t">出生登记</span><span class="no">No. ${cardNo}</span></div>
      <div class="bc-name">${esc(b.name)}</div>
      <p class="bc-desc">${b.birthYear} 年，${b.countryName}${b.region}，${esc(b.father.job)}与${esc(b.mother.job)}的家庭，是个${g}。</p>
      <div class="bc-grid">
        <div><i>性别</i><b>${g}</b></div>
        <div><i>出生国家</i><b>${b.countryName}</b></div>
        <div><i>出生地</i><b>${b.region}</b></div>
        <div><i>家境</i><b>${b.wealth}</b></div>
        <div><i>父亲</i><b>${esc(b.father.name)} · ${b.father.age}岁</b></div>
        <div><i>母亲</i><b>${esc(b.mother.name)} · ${b.mother.age}岁</b></div>
        <div><i>信仰</i><b>${b.religion}</b></div>
        <div><i>平均寿命</i><b>${b.lifeExpectancy}岁</b></div>
      </div>
      <div class="bc-note">家境：五分位中的第 ${b.wealthIdx + 1} 位 · 人均 GDP ${b.gdpPpp.toLocaleString()} 国际元（PPP）</div>
      <button class="btn-continue" id="btn-start">继续</button>
    </div>
  </div>`;
  document.getElementById('btn-start').onclick = onStart;
}

// ── 游戏主界面骨架 ──
export function renderGameShell(st, handlers) {
  $app().innerHTML = `
  <div class="screen-game">
    <header class="topbar">
      <div class="tb-logo">八十亿分之一</div>
      <div class="tb-age"><b id="hud-age">${st.age}岁</b><span id="hud-year">${st.birthYear + st.age}年</span><span class="tb-name">${esc(st.name)}</span></div>
      <div class="tb-ctrl">
        <button data-speed="1" class="spd on">1×</button>
        <button data-speed="2" class="spd">2×</button>
        <button data-speed="4" class="spd">4×</button>
        <button data-speed="8" class="spd">8×</button>
        <button id="btn-step">下一件大事 »</button>
        <button id="btn-auto">自动抉择</button>
      </div>
    </header>
    <main class="game-main">
      <aside class="col-left">
        <div class="panel id-card">
          <div class="p-head"><span>身份纪录</span><b>${st.code} ${st.birthYear}</b></div>
          <div class="id-name">${esc(st.name)}</div>
          <div class="id-rows">
            <div><i>性别</i><b>${st.gender === 'male' ? '男' : '女'}</b></div>
            <div><i>居住</i><b>${st.countryName}·${st.region}</b></div>
            <div><i>学历</i><b id="id-degree">${st.degree}</b></div>
            <div><i>职业</i><b id="id-job">${st.job || '—'}</b></div>
          </div>
          <div class="mrz">I&lt;${st.code}${esc(st.name.replace(/\s/g, '<<').toUpperCase())}<<<<</div>
        </div>
        <div class="panel stats-panel">
          <div class="p-head"><span>状态</span><b>0 - 100</b></div>
          ${statRow('hp', '健康', st.stats.hp, 'var(--green)')}
          ${statRow('hap', '幸福', st.stats.hap, 'var(--gold)')}
          ${statRow('know', '知识', st.stats.know, '#3b5a7a')}
          ${statRow('rel', '人际关系', st.stats.rel, 'var(--accent)')}
        </div>
        <div class="panel money-panel">
          <div class="p-head"><span>净資產</span><b>PPP 换算</b></div>
          <div class="money-big" id="money-num">${fmtMoney(st.money)}</div>
          <div class="money-sub" id="money-detail">年收入 <span id="income-num">${fmtMoney(st.yearlyIncome || 0)}</span> · 年支出 <span id="cost-num">${fmtMoney(st.yearlyCost || 0)}</span></div>
        </div>
      </aside>
      <section class="col-center">
        <div class="scene-box">
          <div id="scene-art" class="scene-art"></div>
          <div class="scene-cap" id="scene-cap">${st.countryName}·${st.region} · 与家人同住</div>
        </div>
        <div class="focus-box" id="focus-box"></div>
        <div class="timeline-box">
          <div class="p-head"><span>人生纪录</span><b id="tl-count">0 条</b></div>
          <div class="timeline" id="timeline"></div>
        </div>
      </section>
      <aside class="col-right">
        <div class="panel family-panel">
          <div class="p-head"><span>家人與生活</span></div>
          <div id="family-rows"></div>
        </div>
        <div class="panel map-panel">
          <div class="p-head"><span>人生地圖</span><b>一格 = 1 年</b></div>
          <div class="life-map" id="life-map"></div>
        </div>
      </aside>
    </main>
  </div>`;
  bindGameControls(handlers);
}

function statRow(key, label, val, color) {
  return `<div class="stat-row">
    <span class="s-lbl">${label}</span>
    <div class="s-bar"><i id="bar-${key}" style="width:${val}%; background:${color}"></i></div>
    <span class="s-num" id="num-${key}">${val}</span>
  </div>`;
}

// 每年刷新动态区域（不重建整页，保持滚动位置）
export function updateGame(st) {
  document.getElementById('hud-age').textContent = `${st.age}岁`;
  document.getElementById('hud-year').textContent = `${st.birthYear + st.age}年`;
  for (const k of ['hp', 'hap', 'know', 'rel']) {
    document.getElementById(`bar-${k}`).style.width = st.stats[k] + '%';
    document.getElementById(`num-${k}`).textContent = st.stats[k];
  }
  document.getElementById('money-num').textContent = fmtMoney(st.money);
  document.getElementById('income-num').textContent = fmtMoney(st.yearlyIncome || 0);
  document.getElementById('cost-num').textContent = fmtMoney(st.yearlyCost || 0);
  const deg = document.getElementById('id-degree'); if (deg) deg.textContent = st.degree;
  const job = document.getElementById('id-job'); if (job) job.textContent = st.job || '—';
  renderTimeline(st);
  renderFamily(st);
  renderMap(st);
  renderFocus(st);
  drawScene(st);
}

export function renderFocus(st) {
  const box = document.getElementById('focus-box');
  if (!box) return;
  if (st.age < 3) { box.innerHTML = ''; return; }
  box.innerHTML = `<div class="p-head"><span>今年的重心</span></div>
    <div class="focus-chips">${Object.entries(FOCUS_LABELS).map(([k, v]) =>
      `<button class="chip ${st.focus === k ? 'on' : ''}" data-focus="${k}">${v}</button>`).join('')}</div>`;
  box.querySelectorAll('.chip').forEach(ch => {
    ch.onclick = () => { st.focus = ch.dataset.focus; renderFocus(st); };
  });
}

// 程序化像素场景：随年龄段变化（零外部资源）
export function drawScene(st) {
  const el = document.getElementById('scene-art');
  if (!el) return;
  const age = st.age;
  const urban = st.region === '城市';
  // 调色（城乡/昼夜简化）
  const sky = urban ? '#cfd9e2' : '#dfe8d9';
  const ground = urban ? '#9aa0a6' : '#8fae72';
  const house = urban ? '#7a8494' : '#c4a06a';
  const roof = urban ? '#4a525c' : '#8a4f3a';
  // 人：0-2 襁褓 3-12 小人 13-59 成人 60+ 驼背
  const p = (x, y, s) => {
    const h = s === 'baby' ? 5 : s === 'kid' ? 9 : 13;
    return `<rect x="${x}" y="${y - h}" width="5" height="${h}" fill="#3a3f45"/>
      <rect x="${x + 1}" y="${y - h - 4}" width="4" height="4" fill="#e8c49a"/>`;
  };
  const isBaby = age < 3, isKid = age >= 3 && age < 13, isOld = age >= 60;
  const svg = `<svg viewBox="0 0 320 210" shape-rendering="crispEdges">
    <rect x="0" y="0" width="320" height="140" fill="${sky}"/>
    <rect x="0" y="140" width="320" height="70" fill="${ground}"/>
    <rect x="248" y="96" width="54" height="44" fill="${house}"/>
    <rect x="244" y="88" width="62" height="10" fill="${roof}"/>
    <rect x="266" y="116" width="12" height="24" fill="#5a4632"/>
    ${urban ? `<rect x="30" y="70" width="26" height="70" fill="#8a929c"/><rect x="64" y="90" width="20" height="50" fill="#7a8494"/><rect x="36" y="78" width="5" height="6" fill="#e8d9a0"/><rect x="44" y="78" width="5" height="6" fill="#e8d9a0"/>` : `<rect x="34" y="104" width="6" height="36" fill="#6a5236"/><circle cx="37" cy="98" r="12" fill="#6f9a54"/>`}
    ${isBaby ? `<rect x="150" y="132" width="12" height="9" fill="#d8d2c6"/><rect x="153" y="128" width="5" height="4" fill="#e8c49a"/>`
      : isKid ? p(152, 140, 'kid') : p(150, 140, 'adult')}
    ${!isBaby && st.spouse ? p(162, 140, 'adult') : ''}
    ${st.children.length && age > 30 ? p(176, 140, 'kid') : ''}
  </svg>`;
  el.innerHTML = svg;
  const cap = document.getElementById('scene-cap');
  if (cap) cap.textContent = `${st.countryName}·${st.region}${isBaby ? ' · 襁褓之中' : isOld ? ' · 晚年' : ''} · ${st.inSchool ? '在学' : st.job ? st.job : '与家人同住'}`;
}

function renderTimeline(st) {
  const el = document.getElementById('timeline');
  const items = st.timeline.slice().reverse().map(t => `
    <div class="tl-item ${t.negative ? 'neg' : ''}">
      <b class="tl-age">${t.age}岁</b>
      <div class="tl-body"><p>${esc(t.text)}</p>${t.source ? `<p class="tl-src">資料：${esc(t.source)}</p>` : ''}</div>
    </div>`).join('');
  el.innerHTML = items;
  document.getElementById('tl-count').textContent = `${st.timeline.length} 条`;
}

function renderFamily(st) {
  const rows = [];
  const f = st.father.alive ? `父亲 ${esc(st.father.name)} · ${st.father.age}岁` : `父亲（已故）`;
  const m = st.mother.alive ? `母亲 ${esc(st.mother.name)} · ${st.mother.age}岁` : `母亲（已故）`;
  rows.push(`<div class="fam-row"><i>父母</i><b>${f}<br>${m}</b></div>`);
  if (st.siblings.length) rows.push(`<div class="fam-row"><i>兄弟姐妹</i><b>${st.siblings.map(s => `${s.gender === 'male' ? '哥' : '姐'}·${s.age}岁`).join('、')}</b></div>`);
  if (st.spouse) rows.push(`<div class="fam-row"><i>配偶</i><b>${esc(st.spouse)} · ${st.spouseAge || st.age}岁</b></div>`);
  if (st.children.length) rows.push(`<div class="fam-row"><i>子女</i><b>${st.children.map(c => `${c.name}·${c.age}岁`).join('、')}</b></div>`);
  document.getElementById('family-rows').innerHTML = rows.join('');
}

function renderMap(st) {
  const el = document.getElementById('life-map');
  let cells = '';
  for (let i = 0; i < st.age; i++) cells += `<i class="cell done"></i>`;
  cells += `<i class="cell cur"></i>`;
  el.innerHTML = cells;
  // 老人格数多：自动滚动到当前格
  el.parentElement.scrollLeft = 99999;
}

// 抉择弹窗
export function showChoice(st, ev, onPick) {
  const text = ev.text.replace(/\{name\}/g, st.name);
  $modal().innerHTML = `
  <div class="overlay">
    <div class="choice-card">
      <div class="cc-head"><span class="t">重大抉择</span><b>${st.age}岁 · ${st.birthYear + st.age}年</b></div>
      <h3 class="cc-title">${esc(ev.title)}</h3>
      <p class="cc-text">${esc(text)}</p>
      ${ev.source ? `<div class="cc-src">${esc(ev.source)}</div>` : ''}
      <div class="cc-options">
        ${ev.options.map((o, i) => `
          <button class="cc-opt" data-i="${i}">
            <b>${i + 1}</b><span>${esc(o.label)}</span>
          </button>`).join('')}
      </div>
    </div>
  </div>`;
  $modal().querySelectorAll('.cc-opt').forEach(btn => {
    btn.onclick = () => {
      $modal().innerHTML = '';
      onPick(ev.options[Number(btn.dataset.i)]);
    };
  });
}

// 死亡纪录
export function renderEnd(st, onRestart) {
  const d = st.deathInfo;
  $app().innerHTML = `
  <div class="screen-end">
    <div class="end-card">
      <div class="end-head"><span class="t">死亡纪录 · RECORD OF DEATH</span><span>No. ${st.cardNo || st.code + '-' + d.year}</span></div>
      <div class="end-life">
        <div class="name">${esc(st.name)}</div>
        <div class="span">${st.birthYear} – ${d.year} · 享年${d.age}岁 · ${st.countryName}${st.region}</div>
        <p class="story">${esc(summarize(st))}</p>
        <div class="end-cause">${d.age}岁時因<b>${esc(d.cause)}</b>离开了人世。</div>
      </div>
      <div class="end-foot"><button class="btn-birth" id="btn-again">再次出生</button></div>
    </div>
  </div>`;
  document.getElementById('btn-again').onclick = onRestart;
}

function bindGameControls(handlers) {
  document.querySelectorAll('.spd').forEach(b => {
    b.onclick = () => {
      document.querySelectorAll('.spd').forEach(x => x.classList.remove('on'));
      b.classList.add('on');
      handlers.onSpeed(Number(b.dataset.speed));
    };
  });
  document.getElementById('btn-step').onclick = handlers.onStep;
  document.getElementById('btn-auto').onclick = handlers.onAuto;
}

const fmtMoney = (n) => {
  const v = Math.round(n);
  if (Math.abs(v) >= 10000) return (v / 10000).toFixed(1) + '万';
  return String(v);
};
