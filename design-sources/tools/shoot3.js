const puppeteer = require('puppeteer-core'); const wait = ms => new Promise(r => setTimeout(r, ms));
(async () => {
  const b = await puppeteer.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: 'new' });
  const p = await b.newPage(); await p.setViewport({ width: 1440, height: 900 });
  await p.goto('http://localhost:8765/', { waitUntil: 'networkidle0' }); await wait(3000);
  await p.evaluate(() => window.scrollTo(0, 560)); await wait(600);
  await p.screenshot({ path: '../shots/o-marquee.png' });
  await p.click('[data-slide="2"]'); await p.evaluate(() => window.scrollTo(0, 0)); await wait(2200);
  await p.screenshot({ path: '../shots/o-slide3.png', clip:{x:640,y:180,width:740,height:480} });
  await b.close();
})();
