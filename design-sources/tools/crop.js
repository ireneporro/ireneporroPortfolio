const puppeteer = require('puppeteer-core'); const fs = require('fs');
(async () => {
  const b = await puppeteer.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: 'new' });
  const p = await b.newPage();
  const data = 'data:image/png;base64,' + fs.readFileSync('../figma/legacy/classes.png').toString('base64');
  const out = await p.evaluate(async (data) => {
    const img = new Image(); img.src = data; await img.decode();
    const i = 26, w = img.width - 2*i, h = img.height - 2*i;
    const c = document.createElement('canvas'); c.width = w; c.height = h;
    c.getContext('2d').drawImage(img, i, i, w, h, 0, 0, w, h);
    return [c.toDataURL('image/webp', .8), w, h];
  }, data);
  fs.writeFileSync('../pf/assets/legacy/screens/classes.webp', Buffer.from(out[0].split(',')[1], 'base64')); console.log(out[1], out[2]);
  await b.close();
})();
