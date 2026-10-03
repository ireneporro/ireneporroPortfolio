const puppeteer = require('puppeteer-core'); const wait = ms => new Promise(r => setTimeout(r, ms));
(async () => {
  const b = await puppeteer.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: 'new' });
  const p = await b.newPage(); await p.setViewport({ width: 1440, height: 900 });
  for (const c of ['case-meralis','case-wattlepay','case-design-system']) {
    await p.goto(`http://localhost:8765/${c}.html`, { waitUntil: 'networkidle0' });
    const H = await p.evaluate(() => document.body.scrollHeight); let i = 0;
    for (let y = 0; y < H && i < 10; y += 900) { await p.evaluate(y => scrollTo(0, y), y); await wait(900); await p.screenshot({ path: `../shots/c-${c}-${i++}.png` }); }
    console.log(c, H, i);
  }
  await b.close();
})();
