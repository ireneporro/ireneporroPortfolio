const puppeteer = require('puppeteer-core'); const wait = ms => new Promise(r => setTimeout(r, ms));
(async () => {
  const b = await puppeteer.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: 'new' });
  const p = await b.newPage(); const errs=[]; p.on('pageerror', e => errs.push(e.message));
  await p.setViewport({ width: 390, height: 844, deviceScaleFactor: 1 });
  await p.goto('http://localhost:8765/wattlepay-prototype/', { waitUntil: 'networkidle0' }); await wait(800);
  await p.screenshot({ path: '../shots/w-home.png' });
  await p.click('[data-go="cards"]'); await wait(900); await p.screenshot({ path: '../shots/w-cards.png' });
  await p.click('.tab[data-action="open-transfer"]'); await wait(800);
  await p.click('[data-contact="@anamartinez"]'); await wait(500);
  for (const k of ['3','2','5']) await p.click(`[data-key="${k}"]`);
  await wait(300); await p.screenshot({ path: '../shots/w-amount.png' });
  await p.click('#continue'); await wait(500); await p.click('#send-btn'); await wait(1200);
  await p.screenshot({ path: '../shots/w-done.png' });
  await p.click('[data-action="flow-close"]'); await wait(1200); await p.screenshot({ path: '../shots/w-home2.png' });
  console.log(errs); await b.close();
})();
