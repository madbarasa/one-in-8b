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
  const el = await pg.$('svg[viewBox="0 0 320 210"]');
  await el.scrollIntoViewIfNeeded();
  await pg.waitForTimeout(300);
  await el.screenshot({ path: '/home/z/my-project/tmp_ref/scene_el.png' });
  console.log('ok');
  await b.close();
})().catch(e => console.log('ERR:', e.message.slice(0, 100)));
