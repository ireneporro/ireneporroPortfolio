const puppeteer = require('puppeteer-core'); const fs = require('fs');
(async () => {
  const b = await puppeteer.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: 'new' });
  const p = await b.newPage();
  for (const [f, pts] of [['17.png', [[0.07,0.38],[0.18,0.38],[0.07,0.7],[0.18,0.7]]], ['18.png', [[0.07,0.38],[0.18,0.38],[0.3,0.38],[0.48,0.75],[0.6,0.75],[0.72,0.75]]], ['6.png',[[0.5,0.2],[0.1,0.6]]]]) {
    const data = 'data:image/png;base64,' + fs.readFileSync(process.env.HOME + '/Documents/ME/lowcode/' + f).toString('base64');
    console.log(f, await p.evaluate(async (data, pts) => { const img = new Image(); img.src = data; await img.decode(); const c = document.createElement('canvas'); c.width = img.width; c.height = img.height; const g = c.getContext('2d'); g.drawImage(img, 0, 0); return pts.map(([x, y]) => { const d = g.getImageData(Math.round(x*img.width), Math.round(y*img.height), 1, 1).data; return '#' + [d[0],d[1],d[2]].map(v => v.toString(16).padStart(2,'0')).join(''); }).join(' '); }, data, pts));
  }
  await b.close();
})();
