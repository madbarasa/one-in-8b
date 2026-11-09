// 生命表自动生成器 v0.6.0：给定目标预期寿命(e0)与婴儿死亡率(IMR)，程序生成完整 qx 表
// 三张手工校准的基准形态表（发达/转型/发展中），按目标特征选基准，
// 婴儿段直接拟合 IMR，5 岁以上统一缩放系数 k 二分校准使 e0 精确命中
// 校准目标口径：世界银行 SP.DYN.LE00.MA.IN / FE.IN（最新值）

// 基准形态（从 lifetables.js 手工表抽取的形态骨架，e0 已知）
const BASE_DEVELOPED = { // 形态源自中国表（经校准，e0≈74.5 男）
  0: 0.0045, 1: 0.0007, 2: 0.0005, 3: 0.0004, 4: 0.0004,
  5: 0.0003, 6: 0.0003, 7: 0.0003, 8: 0.0003, 9: 0.0003,
  10: 0.0003, 11: 0.0003, 12: 0.0003, 13: 0.0004, 14: 0.0005,
  15: 0.0006, 16: 0.0007, 17: 0.0008, 18: 0.0009, 19: 0.0010,
  20: 0.0010, 21: 0.0010, 22: 0.0010, 23: 0.0010, 24: 0.0011,
  25: 0.0011, 26: 0.0011, 27: 0.0012, 28: 0.0012, 29: 0.0013,
  30: 0.0013, 31: 0.0014, 32: 0.0014, 33: 0.0015, 34: 0.0016,
  35: 0.0017, 36: 0.0018, 37: 0.0019, 38: 0.0021, 39: 0.0022,
  40: 0.0024, 41: 0.0026, 42: 0.0028, 43: 0.0030, 44: 0.0033,
  45: 0.0036, 46: 0.0039, 47: 0.0043, 48: 0.0047, 49: 0.0051,
  50: 0.0056, 51: 0.0061, 52: 0.0067, 53: 0.0073, 54: 0.0080,
  55: 0.0088, 56: 0.0096, 57: 0.0105, 58: 0.0115, 59: 0.0126,
  60: 0.0138, 61: 0.0151, 62: 0.0165, 63: 0.0181, 64: 0.0199,
  65: 0.0219, 66: 0.0241, 67: 0.0266, 68: 0.0293, 69: 0.0323,
  70: 0.0357, 71: 0.0395, 72: 0.0437, 73: 0.0484, 74: 0.0537,
  75: 0.0596, 76: 0.0662, 77: 0.0736, 78: 0.0819, 79: 0.0912,
  80: 0.1016, 81: 0.1132, 82: 0.1262, 83: 0.1407, 84: 0.1569,
  85: 0.1750, 86: 0.1952, 87: 0.2178, 88: 0.2430, 89: 0.2711,
  90: 0.3024, 91: 0.3371, 92: 0.3754, 93: 0.4174, 94: 0.4631,
  95: 0.5124, 96: 0.5651, 97: 0.6208, 98: 0.6789, 99: 0.7386,
  100: 0.7989, 101: 0.8588, 102: 0.9171, 103: 0.9724, 104: 1.0,
};

// 基准 e0（形态表自身的出生期望寿命，用于归一）
const BASE_E0 = { developed: 74.5, developing: 68.5 };

// 基准形态（发展中）：印度表骨架（e0≈68.5）
const BASE_DEVELOPING = {
  0: 0.026, 1: 0.0032, 2: 0.0018, 3: 0.0013, 4: 0.0010,
  5: 0.0009, 6: 0.0008, 7: 0.0008, 8: 0.0007, 9: 0.0007,
  10: 0.0007, 11: 0.0008, 12: 0.0008, 13: 0.0009, 14: 0.0011,
  15: 0.0013, 16: 0.0015, 17: 0.0018, 18: 0.0020, 19: 0.0022,
  20: 0.0024, 21: 0.0025, 22: 0.0026, 23: 0.0027, 24: 0.0028,
  25: 0.0029, 26: 0.0030, 27: 0.0031, 28: 0.0032, 29: 0.0033,
  30: 0.0034, 31: 0.0036, 32: 0.0037, 33: 0.0039, 34: 0.0041,
  35: 0.0043, 36: 0.0046, 37: 0.0049, 38: 0.0052, 39: 0.0056,
  40: 0.0060, 41: 0.0065, 42: 0.0070, 43: 0.0076, 44: 0.0083,
  45: 0.0090, 46: 0.0098, 47: 0.0107, 48: 0.0117, 49: 0.0128,
  50: 0.0140, 51: 0.0154, 52: 0.0169, 53: 0.0186, 54: 0.0204,
  55: 0.0225, 56: 0.0248, 57: 0.0273, 58: 0.0302, 59: 0.0333,
  60: 0.0368, 61: 0.0407, 62: 0.0450, 63: 0.0498, 64: 0.0552,
  65: 0.0612, 66: 0.0679, 67: 0.0754, 68: 0.0838, 69: 0.0931,
  70: 0.1035, 71: 0.1150, 72: 0.1278, 73: 0.1420, 74: 0.1578,
  75: 0.1752, 76: 0.1944, 77: 0.2156, 78: 0.2389, 79: 0.2644,
  80: 0.2921, 81: 0.3221, 82: 0.3542, 83: 0.3883, 84: 0.4241,
  85: 0.4613, 86: 0.4994, 87: 0.5379, 88: 0.5764, 89: 0.6144,
  90: 0.6515, 91: 0.6875, 92: 0.7220, 93: 0.7548, 94: 0.7857,
  95: 0.8146, 96: 0.8415, 97: 0.8663, 98: 0.8889, 99: 0.9092,
  100: 0.9273, 101: 0.9432, 102: 0.9570, 103: 0.9686, 104: 0.9782,
};

// 由表计算出生期望寿命 e0
function calcE0(table) {
  let lx = 100000, total = 0;
  for (let x = 0; x <= 115; x++) {
    const q = Math.min(1, table[x] !== undefined ? table[x] : 1);
    const dx = lx * q;
    total += dx * (x + 0.5);
    lx -= dx;
    if (lx <= 0.5) break;
  }
  // 115 岁截断闭合：剩余存活者计为死于 115.5 岁（避免低估 e0 导致校准发散）
  if (lx > 0.5) total += lx * 115.5;
  return total / 100000;
}

// 选基准：IMR<25‰ 且 e0>70 用发达形态，否则发展中
function pickBase(targetE0, imr) {
  return (targetE0 > 70 && imr < 25) ? BASE_DEVELOPED : BASE_DEVELOPING;
}

// 高龄段外推：从表尾以经典闭合律 q(x+1)=q(x)^r 延伸至 115 岁
function extendTo115(t) {
  const ages = Object.keys(t).map(Number).sort((a, b) => a - b);
  let last = ages[ages.length - 1];
  let q = Math.min(0.98, t[last]);
  for (let a = last + 1; a <= 115; a++) {
    // 经典闭合律：死亡概率随年龄单调上升（1-(1-q)^1.09 保证递增方向正确）
    q = Math.min(1, 1 - Math.pow(1 - q, 1.09));
    t[a] = q;
  }
  return t;
}

// 生成一张 qx 表：拟合 IMR（0 岁精确）+ 二分校准 k 使 e0 命中
export function genTable(targetE0, imrPermille, gender) {
  const imr = Math.max(1, Math.min(150, imrPermille)) / 1000;
  // 性别差异：女性 e0 已在调用方区分；女性婴儿/成人死亡率略低
  const femaleAdj = gender === 'female' ? 0.85 : 1.0;
  const base = pickBase(targetE0, imrPermille);
  const baseE0 = calcE0(base);

  const table = {};
  // 0 岁：精确拟合 IMR（世行 IMR 为每千活产一岁内死亡概率）
  table[0] = Math.min(0.45, imr);
  // 1-4 岁：与 IMR 正相关的童年段（发展中国家常见模式）
  const childFactor = Math.pow(imr / 0.02, 0.6);
  for (let a = 1; a <= 4; a++) {
    table[a] = Math.min(0.2, (base[a] || 0.001) * childFactor);
  }
  // 5 岁以上：校准系数 k，使整体 e0 = targetE0（log 均匀采样 + 局部二分，稳健应对形态折返）
  const build = (k) => {
    const t = { ...table };
    for (let a = 5; a <= 104; a++) {
      t[a] = Math.min(1, (base[a] !== undefined ? base[a] : 1) * k * femaleAdj);
    }
    // 清除基准表残留的 105-115 固定值，改由闭合律从 q104 重建（保证 k 全程可控）
    for (let a = 105; a <= 115; a++) delete t[a];
    return extendTo115(t);
  };
  // 先 log 均匀采样 48 点定位含目标 e0 的区间
  let kLo = 0.2, kHi = 4.5, eLo = calcE0(build(kLo)), eHi = calcE0(build(kHi));
  const STEPS = 48;
  let prevK = kLo, prevE = eLo;
  for (let i = 1; i <= STEPS; i++) {
    const kk = 0.2 * Math.pow(4.5 / 0.2, i / STEPS);
    const ee = calcE0(build(kk));
    // e0 随 k 单调递减：找首个 ee <= targetE0 的区间
    if (ee <= targetE0 && prevE > targetE0) {
      kLo = prevK; eLo = prevE; kHi = kk; eHi = ee;
      break;
    }
    prevK = kk; prevE = ee;
    if (i === STEPS) { kLo = prevK; kHi = kk; eLo = prevE; eHi = ee; }
  }
  // 区间内局部二分（对数域）
  for (let i = 0; i < 40; i++) {
    const mid = Math.sqrt(kLo * kHi);
    const e = calcE0(build(mid));
    if (e > targetE0) kLo = mid; else kHi = mid;
  }
  const k = Math.sqrt(kLo * kHi);
  return build(k);
}

// 生成国家完整生命表（男/女），e0 按世行男女口径，总口径用于交叉验证
export function genCountryTables(leMale, leFemale, imrPermille) {
  return {
    male: genTable(leMale, imrPermille, 'male'),
    female: genTable(leFemale, imrPermille * 0.92, 'female'), // 女婴死亡率略低
  };
}

// 惰性缓存
const cache = new Map();
export function getTable(iso3, gender, leMale, leFemale, imr) {
  const key = iso3 + '/' + gender;
  if (!cache.has(key)) {
    const tables = genCountryTables(leMale, leFemale, imr);
    cache.set(iso3 + '/male', tables.male);
    cache.set(iso3 + '/female', tables.female);
  }
  return cache.get(key);
}
