const puppeteer = require('puppeteer-core'); const fs=require('fs');
(async () => {
  const b = await puppeteer.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: 'new' });
  const p = await b.newPage(); await p.setViewport({ width: 1600, height: 800 });
  for (const f of fs.readdirSync('../audit')) {
    await p.goto('http://localhost:8765/../audit/'+f).catch(()=>{});
    await p.goto('file://'+require('path').resolve('../audit/'+f), { waitUntil: 'load' });
    await p.screenshot({ path: '../shots/sheet-'+f.replace('.html','.png'), fullPage: true });
  }
  await b.close();
})();
