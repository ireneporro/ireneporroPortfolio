const puppeteer = require('puppeteer-core'); const wait = ms => new Promise(r => setTimeout(r, ms));
(async () => {
  const b = await puppeteer.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: 'new' });
  const p = await b.newPage(); const errs=[]; p.on('pageerror', e => errs.push(e.message)); p.on('requestfailed', r => errs.push('fail '+r.url()));
  await p.setViewport({ width: 1440, height: 900 });
  
  
  
  await p.goto('http://localhost:8765/more-work.html?'+Date.now(), { waitUntil: 'networkidle0' });
  for (const sel of ['main']) {
    await p.evaluate(s => { document.documentElement.style.scrollBehavior='auto'; scrollTo(0, document.querySelector(s).getBoundingClientRect().top + scrollY - 90); }, sel); await wait(900);
    await p.screenshot({ path: `../shots/mw-${sel.replace(/\W/g,'')}.png` });
  }
  await p.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
  await p.goto('http://localhost:8765/more-work.html?'+Date.now(), { waitUntil: 'networkidle0' }); await wait(800);
  await p.screenshot({ path: '../shots/mw-m.png' });
  console.log('sw', await p.evaluate(() => document.documentElement.scrollWidth), errs); await b.close();
})();
