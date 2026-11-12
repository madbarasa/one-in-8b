// 时代色调 v0.9.0：年代世界整页配色随出生年漂移
// 1950 胶片泛黄 → 1960-70 高饱和印刷 → 1980-90 荧光渐亮 → 2000-10 数码过渡 → 2015+ 现行主题
// 用 CSS 变量覆写 documentElement，今日世界（2026+）不注入任何东西

const ERA_THEMES = [
  {
    min: 1950, max: 1959, name: '胶片年代',
    vars: { '--bg': '#e6dcc0', '--card': '#f2e9d2', '--ink': '#26211a', '--ink-2': '#5a5142', '--ink-3': '#8f8672', '--accent': '#a3542c', '--line': '#d2c5a4' },
  },
  {
    min: 1960, max: 1979, name: '印刷年代',
    vars: { '--bg': '#efe4cb', '--card': '#f8efdb', '--ink': '#1e1a14', '--ink-2': '#4e4436', '--ink-3': '#837659', '--accent': '#bf3a26', '--line': '#d8c8a6' },
  },
  {
    min: 1980, max: 1999, name: '荧光年代',
    vars: { '--bg': '#e7e9e0', '--card': '#f4f5ee', '--ink': '#15181d', '--ink-2': '#3d444d', '--ink-3': '#6e7883', '--accent': '#0e7490', '--line': '#c9cfc9' },
  },
  {
    min: 2000, max: 2014, name: '数码年代',
    vars: { '--bg': '#eceef0', '--card': '#f8f9fa', '--ink': '#1a1d22', '--ink-2': '#43484f', '--ink-3': '#767d86', '--accent': '#4a6fa5', '--line': '#d3d7db' },
  },
];

// 出生年 → 主题（无匹配返回 null = 用默认主题）
export function eraThemeFor(birthYear) {
  if (!birthYear || birthYear >= 2015) return null;
  for (const t of ERA_THEMES) {
    if (birthYear >= t.min && birthYear <= t.max) return t;
  }
  return null; // <1950 也回默认
}

export function applyEraTheme(birthYear) {
  const root = document.documentElement;
  resetEraTheme();
  const t = eraThemeFor(birthYear);
  if (!t) return null;
  for (const [k, v] of Object.entries(t.vars)) root.style.setProperty(k, v);
  root.dataset.era = t.name;
  return t.name;
}

export function resetEraTheme() {
  const root = document.documentElement;
  for (const t of ERA_THEMES) {
    for (const k of Object.keys(t.vars)) root.style.removeProperty(k);
  }
  delete root.dataset.era;
}
