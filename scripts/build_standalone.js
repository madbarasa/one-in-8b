// 单文件离线版打包：ESM 模块按依赖序拼接为自包含 HTML
const fs = require('fs');
const ROOT = '/home/z/my-project/one-in-8b';

// 依赖序（被依赖者在前）
const ORDER = [
  'js/rng.js',
  'js/data/lifetables.js',
  'js/data/countries.js',
  'js/data/names.js',
  'js/data/events.js',
  'js/engine/birth.js',
  'js/engine/life.js',
  'js/ui/render.js',
  'js/main.js',
];

const stripModule = (src) => src
  // 剥 import 行
  .replace(/^import\s+.*$/gm, '')
  // 剥 export 前缀（function/const/let 声明）
  .replace(/^export\s+(async\s+)?function/gm, '$1function')
  .replace(/^export\s+(const|let|var)/gm, '$1')
  .replace(/^export\s+\{[^}]*\};?\s*$/gm, '')
  // 模块间相对路径已无意义
  .trim();

const js = ORDER.map(f => `// ══ ${f} ══\n` + stripModule(fs.readFileSync(`${ROOT}/${f}`, 'utf8'))).join('\n\n');
const css = fs.readFileSync(`${ROOT}/css/main.css`, 'utf8');

const html = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>八十亿分之一 · 人生模拟（离线版 v0.2.0）</title>
<style>
${css}
</style>
</head>
<body>
<div id="app"></div>
<div id="modal-root"></div>
<script>
${js}
</script>
</body>
</html>`;

const out = '/home/z/my-project/reports/八十亿分之一_离线版.html';
fs.writeFileSync(out, html);
console.log('written:', out, (fs.statSync(out).size / 1024).toFixed(1) + 'KB');
