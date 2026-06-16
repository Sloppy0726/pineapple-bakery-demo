const { chromium } = require('playwright');

const base = process.argv[2] || 'http://127.0.0.1:4173/pineapple-bakery-demo/';
const routes = [
  { path: '', marker: 'Pineapple Bun & Nitro Milk Tea' },
  { path: 'menu/', marker: 'Product showcase' },
  { path: 'schedule/', marker: 'This week at the bakery' },
  { path: 'about/', marker: 'Baked with heart, Hong Kong in every bite' },
  { path: 'faq/', marker: 'Frequently asked' }
];
const viewports = [
  { name: 'desktop', width: 1280, height: 900 },
  { name: 'mobile', width: 390, height: 844 }
];

(async () => {
  const browser = await chromium.launch({ headless: true });
  const results = [];

  for (const route of routes) {
    for (const viewport of viewports) {
      const page = await browser.newPage({ viewport });
      const errors = [];
      page.on('pageerror', (err) => errors.push(err.message));
      page.on('console', (msg) => { if (msg.type() === 'error') errors.push(msg.text()); });

      const url = new URL(route.path, base).toString();
      await page.goto(url, { waitUntil: 'networkidle' });
      await page.getByText(route.marker, { exact: false }).first().waitFor({ timeout: 5000 });

      const result = await page.evaluate(() => {
        const jsonLd = JSON.parse(document.querySelector('script[type="application/ld+json"]')?.textContent || '{}');
        const description = document.querySelector('meta[name="description"]')?.content || '';
        const navLinks = [...document.querySelectorAll('.v2-nav__links a')].filter((a) => getComputedStyle(a).display !== 'none').map((a) => a.textContent.trim());
        const linkBox = document.querySelector('.v2-nav__links')?.getBoundingClientRect();
        const actionsBox = document.querySelector('.v2-nav__actions')?.getBoundingClientRect();
        return {
          title: document.title,
          siteVersion: document.body.dataset.siteVersion,
          metaDescriptionHasKeywords: /pineapple buns|菠蘿包|nitro milk tea|Sheung Wan bakery/i.test(description),
          jsonLdType: jsonLd['@type'],
          storyCards: document.querySelectorAll('.v2-story-card').length,
          storyCardLabels: [...document.querySelectorAll('.v2-story-card__copy b')].map((el) => el.textContent.trim().toLowerCase()),
          galleryText: document.querySelector('.v2-gallery')?.textContent.toLowerCase() || '',
          highlightNotes: document.querySelectorAll('.v2-highlight-notes article').length,
          oldPhotoStripImages: document.querySelectorAll('.v2-gallery__grid img').length,
          topOrderButtons: document.querySelectorAll('.v2-order').length,
          topOrderBagIcons: [...document.querySelectorAll('.v2-nav__icon')].filter((a) => a.getAttribute('aria-label')?.includes('bag')).length,
          navLinks,
          mobileNavSameRow: !linkBox || !actionsBox ? true : Math.abs(linkBox.y - actionsBox.y) < 12,
          horizontalOverflow: document.documentElement.scrollWidth > window.innerWidth + 1,
          legacyV1CodePresent: Boolean(document.querySelector('.hero, .social-float, .language-switch'))
        };
      });

      results.push({ route: route.path || '/', viewport: viewport.name, errors, ...result });
      await page.close();
    }
  }

  await browser.close();
  console.log(JSON.stringify(results, null, 2));

  const failures = results.filter((item) => item.errors.length || item.horizontalOverflow || item.topOrderButtons || item.topOrderBagIcons || item.legacyV1CodePresent || item.siteVersion !== 'current' || !item.metaDescriptionHasKeywords || item.jsonLdType !== 'Bakery' || (item.route === '/' && item.storyCards < 4) || (item.route === '/' && item.galleryText.includes('best bakery recognition')) || (item.route === '/' && item.galleryText.includes('schedule') && !item.galleryText.includes('walk-in schedule')) || item.oldPhotoStripImages !== 0);
  if (failures.length) {
    console.error('Verification failures:', JSON.stringify(failures, null, 2));
    process.exit(1);
  }
})().catch((err) => { console.error(err); process.exit(1); });
