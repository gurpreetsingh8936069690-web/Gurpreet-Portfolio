import puppeteer from 'puppeteer-core';

async function testContactAndIcons() {
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    args: ['--no-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 900 });
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle2' });

  // 1. Check top-left navbar
  const brandText = await page.$eval('header a[href="#home"]', el => el.innerText.trim());
  console.log('Top-left navbar brand text:', JSON.stringify(brandText));

  // 2. Scroll to contact section
  await page.evaluate(() => {
    document.getElementById('contact').scrollIntoView();
  });
  await new Promise(r => setTimeout(r, 600));

  // 3. Take screenshot of Contact section
  await page.screenshot({ path: 'scratch/contact-section-desktop.png' });
  console.log('Saved contact-section-desktop.png');

  // 4. Fill form
  await page.type('#contact-name', 'Test Recruiter');
  await page.type('#contact-email', 'recruiter@techcorp.example');
  await page.type('#contact-subject', 'Full-Stack Developer Opportunity');
  await page.type('#contact-message', 'Hi Gurpreet, we reviewed your projects and would love to interview you.');

  // 5. Submit form
  await page.click('button[type="submit"]');
  console.log('Clicked submit...');

  // 6. Wait for success notification
  await page.waitForSelector('.animate-fade-in', { timeout: 8000 });
  const successText = await page.$eval('.animate-fade-in', el => el.innerText);
  console.log('Success notification displayed:', successText.substring(0, 100));

  // 7. Check database in localStorage
  const stored = await page.evaluate(() => {
    return localStorage.getItem('gurpreet_portfolio_submissions');
  });
  console.log('Database records in localStorage:', JSON.parse(stored).length);

  // 8. Test Database Modal
  await page.click('button[title*="database"]');
  await new Promise(r => setTimeout(r, 500));
  await page.screenshot({ path: 'scratch/contact-database-modal.png' });
  console.log('Saved contact-database-modal.png');

  // 9. Mobile Viewport test
  await page.setViewport({ width: 390, height: 844 });
  await page.goto('http://localhost:5173/#contact', { waitUntil: 'networkidle2' });
  await page.screenshot({ path: 'scratch/contact-mobile.png' });
  console.log('Saved contact-mobile.png');

  await browser.close();
  console.log('All tests passed successfully!');
}

testContactAndIcons().catch(console.error);
