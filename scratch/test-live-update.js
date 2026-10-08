import puppeteer from 'puppeteer-core';
import fs from 'fs';

const chromePaths = [
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
];

const executablePath = chromePaths.find(p => fs.existsSync(p));

async function testLiveUpdate() {
  const browser = await puppeteer.launch({
    headless: true,
    executablePath,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  const logs = [];
  page.on('console', msg => logs.push(msg.text()));

  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle0' });

  const initialH1 = await page.$eval('h1', el => el.textContent.trim());
  console.log('1. Initial text on page:', initialH1);

  // Now let's temporarily modify portfolioData.js
  const configPath = 'd:/Gurpreet Portfolio/src/config/portfolioData.js';
  const originalContent = fs.readFileSync(configPath, 'utf8');

  // Change name slightly to test live update
  const modifiedContent = originalContent.replace('name: "Gurpreet Singh"', 'name: "Gurpreet Singh (Live Test)"');
  fs.writeFileSync(configPath, modifiedContent, 'utf8');
  console.log('2. File modified on disk...');

  // Wait for HMR update without reloading page
  let updatedH1 = initialH1;
  for (let i = 0; i < 20; i++) {
    await new Promise(r => setTimeout(r, 200));
    updatedH1 = await page.$eval('h1', el => el.textContent.trim());
    if (updatedH1.includes('(Live Test)')) {
      console.log(`3. SUCCESS! Live updated detected in ${ (i + 1) * 200 }ms without page reload:`, updatedH1);
      break;
    }
  }

  // Restore original content immediately
  fs.writeFileSync(configPath, originalContent, 'utf8');
  console.log('4. Restored original content.');

  // Verify restore also updates live
  for (let i = 0; i < 20; i++) {
    await new Promise(r => setTimeout(r, 200));
    const restoredH1 = await page.$eval('h1', el => el.textContent.trim());
    if (restoredH1 === 'Gurpreet Singh') {
      console.log(`5. SUCCESS! Restored live update detected in ${ (i + 1) * 200 }ms:`, restoredH1);
      break;
    }
  }

  await browser.close();
}

testLiveUpdate().catch(console.error);
