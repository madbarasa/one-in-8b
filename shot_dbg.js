const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch();
  const pg = await b.newPage({ viewport: { width: 900, height: 600 } });
  const errs = [];
  pg.on('console', m => { if (m.type() === 'error') errs.push(m.text().slice(0, 300)); });
  pg.on('pageerror', e => errs.push('PAGEERR: ' + e.message.slice(0, 300)));
  await pg.goto('http://127.0.0.1:3460/index.html', { waitUntil: 'domcontentloaded', timeout: 15000 });
  await pg.waitForTimeout(4000);
  console.log('btn-birth:', await pg.locator('#btn-birth').count());
  console.log('body len:', (await pg.evaluate(() => document.body.innerHTML.length)));
  console.log('errors:', errs.length ? errs.join('\n---\n') : 'none');
  await b.close();
})();
