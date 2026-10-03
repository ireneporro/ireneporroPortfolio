const puppeteer = require('puppeteer-core'); const wait = ms => new Promise(r => setTimeout(r, ms));
(async () => {
  const b = await puppeteer.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: 'new' });
  const p = await b.newPage(); await p.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 });
  await p.evaluateOnNewDocument(() => {
    const RealDate = Date, off = new RealDate(2026, 2, 4, 9, 41, 0).getTime() - RealDate.now();
    class FakeDate extends RealDate { constructor(...a) { a.length ? super(...a) : super(RealDate.now() + off); } static now() { return RealDate.now() + off; } }
    window.Date = FakeDate;
  });
  const url = 'http://localhost:8765/wattlepay-prototype/index.html';
  const click = async (txt, exact=true) => { const ok = await p.evaluate((txt, exact) => {
      const els = [...document.querySelectorAll('button, [role=button], div, span')].filter(e => { const t = (e.innerText||'').trim(); return exact ? t === txt : t.startsWith(txt); });
      const el = els.sort((a,b) => a.innerText.length - b.innerText.length)[0]; if (!el) return false; (el.closest('button') || el).click(); return true; }, txt, exact); if (!ok) console.log('MISSING', txt); await wait(900); };
  const shot = async n => { await wait(600); await p.screenshot({ path: `../wpshots/${n}.webp`, type: 'webp', quality: 88 }); };
  const fresh = async () => { await p.goto(url, { waitUntil: 'networkidle0' }); await wait(1300); };
  await fresh(); await shot('home');
  await click('Cards'); await shot('cards');
  await click('Save'); await shot('save');
  await click('Invest'); await shot('invest');
  await click('Transfer'); await shot('send-contacts');
  await click('Ana M.'); for (const d of ['3','2','5']) await click(d); await shot('send-amount');
  await click('Review Transfer'); await shot('send-review');
  await click('Confirm & Send', false); await click('Face ID'); await shot('send-auth');
  await p.evaluate(() => document.querySelector('.cursor-pointer.z-20')?.click()); await wait(4500); await shot('send-receipt');
  await fresh(); await click('Convert'); await shot('convert');
  await fresh(); await click('Add Money'); await shot('recharge');
  await fresh(); await p.evaluate(() => document.querySelector('button').click()); await wait(900); await shot('settings');
  await b.close();
})();
