import puppeteer from 'puppeteer-core';

async function captureMobileContact() {
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    args: ['--no-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 390, height: 1200 });
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle2' });

  await page.evaluate(() => {
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView();
  });
  await new Promise(r => setTimeout(r, 600));

  await page.screenshot({ path: 'scratch/contact-mobile-full.png' });
  console.log('Mobile screenshot saved to scratch/contact-mobile-full.png');
  await browser.close();
}

captureMobileContact().catch(console.error);
