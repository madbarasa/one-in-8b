// 入口与流程编排：首页 → 出生卡 → 游戏 → 死亡
import { makeRng, randomSeed } from './rng.js';
import { rollBirth, birthCardNo } from './engine/birth.js';
import { createLifeState, advanceYear, resolveChoice } from './engine/life.js';
import { renderHome, renderBirthCard, renderGameShell, renderEnd, updateGame, showChoice, renderFocus } from './ui/render.js';

let st = null;
let speed = 1;
let timer = null;
let autoMode = false;

// ── 首页 ──
function goHome() {
  stopLoop();
  renderHome(() => goBirthCard());
}

// ── 出生抽签 → 登记卡 ──
function goBirthCard() {
  const rng = makeRng(randomSeed());
  const year = new Date().getFullYear();
  const birth = rollBirth(rng, year);
  st = createLifeState(birth);
  const no = birthCardNo(rng, st.code, year);
  st.cardNo = no;
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
  if (r.died) { onDeath(); return; }
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
    if (r.died) { updateGame(st); onDeath(); return; }
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
  renderEnd(st, () => goHome());
}

goHome();
