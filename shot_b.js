const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch();
  const pg = await b.newPage({ viewport: { width: 1280, height: 900 }, timeout: 12000 });
  await pg.goto('http://127.0.0.1:3462/index.html', { waitUntil: 'domcontentloaded', timeout: 12000 });
  await pg.waitForTimeout(2500);
  await pg.click('#btn-birth');
  await pg.waitForTimeout(700);
  await pg.screenshot({ path: '/home/z/my-project/tmp_ref/our_birth.png' });
  await b.close();
  console.log('ok');
})().catch(e => console.log('ERR:', e.message.slice(0, 100)));
