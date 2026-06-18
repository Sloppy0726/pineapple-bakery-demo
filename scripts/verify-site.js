const { chromium } = require('playwright');

const base = process.argv[2] || 'http://127.0.0.1:4173/pineapple-bakery-demo/';
const routes = [
  { path: '', marker: 'Pineapple Bun & Nitro Milk Tea' },
  { path: 'menu/', marker: 'Product showcase' },
  { path: 'schedule/', marker: 'Today’s daily menu photo' },
  { path: 'about/', marker: 'Baked with heart, Hong Kong in every bite' },
  { path: 'faq/', marker: 'Frequently asked' },
  { path: 'privacy-policy/', marker: 'Privacy Policy' },
  { path: 'terms-and-conditions/', marker: 'Terms and Conditions' }
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
        const pageHero = document.querySelector('.v2-menu-hero');
        const pageHeroBox = pageHero?.getBoundingClientRect();
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
          navFontSize: Number.parseFloat(getComputedStyle(document.querySelector('.v2-nav__links')).fontSize),
          pageHeroTitleStyle: (() => {
            const heroTitle = document.querySelector('.v2-menu-hero h1, .v2-hero h1');
            if (!heroTitle) return null;
            const style = getComputedStyle(heroTitle);
            return {
              letterSpacing: Number.parseFloat(style.letterSpacing),
              wordSpacing: Number.parseFloat(style.wordSpacing),
              lineHeight: Number.parseFloat(style.lineHeight),
              fontSize: Number.parseFloat(style.fontSize)
            };
          })(),
          mobileNavSameRow: !linkBox || !actionsBox ? true : Math.abs(linkBox.y - actionsBox.y) < 12,
          footerLegalLinks: [...document.querySelectorAll('.v2-legal-row a')].map((a) => ({ text: a.textContent.trim(), href: a.getAttribute('href') })),
          footerRightsText: document.querySelector('.v2-legal-row span')?.textContent.trim() || '',
          horizontalOverflow: document.documentElement.scrollWidth > window.innerWidth + 1,
          pageHeroHeight: pageHeroBox ? Math.round(pageHeroBox.height) : null,
          pageHeroContentClipped: pageHero ? pageHero.scrollHeight > pageHero.clientHeight + 12 : false,
          legacyV1CodePresent: Boolean(document.querySelector('.hero, .social-float, .language-switch')),
          menuHeroUsesUploadedBackground: getComputedStyle(document.querySelector('.v2-menu-hero--menu') || document.body).backgroundImage.includes('menu-background-matcha-buns.jpg'),
          scheduleHeroUsesUploadedBackground: getComputedStyle(document.querySelector('.v2-schedule-hero') || document.body).backgroundImage.includes('schedule-background-pickup.png'),
          scheduleDailyMenuPhotoPresent: Boolean(document.querySelector('.v2-schedule-page .v2-daily-menu-photo-frame img[src$="daily-menu-photo.jpg"]')),
          scheduleDailyMenuPhotoNaturalSize: (() => {
            const img = document.querySelector('.v2-schedule-page .v2-daily-menu-photo-frame img');
            return img ? { width: img.naturalWidth, height: img.naturalHeight } : null;
          })(),
          aboutHeroUsesUploadedBackground: getComputedStyle(document.querySelector('.v2-about-hero') || document.body).backgroundImage.includes('about-background-packaging.png'),
          faqHeroUsesUploadedBackground: getComputedStyle(document.querySelector('.v2-faq-hero') || document.body).backgroundImage.includes('faq-background-any-questions.jpg')
        };
      });

      results.push({ route: route.path || '/', viewport: viewport.name, errors, ...result });
      await page.close();
    }
  }

  const zhPage = await browser.newPage({ viewport: viewports[1] });
  const zhErrors = [];
  zhPage.on('pageerror', (err) => zhErrors.push(err.message));
  zhPage.on('console', (msg) => { if (msg.type() === 'error') zhErrors.push(msg.text()); });
  await zhPage.goto(new URL('?lang=zh', base).toString(), { waitUntil: 'networkidle' });
  await zhPage.getByRole('heading', { name: '香港菠蘿包 & 氮氣奶茶' }).waitFor({ timeout: 5000 });
  const zhHero = await zhPage.evaluate(() => {
    const nav = document.querySelector('.v2-nav__links');
    const navStyle = getComputedStyle(nav);
    return {
      route: '/?lang=zh',
      viewport: 'mobile',
      errors: [],
      navLinks: [...document.querySelectorAll('.v2-nav__links a')].filter((a) => getComputedStyle(a).display !== 'none').map((a) => a.textContent.trim()),
      navFontSize: Number.parseFloat(navStyle.fontSize),
      navLetterSpacing: Number.parseFloat(navStyle.letterSpacing),
      navColumnGap: Number.parseFloat(navStyle.columnGap),
      navJustifyContent: navStyle.justifyContent,
      navBox: nav.getBoundingClientRect().toJSON(),
      actionsBox: document.querySelector('.v2-nav__actions')?.getBoundingClientRect().toJSON(),
      horizontalOverflow: document.documentElement.scrollWidth > window.innerWidth + 1,
      kicker: document.querySelector('.v2-hero .v2-kicker')?.textContent.trim() || '',
      title: document.querySelector('.v2-hero h1')?.textContent.replace(/\s+/g, ' ').trim() || '',
      staleCombinedMilkTea: document.body.textContent.includes('香港菠蘿包與奶茶'),
      staleShortTitle: document.querySelector('.v2-hero h1')?.textContent.includes('菠蘿包 & 氮氣奶茶') && !document.querySelector('.v2-hero h1')?.textContent.includes('香港菠蘿包')
    };
  });
  results.push({ ...zhHero, errors: zhErrors });
  await zhPage.close();

  const zhPageRoutes = [
    { path: 'menu/?lang=zh', title: '未來產品餐單預覽' },
    { path: 'schedule/?lang=zh', title: '每日餐單相片及自取時間' },
    { path: 'about/?lang=zh', title: '用心烘焙，每一口都是香港味。' },
    { path: 'faq/?lang=zh', title: '預訂、自取及麵包店常見問題' }
  ];
  for (const route of zhPageRoutes) {
    const page = await browser.newPage({ viewport: viewports[1] });
    const errors = [];
    page.on('pageerror', (err) => errors.push(err.message));
    page.on('console', (msg) => { if (msg.type() === 'error') errors.push(msg.text()); });
    await page.goto(new URL(route.path, base).toString(), { waitUntil: 'networkidle' });
    await page.getByRole('heading', { name: route.title }).first().waitFor({ timeout: 5000 });
    const result = await page.evaluate(() => ({
      route: window.location.pathname.split('/').filter(Boolean).pop() + '/?lang=zh',
      viewport: 'mobile',
      errors: [],
      title: document.querySelector('.v2-menu-hero h1')?.textContent.replace(/\s+/g, ' ').trim() || '',
      navLinks: [...document.querySelectorAll('.v2-nav__links a')].filter((a) => getComputedStyle(a).display !== 'none').map((a) => a.textContent.trim()),
      faqQuestions: [...document.querySelectorAll('.v2-faq-card h3')].map((el) => el.textContent.trim()),
      hasEnglishFaqTitle: document.body.textContent.includes('Ordering, pickup, and bakery questions.') || document.body.textContent.includes('How do I order?') || document.body.textContent.includes('Can I walk in?'),
      hasEnglishMenuTitle: document.body.textContent.includes('Menu placeholders for every future product.') || document.body.textContent.includes('Tap for details') || document.body.textContent.includes('Product details'),
      hasEnglishScheduleTitle: document.body.textContent.includes('Weekly schedule placeholders for pickup and walk-ins.') || document.body.textContent.includes('This week at the bakery') || document.body.textContent.includes('Draft schedule layout') || document.body.textContent.includes('Time placeholder')
    }));
    results.push({ ...result, expectedTitle: route.title, errors });
    await page.close();
  }

  await browser.close();
  console.log(JSON.stringify(results, null, 2));

  const failures = results.filter((item) => item.errors.length || (
    item.route === '/?lang=zh'
      ? (item.kicker !== '香港招牌' || item.title !== '香港菠蘿包 & 氮氣奶茶' || !item.navLinks.includes('關於') || !item.navLinks.includes('FAQ') || item.navFontSize < 11 || item.navLetterSpacing > 0.25 || item.navColumnGap < 10 || !item.navBox || !item.actionsBox || item.navBox.right > item.actionsBox.left - 6 || item.horizontalOverflow || item.staleCombinedMilkTea || item.staleShortTitle)
      : item.route?.endsWith('/?lang=zh')
        ? (item.title !== item.expectedTitle || !item.navLinks.includes('關於') || !item.navLinks.includes('FAQ') || item.hasEnglishFaqTitle || item.hasEnglishMenuTitle || item.hasEnglishScheduleTitle || (item.route === 'faq/?lang=zh' && (!item.faqQuestions?.includes('如何落單？') || !item.faqQuestions?.includes('可以 walk-in 嗎？'))))
        : (item.horizontalOverflow || item.topOrderButtons || item.topOrderBagIcons || item.legacyV1CodePresent || !item.footerRightsText.includes('Reserved') || !item.footerLegalLinks?.some((link) => link.text === 'Privacy Policy' && link.href?.includes('/privacy-policy/')) || !item.footerLegalLinks?.some((link) => link.text === 'Terms and Conditions' && link.href?.includes('/terms-and-conditions/')) || (item.route !== '/' && (item.pageHeroContentClipped || item.pageHeroHeight < 700 || item.pageHeroHeight > 740)) || (item.route === 'menu/' && !item.menuHeroUsesUploadedBackground) || (item.route === 'schedule/' && (!item.scheduleHeroUsesUploadedBackground || !item.scheduleDailyMenuPhotoPresent || !item.scheduleDailyMenuPhotoNaturalSize || item.scheduleDailyMenuPhotoNaturalSize.width < 100)) || (item.route === 'about/' && !item.aboutHeroUsesUploadedBackground) || (item.route === 'faq/' && !item.faqHeroUsesUploadedBackground) || item.siteVersion !== 'current' || !item.metaDescriptionHasKeywords || item.jsonLdType !== 'Bakery' || item.navFontSize < (item.viewport === 'desktop' ? 13 : 10) || !item.navLinks.includes('About') || !item.navLinks.includes('FAQ') || (item.pageHeroTitleStyle && (item.pageHeroTitleStyle.letterSpacing < -3 || item.pageHeroTitleStyle.wordSpacing < 2 || item.pageHeroTitleStyle.lineHeight / item.pageHeroTitleStyle.fontSize < 0.98)) || (item.route === '/' && item.storyCards < 4) || (item.route === '/' && item.galleryText.includes('best bakery recognition')) || (item.route === '/' && item.galleryText.includes('schedule') && !item.galleryText.includes('walk-in schedule')) || item.oldPhotoStripImages !== 0)
  ));
  if (failures.length) {
    console.error('Verification failures:', JSON.stringify(failures, null, 2));
    process.exit(1);
  }
})().catch((err) => { console.error(err); process.exit(1); });

