import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';

const EDGE_PATH = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const OUTPUT_DIR = 'C:\\Users\\gurpr\\.gemini\\antigravity\\brain\\db373f3f-123b-4584-8835-529900fe097f\\scratch';

async function run() {
  const browser = await puppeteer.launch({
    executablePath: EDGE_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu'],
  });

  const page = await browser.newPage();
  const consoleErrors = [];
  page.on('console', (msg) => {
    if (msg.type() === 'error') consoleErrors.push(msg.text());
  });
  page.on('pageerror', (err) => consoleErrors.push(err.toString()));

  await page.goto('http://localhost:4173/', { waitUntil: 'networkidle0' });

  // 1. Desktop Light (1440px)
  await page.setViewport({ width: 1440, height: 900 });
  await new Promise((r) => setTimeout(r, 400));
  await page.screenshot({ path: path.join(OUTPUT_DIR, 'hero-photo-desktop-light.png') });

  // 2. Desktop Dark (1440px)
  const themeToggle = await page.$('button[title*="mode"]');
  if (themeToggle) {
    await themeToggle.click();
    await new Promise((r) => setTimeout(r, 400));
    await page.screenshot({ path: path.join(OUTPUT_DIR, 'hero-photo-desktop-dark.png') });
  }

  // 3. Tablet (768px)
  await page.setViewport({ width: 768, height: 1024 });
  await new Promise((r) => setTimeout(r, 400));
  await page.screenshot({ path: path.join(OUTPUT_DIR, 'hero-photo-tablet.png') });

  // 4. Mobile (390px)
  await page.setViewport({ width: 390, height: 844 });
  await new Promise((r) => setTimeout(r, 400));
  await page.screenshot({ path: path.join(OUTPUT_DIR, 'hero-photo-mobile.png') });

  // 5. Check horizontal overflow on mobile
  const overflow = await page.evaluate(() => {
    const docEl = document.documentElement;
    const body = document.body;
    const scrollWidth = Math.max(docEl.scrollWidth, body.scrollWidth);
    const clientWidth = docEl.clientWidth;
    return { scrollWidth, clientWidth, hasHorizontalScroll: scrollWidth > clientWidth };
  });

  // 6. Check count of "Resume" buttons across the entire document
  const resumeButtonCount = await page.evaluate(() => {
    const allButtons = Array.from(document.querySelectorAll('button, a'));
    const matches = allButtons.filter(b => b.textContent && b.textContent.toLowerCase().includes('resume'));
    return matches.map(m => ({ tag: m.tagName, text: m.textContent.trim(), id: m.id || m.getAttribute('aria-label') }));
  });

  await browser.close();
  console.log('Results:');
  console.log(JSON.stringify({ overflow, resumeButtonCount, consoleErrors }, null, 2));
}

run().catch((err) => {
  console.error('Error running test:', err);
  process.exit(1);
});
