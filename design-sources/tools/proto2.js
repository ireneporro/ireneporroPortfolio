const puppeteer = require('puppeteer-core'); const wait = ms => new Promise(r => setTimeout(r, ms));
(async () => {
  const b = await puppeteer.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: 'new' });
  const p = await b.newPage(); const errs=[]; p.on('pageerror', e => errs.push(e.message)); p.on('console', m => m.type()==='error' && errs.push(m.text()));
  await p.setViewport({ width: 390, height: 844 });
  await p.goto('http://localhost:8765/wattlepay-prototype/', { waitUntil: 'networkidle0' }); await wait(1500);
  await p.screenshot({ path: '../shots/x-home.png' });
  const btns = await p.evaluate(() => [...document.querySelectorAll('button')].map(b => b.innerText.trim().slice(0,20)).filter(Boolean));
  console.log(JSON.stringify(btns), errs); await b.close();
})();
