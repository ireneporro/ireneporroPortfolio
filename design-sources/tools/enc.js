// Re-encode large screenshots to WebP using Chrome's canvas (keeps width, quality 0.78)
const puppeteer = require('puppeteer-core'); const fs = require('fs'); const path = require('path');
(async () => {
  const b = await puppeteer.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: 'new', args: ['--allow-file-access-from-files'] });
  const p = await b.newPage();
  const src = path.resolve('../figma/legacy'), out = path.resolve('../pf/assets/legacy/screens');
  for (const [f, w] of [['home-desktop',1200],['landing-desktop',1200],['home-mobile',444],['landing-mobile',444],['cover',1200],['platform-modal',1200],['classes',1480],['menu-mobile',347]]) {
    const data = 'data:image/png;base64,' + fs.readFileSync(`${src}/${f}.png`).toString('base64');
    const webp = await p.evaluate(async (data, w) => {
      const img = new Image(); img.src = data; await img.decode();
      const h = Math.round(img.height * w / img.width);
      const c = document.createElement('canvas'); c.width = w; c.height = h;
      c.getContext('2d').drawImage(img, 0, 0, w, h);
      return [c.toDataURL('image/webp', 0.78), w, h];
    }, data, w);
    fs.writeFileSync(`${out}/${f}.webp`, Buffer.from(webp[0].split(',')[1], 'base64'));
    console.log(f, webp[1], webp[2], fs.statSync(`${out}/${f}.webp`).size);
  }
  await b.close();
})();
