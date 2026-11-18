// 程序化像素美术 v0.4.0：五国调色板 + 像素小人 + 国别场景 + 墓碑
// 全部 SVG rect 组合，零外部资源；皮肤色统一，国家以服饰/建筑/植被区分
// 逻辑像素坐标系：小人 16×24，场景 320×210

// ── 五国调色板 ──
const PALETTES = {
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
// 地区组色板（212 个生成国按组 fallback，保持像素皮肤全覆盖）
const GROUP_PALETTES = {
  EAS: { skyDay: '#a8c8e0', skyNoon: '#c8dcec', skyDusk: '#e8b48a', skyEve: '#585a78', groundU: '#9aa0a6', groundR: '#8fae72', house: '#c9b89a', roof: '#4a5a6a', accent: '#c83a2a', cloth: '#2a4a7a', clothAlt: '#c83a2a', clothKid: '#4a6a9a', skin: '#e8c49a', hair: '#3a3a40' },
  SAS: { skyDay: '#e0c8a0', skyNoon: '#e8d8b0', skyDusk: '#e89a60', skyEve: '#4a4060', groundU: '#b0a490', groundR: '#c4a860', house: '#d8c0a0', roof: '#a05a28', accent: '#e87820', cloth: '#e87820', clothAlt: '#188070', clothKid: '#f0a050', skin: '#d8a878', hair: '#2a2a30' },
  SSF: { skyDay: '#c0d8b8', skyNoon: '#d8e8c0', skyDusk: '#e8a868', skyEve: '#484458', groundU: '#a89070', groundR: '#b09a58', house: '#c8a878', roof: '#8a6838', accent: '#d89830', cloth: '#c87828', clothAlt: '#e8c840', clothKid: '#d8a040', skin: '#8a5a3a', hair: '#1a1a20' },
  LCN: { skyDay: '#a8d8d0', skyNoon: '#c8e8d8', skyDusk: '#e8b080', skyEve: '#505a70', groundU: '#a0a898', groundR: '#98b060', house: '#d8b890', roof: '#c85a38', accent: '#e89838', cloth: '#e8e0d0', clothAlt: '#2868a8', clothKid: '#e8a858', skin: '#c89868', hair: '#2a2020' },
  ECS: { skyDay: '#b0c8d8', skyNoon: '#ccd8e0', skyDusk: '#e0a888', skyEve: '#4a5060', groundU: '#98a0a0', groundR: '#88a868', house: '#d0c8b8', roof: '#685848', accent: '#a83828', cloth: '#485868', clothAlt: '#8a4838', clothKid: '#586878', skin: '#e8c49a', hair: '#4a3a2a' },
  MENA: { skyDay: '#e8d8b0', skyNoon: '#f0e0c0', skyDusk: '#e89858', skyEve: '#454058', groundU: '#c0a880', groundR: '#b8a060', house: '#e0d0b0', roof: '#a88858', accent: '#188068', cloth: '#e8e4d8', clothAlt: '#188068', clothKid: '#e8d888', skin: '#d8b088', hair: '#2a2a2a' },
  NAC: { skyDay: '#b8d0e8', skyNoon: '#d0e0f0', skyDusk: '#e8a878', skyEve: '#485068', groundU: '#a0a8a8', groundR: '#a0b070', house: '#d8d0c0', roof: '#585860', accent: '#3860a8', cloth: '#3860a8', clothAlt: '#b83838', clothKid: '#5868b8', skin: '#e8c49a', hair: '#5a4028' },
};

// 皮肤解析：国名直查 → 组 fallback → 中国色板兜底
function paletteFor(countryId, group) {
  return PALETTES[countryId] || (group && GROUP_PALETTES[group]) || PALETTES.china;
}

// ─────────────────────────────────────────────────────────────
// 精绘小人 v0.9.6：对齐原版 1in8b 的贝塞尔插画风
// 卡片：820×820 圆角浅底（#EBF0ED + 墨描边）——原版 mk-m 同款
// 人形：820 坐标系 Q 曲线 path（头/身/腿一体），年龄六姿态矩阵
// 服饰：贝塞尔主体（cloth 色）+ 22 文化圈装饰（ATTIRE 等比桥接）
// ─────────────────────────────────────────────────────────────
const INK = '#13212A';      // 原版墨色（轮廓/鞋/眼）
const CARD_BG = '#EBF0ED';  // 原版卡底
const WINE = '#8C1D3C';     // 原版酒红点缀

// 姿态参数：头径 / 身高 / 驼背量 / 腿叉 / 头下沉（820 坐标系，脚底锚 0）
// 婴儿蜷抱 → 幼童短身 → 少年挺拔 → 成年标准 → 中年微驼 → 老年拄拐深驼
const POSE = {
  baby:  { headR: 200, headY: 90,  shoulder: 190, waist: 150, hipY: 480, legLen: 160, hunch: 0,   pose: 'curl'  },
  kid:   { headR: 165, headY: 30,  shoulder: 180, waist: 140, hipY: 420, legLen: 230, hunch: 0,   pose: 'free'  },
  teen:  { headR: 140, headY: 0,   shoulder: 200, waist: 150, hipY: 430, legLen: 300, hunch: 0,   pose: 'stand' },
  adult: { headR: 130, headY: -10, shoulder: 215, waist: 155, hipY: 430, legLen: 320, hunch: 0,   pose: 'stand' },
  mid:   { headR: 128, headY: 20,  shoulder: 225, waist: 170, hipY: 440, legLen: 300, hunch: 40,  pose: 'stand' },
  old:   { headR: 126, headY: 55,  shoulder: 205, waist: 160, hipY: 435, legLen: 290, hunch: 90,  pose: 'cane'  },
};

export function avatarSVG(country, gender, stage, size = 16, group = null, culture = null) {
  const pal = paletteFor(country, group);
  const cloth = stage === 'kid' ? pal.clothKid : pal.cloth;
  const alt = pal.clothAlt;
  const isOld = stage === 'old';
  const isBaby = stage === 'baby';
  const isMid = stage === 'mid';
  const hair = isOld ? HAIR_OLD : isMid ? pal.hair : (pal.hair || HAIR);
  const skin = pal.skin || SKIN;
  const isFemale = gender === 'female';

  // 婴儿：襁褓蜷坐——大圆脸 + 包布（Q 曲线）
  if (isBaby) {
    return `<svg viewBox="0 0 820 820" width="${size}" height="${size}">
      <rect x="14" y="14" width="792" height="792" rx="179" fill="${CARD_BG}" stroke="${INK}" stroke-opacity=".22" stroke-width="8"/>
      <g transform="translate(410 412) scale(1.05)">
        <path d="M-260 60 Q-280 -40 -200 -110 Q-120 -170 0 -170 Q120 -170 200 -110 Q280 -40 260 60 Q240 150 120 180 L-120 180 Q-240 150 -260 60 Z" fill="${alt}"/>
        <path d="M-130 0 Q-145 -60 -90 -100 Q-30 -132 0 -130 Q40 -128 80 -100 Q120 -70 110 -20 Q100 20 50 34 L-40 34 Q-100 26 -130 0 Z" fill="${skin}"/>
        <ellipse cx="-40" cy="-30" rx="13" ry="15" fill="${INK}"/>
        <ellipse cx="40" cy="-30" rx="13" ry="15" fill="${INK}"/>
        <circle cx="-36" cy="-35" r="4.5" fill="#FFF"/>
        <circle cx="44" cy="-35" r="4.5" fill="#FFF"/>
        <ellipse cx="-72" cy="-2" rx="17" ry="11" fill="#E0705C" opacity=".8"/>
        <ellipse cx="72" cy="-2" rx="17" ry="11" fill="#E0705C" opacity=".8"/>
        <path d="M-16 16 Q0 30 16 16" stroke="${INK}" stroke-width="7" fill="none" stroke-linecap="round"/>
        <path d="M-16 -104 Q-6 -122 6 -118 Q18 -114 22 -100" stroke="${hair}" stroke-width="14" fill="none" stroke-linecap="round"/>
        <path d="M-215 -75 Q-100 -128 0 -130 Q100 -128 215 -75" stroke="${cloth}" stroke-width="38" fill="none" stroke-linecap="round" opacity=".92"/>
        <path d="M-60 120 L0 60 L60 120" stroke="${WINE}" stroke-width="10" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
        <ellipse cx="-70" cy="6" rx="16" ry="10" fill="#F0A08A" opacity=".55"/>
        <ellipse cx="70" cy="6" rx="16" ry="10" fill="#F0A08A" opacity=".55"/>
        <path d="M-230 20 Q-120 90 0 92 Q120 90 230 20" stroke="${INK}" stroke-opacity=".14" stroke-width="9" fill="none" stroke-linecap="round"/>
        <path d="M-110 -92 Q0 -128 110 -92" stroke="#FFFFFF" stroke-opacity=".5" stroke-width="12" fill="none" stroke-linecap="round"/>
      </g>
    </svg>`;
  }

  const p = POSE[stage] || POSE.adult;
  const legTop = p.hipY;
  const footY = legTop + p.legLen;
  const shoulderY = p.headY + p.headR * 2 + 20 + p.hunch * 0.4;
  const halfSh = p.shoulder / 2;
  const halfWa = p.waist / 2;

  // 主人形 path：头（arc 圆）+ 颈肩 + 腰臀 + 双腿（一体贝塞尔，footY 为 0 基线倒画）
  // 头（含 hunch 前倾偏移）
  const hx = p.hunch ? p.hunch * 0.9 : 0;
  const head = `<circle cx="${hx}" cy="${p.headY + p.headR}" r="${p.headR}" fill="${skin}"/>`;

  // 发型：男短寸 / 女披肩 / 老年灰白全覆盖
  let hairP;
  const hr = p.headR;
  const hcy = p.headY + p.headR;
  if (isFemale && stage !== 'kid') {
    // 女性长发：顶部发帘 + 两侧垂发条（不越过脸颊）
    hairP = `<path d="M${hx - hr} ${hcy - 2} Q${hx - hr} ${hcy - hr - 10} ${hx} ${hcy - hr - 10} Q${hx + hr} ${hcy - hr - 10} ${hx + hr} ${hcy - 2} Q${hx + hr * 0.55} ${hcy - hr * 0.42} ${hx} ${hcy - hr * 0.38} Q${hx - hr * 0.55} ${hcy - hr * 0.42} ${hx - hr} ${hcy - 2} Z" fill="${hair}"/>`
      + `<path d="M${hx - hr - 4} ${hcy - hr * 0.3} Q${hx - hr - 12} ${hcy + hr * 0.55} ${hx - hr + 8} ${hcy + hr * 0.82} L${hx - hr + 34} ${hcy + hr * 0.6} Q${hx - hr + 26} ${hcy} ${hx - hr + 14} ${hcy - hr * 0.32} Z" fill="${hair}"/>`
      + `<path d="M${hx + hr + 4} ${hcy - hr * 0.3} Q${hx + hr + 12} ${hcy + hr * 0.55} ${hx + hr - 8} ${hcy + hr * 0.82} L${hx + hr - 34} ${hcy + hr * 0.6} Q${hx + hr - 26} ${hcy} ${hx + hr - 14} ${hcy - hr * 0.32} Z" fill="${hair}"/>`;
  } else {
    hairP = `<path d="M${hx - hr} ${hcy - 6} Q${hx - hr} ${hcy - hr - 8} ${hx} ${hcy - hr - 8} Q${hx + hr} ${hcy - hr - 8} ${hx + hr} ${hcy - 6} Q${hx + hr * 0.5} ${hcy - hr * 0.35} ${hx} ${hcy - hr * 0.3} Q${hx - hr * 0.5} ${hcy - hr * 0.35} ${hx - hr} ${hcy - 6} Z" fill="${hair}"/>`;
  }

  // 躯干 + 腿（衣服主色；女性裙形下摆展开）
  const neckY = p.headY + p.headR * 2 + 6;
  let bodyP;
  if (isFemale && stage !== 'kid' && stage !== 'teen') {
    bodyP = `M${-halfSh} ${shoulderY + 30} Q${-halfSh - 10} ${shoulderY} ${-halfSh * 0.6} ${neckY + 14} L${halfSh * 0.6} ${neckY + 14} Q${halfSh + 10} ${shoulderY} ${halfSh} ${shoulderY + 30} L${p.waist * 0.78} ${legTop + 60} Q0 ${legTop + 120} ${-p.waist * 0.78} ${legTop + 60} Z`;
  } else {
    bodyP = `M${-halfSh} ${shoulderY + 30} Q${-halfSh - 10} ${shoulderY} ${-halfSh * 0.6} ${neckY + 14} L${halfSh * 0.6} ${neckY + 14} Q${halfSh + 10} ${shoulderY} ${halfSh} ${shoulderY + 30} L${halfWa} ${legTop} L${-halfWa} ${legTop} Z`;
  }
  // 双腿（裤色；old 裙袍遮腿）
  const legsP = p.pose === 'cane'
    ? `M${-halfWa} ${legTop} L${halfWa} ${legTop} L${halfWa * 0.5} ${footY} L${-halfWa * 0.5} ${footY} Z`
    : `M${-halfWa + 8} ${legTop} L${-14} ${legTop} L${-22} ${footY} L${-halfWa - 26} ${footY} Z M${14} ${legTop} L${halfWa - 8} ${legTop} L${halfWa + 26} ${footY} L${22} ${footY} Z`;
  // 鞋（墨色圆头）
  const shoes = `<ellipse cx="${-halfWa - 6}" cy="${footY + 8}" rx="42" ry="16" fill="${INK}"/><ellipse cx="${halfWa + 6}" cy="${footY + 8}" rx="42" ry="16" fill="${INK}"/>`;
  // 手臂：两侧垂臂（skin 袖 cloth）
  const armL = `M${-halfSh - 6} ${shoulderY + 16} Q${-halfSh - 30} ${shoulderY + 150} ${-halfSh - 12} ${legTop - 20} Q${-halfSh + 14} ${legTop - 14} ${-halfSh + 4} ${shoulderY + 60} Z`;
  const armR = `M${halfSh + 6} ${shoulderY + 16} Q${halfSh + 30} ${shoulderY + 150} ${halfSh + 12} ${legTop - 20} Q${halfSh - 14} ${legTop - 14} ${halfSh - 4} ${shoulderY + 60} Z`;
  // 拐杖（old）
  const cane = p.pose === 'cane' ? `<path d="M${halfSh + 70} ${footY} L${halfSh + 70} ${shoulderY - 30} Q${halfSh + 70} ${shoulderY - 78} ${halfSh + 20} ${shoulderY - 72}" stroke="#8a6a4a" stroke-width="16" fill="none" stroke-linecap="round"/>` : '';
  // 眼睛 + 驼背线
  const eyes = `<ellipse cx="${hx - p.headR * 0.34}" cy="${hcy + p.headR * 0.1}" rx="10" ry="13" fill="${INK}"/><ellipse cx="${hx + p.headR * 0.34}" cy="${hcy + p.headR * 0.1}" rx="10" ry="13" fill="${INK}"/>`;
  const wrinkle = isOld ? `<path d="M${hx - p.headR * 0.5} ${hcy + p.headR * 0.42} Q${hx} ${hcy + p.headR * 0.52} ${hx + p.headR * 0.5} ${hcy + p.headR * 0.42}" stroke="${INK}" stroke-opacity=".3" stroke-width="7" fill="none" stroke-linecap="round"/>` : '';

  // 人形整体：脚底基线 y=820 卡内缩进
  // 文化圈装饰桥：旧 16 系 R(x,y,w,h) → 820 系（×51.25，映射到人形区域）
  const K = 51.25;
  const oldHeadY = 1 + (isOld ? 1 : 0), oldBodyY = oldHeadY + 7, oldBodyH = stage === 'kid' ? 4 : 7, oldLegY = oldBodyY + oldBodyH;
  const R = (x, y, w, h, fill) => `<rect x="${(x - 8) * K * 0.62 + hx}" y="${(y - 1) * K * 0.62 + shoulderY * 0.55}" width="${w * K * 0.62}" height="${h * K * 0.62}" fill="${fill}" rx="4"/>`;
  const deco = attireDeco(culture, gender, stage, { R, headY: oldHeadY, bodyY: oldBodyY, bodyH: oldBodyH, legY: oldLegY, pal, cloth, alt });

  return `<svg viewBox="0 0 820 820" width="${size}" height="${size}">
    <rect x="14" y="14" width="792" height="792" rx="179" fill="${CARD_BG}" stroke="${INK}" stroke-opacity=".22" stroke-width="8"/>
    <g transform="translate(410 62) scale(0.9)">
      ${cane}
      <path d="${legsP}" fill="${isOld ? cloth : '#3A4148'}"/>
      ${shoes}
      <path d="${armL}" fill="${cloth}"/>
      <path d="${armR}" fill="${cloth}"/>
      <path d="${bodyP}" fill="${cloth}"/>
      <path d="M${-halfSh * 0.6} ${neckY + 14} L${halfSh * 0.6} ${neckY + 14} L${halfSh * 0.3} ${neckY - 4} L${-halfSh * 0.3} ${neckY - 4} Z" fill="${alt}" opacity=".85"/>
      ${head}${hairP}${eyes}${wrinkle}
      ${deco}
    </g>
  </svg>`;
}

// ── 文化圈服饰装饰 v0.9.2：22 圈传统元素进头像（元素点缀，不做全身戏服）──
// 每圈 male/female 装饰函数：入参 ctx = { R, headY, bodyY, bodyH, pal, cloth, alt, kid }
// 像素约定：头部 6px 宽位于 (5, headY)；身体 8px 宽位于 (4, bodyY)
const ATTIRE = {
  // ── 亚太 ──
  sinic: {
    male: c => c.R(5, c.bodyY, 6, 1, c.alt) + c.R(7, c.bodyY + 1, 2, 1, c.alt),                 // 立领 + 斜襟
    female: c => c.R(5, c.bodyY, 6, 1, c.alt) + c.R(7, c.bodyY + 1, 1, 1, '#e8e4d8') + c.R(8, c.bodyY + 2, 1, 1, '#e8e4d8') + c.R(3, c.headY - 1, 2, 2, c.pal.hair),  // 盘扣点 + 发髻
  },
  'sea-mainland': {
    male: c => c.R(4, c.bodyY + 2, 8, 1, c.alt),                                                // 围巾横带
    female: c => c.R(4, c.bodyY + 3, 8, 1, c.pal.accent) + c.R(4, c.bodyY + 5, 8, 1, c.alt) + c.R(3, c.headY - 1, 2, 2, c.pal.hair),  // 筒裙双纹 + 发髻
  },
  'sea-maritime': {
    male: c => c.R(4, c.bodyY + 2, 8, 2, c.pal.accent) + c.R(5, c.bodyY + 2, 1, 1, c.cloth) + c.R(7, c.bodyY + 3, 1, 1, c.cloth) + c.R(9, c.bodyY + 2, 1, 1, c.cloth),  // 纱笼格纹
    female: c => c.R(5, c.headY - 1, 6, 1, '#3a3a4a') + c.R(4, c.headY + 1, 1, 3, '#3a3a4a') + c.R(11, c.headY + 1, 1, 3, '#3a3a4a') + c.R(4, c.bodyY + 4, 8, 1, c.pal.accent),  // 头巾包顶垂侧 + 裙纹
  },
  'sas-indic': {
    male: c => c.R(4, c.bodyY, 8, 1, c.alt) + c.R(10, c.bodyY + 1, 2, 1, c.alt),                // 斜披肩线
    female: c => c.R(4, c.bodyY, 8, 2, c.pal.accent) + c.R(6, c.bodyY, 1, 2, c.cloth) + c.R(7, c.headY + 5, 1, 1, '#c03028') + c.R(3, c.headY - 1, 2, 2, c.pal.hair),  // 纱丽披肩斜色 + 额点 + 发髻
  },
  'sas-islam': {
    male: c => c.R(5, c.headY - 1, 6, 1, '#f4f0e4') + c.R(5, c.headY - 1, 6, 1, '#f4f0e4') + c.R(4, c.bodyY, 8, 1, '#e8e4d8'),   // 礼拜帽 + 白袍领
    female: c => c.R(5, c.headY - 1, 6, 2, '#4a4060') + c.R(4, c.headY + 1, 1, 4, '#4a4060') + c.R(11, c.headY + 1, 1, 4, '#4a4060'),  // 头巾包顶垂肩
  },
  // ── 非洲 ──
  'west-africa': {
    male: c => c.R(4, c.bodyY + 2, 8, 1, c.pal.accent) + c.R(5, c.bodyY + 3, 2, 1, c.alt) + c.R(8, c.bodyY + 3, 2, 1, c.alt),   // 蜡染波点
    female: c => c.R(5, c.headY - 1, 6, 2, c.pal.accent) + c.R(4, c.headY, 1, 1, '#e8b04b') + c.R(11, c.headY, 1, 1, '#e8b04b') + c.R(4, c.bodyY + 2, 8, 1, c.pal.accent) + c.R(5, c.bodyY + 3, 2, 1, c.cloth) + c.R(8, c.bodyY + 3, 2, 1, c.cloth),  // 头巾包布 + 金耳环 + 波点裙
  },
  horn: {
    male: c => c.R(6, c.bodyY + 1, 1, c.bodyH, '#e8e4d8') + c.R(8, c.bodyY + 1, 1, c.bodyH, '#e8e4d8'),   // 白袍竖线
    female: c => c.R(4, c.bodyY + 1, 8, 1, '#c03028') + c.R(4, c.bodyY + 3, 8, 1, '#e8b04b') + c.R(4, c.bodyY + 5, 8, 1, '#2a6848'),   // 三色横带
  },
  'central-africa': {
    male: c => c.R(5, c.bodyY + 2, 1, 1, c.alt) + c.R(10, c.bodyY + 2, 1, 1, c.alt) + c.R(7, c.bodyY + 4, 1, 1, c.alt) + c.R(8, c.bodyY + 4, 1, 1, c.alt),   // 菱形点阵
    female: c => c.R(5, c.bodyY + 2, 2, 1, c.pal.accent) + c.R(9, c.bodyY + 3, 2, 1, c.pal.accent) + c.R(3, c.headY - 1, 2, 2, c.pal.hair),
  },
  'east-africa': {
    male: c => c.R(4, c.bodyY + 2, 8, 1, '#c03028') + c.R(4, c.bodyY + 3, 8, 1, '#f4f0e4') + c.R(4, c.bodyY + 4, 8, 1, '#2a2a2a') + c.R(6, c.bodyY, 4, 1, '#c03028'),   // 马赛毯三色 + 珠领
    female: c => c.R(6, c.bodyY, 4, 1, '#c03028') + c.R(6, c.bodyY + 1, 4, 1, '#f4f0e4') + c.R(4, c.bodyY + 4, 8, 1, c.pal.accent) + c.R(3, c.headY - 1, 2, 2, c.pal.hair),   // 珠项链双层 + 裙纹
  },
  'southern-africa': {
    male: c => c.R(4, c.bodyY + 1, 8, 1, c.pal.accent) + c.R(4, c.bodyY + 4, 8, 1, c.alt),      // 宽横带
    female: c => c.R(4, c.bodyY + 3, 8, 2, c.pal.accent) + c.R(5, c.bodyY + 3, 1, 1, '#f4f0e4') + c.R(7, c.bodyY + 3, 1, 1, '#f4f0e4') + c.R(9, c.bodyY + 3, 1, 1, '#f4f0e4') + c.R(3, c.headY - 1, 2, 2, c.pal.hair),   // 珠裙点阵
  },
  // ── 中东 ──
  maghreb: {
    male: c => c.R(5, c.bodyY + 2, 2, 1, c.alt) + c.R(7, c.bodyY + 3, 2, 1, c.alt) + c.R(9, c.bodyY + 2, 2, 1, c.alt) + c.R(5, c.headY - 1, 6, 1, c.alt),   // 柏柏尔菱纹 + 圆帽
    female: c => c.R(5, c.headY - 1, 6, 2, c.alt) + c.R(4, c.headY + 1, 1, 4, c.alt) + c.R(11, c.headY + 1, 1, 4, c.alt) + c.R(4, c.bodyY + 2, 8, 1, c.pal.accent),   // 头巾 + 裙纹
  },
  'arab-core': {
    male: c => c.R(4, c.bodyY, 8, c.bodyH, '#f4f0e4') + c.R(5, c.headY + 1, 6, 1, '#2a2a2a') + c.R(6, c.headY + 4, 1, 1, '#3a2a1a') + c.R(9, c.headY + 4, 1, 1, '#3a2a1a'),   // 白袍 + 黑头箍绳 + 络腮胡点
    female: c => c.R(5, c.headY - 1, 6, 2, '#3a3a4a') + c.R(4, c.headY + 1, 1, 5, '#3a3a4a') + c.R(11, c.headY + 1, 1, 5, '#3a3a4a') + c.R(4, c.bodyY, 8, c.bodyH, '#4a4a5a'),   // 头巾全包 + 长袍
  },
  persia: {
    male: c => c.R(7, c.bodyY, 1, c.bodyH, c.alt) + c.R(7, c.bodyY + 2, 1, 1, '#e8b04b'),       // 长袍扣线 + 金扣
    female: c => c.R(5, c.bodyY + 2, 1, 1, c.pal.accent) + c.R(10, c.bodyY + 3, 1, 1, c.pal.accent) + c.R(3, c.headY - 1, 2, 2, c.pal.hair) + c.R(11, c.headY - 1, 2, 2, c.pal.hair),   // 双花点缀 + 双侧发
  },
  'turkic-caucasus': {
    male: c => c.R(4, c.bodyY + 2, 8, 1, c.pal.accent) + c.R(5, c.bodyY + 2, 1, 1, c.alt) + c.R(7, c.bodyY + 2, 1, 1, c.alt) + c.R(9, c.bodyY + 2, 1, 1, c.alt),   // 刺绣横带花点
    female: c => c.R(5, c.headY - 1, 6, 2, c.pal.accent) + c.R(4, c.bodyY + 3, 8, 1, c.pal.accent) + c.R(3, c.headY - 1, 2, 2, c.pal.hair),   // 花头巾 + 裙带
  },
  // ── 欧洲 ──
  balkan: {
    male: c => c.R(4, c.bodyY + 2, 8, 1, '#2a2a2a') + c.R(4, c.bodyY + 3, 8, 1, c.pal.accent),  // 双色腰带（巴尔干传统腰饰）
    female: c => c.R(3, c.headY - 1, 2, 2, '#e8e4d8') + c.R(11, c.headY - 1, 2, 2, '#e8e4d8') + c.R(4, c.bodyY + 2, 8, 1, c.pal.accent) + c.R(3, c.headY - 1, 2, 2, '#f4f0e4'),   // 白头巾 + 腰带
  },
  'east-euro': {
    male: c => c.R(4, c.bodyY + 2, 8, 1, c.alt) + c.R(7, c.bodyY + 1, 1, 1, '#e8b04b'),         // 毛衣横纹 + 金扣
    female: c => c.R(5, c.headY - 1, 6, 1, '#c8404a') + c.R(4, c.headY + 1, 1, 4, '#c8404a') + c.R(11, c.headY + 1, 1, 4, '#c8404a') + c.R(7, c.bodyY + 2, 2, 1, '#e8b04b'),   // 红头巾（babushka）+ 胸花
  },
  'west-north-euro': {
    male: c => c.R(4, c.bodyY, 8, 1, c.alt) + c.R(6, c.bodyY + 2, 1, 1, c.alt) + c.R(8, c.bodyY + 2, 1, 1, c.alt),   // 北欧毛衣 V 领纹
    female: c => c.R(4, c.headY + 2, 1, 6, c.pal.hair) + c.R(11, c.headY + 2, 1, 6, c.pal.hair) + c.R(4, c.headY + 7, 1, 1, c.pal.hair) + c.R(11, c.headY + 7, 1, 1, c.pal.hair),   // 麻花长辫垂腰
  },
  // ── 美洲 ──
  'hispanic-latam': {
    male: c => c.R(3, c.headY - 1, 10, 1, c.pal.roof || '#8a6838') + c.R(5, c.headY - 2, 6, 1, c.pal.roof || '#8a6838') + c.R(4, c.bodyY + 3, 8, 1, c.alt),   // 宽檐帽 + poncho 横带
    female: c => c.R(5, c.bodyY + 4, 1, 1, c.pal.accent) + c.R(8, c.bodyY + 4, 1, 1, c.pal.accent) + c.R(3, c.headY - 1, 2, 2, c.pal.hair) + c.R(11, c.headY - 1, 2, 2, c.pal.hair),   // 裙摆花点 + 双辫
  },
  'brazil-luso': {
    male: c => c.R(4, c.bodyY, 8, 1, '#e8b04b') + c.R(4, c.bodyY + 4, 8, 1, '#2a6848'),         // 亮色横带（狂欢节衬衫）
    female: c => c.R(5, c.bodyY + 2, 1, 1, '#e8b04b') + c.R(7, c.bodyY + 3, 1, 1, '#c03028') + c.R(9, c.bodyY + 2, 1, 1, '#2a6848') + c.R(3, c.headY - 1, 2, 2, c.pal.hair),   // 亮片点阵
  },
  caribbean: {
    male: c => c.R(4, c.bodyY + 1, 8, 1, '#c03028') + c.R(4, c.bodyY + 2, 8, 1, '#e8b04b') + c.R(4, c.bodyY + 3, 8, 1, '#2a6848'),   // 三色横条
    female: c => c.R(4, c.headY, 1, 1, '#e878a0') + c.R(11, c.headY, 1, 1, '#e878a0') + c.R(4, c.bodyY + 4, 8, 1, c.pal.accent) + c.R(3, c.headY - 1, 2, 2, c.pal.hair),   // 耳边双花 + 裙纹
  },
  anglo: {
    male: c => c.R(5, c.bodyY + 1, 2, 1, '#d8d8e0') + c.R(8, c.bodyY + 1, 2, 1, '#d8d8e0') + c.R(6, c.bodyY + 3, 2, 1, '#d8d8e0') + c.R(9, c.bodyY + 3, 2, 1, '#d8d8e0'),   // 格子衬衫淡格
    female: null,                                                                              // 现代装不加装饰
  },
  // ── 大洋洲 ──
  oceania: {
    male: c => c.R(4, c.bodyY + 3, 8, 1, c.pal.accent) + c.R(4, c.bodyY + 5, 8, 1, c.pal.accent),   // 草裙细纹
    female: c => c.R(4, c.headY, 1, 1, '#e878a0') + c.R(4, c.bodyY + 4, 8, 1, c.pal.accent) + c.R(3, c.headY - 1, 2, 2, c.pal.hair),   // 耳边花 + 裙纹 + 发
  },
};

// 按圈+性别绘制服饰装饰（13 岁以下穿童装不加装饰；teen 起坐标与 adult 同构）
function attireDeco(culture, gender, stage, ctx) {
  const cult = ATTIRE[culture];
  if (!cult || stage === 'kid') return '';
  const fn = gender === 'female' ? cult.female : cult.male;
  if (!fn) return '';
  return fn(ctx);
}

// ── 场景生成器 ──
// 维度：国家 × 城乡 × 人生阶段（天色） × 家庭在场（配偶/子女）
export function sceneSVG(st) {
  const pal = paletteFor(st.country, st.group);
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
  const pal = paletteFor(country);
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
  const pal = paletteFor(st.country, st.group);
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
