const puppeteer = require('puppeteer-core');
const out = '../shots/';
const wait = ms => new Promise(r => setTimeout(r, ms));
(async () => {
  const b = await puppeteer.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: 'new' });
  const p = await b.newPage();
  const errs = [];
  p.on('pageerror', e => errs.push(e.message)); p.on('console', m => m.type()==='error' && errs.push(m.text()));
  await p.setViewport({ width: 1440, height: 900 });
  await p.goto('http://localhost:8765/', { waitUntil: 'networkidle0' });
  await wait(700); await p.screenshot({ path: out + 'm-hero-0700.png' });
  await wait(900); await p.screenshot({ path: out + 'm-hero-1600.png' });
  await p.mouse.move(1150, 300); await wait(2600); await p.screenshot({ path: out + 'm-hero-done.png' });
  await p.click('[data-slide="2"]'); await wait(450); await p.screenshot({ path: out + 'm-slide3-mid.png' });
  await wait(1800); await p.screenshot({ path: out + 'm-slide3.png' });
  await p.click('[data-slide="1"]'); await wait(2200); await p.screenshot({ path: out + 'm-slide2.png' });
  const H = await p.evaluate(() => document.body.scrollHeight);
  let i = 0;
  for (let y = 900; y < H; y += 800) {
    await p.evaluate(y => window.scrollTo(0, y), y); await wait(1800);
    await p.screenshot({ path: out + `m-scroll-${String(i++).padStart(2,'0')}.png` });
  }
  await p.evaluate(() => window.scrollTo(0, document.querySelector('.project-card').offsetTop - 120)); await wait(1500);
  const c = await p.$('.project-card'); const bb = await c.boundingBox();
  await p.mouse.move(bb.x + bb.width*0.8, bb.y + bb.height*0.25); await wait(800);
  await p.screenshot({ path: out + 'm-card-hover.png' });
  await p.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
  await p.goto('http://localhost:8765/', { waitUntil: 'networkidle0' }); await wait(3500);
  await p.screenshot({ path: out + 'm-mobile.png' });
  const overflow = await p.evaluate(() => document.documentElement.scrollWidth);
  console.log('mobile scrollWidth', overflow, 'height', H, 'errors', JSON.stringify(errs));
  await b.close();
})();
