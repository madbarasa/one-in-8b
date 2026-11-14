// 分享卡片 v0.9.0：Canvas 绘「我这辈子」海报（1080×1440）
// 布局与配色参照 assets/art-reference/share-card-template.png（墨绿/奶白/暖金）
// 程序化重绘，不使用 AI 位图

import { avatarSVG } from './pixel.js';
import { ERA_TITLES, eraShortTitle } from '../data/events_era.js';

const C = {
  bg: '#F5EDD8',       // 奶白
  ink: '#1D4E5F',      // 墨绿
  ink2: '#5a6068',
  gold: '#E8B04B',     // 暖金
  red: '#b3352c',      // 朱红（负面）
  mid: '#c9bfa8',      // 中性淡
  paper: '#FBF6E9',
};

const esc = s => String(s == null ? '' : s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

// 生命周期色谱：timeline → 每年一格着色
function lifeSpectrum(st) {
  const span = st.deathInfo ? st.deathInfo.age : st.age;
  const byAge = new Map();
  for (const t of st.timeline) {
    const cur = byAge.get(t.age) || { pos: 0, neg: 0 };
    if (t.negative) cur.neg++; else cur.pos++;
    byAge.set(t.age, cur);
  }
  const cells = [];
  for (let a = 0; a <= span; a++) {
    const e = byAge.get(a);
    if (!e) cells.push(C.mid);
    else if (e.neg > e.pos) cells.push(C.red);
    else if (e.pos > e.neg) cells.push(C.gold);
    else cells.push(C.mid);
  }
  return cells;
}

// 人生关键词（最多 4 枚）
function keywords(st) {
  const ks = [];
  const moves = st.timeline.filter(t => /搬家|进城|迁|移民|难民|离开家乡/.test(t.text)).length;
  if (moves) ks.push(moves + ' 次迁徙');
  if (st.children && st.children.length) ks.push((st.children.length >= 3 ? st.children.length + ' 个孩子' : st.children.length === 2 ? '一双儿女' : st.children.length === 1 ? '一个孩子' : ''));
  if (st.degree === '大学' || st.degree === '研究生') ks.push('读完了大学');
  const illness = st.timeline.filter(t => /大病|确诊|癌|中风|心脏/.test(t.text)).length;
  if (illness) ks.push(illness + ' 场大病');
  const span = st.deathInfo ? st.deathInfo.age : st.age;
  if (span >= 90) ks.push('长寿之星');
  if (st.deathInfo && st.deathInfo.age < 5) ks.push('没能长大');
  if (st.historical) ks.push(st.birthYear + ' 年生人');
  if (st.region === '乡村') ks.push('乡下的孩子'); else ks.push('城里的孩子');
  return ks.filter(Boolean).slice(0, 4);
}

// SVG 头像 → Image（无中文，btoa 安全）
function svgToImage(svg, size) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svg)));
  });
}

export async function buildShareCard(st) {
  const W = 1080, H = 1440, PAD = 72;
  const cv = document.createElement('canvas');
  cv.width = W; cv.height = H;
  const x = cv.getContext('2d');

  // 底色
  x.fillStyle = C.bg;
  x.fillRect(0, 0, W, H);
  // 内衬纸面
  x.fillStyle = C.paper;
  x.fillRect(28, 28, W - 56, H - 56);
  // 雕花双线框
  x.strokeStyle = C.ink;
  x.lineWidth = 4;
  x.strokeRect(44, 44, W - 88, H - 88);
  x.lineWidth = 1.5;
  x.strokeRect(56, 56, W - 112, H - 112);
  // 四角金饰（小方旋转 45°）
  x.fillStyle = C.gold;
  for (const [cx, cy] of [[44, 44], [W - 44, 44], [44, H - 44], [W - 44, H - 44]]) {
    x.save(); x.translate(cx, cy); x.rotate(Math.PI / 4); x.fillRect(-9, -9, 18, 18); x.restore();
  }

  // 顶部小字
  x.fillStyle = C.ink; x.textAlign = 'center';
  x.font = '600 22px "JetBrains Mono","Menlo","Microsoft YaHei",monospace';
  x.fillText('八 十 亿 分 之 一', W / 2, 132);
  x.fillStyle = C.ink2; x.font = '18px "JetBrains Mono","Menlo","Microsoft YaHei",monospace';
  x.fillText('ONE IN EIGHT BILLION', W / 2, 162);

  // 圆形头像框
  const stage = st.deathInfo?.age >= 60 ? 'elder' : st.age >= 35 ? 'adult' : st.age >= 15 ? 'young' : st.age >= 3 ? 'child' : 'baby';
  let headY = 330;
  try {
    const svg = avatarSVG(st.country, st.gender, stage, 220, st.group);
    const img = await svgToImage(svg, 220);
    const R = 118, cy = 340;
    headY = cy;
    x.save();
    x.beginPath(); x.arc(W / 2, cy, R, 0, Math.PI * 2); x.clip();
    x.fillStyle = '#fff'; x.fillRect(W / 2 - R, cy - R, R * 2, R * 2);
    x.drawImage(img, W / 2 - R, cy - R, R * 2, R * 2);
    x.restore();
    x.beginPath(); x.arc(W / 2, cy, R, 0, Math.PI * 2);
    x.strokeStyle = C.ink; x.lineWidth = 5; x.stroke();
  } catch { headY = 340; }

  // 名字与跨度
  x.fillStyle = C.ink;
  x.font = '900 76px "Noto Serif SC","Songti SC","SimSun",serif';
  x.fillText(esc(st.name), W / 2, 560);
  x.font = '26px "JetBrains Mono","Menlo","Microsoft YaHei",monospace'; x.fillStyle = C.ink2;
  const span = st.deathInfo ? st.deathInfo.age : st.age;
  const spanText = st.historical
    ? `${st.birthYear} – ${(st.birthYear + span)} · 享年 ${span} 岁 · ${st.countryName}${st.region}`
    : `享年 ${span} 岁 · ${st.countryName}${st.region}`;
  x.fillText(spanText, W / 2, 612);

  // 分隔花纹
  x.fillStyle = C.gold;
  for (let i = -2; i <= 2; i++) {
    x.save(); x.translate(W / 2 + i * 34, 664); x.rotate(Math.PI / 4); x.fillRect(-5, -5, 10, 10); x.restore();
  }

  // 关键词 chips
  const kws = keywords(st);
  x.font = '600 26px "PingFang SC","Microsoft YaHei","Noto Sans CJK SC",sans-serif';
  let kwY = 724;
  const chipH = 52;
  let totalW = kws.map(k => x.measureText(k).width + 44).reduce((a, b) => a + b + 16, -16);
  let cx = W / 2 - totalW / 2;
  for (const k of kws) {
    const w = x.measureText(k).width + 44;
    x.fillStyle = 'rgba(29,78,95,.08)';
    roundRect(x, cx, kwY, w, chipH, 26); x.fill();
    x.strokeStyle = C.ink; x.lineWidth = 1.5;
    roundRect(x, cx, kwY, w, chipH, 26); x.stroke();
    x.fillStyle = C.ink; x.textAlign = 'left';
    x.fillText(k, cx + 22, kwY + 35);
    cx += w + 16;
  }
  x.textAlign = 'center';

  // 生命色谱
  x.font = '600 22px "JetBrains Mono","Menlo","Microsoft YaHei",monospace'; x.fillStyle = C.ink2;
  x.fillText('他的一生', W / 2, 838);
  const cells = lifeSpectrum(st);
  const sx = PAD, sy = 864, sw = W - PAD * 2, sh = 46;
  const n = cells.length || 1;
  const cw = sw / n;
  for (let i = 0; i < n; i++) {
    x.fillStyle = cells[i];
    x.fillRect(sx + i * cw, sy, Math.max(1, cw - 1), sh);
  }
  x.strokeStyle = C.ink; x.lineWidth = 2;
  x.strokeRect(sx, sy, sw, sh);
  // 岁数刻度
  x.fillStyle = C.ink2; x.font = '17px "JetBrains Mono","Menlo","Microsoft YaHei",monospace';
  x.textAlign = 'left'; x.fillText('0 岁', sx, sy + sh + 26);
  x.textAlign = 'right'; x.fillText(span + ' 岁', sx + sw, sy + sh + 26);
  x.textAlign = 'center';

  // 人生一瞥（三行）
  const glimpse = buildGlimpse(st);
  x.font = '26px "PingFang SC","Microsoft YaHei","Noto Sans CJK SC",sans-serif'; x.fillStyle = C.ink;
  glimpse.forEach((line, i) => x.fillText(line, W / 2, 1010 + i * 44));

  // 时代印记行（v0.9.4）：金色调一行流式，超宽自动减条目
  const eraMarks = st.timeline.filter(t => t.id && t.id.startsWith('era-')).map(t => ({
    age: t.age,
    title: ERA_TITLES[t.id] || eraShortTitle(t.text),
  }));
  if (eraMarks.length) {
    x.font = '600 20px "JetBrains Mono","Menlo","Microsoft YaHei",monospace'; x.fillStyle = C.ink2;
    x.fillText('他穿越的时代', W / 2, 1142);
    x.font = '20px "PingFang SC","Microsoft YaHei","Noto Sans CJK SC",sans-serif';
    let picks = eraMarks.slice(0, 7);
    let line = '⏳ ' + picks.map(m => `${m.age}岁·${m.title}`).join('  ·  ');
    while (x.measureText(line).width > W - PAD * 2 && picks.length > 2) {
      picks = picks.slice(0, picks.length - 1);
      line = '⏳ ' + picks.map(m => `${m.age}岁·${m.title}`).join('  ·  ');
    }
    x.fillStyle = C.gold;
    x.fillText(line, W / 2, 1180);
  }

  // 底部图标带（地球/心/屋/钟）
  const icons = ['🌍', '❤', '⌂', '⏱'];
  x.font = '34px "Noto Serif SC","Songti SC","SimSun",serif';
  icons.forEach((ic, i) => x.fillText(ic, W / 2 + (i - 1.5) * 56, H - 218));

  x.fillStyle = C.ink; x.font = '24px "PingFang SC","Microsoft YaHei","Noto Sans CJK SC",sans-serif';
  x.fillText('就在此刻，每秒约有 4 个婴儿诞生。', W / 2, H - 156);
  x.fillStyle = C.ink2; x.font = '20px "JetBrains Mono","Menlo","Microsoft YaHei",monospace';
  x.fillText('madbarasa.github.io/one-in-8b · 你会是哪一个？', W / 2, H - 118);

  return cv;
}

function buildGlimpse(st) {
  const lines = [];
  const wl = { 0: '最贫困', 1: '较贫困', 2: '普通', 3: '较富裕', 4: '最富裕' };
  lines.push(`出生在${st.countryName}${st.region}的${wl[st.wealthIdx] || '普通'}家庭`);
  const eduMap = { '大学': '读了大学', '研究生': '一路读到研究生', '高中': '读到高中', '初中': '初中辍学', '小学': '小学毕业', '无': '没有上过学' };
  if (eduMap[st.degree]) lines.push(eduMap[st.degree]);
  if (st.spouse) lines.push(st.children?.length ? `与爱人相伴，看着${st.children.length}个孩子长大` : '与爱人相伴一生');
  else lines.push('一生未婚，自在独行');
  const span = st.deathInfo ? st.deathInfo.age : st.age;
  if (span >= 80) lines.push('晚年儿孙绕膝，安然离世');
  else if (span >= 60) lines.push('走过了大半个世纪的风雨');
  return lines.slice(0, 4);
}

function roundRect(x, px, py, w, h, r) {
  x.beginPath();
  x.moveTo(px + r, py);
  x.arcTo(px + w, py, px + w, py + h, r);
  x.arcTo(px + w, py + h, px, py + h, r);
  x.arcTo(px, py + h, px, py, r);
  x.arcTo(px, py, px + w, py, r);
  x.closePath();
}

// 结算页按钮：生成 → 触发下载
export async function downloadShareCard(st) {
  const cv = await buildShareCard(st);
  cv.toBlob(blob => {
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `one-in-8b-${st.name}-${st.birthYear}.png`;
    a.click();
    setTimeout(() => URL.revokeObjectURL(a.href), 3000);
  }, 'image/png');
}
