import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';

const chromePaths = [
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
];

const executablePath = chromePaths.find(p => fs.existsSync(p));

async function testHMR() {
  console.log('Using browser at:', executablePath);
  const browser = await puppeteer.launch({
    headless: true,
    executablePath,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  const consoleMessages = [];
  page.on('console', msg => consoleMessages.push(msg.text()));

  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle0' });

  // Get initial text
  const initialTitle = await page.$eval('h1', el => el.textContent.trim());
  console.log('Initial H1 title:', initialTitle);

  // Check if Vite client connected
  const hasViteClient = consoleMessages.some(m => m.includes('[vite] connected.'));
  console.log('Vite HMR connected:', hasViteClient, consoleMessages.filter(m => m.includes('vite')));

  await browser.close();
}

testHMR().catch(console.error);
