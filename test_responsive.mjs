import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';

const EDGE_PATH = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const OUTPUT_DIR = 'C:\\Users\\gurpr\\.gemini\\antigravity\\brain\\db373f3f-123b-4584-8835-529900fe097f\\scratch';

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

const VIEWPORTS = [
  { name: 'desktop-1920', width: 1920, height: 1080 },
  { name: 'desktop-1440', width: 1440, height: 900 },
  { name: 'laptop-1280', width: 1280, height: 800 },
  { name: 'tablet-1024', width: 1024, height: 768 },
  { name: 'tablet-768', width: 768, height: 1024 },
  { name: 'mobile-430', width: 430, height: 932 },
  { name: 'mobile-390', width: 390, height: 844 },
  { name: 'mobile-375', width: 375, height: 667 },
  { name: 'mobile-360', width: 360, height: 800 },
];

async function run() {
  console.log('Launching browser with puppeteer-core...');
  const browser = await puppeteer.launch({
    executablePath: EDGE_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu'],
  });

  const page = await browser.newPage();
  const consoleErrors = [];
  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      consoleErrors.push(msg.text());
    }
  });
  page.on('pageerror', (err) => {
    consoleErrors.push(err.toString());
  });

  await page.goto('http://localhost:4173/', { waitUntil: 'networkidle0' });

  const report = [];

  for (const vp of VIEWPORTS) {
    await page.setViewport({ width: vp.width, height: vp.height });
    await new Promise((r) => setTimeout(r, 200));

    // Check horizontal overflow
    const overflow = await page.evaluate(() => {
      const docEl = document.documentElement;
      const body = document.body;
      const scrollWidth = Math.max(docEl.scrollWidth, body.scrollWidth);
      const clientWidth = docEl.clientWidth;
      const hasHorizontalScroll = scrollWidth > clientWidth;
      return {
        scrollWidth,
        clientWidth,
        hasHorizontalScroll,
      };
    });

    const screenshotPath = path.join(OUTPUT_DIR, `${vp.name}.png`);
    await page.screenshot({ path: screenshotPath, fullPage: false });

    report.push({
      viewport: vp.name,
      dimensions: `${vp.width}x${vp.height}`,
      overflow,
      screenshot: screenshotPath,
    });
  }

  // Also test clicking mobile menu at 390px
  await page.setViewport({ width: 390, height: 844 });
  const menuButton = await page.$('button[aria-controls="mobile-menu"]');
  if (menuButton) {
    await menuButton.click();
    await new Promise((r) => setTimeout(r, 200));
    const mobileMenuScreenshot = path.join(OUTPUT_DIR, 'mobile-menu-open.png');
    await page.screenshot({ path: mobileMenuScreenshot });
    report.push({
      viewport: 'mobile-menu-open',
      screenshot: mobileMenuScreenshot,
    });
  }

  await browser.close();

  console.log('Responsive Test Results:');
  console.log(JSON.stringify({ report, consoleErrors }, null, 2));
}

run().catch((err) => {
  console.error('Error running test:', err);
  process.exit(1);
});
