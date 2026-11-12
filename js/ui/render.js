// UI 渲染层：所有 DOM 绘制
import { COUNTRIES } from '../data/countries.js';
import { summarize } from '../engine/life.js';
import { avatarSVG, sceneSVG, crowdSVG, tombstoneSVG } from './pixel.js';

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
      <div class="world-counter">
        <div class="wc-cell"><b id="wc-born">0</b><span>打开页面以来出生的婴儿</span></div>
        <div class="wc-cell"><b id="wc-dead">0</b><span>同期离开这个世界的人</span></div>
      </div>
      <div class="era-picker">
        <label>出生年代：<b id="era-label">今日世界（2026）</b></label>
        <input type="range" id="era-slider" min="1950" max="2026" value="2026" step="1" />
        <div class="era-marks"><span>1950</span><span>1975</span><span>2000</span><span id="era-mark-now">2026</span></div>
        <p class="era-note" id="era-note">默认投生此刻。拖动滑块，你可以选择出生在过去的任何一个年份——按那一年的真实统计出生、成长、老去。</p>
      </div>
      <button class="btn-birth" id="btn-birth">出　生</button>
      <div class="hero-crowd" title="五国群像">${crowdSVG()}</div>
      <p class="home-note">复刻研究版 · 数据来自世界银行 API / UN WPP / WHO · 覆盖 217 个国家与地区 · 全球新生儿 100% 抽样空间</p>
      <div class="home-opts">
        <label class="opt-classroom"><input type="checkbox" id="opt-classroom"> 教室模式（缓和沉重主题，适合课堂）</label>
      </div>
    </div>
    <div class="home-distro">
      <h2>如果你是此刻出生的婴儿</h2>
      <p class="distro-sub">出生地按各国每年新生儿数量加权抽取——世界银行最新统计，覆盖 217 个国家与地区</p>
      <div class="distro-top">
      ${Object.values(COUNTRIES).filter(c => !c.generated).map(c => `
        <div class="distro-row">
          <span class="d-name">${c.name}</span>
          <div class="d-bar"><i style="width:${Math.max(2, c.birthShare * 5)}%"></i></div>
          <span class="d-pct">${c.birthShare}%</span>
        </div>`).join('')}
      <div class="distro-row">
        <span class="d-name">其余 212 个国家与地区</span>
        <div class="d-bar"><i style="width:${(100 - 35) * 0.95}%"></i></div>
        <span class="d-pct">65.3%</span>
      </div>
      </div>
      <p class="src">全球每年出生约 1.34 亿人（World Bank SP.DYN.CBRT.IN × SP.POP.TOTL，2024）</p>
    </div>
  </div>`;
  document.getElementById('btn-birth').onclick = () => {
    const year = +document.getElementById('era-slider').value;
    onBirth(year);
  };
  // 年代选择器文案
  const slider = document.getElementById('era-slider');
  slider.oninput = () => {
    const y = +slider.value;
    document.getElementById('era-label').textContent = y >= 2026 ? '今日世界（2026）' : y + ' 年的世界';
    const notes = {
      1950: '战后婴儿潮。全球预期寿命不到 50 岁，天花还没被根除。',
      1960: '非洲独立潮、太空竞赛、和大饥荒的记忆。',
      1975: '越南战争落幕，中国即将改革开放。',
      1990: '冷战结束、互联网黎明、天花已被根除。',
      2010: '智能手机时代的第一批孩子。',
    };
    const near = Object.keys(notes).map(Number).reduce((a, b) => Math.abs(b - y) < Math.abs(a - y) ? b : a);
    document.getElementById('era-note').textContent = y >= 2026
      ? '默认投生此刻。拖动滑块，你可以选择出生在过去的任何一个年份——按那一年的真实统计出生、成长、老去。'
      : '你将按 ' + y + ' 年的真实统计出生：当年的出生分布、预期寿命、婴儿死亡率。活得过童年，才谈得上人生。';
  };
  // 实时世界计数器：全球每秒出生约 4.25、死亡约 1.96（世行口径折算）
  let born = 0, dead = 0;
  const elB = document.getElementById('wc-born'), elD = document.getElementById('wc-dead');
  window.__wcTimer = setInterval(() => {
    if (!elB) { clearInterval(window.__wcTimer); return; }
    born += 4.25; dead += 1.96;
    elB.textContent = Math.floor(born).toLocaleString();
    elD.textContent = Math.floor(dead).toLocaleString();
  }, 1000);
  // 教室模式开关
  const cb = document.getElementById('opt-classroom');
  cb.checked = localStorage.getItem('onein8b_classroom') === '1';
  cb.onchange = () => localStorage.setItem('onein8b_classroom', cb.checked ? '1' : '0');
}

// ── 出生登记卡 ──
export function renderBirthCard(b, cardNo, onStart) {
  const g = b.gender === 'male' ? '男孩' : '女孩';
  $app().innerHTML = `
  <div class="screen-birth">
    <div class="birth-card">
      <div class="bc-head"><span class="t">出生登记</span><span class="no">No. ${cardNo}</span></div>
      <div class="bc-name">${esc(b.name)}</div>
      ${b.historical ? `<span class="bc-era-tag">${b.birthYear} 年 · 历史世界</span>` : ''}
      <div class="bc-avatar" title="${b.countryName}${b.region}的婴儿">${avatarSVG(b.country, b.gender, 'baby', 72, b.group)}</div>
      <p class="bc-desc">${b.birthYear} 年，${b.countryName}${b.region}，${esc(b.father.job)}与${esc(b.mother.job)}的家庭，是个${g}。</p>
      <div class="bc-grid">
        <div><i>性别</i><b>${g}</b></div>
        <div><i>出生国家</i><b>${b.countryName}</b></div>
        <div><i>出生地</i><b>${b.region}</b></div>
        <div><i>家境</i><b>${b.wealth}</b></div>
        <div><i>家庭年收入</i><b>${b.household.ppp.toLocaleString()} PPP国际元</b></div>
        <div><i>按美国物价</i><b>≈ ${b.household.usd.toLocaleString()} 美元</b></div>
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
          <div class="id-avatar" id="id-avatar">${avatarSVG(st.country, st.gender, "baby", 44, st.group)}</div>
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
        <div class="panel peers-panel">
          <div class="p-head"><span>同一秒出生的他们</span><b>陪你走完一生</b></div>
          <div id="peers-list"></div>
        </div>
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
  // 头像随人生阶段更新
  const av = document.getElementById('id-avatar');
  if (av) av.innerHTML = avatarSVG(st.country, st.gender, stageOf(st.age), 44, st.group);
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

// 程序化像素场景：国家×城乡×人生阶段（v0.4.0 国别像素皮肤）
export function drawScene(st) {
  const el = document.getElementById('scene-art');
  if (!el) return;
  el.innerHTML = sceneSVG(st);
  const cap = document.getElementById('scene-cap');
  if (cap) {
    const isBaby = st.age < 3, isOld = st.age >= 60;
    cap.textContent = `${st.countryName}·${st.region}${isBaby ? ' · 襁褓之中' : isOld ? ' · 晚年' : ''} · ${st.inSchool ? '在学' : st.job ? st.job : '与家人同住'}`;
  }
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

// 年龄 → 人生阶段
function stageOf(age) {
  if (age < 3) return 'baby';
  if (age < 13) return 'kid';
  if (age < 18) return 'teen';
  if (age < 60) return 'adult';
  return 'old';
}

// 各国心理援助热线（求助资源行）
const HELPLINES = {
  china: '心理援助热线 12356 · 北京 010-82951332',
  usa: '988 Suicide & Crisis Lifeline（拨/发 988）',
  india: 'iCall +91 9152987821 · AASRA +91 9820466726',
  indonesia: 'Layanan konsili 119 ext 8',
  pakistan: 'Rozan UAN +92 51 111 533 533',
};

export function renderEnd(st, onRestart, peers) {
  const d = st.deathInfo;
  const peerRows = (peers || []).map(p => {
    const alive = p.alive;
    const age = alive ? p.age : (p.deathInfo ? p.deathInfo.age : p.age);
    return `<div class="peer-end-row"><span>${esc(p.name)} · ${esc(p.countryName)}</span><b>${alive ? '仍在人生路上（' + age + '岁）' : age + '岁离世'}</b></div>`;
  }).join('');
  const helpline = HELPLINES[st.country] || '全球求助目录 findahelpline.com';
  $app().innerHTML = `
  <div class="screen-end">
    <div class="end-card">
      <div class="end-head"><span class="t">死亡纪录 · RECORD OF DEATH</span><span>No. ${st.cardNo || st.code + '-' + d.year}</span></div>
      <div class="end-life">
        <div class="end-tomb">${tombstoneSVG(st)}</div>
        <div class="name">${esc(st.name)}</div>
        <div class="span">${st.birthYear} – ${d.year} · 享年${d.age}岁 · ${esc(st.countryName)}${st.region}</div>
        <p class="story">${esc(summarize(st))}</p>
        <div class="end-cause">${d.age}岁時因<b>${esc(d.cause)}</b>离开了人世。</div>
        <button class="btn-share" id="btn-share">保存人生海报</button>
        <div class="end-peers">
          <div class="p-head"><span>同一秒出生的他们</span></div>
          ${peerRows}
        </div>
        <p class="end-help">这个世界真实存在。如果你或你身边的人正经历艰难：${helpline}</p>
      </div>
      <div class="end-foot"><button class="btn-birth" id="btn-again">再次出生</button></div>
    </div>
  </div>`;
  document.getElementById('btn-again').onclick = onRestart;
  document.getElementById('btn-share').onclick = async e => {
    const btn = e.currentTarget;
    btn.disabled = true;
    btn.textContent = '正在绘制…';
    try {
      const { downloadShareCard } = await import('./share-card.js');
      await downloadShareCard(st);
      btn.textContent = '已保存 ✓';
    } catch (err) {
      btn.textContent = '生成失败';
      throw err;
    }
    setTimeout(() => { btn.disabled = false; btn.textContent = '保存人生海报'; }, 2500);
  };
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

// ── 同龄人陪跑面板 ──
export function renderPeers(peers) {
  const el = document.getElementById('peers-list');
  if (!el) return;
  el.innerHTML = peers.map((p, i) => {
    const alive = p.alive;
    const age = alive ? p.age : (p.deathInfo ? p.deathInfo.age : p.age);
    return `<div class="peer-row ${alive ? '' : 'dead'}">
      <span class="peer-dot"></span>
      <span class="peer-name">${esc(p.name)}</span>
      <span class="peer-country">${esc(p.countryName)}</span>
      <span class="peer-age">${alive ? age + '岁' : '卒于' + age + '岁'}</span>
    </div>`;
  }).join('');
}

// ── 反思暂停点 ──
const REFLECT_Q = [
  '此刻的TA，最需要的是什么？',
  '如果TA能许一个愿望，你觉得会是什么？',
  'TA的世界和你的世界，哪里最不一样？',
  '你觉得TA会怎么形容自己的童年？',
  '走到人生的这个节点，TA最感激谁？',
  '如果TA能对十年后的自己说一句话，会说什么？',
];

export function showReflect(st, onDone) {
  const q = REFLECT_Q[st.rng.int(0, REFLECT_Q.length)];
  $modal().innerHTML = `
  <div class="overlay">
    <div class="reflect-card">
      <div class="rc-head"><span class="t">人生暂停 · ${st.age}岁</span><b>${st.birthYear + st.age}年 · ${esc(st.countryName)}</b></div>
      <p class="rc-q">${q}</p>
      <textarea id="rc-input" rows="3" placeholder="写下你的想法（也可以留空，只是想一想）……"></textarea>
      <div class="rc-foot">
        <button class="cc-opt" id="rc-done">继续人生</button>
      </div>
      <p class="rc-note">同龄人的世界在继续：TA的一秒，也是你的一秒。</p>
    </div>
  </div>`;
  document.getElementById('rc-done').onclick = () => {
    const text = document.getElementById('rc-input').value.trim();
    if (text) {
      const store = JSON.parse(localStorage.getItem('onein8b_reflections') || '[]');
      store.push({ seed: st.cardNo, age: st.age, year: st.birthYear + st.age, country: st.countryName, q, text });
      localStorage.setItem('onein8b_reflections', JSON.stringify(store.slice(-50)));
    }
    $modal().innerHTML = '';
    onDone();
  };
}
