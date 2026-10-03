const puppeteer = require('puppeteer-core'); const wait = ms => new Promise(r => setTimeout(r, ms));
(async () => {
  const b = await puppeteer.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: 'new' });
  const p = await b.newPage(); const errs=[]; p.on('pageerror', e => errs.push(e.message));
  await p.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 });
  const url = 'http://localhost:8765/wattlepay-prototype/index.html';
  const click = async (txt, exact=true) => { const ok = await p.evaluate((txt, exact) => {
      const els = [...document.querySelectorAll('button, [role=button], div, span')].filter(e => { const t = (e.innerText||'').trim(); return exact ? t === txt : t.startsWith(txt); });
      const el = els.sort((a,b) => a.innerText.length - b.innerText.length || b.querySelectorAll('*').length - a.querySelectorAll('*').length)[0];
      if (!el) return false; (el.closest('button') || el).click(); return true; }, txt, exact); if (!ok) console.log('MISSING', txt); await wait(900); };
  const shot = async n => { await wait(500); await p.screenshot({ path: `../wpshots/${n}.png` }); };
  const fresh = async () => { await p.goto(url, { waitUntil: 'networkidle0' }); await wait(1200); };
  await fresh(); await shot('home');
  await click('Cards'); await shot('cards');
  await click('Save'); await shot('save');
  await click('Invest'); await shot('invest');
  await click('Transfer'); await shot('send-contacts');
  await click('Ana M.'); for (const d of ['3','2','5']) await click(d); await shot('send-amount');
  await click('Review Transfer'); await shot('send-review');
  await click('Confirm & Send', false); await wait(400); await shot('send-auth');
  const btns = await p.evaluate(() => [...document.querySelectorAll('button')].map(b => b.innerText.trim()).filter(Boolean)); console.log('auth buttons', JSON.stringify(btns));
  await fresh(); await click('Convert'); await shot('convert');
  await fresh(); await click('Add Money'); await shot('recharge');
  console.log(errs); await b.close();
})();
