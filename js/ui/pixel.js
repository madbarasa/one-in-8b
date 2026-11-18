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

// 公共人形体（脚底 y=0 向上，820 坐标系）——avatarSVG（卡版）与 figureSVG（落地版）共用
export function personParams(country, gender, stage, group = null, culture = null) {
  const pal = paletteFor(country, group);
  const cloth = stage === 'kid' ? pal.clothKid : pal.cloth;
  const alt = pal.clothAlt;
  const isOld = stage === 'old';
  const isMid = stage === 'mid';
  const hair = isOld ? HAIR_OLD : isMid ? (pal.hair || HAIR) : (pal.hair || HAIR);
  const skin = pal.skin || SKIN;
  const isFemale = gender === 'female';
  if (stage === 'baby') return { baby: true, pal, cloth, alt, skin, hair };
  return { pal, cloth, alt, hair, skin, isFemale, gender, isOld, isMid, stage, country, culture };
}

function _bodyPaths(o) {
  const { cloth, alt, hair, skin, isFemale, gender, isOld, stage, country, culture, pal } = o;
  const p = POSE[stage] || POSE.adult;
  const legTop = p.hipY;
  const footY = legTop + p.legLen;
  const shoulderY = p.headY + p.headR * 2 + 20 + p.hunch * 0.4;
  const halfSh = p.shoulder / 2;
  const halfWa = p.waist / 2;
  const hx = p.hunch ? p.hunch * 0.9 : 0;
  const hr = p.headR;
  const hcy = p.headY + p.headR;
  const neckY = p.headY + p.headR * 2 + 6;
  const head = `<circle cx="${hx}" cy="${hcy}" r="${hr}" fill="${skin}"/>`;
  let hairP;
  if (isFemale && stage !== 'kid') {
    hairP = `<path d="M${hx - hr} ${hcy - 2} Q${hx - hr} ${hcy - hr - 10} ${hx} ${hcy - hr - 10} Q${hx + hr} ${hcy - hr - 10} ${hx + hr} ${hcy - 2} Q${hx + hr * 0.55} ${hcy - hr * 0.42} ${hx} ${hcy - hr * 0.38} Q${hx - hr * 0.55} ${hcy - hr * 0.42} ${hx - hr} ${hcy - 2} Z" fill="${hair}"/>`
      + `<path d="M${hx - hr - 4} ${hcy - hr * 0.3} Q${hx - hr - 12} ${hcy + hr * 0.55} ${hx - hr + 8} ${hcy + hr * 0.82} L${hx - hr + 34} ${hcy + hr * 0.6} Q${hx - hr + 26} ${hcy} ${hx - hr + 14} ${hcy - hr * 0.32} Z" fill="${hair}"/>`
      + `<path d="M${hx + hr + 4} ${hcy - hr * 0.3} Q${hx + hr + 12} ${hcy + hr * 0.55} ${hx + hr - 8} ${hcy + hr * 0.82} L${hx + hr - 34} ${hcy + hr * 0.6} Q${hx + hr - 26} ${hcy} ${hx + hr - 14} ${hcy - hr * 0.32} Z" fill="${hair}"/>`;
  } else {
    hairP = `<path d="M${hx - hr} ${hcy - 6} Q${hx - hr} ${hcy - hr - 8} ${hx} ${hcy - hr - 8} Q${hx + hr} ${hcy - hr - 8} ${hx + hr} ${hcy - 6} Q${hx + hr * 0.5} ${hcy - hr * 0.35} ${hx} ${hcy - hr * 0.3} Q${hx - hr * 0.5} ${hcy - hr * 0.35} ${hx - hr} ${hcy - 6} Z" fill="${hair}"/>`;
  }
  let bodyP;
  let skirtEdge = '';
  if (isFemale && stage !== 'kid' && stage !== 'teen') {
    bodyP = `M${-halfSh} ${shoulderY + 30} Q${-halfSh - 10} ${shoulderY} ${-halfSh * 0.6} ${neckY + 14} L${halfSh * 0.6} ${neckY + 14} Q${halfSh + 10} ${shoulderY} ${halfSh} ${shoulderY + 30} L${p.waist * 0.78} ${legTop + 60} Q0 ${legTop + 120} ${-p.waist * 0.78} ${legTop + 60} Z`;
    skirtEdge = `<path d="M${-p.waist * 0.74} ${legTop + 56} Q0 ${legTop + 114} ${p.waist * 0.74} ${legTop + 56}" stroke="${alt}" stroke-width="20" fill="none" stroke-linecap="round" opacity=".8"/>`;
  } else {
    bodyP = `M${-halfSh} ${shoulderY + 30} Q${-halfSh - 10} ${shoulderY} ${-halfSh * 0.6} ${neckY + 14} L${halfSh * 0.6} ${neckY + 14} Q${halfSh + 10} ${shoulderY} ${halfSh} ${shoulderY + 30} L${halfWa} ${legTop} L${-halfWa} ${legTop} Z`;
  }
  const legsP = p.pose === 'cane'
    ? `M${-halfWa} ${legTop} L${halfWa} ${legTop} L${halfWa * 0.5} ${footY} L${-halfWa * 0.5} ${footY} Z`
    : `M${-halfWa + 8} ${legTop} L${-14} ${legTop} L${-22} ${footY} L${-halfWa - 26} ${footY} Z M${14} ${legTop} L${halfWa - 8} ${legTop} L${halfWa + 26} ${footY} L${22} ${footY} Z`;
  const shoes = `<ellipse cx="${-halfWa - 6}" cy="${footY + 8}" rx="42" ry="16" fill="${INK}"/><ellipse cx="${halfWa + 6}" cy="${footY + 8}" rx="42" ry="16" fill="${INK}"/>`;
  const armL = `M${-halfSh - 6} ${shoulderY + 16} Q${-halfSh - 30} ${shoulderY + 150} ${-halfSh - 12} ${legTop - 20} Q${-halfSh + 14} ${legTop - 14} ${-halfSh + 4} ${shoulderY + 60} Z`;
  const armR = `M${halfSh + 6} ${shoulderY + 16} Q${halfSh + 30} ${shoulderY + 150} ${halfSh + 12} ${legTop - 20} Q${halfSh - 14} ${legTop - 14} ${halfSh - 4} ${shoulderY + 60} Z`;
  const cane = p.pose === 'cane' ? `<path d="M${halfSh + 70} ${footY} L${halfSh + 70} ${shoulderY - 30} Q${halfSh + 70} ${shoulderY - 78} ${halfSh + 20} ${shoulderY - 72}" stroke="#8a6a4a" stroke-width="16" fill="none" stroke-linecap="round"/>` : '';
  const eyes = `<ellipse cx="${hx - p.headR * 0.34}" cy="${hcy + p.headR * 0.1}" rx="10" ry="13" fill="${INK}"/><ellipse cx="${hx + p.headR * 0.34}" cy="${hcy + p.headR * 0.1}" rx="10" ry="13" fill="${INK}"/>`;
  const wrinkle = isOld ? `<path d="M${hx - p.headR * 0.5} ${hcy + p.headR * 0.42} Q${hx} ${hcy + p.headR * 0.52} ${hx + p.headR * 0.5} ${hcy + p.headR * 0.42}" stroke="${INK}" stroke-opacity=".3" stroke-width="7" fill="none" stroke-linecap="round"/>` : '';
  const K = 51.25;
  const oldHeadY = 1 + (isOld ? 1 : 0), oldBodyY = oldHeadY + 7, oldBodyH = stage === 'kid' ? 4 : 7, oldLegY = oldBodyY + oldBodyH;
  const R = (x, y, w, h, fill) => `<rect x="${(x - 8) * K * 0.62 + hx}" y="${(y - 1) * K * 0.62 + shoulderY * 0.55}" width="${w * K * 0.62}" height="${h * K * 0.62}" fill="${fill}" rx="4"/>`;
  const deco = attireDeco(culture, gender, stage, { R, headY: oldHeadY, bodyY: oldBodyY, bodyH: oldBodyH, legY: oldLegY, pal, cloth, alt });
  const dress = isFemale ? (o.altCloth || alt) : cloth;
  return `${cane}<path d="${legsP}" fill="${isOld ? cloth : '#3A4148'}"/>${shoes}<path d="${armL}" fill="${dress}"/><path d="${armR}" fill="${dress}"/><path d="${bodyP}" fill="${dress}"/>${skirtEdge}<path d="M${-halfSh * 0.6} ${neckY + 14} L${halfSh * 0.6} ${neckY + 14} L${halfSh * 0.3} ${neckY - 4} L${-halfSh * 0.3} ${neckY - 4} Z" fill="${alt}" opacity=".85"/>${head}${hairP}${eyes}${wrinkle}${deco}`;
}

// 落地版人形（家庭图/群像用）：无卡底，脚底锚定 (x, groundY)，身高 heightPx
export function figureSVG(country, gender, stage, x, groundY, heightPx, group = null, culture = null) {
  const o = personParams(country, gender, stage, group, culture);
  if (o.baby) {
    const { pal, cloth, alt, skin, hair } = o;
    return `<g transform="translate(${x} ${groundY}) scale(${(heightPx / 350).toFixed(3)}) translate(0 -180)">
      <path d="M-260 60 Q-280 -40 -200 -110 Q-120 -170 0 -170 Q120 -170 200 -110 Q280 -40 260 60 Q240 150 120 180 L-120 180 Q-240 150 -260 60 Z" fill="${alt}"/>
      <path d="M-130 0 Q-145 -60 -90 -100 Q-30 -132 0 -130 Q40 -128 80 -100 Q120 -70 110 -20 Q100 20 50 34 L-40 34 Q-100 26 -130 0 Z" fill="${skin}"/>
      <ellipse cx="-40" cy="-30" rx="13" ry="15" fill="${INK}"/><ellipse cx="40" cy="-30" rx="13" ry="15" fill="${INK}"/>
      <circle cx="-36" cy="-35" r="4.5" fill="#FFF"/><circle cx="44" cy="-35" r="4.5" fill="#FFF"/>
      <ellipse cx="-72" cy="-2" rx="17" ry="11" fill="#E0705C" opacity=".8"/><ellipse cx="72" cy="-2" rx="17" ry="11" fill="#E0705C" opacity=".8"/>
      <path d="M-16 16 Q0 30 16 16" stroke="${INK}" stroke-width="7" fill="none" stroke-linecap="round"/>
      <path d="M-215 -75 Q-100 -128 0 -130 Q100 -128 215 -75" stroke="${cloth}" stroke-width="38" fill="none" stroke-linecap="round" opacity=".92"/>
    </g>`;
  }
  return `<g transform="translate(${x} ${groundY}) scale(${(heightPx / 760).toFixed(3)}) translate(0 -750)">${_bodyPaths(o)}</g>`;
}

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
        <path d="M-230 20 Q-120 90 0 92 Q120 90 230 20" stroke="${INK}" stroke-opacity=".14" stroke-width="9" fill="none" stroke-linecap="round"/>
        <path d="M-110 -92 Q0 -128 110 -92" stroke="#FFFFFF" stroke-opacity=".5" stroke-width="12" fill="none" stroke-linecap="round"/>
      </g>
    </svg>`;
  }

  const body = _bodyPaths({ pal, cloth, alt, hair, skin, isFemale, gender, isOld, isMid, stage, country: null, culture });

  return `<svg viewBox="0 0 820 820" width="${size}" height="${size}">
    <rect x="14" y="14" width="792" height="792" rx="179" fill="${CARD_BG}" stroke="${INK}" stroke-opacity=".22" stroke-width="8"/>
    <g transform="translate(410 62) scale(0.9)">
      ${body}
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
// ─────────────────────────────────────────────────────────────
// 家庭图 v0.9.6：精绘场景（对齐原版插画风）
// 渐变天空（四时段）+ 椭圆云团 + 曲线天际线 + 精绘民居 + 贝塞尔家庭人物组
// ─────────────────────────────────────────────────────────────
export function sceneSVG(st) {
  const pal = paletteFor(st.country, st.group);
  const urban = st.region === '城市';
  const age = st.age;
  const stage = age < 3 ? 'baby' : age < 13 ? 'kid' : age < 18 ? 'teen' : age < 60 ? 'adult' : 'old';
  const phase = age < 13 ? 'morn' : age < 60 ? 'noon' : age < 80 ? 'dusk' : 'night';
  const groundY = 176;

  // 天空：四时段渐变
  const SKY = {
    morn: ['#F5E9C8', pal.skyDay],
    noon: ['#E8F0F4', pal.skyNoon],
    dusk: ['#F0C890', pal.skyDusk],
    night: ['#2A3048', pal.skyEve],
  }[phase];
  const sunY = phase === 'morn' ? 42 : phase === 'noon' ? 18 : phase === 'dusk' ? 48 : 58;
  const sunColor = phase === 'dusk' ? '#E87840' : phase === 'night' ? '#E8E8F0' : '#F5E5A8';
  const sunR = phase === 'night' ? 10 : 15;
  const sunGlow = phase === 'dusk' ? '#F5A868' : phase === 'night' ? '#B8C8E8' : '#F8F0C0';

  // 民居色
  const hw = urban ? '#D8D0C0' : pal.house;
  const roofC = pal.roof;

  // 曲线天际线（城市）或远山（乡村）
  let bg = '';
  if (urban) {
    bg = `<path d="M0 150 L0 96 L34 96 L34 76 L64 76 L64 108 L96 108 L96 58 L112 58 L112 44 L128 44 L128 108 L160 108 L160 86 L190 86 L190 112 L224 112 L224 70 L252 70 L252 90 L286 90 L286 104 L320 104 L320 150 Z" fill="${phase === 'night' ? '#1A2036' : '#9AA8B4'}" opacity=".8"/>`
      + `<path d="M0 150 L0 120 L28 120 L28 100 L52 100 L52 124 L84 124 L84 104 L108 104 L108 126 L140 126 L140 98 L170 98 L170 122 L200 122 L200 106 L230 106 L230 128 L262 128 L262 110 L292 110 L292 124 L320 124 L320 150 Z" fill="${phase === 'night' ? '#141828' : '#B0BCC4'}" opacity=".9"/>`
      + [40, 58, 76, 108, 124, 170, 200, 236, 270].map(x => `<rect x="${x}" y="${x % 40 < 20 ? 108 : 120}" width="4" height="6" fill="${phase === 'night' ? '#F0D878' : '#F8E8A8'}" opacity="${phase === 'night' ? .9 : .7}" rx="1"/>`).join('');
  } else {
    bg = `<path d="M0 150 L0 110 Q60 68 130 100 Q200 130 250 92 Q290 66 320 88 L320 150 Z" fill="${phase === 'night' ? '#1A2434' : '#A8BCA0'}" opacity=".55"/>`
      + `<path d="M0 150 L0 128 Q80 96 160 122 Q240 146 320 116 L320 150 Z" fill="${phase === 'night' ? '#141C28' : '#8CA884'}" opacity=".6"/>`
      + [46, 132, 208, 268].map(x => `<path d="M${x} 118 Q${x + 6} 96 ${x + 14} 118" stroke="${phase === 'night' ? '#22283A' : '#6E8A64'}" stroke-width="7" fill="none" stroke-linecap="round"/>`).join('');
  }

  // 民居：曲线屋顶 + 门 + 窗 + 描边
  const homeX = 48, homeY = 58;
  const home = `
    <path d="M${homeX} 150 L${homeX} ${homeY + 8} L${homeX + 26} ${homeY - 16} Q${homeX + 44} ${homeY - 26} ${homeX + 62} ${homeY - 14} L${homeX + 104} ${homeY + 8} L${homeX + 104} 150 Z" fill="${hw}" stroke="#5A4A38" stroke-width="2"/>
    <path d="M${homeX - 6} ${homeY + 10} L${homeX + 26} ${homeY - 14} Q${homeX + 44} ${homeY - 24} ${homeX + 62} ${homeY - 12} L${homeX + 110} ${homeY + 10} L${homeX + 110} ${homeY + 16} L${homeX - 6} ${homeY + 18} Z" fill="${roofC}" stroke="#4A3428" stroke-width="2"/>
    <rect x="${homeX + 42}" y="${homeY + 30}" width="22" height="40" rx="2" fill="#4A3020" stroke="#2A1A10" stroke-width="2"/>
    <circle cx="${homeX + 58}" cy="${homeY + 48}" r="2.2" fill="${pal.accent}"/>
    <rect x="${homeX + 12}" y="${homeY + 32}" width="15" height="15" rx="2" fill="${phase === 'night' ? '#F0D878' : '#C8DCE4'}" stroke="#5A4A38" stroke-width="1.5"/>
    <rect x="${homeX + 76}" y="${homeY + 32}" width="15" height="15" rx="2" fill="${phase === 'night' ? '#F0D878' : '#C8DCE4'}" stroke="#5A4A38" stroke-width="1.5"/>`;

  // 椭圆云团（两朵，随 phase 变色）
  const cloudC = phase === 'night' ? '#3A4260' : '#F4F8FA';
  const clouds = `
    <g opacity=".92"><ellipse cx="86" cy="30" rx="22" ry="8" fill="${cloudC}"/><ellipse cx="104" cy="26" rx="14" ry="7" fill="${cloudC}"/><ellipse cx="70" cy="27" rx="11" ry="6" fill="${cloudC}"/></g>
    <g opacity=".85"><ellipse cx="228" cy="38" rx="18" ry="7" fill="${cloudC}"/><ellipse cx="242" cy="34" rx="12" ry="6" fill="${cloudC}"/></g>`;

  // 地面：渐变 + 草簇/石子
  const gC = urban ? [pal.groundU, '#7A8288'] : [pal.groundR, '#6E9458'];
  const tuft = (x, c) => `<path d="M${x} ${groundY + 8} Q${x - 2} ${groundY - 2} ${x - 6} ${groundY + 8} M${x} ${groundY + 8} Q${x + 1} ${groundY - 4} ${x + 4} ${groundY + 8}" stroke="${c}" stroke-width="2.5" fill="none" stroke-linecap="round"/>`;
  const ground = `
    <defs><linearGradient id="gg${stage}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${gC[0]}"/><stop offset="1" stop-color="${gC[1]}"/></linearGradient></defs>
    <rect x="0" y="${groundY}" width="320" height="${210 - groundY}" fill="url(#gg${stage})"/>
    <path d="M0 ${groundY} L320 ${groundY}" stroke="#5E6A50" stroke-width="2" opacity=".5"/>
    ${urban ? [52, 148, 232, 292].map(x => `<ellipse cx="${x}" cy="${groundY + 18 + (x % 3) * 7}" rx="7" ry="3.5" fill="#8A9298" opacity=".6"/>`).join('') : [36, 120, 186, 254, 300].map(x => tuft(x, '#5E8A4E')).join('')}`;

  // 家庭人物组（贝塞尔精绘，脚底锚 groundY+22）
  const fg = groundY + 22;
  let family = '';
  family += figureSVG(st.country, st.gender, stage, 232, fg, stage === 'kid' || stage === 'baby' ? 42 : 54, st.group, st.culture);
  if (stage === 'baby') {
    family = figureSVG(st.country, 'male', 'adult', 118, fg, 50, st.group) + figureSVG(st.country, 'female', 'adult', 268, fg, 47, st.group)
      + figureSVG(st.country, st.gender, 'baby', 194, fg - 4, 28, st.group);
  } else {
    if (st.spouse && age > 20) family += figureSVG(st.country, st.gender === 'male' ? 'female' : 'male', 'adult', 282, fg, 50, st.group, st.culture);
    if (st.children && st.children.length && age > 25) {
      family += figureSVG(st.country, 'female', 'kid', 158, fg, 30, st.group, st.culture);
      if (st.children.length > 1) family += figureSVG(st.country, 'male', 'kid', 306, fg, 28, st.group, st.culture);
    }
    if (age >= 60 && st.spouse) family += figureSVG(st.country, st.gender === 'male' ? 'female' : 'male', 'old', 282, fg, 49, st.group, st.culture);
  }

  return `<svg viewBox="0 0 320 210" preserveAspectRatio="xMidYMid slice" style="display:block">
    <defs><linearGradient id="sky${stage}${phase}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${SKY[0]}"/><stop offset="1" stop-color="${SKY[1]}"/></linearGradient></defs>
    <rect x="0" y="0" width="320" height="${groundY}" fill="url(#sky${stage}${phase})"/>
    <circle cx="266" cy="${sunY}" r="${sunR + 10}" fill="${sunGlow}" opacity=".25"/>
    <circle cx="266" cy="${sunY}" r="${sunR}" fill="${sunColor}"/>
    ${phase === 'night' ? `<circle cx="292" cy="28" r="6" fill="${sunColor}" opacity=".7"/><circle cx="30" cy="24" r="4" fill="${sunColor}" opacity=".5"/><circle cx="54" cy="46" r="3" fill="${sunColor}" opacity=".4"/>` : ''}
    ${clouds}
    ${bg}
    ${home}
    ${ground}
    ${family}
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
  let s = `<svg viewBox="0 0 190 44" style="width:190px;height:44px">`;
  list.forEach((c, i) => {
    s += figureSVG(c, i % 2 ? 'female' : 'male', 'adult', i * 38 + 14, 44, 40);
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
