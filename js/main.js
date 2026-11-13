// 入口与流程编排：首页 → 出生卡 → 游戏 → 死亡
import { makeRng, randomSeed } from './rng.js';
import { rollBirth, birthCardNo } from './engine/birth.js';
import { createLifeState, advanceYear, resolveChoice } from './engine/life.js';
import { renderHome, renderBirthCard, renderGameShell, renderEnd, updateGame, showChoice, renderFocus, showReflect, renderPeers } from './ui/render.js';
import { applyEraTheme, resetEraTheme } from './ui/era-themes.js';

let st = null;
let peers = [];      // 同龄人陪跑（同秒出生的另外 4 个婴儿）
let speed = 1;
let timer = null;
let autoMode = false;
const REFLECT_AGES = [5, 15, 30, 50, 70];

// ── 首页 ──
function goHome() {
  stopLoop();
  resetEraTheme();
  renderHome((year) => goBirthCard(year));
}

// ── 出生抽签 → 登记卡 ──
function goBirthCard(year) {
  const rng = makeRng(randomSeed());
  const birthYear = year || new Date().getFullYear();
  applyEraTheme(birthYear);
  const birth = rollBirth(rng, birthYear);
  st = createLifeState(birth);
  const no = birthCardNo(rng, st.code, birthYear);
  st.cardNo = no;
  // 同龄人陪跑：同一秒出生的另外 4 个婴儿（全球随机，独立人生；历史世界同年代）
  peers = [];
  for (let i = 0; i < 4; i++) {
    const pb = rollBirth(makeRng(randomSeed()), birthYear);
    peers.push(createLifeState(pb));
  }
  renderBirthCard(birth, no, () => goGame());
}

// ── 游戏主界面 ──
function goGame() {
  renderGameShell(st, {
    onSpeed: setSpeed,
    onStep: stepToChoice,
    onAuto: toggleAuto,
  });
  updateGame(st);
  renderPeers(peers);
  startLoop();
}

function setSpeed(s) { speed = s; restartLoop(); }

function startLoop() {
  stopLoop();
  const interval = Math.round(1100 / speed); // 1× 约 1.1 秒一年
  timer = setInterval(tickYear, interval);
}

function restartLoop() {
  if (st && st.alive) startLoop();
}

function stopLoop() {
  if (timer) { clearInterval(timer); timer = null; }
}

// 每一帧：推进一年（若有未决抉择则跳过，等待玩家）
function tickYear() {
  if (!st.alive) return;
  if (st.awaitChoice) return; // 抉择弹窗打开中，暂停推进
  doYear();
}

function doYear() {
  const r = advanceYear(st);
  // 同龄人同步推进（纯模拟：自动选第一选项、无 UI）
  for (const p of peers) {
    if (!p.alive) continue;
    let guard = 0;
    while (p.alive && guard++ < 6) {
      const pr = advanceYear(p);
      if (pr.choice) { resolveChoice(p, pr.choice, pr.choice.options[0]); continue; }
      if (pr.died) { p.alive = false; break; }
      break;
    }
    if (p.alive === false && p.deathInfo) p.alive = false;
  }
  renderPeers(peers);
  if (r.died) { onDeath(); return; }
  // 反思暂停点：5/15/30/50/70 岁（auto 模式下不暂停，仅标记）
  if (REFLECT_AGES.includes(st.age) && !st.reflectDone?.has(st.age)) {
    st.reflectDone = st.reflectDone || new Set();
    st.reflectDone.add(st.age);
    if (!autoMode) {
      stopLoop();
      showReflect(st, () => startLoop());
      return;
    }
  }
  if (r.choice) {
    st.awaitChoice = true;
    stopLoop();
    showChoice(st, r.choice, (option) => {
      resolveChoice(st, r.choice, option);
      st.awaitChoice = false;
      // 抉择内死亡（如手术失败）
      if (st.diedInChoice) {
        st.alive = false;
        st.deathInfo = { age: st.age, year: st.birthYear + st.age, cause: '手术并发症' };
        updateGame(st);
        onDeath();
        return;
      }
      updateGame(st);
      if (!st.alive) { onDeath(); return; }
      startLoop();
    });
    updateGame(st);
    // 自动抉择：弹窗后自动选第一个选项
    if (autoMode) setTimeout(resolvePendingAuto, 500);
    return;
  }
  updateGame(st);
  // 自动模式：成年后每年自动换重心
  if (autoMode && st.age >= 3) autoPickFocus();
}

// 「下一件大事」：快转到下一个抉择
function stepToChoice() {
  stopLoop();
  let guard = 0;
  const step = () => {
    guard += 1;
    if (guard > 130 || !st.alive) { if (!st.alive) onDeath(); return; }
    const r = advanceYear(st);
    for (const p of peers) {
      if (!p.alive) continue;
      let g2 = 0;
      while (p.alive && g2++ < 6) {
        const pr = advanceYear(p);
        if (pr.choice) { resolveChoice(p, pr.choice, pr.choice.options[0]); continue; }
        if (pr.died) { p.alive = false; break; }
        break;
      }
    }
    renderPeers(peers);
    if (r.died) { updateGame(st); onDeath(); return; }
    // 反思暂停点（step 与 auto 均生效）
    if (REFLECT_AGES.includes(st.age) && !st.reflectDone?.has(st.age)) {
      st.reflectDone = st.reflectDone || new Set();
      st.reflectDone.add(st.age);
      updateGame(st);
      showReflect(st, () => { if (autoMode) startLoop(); });
      return;
    }
    if (r.choice) {
      updateGame(st);
      st.awaitChoice = true;
      showChoice(st, r.choice, (option) => {
        resolveChoice(st, r.choice, option);
        st.awaitChoice = false;
        updateGame(st);
        if (!st.alive) onDeath();
      });
      // 自动抉择：弹窗后延迟片刻自动选第一个选项
      if (autoMode) setTimeout(resolvePendingAuto, 500);
      return;
    }
    updateGame(st);
    setTimeout(step, 40); // 快速连续推进
  };
  step();
}

// 自动抉择模式
function toggleAuto() {
  autoMode = !autoMode;
  document.getElementById('btn-auto').classList.toggle('on', autoMode);
  if (autoMode && st.awaitChoice) resolvePendingAuto();
}

// 弹窗开着时开启自动 → 直接选第一项
function resolvePendingAuto() {
  const btn = document.querySelector('.cc-opt');
  if (btn) btn.click();
}

function autoPickFocus() {
  const keys = ['study', 'social', 'family', 'sport', 'hobby'];
  st.focus = keys[Math.floor(Math.random() * keys.length)];
  renderFocus(st);
}

// ── 死亡 ──
function onDeath() {
  stopLoop();
  updateGame(st);
  // 墨色晕开过场（v0.9.3）：1.4s 动画结束后移除 veil
  const veil = document.createElement('div');
  veil.className = 'ink-veil';
  document.body.appendChild(veil);
  veil.addEventListener('animationend', () => veil.remove());
  setTimeout(() => veil.remove(), 2000);
  renderEnd(st, () => goHome(), peers);
}

goHome();
