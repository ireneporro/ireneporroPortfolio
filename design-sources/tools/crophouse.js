const puppeteer = require('puppeteer-core'); const fs = require('fs');
(async () => {
  const b = await puppeteer.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: 'new' });
  const p = await b.newPage();
  const data = 'data:image/png;base64,' + fs.readFileSync(process.env.HOME + '/Documents/ME/affinity/Deals & listing view Member.png').toString('base64');
  const out = await p.evaluate(async (data) => {
    const img = new Image(); img.src = data; await img.decode();
    const crop = (x, y, w, h) => { const c = document.createElement('canvas'); c.width = w; c.height = h; c.getContext('2d').drawImage(img, x, y, w, h, 0, 0, w, h); return c.toDataURL('image/jpeg', .9); };
    return { W: img.width, H: img.height, main: crop(470, 1625, 788, 268), t1: crop(1265, 1625, 175, 162), t2: crop(1443, 1625, 175, 162), t3: crop(1265, 1793, 175, 162), t4: crop(1443, 1793, 175, 162) };
  }, data);
  for (const k of ['main','t1','t2','t3','t4']) fs.writeFileSync(`../haven-app/${k}.jpg`, Buffer.from(out[k].split(',')[1], 'base64'));
  console.log(out.W, out.H); await b.close();
})();
