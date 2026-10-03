const puppeteer = require('puppeteer-core'); const wait = ms => new Promise(r => setTimeout(r, ms));
(async () => {
  const b = await puppeteer.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: 'new' });
  const p = await b.newPage(); const errs=[]; p.on('pageerror', e => errs.push(e.message)); await p.setViewport({ width: 1440, height: 900 });
  await p.goto('http://localhost:8765/index.html?'+Date.now(), { waitUntil: 'networkidle0' });
  await p.evaluate(() => { document.documentElement.style.scrollBehavior='auto'; scrollTo(0, document.querySelector('.project-grid').getBoundingClientRect().top + scrollY - 90); }); await wait(2500);
  await p.screenshot({ path: '../shots/hw-home.png' });
  await p.goto('http://localhost:8765/more-work.html?'+Date.now(), { waitUntil: 'networkidle0' });
  await p.evaluate(() => { document.documentElement.style.scrollBehavior='auto'; scrollTo(0, document.querySelector('.wattlepay-work-card').getBoundingClientRect().top + scrollY - 120); }); await wait(2000);
  await p.screenshot({ path: '../shots/hw-more.png' }); console.log(errs); await b.close();
})();
