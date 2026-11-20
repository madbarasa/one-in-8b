const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch();
  const pg = await b.newPage({ viewport: { width: 1280, height: 900 } });
  await pg.goto('http://127.0.0.1:3461/index.html', { waitUntil: 'domcontentloaded', timeout: 15000 });
  await pg.waitForTimeout(3000);
  await pg.click('#btn-birth');
  await pg.waitForTimeout(800);
  await pg.screenshot({ path: '/home/z/my-project/tmp_ref/our_birth.png' });
  await pg.click('#btn-start');
  await pg.waitForTimeout(1800);
  await pg.screenshot({ path: '/home/z/my-project/tmp_ref/our_game.png' });
  await b.close();
  console.log('ok');
})().catch(e => console.log('ERR:', e.message.slice(0, 120)));
