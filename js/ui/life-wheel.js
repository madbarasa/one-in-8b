// 生命年轮 v0.9.0：结算页同心圆可视化
// 中心=出生，向外一圈十年；每年一段弧，金色好年/朱红坏年/淡墨空白年
// 重大事件（里程碑/婚姻/丧偶/迁移）在环上打点，时代事件打金点（v0.9.4），图例在下方
import { ERA_TITLES, eraShortTitle } from '../data/events_era.js';

const C = { pos: '#E8B04B', neg: '#B3352C', base: '#d8d0bd', mark: '#1D4E5F', text: '#5a6068' };

const polar = (cx, cy, r, deg) => {
  const a = (deg - 90) * Math.PI / 180;
  return [cx + r * Math.cos(a), cy + r * Math.sin(a)];
};

// 每年弧段 path
function arcPath(cx, cy, r, degStart, degEnd) {
  const [x1, y1] = polar(cx, cy, r, degStart);
  const [x2, y2] = polar(cx, cy, r, degEnd);
  const large = degEnd - degStart > 180 ? 1 : 0;
  return `M ${x1.toFixed(1)} ${y1.toFixed(1)} A ${r} ${r} 0 ${large} 1 ${x2.toFixed(1)} ${y2.toFixed(1)}`;
}

// 事件正负判定：按当年事件净效果分色（大喜金/大难朱红/日常平静淡墨）
function yearTone(t) {
  const net = t.net == null ? (t.negative ? -3 : 3) : t.net;
  if (net <= -3) return 'neg';
  if (net >= 3) return 'pos';
  return 'base';
}

export function lifeWheelSVG(st) {
  const span = st.deathInfo ? st.deathInfo.age : st.age;
  const rings = Math.max(1, Math.ceil((span + 1) / 10));
  const size = 340, cx = size / 2, cy = size / 2 + 4;
  const rMin = 30, rStep = 13;
  const byAge = new Map();
  for (const t of st.timeline) {
    const cur = byAge.get(t.age) || { pos: 0, neg: 0, t: null };
    if (t.negative) cur.neg++; else cur.pos++;
    if (!cur.t || (cur.t.weight || 0) < (t.weight || 0)) cur.t = t;
    byAge.set(t.age, cur);
  }
  // 重大事件标记：里程碑/婚姻/生育/丧偶/迁移（优先取一条）+ 时代事件（era- 前缀，金色）
  const marks = [];
  for (const t of st.timeline) {
    const big = t.milestone || /婚姻|结婚|孩子|丧|离世|移民|搬|战争|灾害/.test(t.text || '');
    if (big && t.age > 0) marks.push(t);
  }
  const seen = new Set();
  const uniqMarks = marks.filter(t => { const k = t.age + '/' + (t.text || '').slice(0, 6); if (seen.has(k)) return false; seen.add(k); return true; }).slice(0, 8);
  // 时代印记点（v0.9.4）：era- 事件在年轮上打金点，tooltip 显示标题
  const eraMarks = [];
  const seenEra = new Set();
  for (const t of st.timeline) {
    if (t.id && t.id.startsWith('era-') && !seenEra.has(t.id)) {
      seenEra.add(t.id);
      eraMarks.push({ age: t.age, title: (ERA_TITLES && ERA_TITLES[t.id]) || eraShortTitle(t.text) });
    }
  }

  let s = `<svg viewBox="0 0 ${size} ${size}" width="100%" class="life-wheel">`;
  // 十年刻度细环
  for (let i = 0; i < rings; i++) {
    const r = rMin + i * rStep;
    s += `<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="#e8e2d0" stroke-width="1"/>`;
  }
  // 逐年弧段
  for (let a = 0; a <= span; a++) {
    const ring = Math.floor(a / 10);
    const r = rMin + ring * rStep;
    const d0 = (a % 10) * 36, d1 = ((a % 10) + 1) * 36;
    const tone = yearTone(byAge.get(a)?.t || {});
    s += `<path d="${arcPath(cx, cy, r, d0 + 1.5, d1 - 1.5)}" stroke="${C[tone]}" stroke-width="${tone === 'base' ? 5 : 9}" fill="none" stroke-linecap="butt"/>`;
  }
  // 终点：年龄数字
  const [ex, ey] = polar(cx, cy, rMin + Math.floor(span / 10) * rStep, (span % 10) * 36 + 18);
  s += `<circle cx="${ex.toFixed(1)}" cy="${ey.toFixed(1)}" r="4" fill="${C.mark}"/>`;
  // 重大事件点 + 年龄标签
  for (const t of uniqMarks) {
    const ring = Math.floor(t.age / 10);
    const r = rMin + ring * rStep;
    const deg = (t.age % 10) * 36 + 18;
    const [mx, my] = polar(cx, cy, r, deg);
    s += `<circle cx="${mx.toFixed(1)}" cy="${my.toFixed(1)}" r="3.5" fill="#fff" stroke="${C.mark}" stroke-width="1.6"/>`;
  }
  // 时代印记金点（v0.9.4）：外圈偏移 3 度避免与重大事件点重叠，hover 出标题
  for (const m of eraMarks) {
    const ring = Math.floor(m.age / 10);
    const r = rMin + ring * rStep;
    const deg = (m.age % 10) * 36 + 21;
    const [ex2, ey2] = polar(cx, cy, r, deg);
    s += `<circle cx="${ex2.toFixed(1)}" cy="${ey2.toFixed(1)}" r="2.8" fill="${C.pos}" stroke="#fff" stroke-width="0.8"><title>${esc(m.title)} · ${m.age} 岁</title></circle>`;
  }
  // 中心：年份起点
  s += `<text x="${cx}" y="${cy + 4}" text-anchor="middle" font-size="11" fill="${C.text}" font-family="monospace">0岁</text>`;
  s += `<text x="${cx}" y="${cy - (rMin + rings * rStep) - 6}" text-anchor="middle" font-size="12" fill="${C.text}" font-family="monospace">${span} 岁的一生</text>`;
  s += '</svg>';

  // 图例 + 重大事件清单
  const legend = uniqMarks.slice(0, 5).map(t => `<div class="wheel-mark"><i>●</i>${t.age} 岁 · ${esc(t.text.slice(0, 24))}</div>`).join('');
  return s + `<div class="wheel-legend">
    <div class="wheel-marks">${legend}</div>
    <div class="wheel-key"><span class="k-pos">好年</span><span class="k-neg">难年</span><span class="k-base">平静年</span></div>
  </div>`;
}

const esc = s => String(s == null ? '' : s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
