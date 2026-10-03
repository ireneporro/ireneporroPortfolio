const puppeteer = require('puppeteer-core'); const fs = require('fs');
const D = process.env.HOME + '/Documents/ME/honeybee/';
const files = { 'Slide 16_9 - 1.png':'hero', 'Home ideas.png':'home', 'Plans.png':'plans', 'Products.png':'products', 'Purchase suscribrption.png':'thanks', 'Welcome screen.png':'welcome', 'Login.png':'login', 'Leaving soon_.png':'leaving', 'Payment.png':'payment' };
process.on('unhandledRejection',e=>{console.log('UNH',e.message);process.exit(1)});
(async () => {
  console.log('start');
  const b = await puppeteer.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: 'new', args:['--allow-file-access-from-files'] });
  const p = await b.newPage();
  for (const [f, name] of Object.entries(files)) {
    console.log('file', f); await p.goto('file://' + D + encodeURIComponent(f));
    const res = await p.evaluate(async () => {
      const img = document.querySelector('img'); await img.decode();
      const sc = Math.min(1, 3200 / img.naturalWidth, 6000 / img.naturalHeight);
      const W = Math.round(img.naturalWidth * sc), H = Math.round(img.naturalHeight * sc);
      const c = document.createElement('canvas'); c.width = W; c.height = H; const g = c.getContext('2d'); g.drawImage(img, 0, 0, W, H);
      const d = g.getImageData(0, 0, W, H).data;
      const bg = [d[0], d[1], d[2]];
      const isBg = i => Math.abs(d[i]-bg[0]) + Math.abs(d[i+1]-bg[1]) + Math.abs(d[i+2]-bg[2]) < 24;
      const colHas = new Array(W).fill(0), rowHas = new Array(H).fill(0);
      for (let y = 0; y < H; y += 3) for (let x = 0; x < W; x++) if (!isBg((y*W+x)*4)) { colHas[x]++; }
      const segs = (arr, min) => { const out = []; let s = -1; for (let i = 0; i <= arr.length; i++) { const on = i < arr.length && arr[i] > min; if (on && s < 0) s = i; if (!on && s >= 0) { if (i - s > 60) out.push([s, i]); s = -1; } } return out; };
      const cols = segs(colHas, 6); const outs = [];
      for (const [x0, x1] of cols) {
        const rh = new Array(H).fill(0);
        for (let y = 0; y < H; y++) for (let x = x0; x < x1; x += 3) if (!isBg((y*W+x)*4)) rh[y]++;
        const rows = segs(rh, 6); if (!rows.length) continue;
        const y0 = rows[0][0], y1 = rows[rows.length-1][1];
        const tw = Math.min(1600, x1 - x0) , s2 = tw / (x1 - x0);
        const o = document.createElement('canvas'); o.width = tw; o.height = Math.round((y1 - y0) * s2);
        o.getContext('2d').drawImage(c, x0, y0, x1 - x0, y1 - y0, 0, 0, o.width, o.height);
        outs.push([o.toDataURL('image/webp', .86), o.width, o.height]);
      }
      return { bg, outs };
    });
    res.outs.forEach(([u, w, h], i) => { const n = `${name}${res.outs.length > 1 ? '-' + (i+1) : ''}`; fs.writeFileSync(`../hb/${n}.webp`, Buffer.from(u.split(',')[1], 'base64')); console.log(n, w, h, res.bg.join(',')); });
  }
  await b.close();
})();
