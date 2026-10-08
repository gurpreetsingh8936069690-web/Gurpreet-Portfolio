import puppeteer from 'puppeteer-core';

async function captureBottomMobile() {
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    args: ['--no-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 390, height: 1200 });
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle2' });

  await page.evaluate(() => {
    window.scrollTo(0, document.body.scrollHeight);
  });
  await new Promise(r => setTimeout(r, 800));

  await page.screenshot({ path: 'scratch/contact-mobile-bottom.png' });
  console.log('Mobile bottom screenshot saved!');
  await browser.close();
}

captureBottomMobile().catch(console.error);
