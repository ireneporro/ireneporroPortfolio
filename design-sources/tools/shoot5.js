const puppeteer = require('puppeteer-core'); const wait = ms => new Promise(r => setTimeout(r, ms));
(async () => {
  const b = await puppeteer.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: 'new' });
  const p = await b.newPage(); const errs=[]; p.on('pageerror', e => errs.push(e.message));
  await p.setViewport({ width: 1440, height: 900 });
  await p.goto('http://localhost:8765/?v=2', { waitUntil: 'networkidle0' }); await wait(3500);
  const li = await p.$$('.hero-pills li'); const bb = await li[2].boundingBox();
  await p.mouse.move(bb.x + 30, bb.y + 10); await wait(600);
  await p.screenshot({ path: '../shots/p-hero.png' });
  await p.screenshot({ path: '../shots/p-pills.png', clip: { x: 100, y: bb.y - 40, width: 1240, height: 110 } });
  await p.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
  await p.goto('http://localhost:8765/?v=2', { waitUntil: 'networkidle0' }); await wait(3500);
  await p.evaluate(() => window.scrollTo(0, 500)); await wait(800);
  await p.screenshot({ path: '../shots/p-mobile.png' });
  console.log(await p.evaluate(() => document.documentElement.scrollWidth), errs);
  await b.close();
})();
