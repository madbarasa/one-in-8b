const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch();
  const pg = await b.newPage({ viewport: { width: 900, height: 950 } });
  await pg.goto('http://127.0.0.1:3460/index.html', { waitUntil: 'domcontentloaded', timeout: 15000 });
  await pg.waitForTimeout(2500);
  await pg.click('#btn-birth');
  await pg.waitForTimeout(700);
  await pg.click('#btn-start');
  await pg.waitForTimeout(1800);
  const info = await pg.evaluate(() => {
    const ids = ['scene', 'game-scene', 'stage'];
    for (const id of ids) { const e = document.getElementById(id); if (e) return { id, html: e.innerHTML.slice(0, 80) }; }
    // 找场景 svg 容器
    const svg = document.querySelector('.stage svg, #scene-wrap svg, .scene-box svg, svg[viewBox="0 0 320 210"]');
    if (svg) return { id: 'svg', html: svg.outerHTML.slice(0, 80) };
    return { id: 'none', html: document.body.innerText.slice(0, 100) };
  });
  console.log('found:', JSON.stringify(info).slice(0, 150));
  await b.close();
})().catch(e => console.log('ERR:', e.message.slice(0, 100)));
