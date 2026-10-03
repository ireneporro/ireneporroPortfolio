const puppeteer = require('puppeteer-core'); const path = require('path'); const wait = ms => new Promise(r => setTimeout(r, ms));
(async () => {
  const b = await puppeteer.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: 'new' });
  const p = await b.newPage(); const errs=[]; p.on('pageerror', e => errs.push(e.message));
  await p.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
  for (const id of ['manage','status','detail','company','system','training']) {
    await p.goto('file://' + path.resolve('../relay-app/index.html') + '?s=' + id, { waitUntil: 'networkidle0' });
    await p.evaluate(() => document.fonts.ready); await wait(300);
    await p.screenshot({ path: `../relay-shots/${id}.webp`, type: 'webp', quality: 90 });
    await p.screenshot({ path: `../relay-shots/prev-${id}.png`, clip: { x: 0, y: 0, width: 1440, height: 900 }, captureBeyondViewport: false });
  }
  console.log(errs); await b.close();
})();
