const puppeteer = require('puppeteer-core'); const fs = require('fs');
(async () => {
  const b = await puppeteer.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: 'new' });
  const p = await b.newPage();
  const load = f => 'data:image/png;base64,' + fs.readFileSync(process.env.HOME + '/Documents/ME/kosher/' + f).toString('base64');
  const res = await p.evaluate(async (imgs) => {
    const out = {};
    for (const [name, data, pts] of imgs) {
      const img = new Image(); img.src = data; await img.decode();
      const c = document.createElement('canvas'); c.width = img.width; c.height = img.height;
      const g = c.getContext('2d'); g.drawImage(img, 0, 0);
      out[name] = pts.map(([x, y]) => { const d = g.getImageData(Math.round(x * img.width), Math.round(y * img.height), 1, 1).data; return '#' + [d[0], d[1], d[2]].map(v => v.toString(16).padStart(2, '0')).join(''); });
    }
    return out;
  }, [['login', load('Login.png'), [[0.24, 0.687], [0.115, 0.632], [0.73, 0.505], [0.1, 0.1]]],
      ['dash', load('Superadmin_dashboard.png'), [[0.71, 0.117], [0.065, 0.073], [0.28, 0.5], [0.38, 0.5], [0.49, 0.53], [0.77, 0.599], [0.84, 0.025]]]]);
  console.log(JSON.stringify(res, null, 1)); await b.close();
})();
