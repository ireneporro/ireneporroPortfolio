const puppeteer = require('puppeteer-core'); const wait = ms => new Promise(r => setTimeout(r, ms));
(async () => {
  const b = await puppeteer.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: 'new' });
  const p = await b.newPage(); await p.setViewport({ width: 1200, height: 800 });
  await p.goto('https://embed.figma.com/proto/Wg2ACkQtoO8xMxrEwzTmbH/ELDL5S-VIDEOGAME---UTN-TP?node-id=60-1109&starting-point-node-id=60%3A1109&page-id=81%3A1396&scaling=scale-down-width&content-scaling=fixed&hide-ui=1&embed-host=share', { waitUntil: 'networkidle2', timeout: 60000 }).catch(e=>console.log('nav', e.message));
  await wait(15000);
  await p.screenshot({ path: '../shots/embed.png' });
  console.log((await p.evaluate(() => document.body.innerText)).slice(0, 400));
  await b.close();
})();
