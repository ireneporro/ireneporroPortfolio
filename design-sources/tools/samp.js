const puppeteer = require('puppeteer-core'); const fs = require('fs');
(async () => {
  const b = await puppeteer.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: 'new' });
  const p = await b.newPage();
  const data = 'data:image/png;base64,' + fs.readFileSync('../ds1/03.png').toString('base64');
  const r = await p.evaluate(async (data) => {
    const img = new Image(); img.src = data; await img.decode();
    const c = document.createElement('canvas'); c.width = img.width; c.height = img.height; const g = c.getContext('2d'); g.drawImage(img, 0, 0);
    const hex = (x, y) => { const d = g.getImageData(x, y, 1, 1).data; return '#' + [d[0], d[1], d[2]].map(v => v.toString(16).padStart(2, '0')).join(''); };
    const xs = [88,173,258,343,428,513,598,683,768]; const rows = {primary:253, neutral:399, s1:639, s2:733, s3:828, s4:922, status:1268};
    const o = {}; for (const [k, y] of Object.entries(rows)) o[k] = xs.map(x => hex(x, y)); o.status = o.status.slice(0,5); return o;
  }, data);
  console.log(JSON.stringify(r, null, 0)); await b.close();
})();
