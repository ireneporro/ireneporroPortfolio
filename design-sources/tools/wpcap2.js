const puppeteer = require('puppeteer-core'); const wait = ms => new Promise(r => setTimeout(r, ms));
(async () => {
  const b = await puppeteer.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: 'new' });
  const p = await b.newPage(); await p.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 });
  const click = async (txt, exact=true) => { await p.evaluate((txt, exact) => {
      const els = [...document.querySelectorAll('button, [role=button], div, span')].filter(e => { const t = (e.innerText||'').trim(); return exact ? t === txt : t.startsWith(txt); });
      const el = els.sort((a,b) => a.innerText.length - b.innerText.length)[0]; (el.closest('button') || el).click(); }, txt, exact); await wait(900); };
  await p.goto('http://localhost:8765/wattlepay-prototype/index.html', { waitUntil: 'networkidle0' }); await wait(1200);
  await p.evaluate(() => document.querySelector('button').click()); await wait(1200);
  await p.screenshot({ path: '../wpshots/settings.png' });
  await p.goto('http://localhost:8765/wattlepay-prototype/index.html', { waitUntil: 'networkidle0' }); await wait(1200);
  await click('Transfer'); await click('Ana M.'); for (const d of ['3','2','5']) await click(d);
  await click('Review Transfer'); await click('Confirm & Send', false); await click('Face ID');
  // trigger scan button if present
  await p.evaluate(() => { const b=[...document.querySelectorAll('button')].find(b=>/scan|authenticate|use face/i.test(b.innerText)); b&&b.click(); });
  await wait(4500); await p.screenshot({ path: '../wpshots/send-receipt.png' });
  await click('Home'); await wait(800); await p.screenshot({ path: '../wpshots/home-after.png' });
  await b.close();
})();
