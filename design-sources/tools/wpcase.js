const puppeteer = require('puppeteer-core'); const wait = ms => new Promise(r => setTimeout(r, ms));
(async () => {
  const b = await puppeteer.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: 'new' });
  const p = await b.newPage(); const errs=[]; p.on('pageerror', e => errs.push(e.message));
  for (const [w,h,mob] of [[1440,900,false],[390,844,true]]) {
    await p.setViewport({ width: w, height: h, isMobile: mob, hasTouch: mob });
    await p.goto('http://localhost:8765/case-wattlepay.html?'+Date.now(), { waitUntil: 'networkidle0' });
    for (const sel of ['.case-hero','.wp-system','.wp-flow','.wp-tech']) {
      await p.evaluate(s => { document.documentElement.style.scrollBehavior='auto'; const el=document.querySelector(s); const se=document.scrollingElement; const y=el.getBoundingClientRect().top + se.scrollTop - 90; se.scrollTop=y; [...document.querySelectorAll('*')].filter(e=>e.scrollHeight>e.clientHeight+50 && getComputedStyle(e).overflowY.match(/auto|scroll/)).forEach(c=>{c.scrollTop += el.getBoundingClientRect().top - 90}); }, sel); await wait(1400);
      await p.screenshot({ path: `../shots/wpc-${mob?'m':'d'}-${sel.replace(/\W/g,'')}.png` });
    }
    console.log(w, await p.evaluate(() => document.documentElement.scrollWidth));
  }
  console.log(errs); await b.close();
})();
