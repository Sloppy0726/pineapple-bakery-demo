const { chromium } = require('playwright');

const url = process.argv[2] || 'http://127.0.0.1:5187/';
const requiredTexts = [
  'Fresh brioche pineapple buns in Sheung Wan',
  'Brioche Pineapple Bun',
  'Pineapple Bun with Butter',
  'Nitro Milk Tea',
  'Please verify on Instagram before visiting.',
  'Public snippet — needs verification',
  'No WhatsApp, phone number, or private contact information is invented.',
  'Shop 2, G/F, 87 Wing Lok Street, Sheung Wan',
  'OpenRice listing',
  'U Food / media mention',
  'Demo concept only — not affiliated with Pineapple Bakery'
];

(async () => {
  const browser = await chromium.launch({ headless: true });
  const results = [];
  for (const profile of [
    { name: 'desktop', viewport: { width: 1440, height: 1200 } },
    { name: 'mobile', viewport: { width: 390, height: 1100 } },
  ]) {
    const page = await browser.newPage({ viewport: profile.viewport });
    const errors = [];
    page.on('pageerror', err => errors.push(err.message));
    page.on('console', msg => { if (msg.type() === 'error') errors.push(msg.text()); });
    await page.goto(url, { waitUntil: 'networkidle' });
    const title = await page.title();
    const body = await page.locator('body').innerText();
    const missing = requiredTexts.filter(t => !body.includes(t));
    const links = await page.$$eval('a', as => as.map(a => ({ text: a.innerText.trim(), href: a.href })));
    const badInternalLinks = [];
    for (const a of links.filter(l => l.href.includes('#'))) {
      const hash = new URL(a.href).hash;
      if (hash && !(await page.locator(hash).count())) badInternalLinks.push(a.href);
    }
    const navDisplay = await page.locator('.nav-links').evaluate(el => getComputedStyle(el).display);
    const heroGridColumns = await page.locator('.hero-grid').evaluate(el => getComputedStyle(el).gridTemplateColumns);
    const productGridColumns = await page.locator('.product-grid').evaluate(el => getComputedStyle(el).gridTemplateColumns);
    const horizontalOverflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 1);
    await page.screenshot({ path: `qa-${profile.name}.png`, fullPage: true });
    results.push({ profile: profile.name, title, missing, errors, linkCount: links.length, badInternalLinks, navDisplay, heroGridColumns, productGridColumns, horizontalOverflow });
    await page.close();
  }
  await browser.close();
  console.log(JSON.stringify(results, null, 2));
})().catch(err => { console.error(err); process.exit(1); });
