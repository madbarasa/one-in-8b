// 程序化像素美术 v0.4.0：五国调色板 + 像素小人 + 国别场景 + 墓碑
// 全部 SVG rect 组合，零外部资源；皮肤色统一，国家以服饰/建筑/植被区分
// 逻辑像素坐标系：小人 16×24，场景 320×210

// ── 五国调色板 ──
export const PALETTES = {
  china: {
    name: '中国',
    skyDay: '#a8c8e0', skyNoon: '#c8dcec', skyDusk: '#e8b48a', skyEve: '#585a78',
    groundU: '#9aa0a6', groundR: '#8fae72',
    house: '#c9b89a', roof: '#8a3a2a', accent: '#c83a2a', // 朱红
    cloth: '#2a4a7a', clothAlt: '#c83a2a', clothKid: '#4a6a9a',
  },
  india: {
    name: '印度',
    skyDay: '#e0c8a0', skyNoon: '#e8d8b0', skyDusk: '#e89a60', skyEve: '#4a4060',
    groundU: '#b0a490', groundR: '#c4a860',
    house: '#d8c0a0', roof: '#a05a28', accent: '#e87820', // 藏红花橙
    cloth: '#e87820', clothAlt: '#188070', clothKid: '#f0a050',
  },
  usa: {
    name: '美国',
    skyDay: '#b8d0e8', skyNoon: '#d0e0f0', skyDusk: '#e8a878', skyEve: '#485068',
    groundU: '#a0a8a8', groundR: '#a0b070',
    house: '#d8d0c0', roof: '#585860', accent: '#3860a8', // 星条蓝
    cloth: '#3860a8', clothAlt: '#b83838', clothKid: '#6078b8',
  },
  indonesia: {
    name: '印度尼西亚',
    skyDay: '#a8d0c8', skyNoon: '#c8e0d8', skyDusk: '#e8a880', skyEve: '#485868',
    groundU: '#98a898', groundR: '#78a860',
    house: '#b89868', roof: '#685840', accent: '#208868', // 青绿
    cloth: '#208868', clothAlt: '#c8b048', clothKid: '#40a880',
  },
  pakistan: {
    name: '巴基斯坦',
    skyDay: '#d8c8a8', skyNoon: '#e8d8b8', skyDusk: '#e0a070', skyEve: '#504858',
    groundU: '#b8a888', groundR: '#c0a060',
    house: '#c8b088', roof: '#886840', accent: '#1a7858', // 深绿
    cloth: '#1a7858', clothAlt: '#d8c898', clothKid: '#389068',
  },
};

const SKIN = '#e8c49a';
const SKIN_DARK = '#c89a70';
const HAIR = '#3a2a1a';
const HAIR_OLD = '#c8c8c8';

// ── 像素小人 ──
// stage: baby / kid / teen / adult / old；gender: male / female
// 返回 16×24 viewBox 的 SVG（使用时按容器缩放，image-rendering: pixelated）
export function avatarSVG(country, gender, stage, size = 16) {
  const pal = PALETTES[country] || PALETTES.china;
  const cloth = stage === 'kid' ? pal.clothKid : pal.cloth;
  const alt = pal.clothAlt;
  const isOld = stage === 'old';
  const isBaby = stage === 'baby';
  const hair = isOld ? HAIR_OLD : HAIR;
  const R = (x, y, w, h, fill) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${fill}"/>`;

  if (isBaby) {
    // 襁褓 8×8：布包裹 + 小脸
    return `<svg viewBox="0 0 16 16" shape-rendering="crispEdges" width="${size}" height="${size}">
      ${R(4, 6, 8, 8, alt)}${R(5, 8, 6, 1, pal.accent)}
      ${R(6, 3, 4, 4, SKIN)}${R(6, 2, 4, 1, HAIR)}
      ${R(7, 4, 1, 1, '#3a2a1a')}${R(9, 4, 1, 1, '#3a2a1a')}
    </svg>`;
  }

  // 站立人形：头 6×6 + 身 8×10 + 腿
  const h = stage === 'kid' ? 12 : stage === 'teen' ? 20 : 24;
  const headY = 1, bodyY = headY + 7;
  const bodyH = stage === 'kid' ? 4 : 7;
  const legY = bodyY + bodyH;
  const legH = h - legY - 1;
  const isFemale = gender === 'female';
  let s = `<svg viewBox="0 0 16 ${h}" shape-rendering="crispEdges" width="${size}" height="${size * h / 16}">`;

  // 头 + 发（女生长发/男短寸）
  s += R(5, headY, 6, 6, SKIN);
  s += R(5, headY, 6, 2, hair);
  if (isFemale && stage !== 'kid') s += R(4, headY + 2, 1, 5, hair) + R(11, headY + 2, 1, 5, hair);
  // 眼睛
  s += R(6, headY + 3, 1, 1, '#2a2a2a') + R(9, headY + 3, 1, 1, '#2a2a2a');

  // 身体：女裙 / 男袍裤（国别服饰差异在配色 + 剪裁点缀）
  if (isFemale && stage !== 'kid') {
    s += R(4, bodyY, 8, bodyH, cloth);          // 裙身
    s += R(3, bodyY + bodyH - 1, 10, 1, cloth); // 裙摆
    s += R(7, bodyY, 2, 1, alt);                // 领饰
  } else if (country === 'pakistan' || country === 'india') {
    s += R(4, bodyY, 8, bodyH, cloth);          // 长袍
    s += R(3, bodyY, 10, 2, cloth);
    s += R(7, bodyY + 2, 2, 1, alt);
    s += R(5, legY, 6, 1, cloth);               // 袍脚
  } else {
    s += R(4, bodyY, 8, bodyH, cloth);          // 上衣
    s += R(4, legY, 3, legH, '#3a3f45');        // 裤
    s += R(9, legY, 3, legH, '#3a3f45');
    s += R(4, legY + legH, 3, 1, '#2a2a2a') + R(9, legY + legH, 3, 1, '#2a2a2a');
    s += R(7, bodyY, 2, 1, alt);                // 领饰
  }
  // 老年：拐杖
  if (isOld) s += R(12, bodyY + 2, 1, 8, '#8a6a4a');
  s += '</svg>';
  return s;
}

// ── 场景生成器 ──
// 维度：国家 × 城乡 × 人生阶段（天色） × 家庭在场（配偶/子女）
export function sceneSVG(st) {
  const pal = PALETTES[st.country] || PALETTES.china;
  const urban = st.region === '城市';
  const age = st.age;
  // 天色：童年晨光 → 成年正午 → 晚年黄昏（80+ 夜幕）
  const sky = age < 13 ? pal.skyDay : age < 60 ? pal.skyNoon : age < 80 ? pal.skyDusk : pal.skyEve;
  const sunY = age < 13 ? 30 : age < 60 ? 14 : age < 80 ? 44 : 60;
  const sunColor = age >= 60 && age < 80 ? '#e87840' : age >= 80 ? '#c8c8d8' : '#f0e0a0';
  const R = (x, y, w, h, fill) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${fill}"/>`;

  const stage = age < 3 ? 'baby' : age < 13 ? 'kid' : age < 18 ? 'teen' : age < 60 ? 'adult' : 'old';

  // ── 远景（国别剪影）──
  let bg = '';
  if (urban) {
    if (st.country === 'usa') {
      bg = R(20, 40, 18, 100, '#7890a8') + R(24, 24, 10, 16, '#7890a8') + R(56, 66, 22, 74, '#8898a8') + R(60, 56, 4, 10, '#8898a8')
        + R(96, 52, 16, 88, '#7890a8') + R(100, 40, 8, 12, '#a8b8c8');
    } else if (st.country === 'india') {
      bg = R(16, 70, 14, 70, '#b09070') + R(34, 80, 12, 60, '#c0a080') + R(50, 62, 16, 78, '#b09070')
        + R(56, 54, 4, 8, '#6a5a4a') + R(76, 84, 14, 56, '#c0a080') + R(94, 72, 18, 68, '#b09070');
    } else if (st.country === 'indonesia') {
      bg = R(18, 82, 12, 58, '#a08860') + R(40, 90, 14, 50, '#a08860') + R(70, 78, 12, 62, '#a08860')
        + R(30, 60, 24, 14, '#7a9a8a') + R(34, 54, 16, 6, '#8aaaa0'); // 高脚屋群+蕉叶
    } else if (st.country === 'pakistan') {
      bg = R(20, 60, 12, 80, '#c0a880') + R(26, 44, 4, 16, '#1a7858') + R(48, 78, 18, 62, '#c8b088')
        + R(54, 56, 4, 22, '#1a7858') + R(86, 70, 16, 70, '#c0a880') + R(92, 50, 4, 20, '#1a7858'); // 楼+宣礼塔
    } else { // china
      bg = R(16, 46, 16, 94, '#8aa0b8') + R(22, 36, 4, 10, '#8aa0b8') + R(44, 60, 14, 80, '#7a90a8')
        + R(66, 52, 18, 88, '#8aa0b8') + R(70, 40, 10, 12, '#9ab0c0') + R(48, 66, 4, 6, pal.accent) + R(72, 60, 4, 6, pal.accent);
    }
  } else {
    if (st.country === 'usa') {
      bg = R(240, 96, 40, 26, '#b83838') + R(246, 84, 28, 12, '#8a2a2a') + R(28, 96, 16, 44, '#c8a878'); // 谷仓+房
    } else if (st.country === 'indonesia') {
      bg = R(20, 40, 60, 60, '#6a8a7a') + R(80, 60, 50, 40, '#7a9a8a') + R(44, 52, 10, 8, '#d8d8e8'); // 火山+雪线
    } else if (st.country === 'india') {
      bg = R(24, 84, 8, 46, '#6a5236') + R(20, 72, 16, 12, '#6f9a54') + R(60, 90, 8, 40, '#6a5236') + R(56, 78, 16, 12, '#6f9a54'); // 棕榈
    } else if (st.country === 'pakistan') {
      bg = R(30, 90, 12, 40, '#8a6a4a') + R(26, 80, 20, 10, '#98a860') + R(80, 96, 60, 34, '#c0a060'); // 孤树+土田
    } else { // china
      bg = R(10, 60, 44, 30, '#6a8a9a') + R(54, 76, 30, 14, '#7a9aaa') + R(110, 66, 36, 24, '#6a8a9a'); // 远山
    }
  }

  // ── 家（国别民居）──
  let home = '';
  const hx = 236, hy = 118;
  if (st.country === 'indonesia') {
    home = R(hx, hy + 10, 56, 34, pal.house) + R(hx - 4, hy + 6, 64, 6, pal.roof)
      + R(hx + 4, hy + 30, 6, 14, '#6a5236') + R(hx + 46, hy + 30, 6, 14, '#6a5236'); // 高脚屋
  } else if (st.country === 'usa') {
    home = R(hx, hy + 8, 56, 36, pal.house) + R(hx - 6, hy, 68, 10, pal.roof)
      + R(hx + 8, hy + 16, 10, 10, pal.accent) + R(hx + 36, hy + 20, 14, 24, '#585860'); // 坡顶+门廊
  } else if (st.country === 'india' || st.country === 'pakistan') {
    home = R(hx, hy + 6, 56, 38, pal.house) + R(hx - 4, hy, 64, 8, pal.roof)
      + R(hx + 22, hy - 8, 4, 8, pal.accent) + R(hx + 28, hy - 14, 8, 14, pal.roof); // 平顶+水塔/塔饰
  } else {
    home = R(hx, hy + 6, 56, 38, pal.house) + R(hx - 4, hy, 64, 10, pal.roof)
      + R(hx + 24, hy + 24, 12, 20, '#5a4632') + R(hx + 10, hy + 14, 8, 8, '#e8d9a0') + R(hx + 40, hy + 14, 8, 8, '#e8d9a0')
      + (st.country === 'china' ? R(hx + 18, hy - 6, 4, 6, pal.accent) : ''); // 灯笼点缀
  }

  // ── 前景人物组 ──
  const av = (country, gender, stg, x, y) => person(country, gender, stg, x, y, 1);
  let people = '';
  // 主角
  people += av(st.country, st.gender, stage, 148, 148);
  // 配偶
  if (st.spouse) people += av(st.country, st.gender === 'male' ? 'female' : 'male', 'adult', 168, 148);
  // 孩子（最多画 2 个）
  if (st.children.length && age > 25) {
    people += av(st.country, Math.random() < 0.5 ? 'male' : 'female', 'kid', 186, 148);
    if (st.children.length > 1) people += av(st.country, 'female', 'kid', 202, 148);
  }
  // 婴儿期画父母在旁
  if (stage === 'baby') {
    people = av(st.country, 'male', 'adult', 128, 148) + av(st.country, 'female', 'adult', 172, 148)
      + `<rect x="148" y="134" width="14" height="12" fill="${pal.clothAlt}"/><rect x="151" y="130" width="7" height="5" fill="${SKIN}"/>`;
  }

  const ground = urban ? pal.groundU : pal.groundR;
  const cloud = age >= 80 ? '#8888a8' : '#f0f4f8';

  return `<svg viewBox="0 0 320 210" shape-rendering="crispEdges" preserveAspectRatio="xMidYMid slice">
    ${R(0, 0, 320, 150, sky)}
    ${R(40, sunY, 14, 14, sunColor)}
    ${R(70, 18, 26, 6, cloud)}${R(76, 14, 14, 4, cloud)}
    ${R(180, 34, 22, 5, cloud)}${R(186, 30, 10, 4, cloud)}
    ${R(0, 150, 320, 60, ground)}
    ${R(0, 148, 320, 3, '#6a6a5a')}
    ${bg}${home}${people}
  </svg>`;
}

// 场景内的站立小人（比头像大，贴地面）
function person(country, gender, stage, x, groundY, scale) {
  const pal = PALETTES[country] || PALETTES.china;
  const cloth = stage === 'kid' ? pal.clothKid : pal.cloth;
  const alt = pal.clothAlt;
  const isOld = stage === 'old';
  const hair = isOld ? HAIR_OLD : HAIR;
  const h = stage === 'baby' ? 8 : stage === 'kid' ? 16 : stage === 'teen' ? 26 : 32;
  const w = 10;
  const headH = stage === 'kid' ? 6 : 8;
  const bodyH = h - headH - (stage === 'kid' ? 3 : 6);
  const legY = groundY - (stage === 'kid' ? 3 : 6);
  const headY = groundY - h;
  const R = (rx, ry, rw, rh, fill) => `<rect x="${x + rx}" y="${ry}" width="${rw}" height="${rh}" fill="${fill}"/>`;
  let s = '';
  // 头
  s += R(2, headY, 6, headH, SKIN) + R(2, headY, 6, 2, hair);
  if (gender === 'female' && stage !== 'kid') s += R(1, headY + 2, 1, 4, hair) + R(8, headY + 2, 1, 4, hair);
  s += R(3, headY + 3, 1, 1, '#2a2a2a') + R(6, headY + 3, 1, 1, '#2a2a2a');
  // 身
  s += R(1, headY + headH, 8, bodyH, cloth);
  if (gender === 'female' && stage !== 'kid') s += R(0, headY + headH + bodyH - 1, 10, 1, cloth);
  // 腿
  s += R(1, legY, 3, stage === 'kid' ? 3 : 6, '#3a3f45') + R(6, legY, 3, stage === 'kid' ? 3 : 6, '#3a3f45');
  s += R(7, headY + headH, 1, 1, alt);
  if (isOld) s += R(10, headY + headH + 2, 1, 8, '#8a6a4a');
  return s;
}

// ── 首页五国群像 ──
export function crowdSVG() {
  const list = ['china', 'india', 'usa', 'indonesia', 'pakistan'];
  let s = `<svg viewBox="0 0 190 40" shape-rendering="crispEdges" style="width:190px;height:40px">`;
  list.forEach((c, i) => {
    s += `<g transform="translate(${i * 38 + 6}, 0)">${person(c, i % 2 ? 'female' : 'male', 'adult', 0, 38, 1)}</g>`;
  });
  return s + '</svg>';
}

// ── 死亡结算：像素墓碑 ──
export function tombstoneSVG(st) {
  const pal = PALETTES[st.country] || PALETTES.china;
  const R = (x, y, w, h, fill) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${fill}"/>`;
  const d = st.deathInfo || {};
  return `<svg viewBox="0 0 120 100" shape-rendering="crispEdges" style="width:120px;height:100px">
    ${R(0, 82, 120, 18, '#8fae72')}
    ${R(30, 30, 60, 54, '#a8a8b0')}${R(36, 22, 48, 10, '#a8a8b0')}${R(40, 18, 40, 6, '#b8b8c0')}
    ${R(52, 40, 16, 3, '#585860')}${R(52, 48, 16, 3, '#585860')}${R(56, 36, 8, 20, '#585860')}
    ${R(44, 66, 32, 2, '#585860')}
    ${R(86, 24, 6, 6, pal.accent)}${R(94, 16, 4, 4, pal.accent)}
    ${R(20, 20, 4, 4, '#e8e8f0')}${R(16, 14, 2, 2, '#e8e8f0')}
  </svg>`;
}
