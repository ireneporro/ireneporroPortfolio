const puppeteer = require('puppeteer-core'); const wait = ms => new Promise(r => setTimeout(r, ms));
(async () => {
  const b = await puppeteer.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: 'new' });
  const p = await b.newPage(); const errs=[]; p.on('pageerror', e => errs.push(e.message));
  for (const [w,h,name,mob] of [[1440,900,'desk',false],[390,844,'mob',true]]) {
    await p.setViewport({ width: w, height: h, isMobile: mob, hasTouch: mob });
    await p.goto('http://localhost:8765/case-wattlepay.html', { waitUntil: 'networkidle0' });
    await p.evaluate(() => document.querySelector('.wp-live').scrollIntoView({ block: 'start' }));
    await wait(2500);
    await p.screenshot({ path: `../shots/live-${name}.png` });
    if (!mob) {
      const f = await (await p.$('.wp-screen iframe')).contentFrame();
      const btn = (await f.$$('button')).find; 
      await f.evaluate(() => [...document.querySelectorAll('button')].find(b => b.innerText.trim() === 'Transfer').click());
      await wait(1200); await p.screenshot({ path: `../shots/live-desk-transfer.png` });
    } else {
      await p.evaluate(() => scrollBy(0, 700)); await wait(1200); await p.screenshot({ path: `../shots/live-mob2.png` });
      console.log('sw', await p.evaluate(() => document.documentElement.scrollWidth));
    }
  }
  console.log(errs); await b.close();
})();
