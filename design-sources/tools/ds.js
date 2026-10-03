const puppeteer = require('puppeteer-core'); const path = require('path'); const wait = ms => new Promise(r => setTimeout(r, ms));
(async () => {
  const b = await puppeteer.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: 'new' });
  const p = await b.newPage(); await p.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
  for (const id of ['themes','tokens','scales','contrast','rules','process']) {
    await p.goto('file://' + path.resolve('../ds-app/index.html') + '?s=' + id, { waitUntil: 'networkidle0' });
    await p.evaluate(() => document.fonts.ready); await wait(300);
    const h = await p.evaluate(() => Math.ceil(document.querySelector('.board.on').getBoundingClientRect().height));
    await p.screenshot({ path: `../ds-shots/${id}.webp`, type: 'webp', quality: 90, clip: { x: 0, y: 0, width: 1440, height: h }, captureBeyondViewport: true });
    await p.screenshot({ path: `../ds-shots/prev-${id}.png`, clip: { x: 0, y: 0, width: 1440, height: h }, captureBeyondViewport: true });
    console.log(id, h);
  }
  await b.close();
})();
