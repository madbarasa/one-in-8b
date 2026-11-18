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
  // 模拟 34 岁看家庭图（有配偶+孩子）
  const el = await pg.$('#scene');
  if (el) { await el.scrollIntoViewIfNeeded(); await el.screenshot({ path: '/home/z/my-project/tmp_ref/scene_el.png' }); }
  console.log('scene shot:', !!el);
  await b.close();
})().catch(e => console.log('ERR:', e.message.slice(0, 100)));
