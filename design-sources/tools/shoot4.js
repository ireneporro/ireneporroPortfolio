const puppeteer = require('puppeteer-core'); const wait = ms => new Promise(r => setTimeout(r, ms));
(async () => {
  const b = await puppeteer.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: 'new' });
  const p = await b.newPage(); const errs=[]; p.on('pageerror', e => errs.push(e.message));
  await p.setViewport({ width: 1440, height: 900 });
  await p.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }]);
  await p.goto('http://localhost:8765/', { waitUntil: 'networkidle0' }); await wait(300);
  await p.click('[data-slide="2"]'); await wait(200);
  await p.screenshot({ path: '../shots/r-reduced.png' });
  const state = await p.evaluate(() => ({ motion: document.documentElement.className, visible: [...document.querySelectorAll('.studio-slide')].map(s => !s.hidden) }));
  await p.emulateMediaFeatures([]);
  await p.goto('http://localhost:8765/case-meralis.html', { waitUntil: 'networkidle0' }); await wait(800);
  await p.screenshot({ path: '../shots/r-case.png' });
  console.log(JSON.stringify(state), errs);
  await b.close();
})();
