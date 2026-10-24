// 种子随机数：mulberry32，每次出生生成新种子，支持复现调试
export function makeRng(seed) {
  let a = seed >>> 0;
  const next = () => {
    a |= 0; a = (a + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
  // [min, max) 整数
  next.int = (min, max) => min + Math.floor(next() * (max - min));
  // 按权重抽取，weights 为数组，返回下标
  next.weighted = (weights) => {
    const total = weights.reduce((s, w) => s + w, 0);
    let r = next() * total;
    for (let i = 0; i < weights.length; i++) {
      r -= weights[i];
      if (r < 0) return i;
    }
    return weights.length - 1;
  };
  // 以 p 概率返回 true
  next.chance = (p) => next() < p;
  return next;
}

export function randomSeed() {
  return (Date.now() ^ (Math.random() * 0xFFFFFFFF)) >>> 0;
}
