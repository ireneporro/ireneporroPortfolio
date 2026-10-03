const puppeteer = require('puppeteer-core'); const wait = ms => new Promise(r => setTimeout(r, ms));
const base = '/Users/ireneporro/Documents/DS 2/STAFFOLOGY/';
const files = ['order-status-guardrails.html','order-expiry-urgency-staffology.html','orders-stakeholder-proposal (1).html','job-order-detail-layout-examples.html','manage-orders.html','design-system.html','staffology-user-training/index.html'];
(async () => {
  const b = await puppeteer.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: 'new', args: ['--allow-file-access-from-files'] });
  const p = await b.newPage(); await p.setViewport({ width: 1440, height: 900 });
  let i = 0;
  for (const f of files) {
    await p.goto('file://' + base + f, { waitUntil: 'load', timeout: 30000 }).catch(()=>{}); await wait(1500);
    const h = await p.evaluate(() => document.documentElement.scrollHeight);
    await p.screenshot({ path: `../shots/stf-${i}.png`, fullPage: true });
    console.log(i++, f, h);
  }
  await b.close();
})();
