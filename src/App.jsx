import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import ScrollTrigger from 'gsap/ScrollTrigger';
import {
  ArrowRight,
  CalendarDays,
  Camera,
  Clock3,
  Heart,
  Languages,
  Package,
  ShoppingBag,
  Wheat,
  X
} from 'lucide-react';
import './App.css';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const assetBase = import.meta.env.BASE_URL;
const instagramUrl = 'https://www.instagram.com/pineapplebakeryhk/';
const instagramDmUrl = 'https://ig.me/m/pineapplebakeryhk';
const openRiceUrl = 'https://www.openrice.com/en/hongkong/r-pineapple-bakery-sheung-wan-hong-kong-style-bakery-r998564';
const mapsUrl = 'https://www.google.com/maps/search/?api=1&query=Shop%202%2C%20G%2FF%2C%2087%20Wing%20Lok%20Street%2C%20Sheung%20Wan%2C%20Hong%20Kong';
const storageKey = 'pineapple-bakery-language';

const image = (name) => `${assetBase}social/${name}`;

const productImages = [
  'reference-product-1.jpg',
  'reference-product-2.jpg',
  'reference-product-3.jpg',
  'reference-product-4.jpg',
  'reference-product-5.jpg'
];

const menuProductImages = [
  'reference-product-1.jpg',
  'food-reel-pineapple-bun.jpg',
  'reference-product-5.jpg',
  'reference-product-4.jpg',
  'reference-product-2.jpg',
  'social-reel-milk-tea.jpg',
  'reference-product-3.jpg',
  'reference-product-2.jpg',
  'social-reel-bun-closeup.jpg',
  'official-brioche-pineapple-buns.jpg',
  'reference-product-1.jpg',
  'reference-product-3.jpg'
];

const storyShowcase = [
  {
    label: 'Customer repost',
    zh: '客人回圖',
    handle: '@pineapplebakeryhk',
    title: 'Fresh bun pickup',
    text: 'Approved customer repost space for a tagged pineapple bun story, pickup reaction, or unboxing moment.',
    imageName: 'food-reel-pineapple-bun.jpg'
  },
  {
    label: 'Tagged story',
    zh: '標記動態',
    handle: '@customer',
    title: 'Shared from stories',
    text: 'Use this slot for a real IG story screenshot from a customer after permission and wording approval.',
    imageName: 'social-reel-bun-closeup.jpg'
  },
  {
    label: 'Story repost',
    zh: '限時轉發',
    handle: '@pineapplebakeryhk',
    title: 'Bakery reaction',
    text: 'A story-style customer proof card that shows social response instead of another static gallery image.',
    imageName: 'reference-product-1.jpg'
  },
  {
    label: 'Customer photo',
    zh: '客人相片',
    handle: '@tagged',
    title: 'Real repost showcase',
    text: 'Drop in approved repost screenshots here to build credibility and searchable customer-proof content.',
    imageName: 'reference-product-2.jpg'
  }
];

const menuPlaceholders = [
  ['Classic Pineapple Bun', '菠蘿麵包', 'Crisp golden top, soft buttery centre.'],
  ['Butter Pineapple Bun', '菠蘿油', 'Warm bun with a chilled butter slab.'],
  ['Matcha Pineapple Bun', '抹茶菠蘿包', 'Tea-forward matcha twist on the classic.'],
  ['BBQ Pork Bun', '蜜汁叉燒包', 'Sweet-savoury honey BBQ pork filling.'],
  ['Pineapple Cookie', '鳳梨酥曲奇', 'Crisp cookie with pineapple pastry notes.'],
  ['Nitro Milk Tea', '氮氣奶茶', 'Cool, creamy Hong Kong milk tea.'],
  ['Seasonal Bun', '期間限定', 'Rotating limited small-batch flavour.'],
  ['Egg Tart', '蛋撻', 'Silky custard in a delicate pastry shell.'],
  ['Coconut Bun', '雞尾包', 'Nostalgic sweet shredded-coconut bun.'],
  ['Red Bean Bun', '紅豆包', 'Soft bun with smooth red bean filling.'],
  ['Mini Bun Box', '迷你包盒', 'Shareable box for tea time or offices.'],
  ['Catering / Party Orders', '派對預訂', 'Bulk preorder support for events.']
];

const menuProductDetails = [
  {
    intro: 'Our classic Hong Kong pineapple bun: crisp golden cookie crust over a soft, buttery brioche-style bun, baked fresh in small batches.',
    ingredients: ['Brioche dough', 'Butter', 'Egg', 'Milk', 'Flour', 'Sugar crust']
  },
  {
    intro: 'A warm pineapple bun served with a thick slab of chilled butter for the classic sweet-and-salty café bite.',
    ingredients: ['Pineapple bun', 'Salted butter', 'Egg', 'Milk', 'Wheat flour', 'Sugar crust']
  },
  {
    intro: 'Earthy matcha meets the signature crisp topping, giving the bun a greener, tea-forward flavour while keeping the centre soft.',
    ingredients: ['Matcha powder', 'Brioche dough', 'Butter', 'Egg', 'Milk', 'Sugar crust']
  },
  {
    intro: 'A savoury bakery staple filled with glossy honey BBQ pork, wrapped in a pillowy bun and baked until golden.',
    ingredients: ['BBQ pork', 'Honey glaze', 'Soy sauce', 'Bun dough', 'Sesame', 'Spring onion']
  },
  {
    intro: 'A crisp cookie inspired by pineapple pastry flavours, made for gifting, coffee breaks, or a quick sweet snack.',
    ingredients: ['Butter cookie dough', 'Pineapple-style filling', 'Egg', 'Flour', 'Sugar']
  },
  {
    intro: 'Creamy Hong Kong milk tea finished with a nitro-style texture for a cool, smooth drink beside warm buns.',
    ingredients: ['Black tea', 'Evaporated milk', 'Creamy foam', 'Ice', 'Light sugar']
  },
  {
    intro: 'A rotating limited bun for seasonal flavours, special fillings, and small-batch experiments announced through the bakery.',
    ingredients: ['Seasonal filling', 'Brioche dough', 'Butter', 'Egg', 'Bakery topping']
  },
  {
    intro: 'A flaky Hong Kong egg tart with silky custard and a delicate pastry shell, best enjoyed slightly warm.',
    ingredients: ['Egg custard', 'Milk', 'Sugar', 'Pastry shell', 'Butter']
  },
  {
    intro: 'A nostalgic coconut bun with a sweet shredded-coconut centre and soft bakery bread exterior.',
    ingredients: ['Shredded coconut', 'Butter', 'Sugar', 'Milk bread dough', 'Egg wash']
  },
  {
    intro: 'Soft bread wrapped around a smooth red bean filling for a gentle, traditional sweet bun.',
    ingredients: ['Red bean paste', 'Milk bread dough', 'Butter', 'Egg', 'Sesame']
  },
  {
    intro: 'A shareable box of smaller buns for office snacks, family tea time, or trying several flavours in one order.',
    ingredients: ['Assorted mini buns', 'Seasonal fillings', 'Brioche dough', 'Bakery toppings']
  },
  {
    intro: 'Custom preorder support for office treats, parties, events, and larger pickup quantities arranged by Instagram DM.',
    ingredients: ['Assorted buns', 'Party box packaging', 'Custom quantities', 'Advance preorder']
  }
];

const schedulePlaceholders = [
  ['Mon', 'Closed / prep day', '休息／準備日', 'Placeholder — update with actual bake plan.'],
  ['Tue', 'Preorder pickup', '預訂自取', 'Suggested pickup windows and item list coming soon.'],
  ['Wed', 'Small-batch bake', '小批量出爐', 'Placeholder for walk-in availability and sold-out notes.'],
  ['Thu', 'Preorder pickup', '預訂自取', 'Placeholder for pickup windows and cut-off time.'],
  ['Fri', 'Fresh bun drop', '新鮮出爐', 'Placeholder for weekly featured flavours.'],
  ['Sat', 'Weekend collection', '週末自取', 'Placeholder for weekend hours and stock updates.'],
  ['Sun', 'Limited walk-in', '少量現貨', 'Placeholder for Sunday availability or closure.']
];

const faqPlaceholders = [
  ['How do I order?', 'Send us an Instagram DM with your items, quantity, pickup day, and contact name.'],
  ['Can I walk in?', 'Walk-in stock is limited. Check Instagram stories for daily availability before visiting.'],
  ['Where do I pick up?', 'Pickup is at the store in Sheung Wan. The exact details should be confirmed in the order reply.'],
  ['Do you do bulk orders?', 'Yes — party boxes, office snacks, and special batches can be discussed by DM.'],
  ['Are these final prices?', 'No. This is a demo layout; final menu, pricing, hours, and policy copy need client approval.'],
  ['Can I see the weekly schedule?', 'Yes. Use the Schedule page for the placeholder bake calendar and pickup windows.']
];

const copy = {
  en: {
    nav: { home: 'Home', menu: 'Menu', preorder: 'Preorder', schedule: 'Schedule', about: 'About', faq: 'FAQ', order: 'Order now', language: 'Language' },
    hero: {
      kicker: 'Hong Kong’s home of',
      title: 'Pineapple Bun & Nitro Milk Tea',
      text: 'We bake with heart and tradition. Brioche pineapple buns daily. Mostly preorders, walk-in schedule on stories.',
      primary: 'Preorder now',
      menu: 'View menu',
      schedule: 'Check schedule'
    },
    feature: [
      ['Brioche done right', 'Golden crust, soft centre'],
      ['Nitro milk tea perfection', 'Cool, creamy, fresh'],
      ['Freshly baked to order', 'Small batches, less waste']
    ],
    productsTitle: 'Our signature bakes',
    products: [
      ['Pineapple Bun', '菠蘿麵包'],
      ['Matcha Bun', '抹茶菠蘿包'],
      ['Pineapple Buns', '新鮮出爐'],
      ['BBQ Pork Bun', '蜜汁叉燒包'],
      ['Pineapple Cookie', '鳳梨酥曲奇']
    ],
    preorder: {
      title: 'Preorder & pickup',
      steps: [
        ['Preorder only', 'We bake in small batches. All items are mostly preorder.'],
        ['Check schedule', 'Walk-in availability is announced on our Instagram stories.'],
        ['Pickup at store', 'Central, Hong Kong. Exact location in confirmation.']
      ],
      cta: 'How to order'
    },
    award: {
      label: 'Best Bakery',
      title: 'Proudly recognized. Thank you!',
      body: 'Honoured to be named Best Bakery 2026. This is for our amazing customers and our team. We bake, you support, we grow together.',
      cta: 'Read more'
    },
    story: {
      label: 'Our story',
      title: 'Baked with heart, Hong Kong in every bite.',
      body: 'Pineapple Bakery 鳳梨餅家 started with a simple love for Hong Kong’s classic flavours. We believe in honest ingredients, artisan baking, and keeping traditions alive—one bun at a time. From our brioche pineapple buns to seasonal creations, everything is baked fresh, with heart.',
      cta: 'About us'
    },
    galleryTitle: 'Customer repost story showcase',
    gallerySub: 'A showcase area for the actual customer repost story frames inside the IG highlights.',
    instagram: 'See Instagram',
    footer: ['Quality ingredients', 'Baked fresh', 'Made with heart', 'Preorder preferred'],
    footerSmall: ['Chosen with care', 'In small batches', 'For our community', 'Less waste, more care'],
    emailTitle: 'Stay in the loop',
    emailText: 'Be the first to know about our bakes, schedule & new flavours!',
    emailPlaceholder: 'Your email',
    subscribe: 'Subscribe',
    disclaimer: 'Speculative demo. Public social imagery and business details need client approval before launch.'
  },
  zh: {
    nav: { home: '首頁', menu: '餐單', preorder: '預訂', schedule: '時間', about: '關於', faq: 'FAQ', order: '立即預訂', language: '語言' },
    hero: {
      kicker: '香港招牌',
      title: '香港菠蘿包 & 氮氣奶茶',
      text: '以心烘焙，保留香港味道。每日少量製作，主要預訂，walk-in 時段請留意 IG story。',
      primary: '立即預訂',
      menu: '查看餐單',
      schedule: '查看時間'
    },
    feature: [
      ['Brioche 口感', '金黃酥皮，鬆軟內層'],
      ['氮氣奶茶', '香滑冰凍，剛剛好'],
      ['新鮮製作', '小批量，少浪費']
    ],
    productsTitle: '招牌出爐',
    products: [
      ['菠蘿麵包', 'Pineapple Bun'],
      ['抹茶菠蘿包', 'Matcha Bun'],
      ['新鮮出爐菠蘿包', 'Fresh Bakes'],
      ['蜜汁叉燒包', 'BBQ Pork Bun'],
      ['鳳梨酥曲奇', 'Pineapple Cookie']
    ],
    preorder: {
      title: '預訂 & 自取',
      steps: [
        ['主要預訂', '每日小批量製作，大部分產品建議預訂。'],
        ['查看時間', 'Walk-in 供應會於 Instagram story 公布。'],
        ['到店自取', '香港中環／上環一帶，確實地點以確認訊息為準。']
      ],
      cta: '如何落單'
    },
    award: {
      label: 'Best Bakery',
      title: '多謝大家支持！',
      body: '很榮幸獲選 Best Bakery 2026。這份肯定屬於每位客人和團隊。你支持，我們繼續烘焙。',
      cta: '閱讀更多'
    },
    story: {
      label: '我們的故事',
      title: '用心烘焙，每一口都是香港味。',
      body: 'Pineapple Bakery 鳳梨餅家由一份對香港經典味道的喜愛開始。相信好材料、手作烘焙，以及將傳統一個包一個包延續下去。由 brioche 菠蘿包到季節限定創作，每一款都新鮮出爐，用心製作。',
      cta: '關於我們'
    },
    galleryTitle: '客人回圖 Story Showcase',
    gallerySub: '展示 IG 精選入面實際客人回圖、標記相片及限時動態轉發內容。',
    instagram: '查看 Instagram 精選',
    footer: ['優質材料', '新鮮烘焙', '用心製作', '建議預訂'],
    footerSmall: ['細心挑選', '小批量製作', '為社群而做', '少浪費，更用心'],
    emailTitle: '接收最新消息',
    emailText: '第一時間知道出爐時間、預訂及新口味！',
    emailPlaceholder: '你的電郵',
    subscribe: '訂閱',
    disclaimer: '示意網站。公開圖片及商業資料正式使用前需客戶批准。'
  }
};

function getInitialLanguage() {
  const params = new URLSearchParams(window.location.search);
  const requested = params.get('lang');
  if (requested === 'en' || requested === 'zh') return requested;
  const saved = window.localStorage.getItem(storageKey);
  if (saved === 'en' || saved === 'zh') return saved;
  return [navigator.language, ...(navigator.languages || [])]
    .filter(Boolean)
    .some((lang) => lang.toLowerCase().startsWith('zh')) ? 'zh' : 'en';
}

function HeaderInstagramIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <rect x="4" y="4" width="16" height="16" rx="4.5" />
      <circle cx="12" cy="12" r="3.7" />
      <path d="M17.1 6.9h.1" />
    </svg>
  );
}

function DoodleLogo() {
  return (
    <span className="v2-doodle-logo" aria-hidden="true">
      <svg viewBox="0 0 86 86" role="img" focusable="false">
        <g fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M38 6c-14 2-24 12-25 27-.8 17 12 28 28 28 15.5 0 28-10.4 28-25.8C69 17.4 55.4 3.6 38 6Z" />
          <path d="M30 9c-5.2 7.4-3.8 13 4.2 16" />
          <path d="M49 8.8c3.8 6.6 2.4 12.8-4.4 17" />
          <path d="M18 36c6.8 1.8 13.2-.2 18.8-6.1" />
          <path d="M40 30c6.3 6.5 13.4 8.4 21.4 5.7" />
          <path d="M24 25c-4.8 0-8.7 2.8-9.5 8" />
          <path d="M62 25c4.8.8 7.6 4 7.8 8.4" />
          <path d="M30.5 42.5h.1M53.8 42.5h.1" />
          <path d="M37.4 52.2c4.2 2.4 8.3 2.4 12.2 0" />
          <path d="M34 62.5c-8.6 7-15 13-19.2 18" />
          <path d="M50 62.5c8.2 7 14.6 13 19.2 18" />
          <path d="M42 63.5v17" />
        </g>
      </svg>
    </span>
  );
}

function Stamp({ children }) {
  return <span className="v2-stamp" aria-hidden="true">{children}</span>;
}

export default function App() {
  const rootRef = useRef(null);
  const [language, setLanguage] = useState(getInitialLanguage);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const t = copy[language];

  useEffect(() => {
    if (!selectedProduct) return undefined;
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') setSelectedProduct(null);
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedProduct]);

  useEffect(() => {
    document.documentElement.lang = language === 'zh' ? 'zh-Hant-HK' : 'en';
    document.body.dataset.siteVersion = 'current';
    window.localStorage.setItem(storageKey, language);
    return () => { delete document.body.dataset.siteVersion; };
  }, [language]);

  useGSAP(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.__pineappleBakeryMotion = { enabled: !reduceMotion, triggers: 0 };
    if (reduceMotion) return;

    const defaults = { ease: 'power3.out', duration: 0.82 };

    gsap.timeline({ defaults })
      .from('.v2-nav', { y: -24, opacity: 0, duration: 0.62 })
      .from('.v2-hero__copy > *, .v2-menu-hero > *', { y: 28, opacity: 0, stagger: 0.08 }, '-=0.28')
      .from('.v2-hero__photo', { scale: 0.97, y: 36, opacity: 0 }, '-=0.42')
      .from('.v2-hero__drink, .v2-stamp, .v2-paper-doodle', { y: 22, rotate: -3, opacity: 0, stagger: 0.08 }, '-=0.36');

    const revealSection = (trigger, targets, vars = {}) => {
      gsap.from(targets, {
        y: 42,
        opacity: 0,
        stagger: 0.09,
        ...defaults,
        ...vars,
        scrollTrigger: {
          trigger,
          start: 'top 78%',
          toggleActions: 'play none none reverse',
          ...vars.scrollTrigger
        }
      });
    };

    revealSection('.v2-split', '.v2-section-title, .v2-product, .v2-menu-panel .v2-button, .v2-preorder h2, .v2-step, .v2-preorder .v2-button, .v2-preorder > .v2-doodle-logo', {
      y: 34,
      stagger: 0.055
    });

    revealSection('.v2-story-grid', '.v2-award-card, .v2-copy-card, .v2-shop-photo', {
      y: 0,
      x: 36,
      stagger: 0.11,
      duration: 0.95,
      scrollTrigger: { start: 'top 72%' }
    });

    revealSection('.v2-gallery', '.v2-gallery__head > *, .v2-story-card, .v2-seo-note', {
      y: 30,
      stagger: 0.055
    });

    revealSection('.v2-menu-catalog', '.v2-menu-catalog__head > *, .v2-menu-card', {
      y: 32,
      stagger: 0.055,
      scrollTrigger: { start: 'top 110%' }
    });

    revealSection('.v2-schedule-board', '.v2-schedule-board .v2-menu-catalog__head > *, .v2-schedule-card', {
      y: 32,
      stagger: 0.055,
      scrollTrigger: { start: 'top 140%' }
    });

    revealSection('.v2-schedule-notes', '.v2-schedule-notes article', {
      y: 28,
      stagger: 0.07,
      scrollTrigger: { start: 'top 86%' }
    });

    revealSection('.v2-footer', '.v2-footer__features > span, .v2-subscribe, .v2-disclaimer', {
      y: 28,
      stagger: 0.07,
      scrollTrigger: { start: 'top 88%' }
    });

    gsap.to('.v2-hero__photo img:first-child', {
      yPercent: -8,
      ease: 'none',
      scrollTrigger: {
        trigger: '.v2-hero',
        start: 'top top',
        end: 'bottom top',
        scrub: 0.8,
        invalidateOnRefresh: true
      }
    });

    gsap.to('.v2-award-card, .v2-shop-photo', {
      backgroundPosition: 'center 42%',
      objectPosition: 'center 42%',
      ease: 'none',
      scrollTrigger: {
        trigger: '.v2-story-grid',
        start: 'top bottom',
        end: 'bottom top',
        scrub: 0.9,
        invalidateOnRefresh: true
      }
    });

    ScrollTrigger.refresh();
    window.__pineappleBakeryMotion.triggers = ScrollTrigger.getAll().length;
  }, { scope: rootRef, dependencies: [language], revertOnUpdate: true });

  const homeUrl = assetBase;
  const menuUrl = `${assetBase}menu/`;
  const scheduleUrl = `${assetBase}schedule/`;
  const aboutUrl = `${assetBase}about/`;
  const faqUrl = `${assetBase}faq/`;
  const homeAnchor = (anchor) => `${assetBase}${anchor}`;
  const currentPath = window.location.pathname.replace(/\/+$/, '');
  const isMenuPage = currentPath.endsWith('/menu');
  const isSchedulePage = currentPath.endsWith('/schedule');
  const isAboutPage = currentPath.endsWith('/about');
  const isFaqPage = currentPath.endsWith('/faq');
  const currentPage = isMenuPage ? 'menu' : isSchedulePage ? 'schedule' : isAboutPage ? 'about' : isFaqPage ? 'faq' : 'home';
  const navState = (page) => page === currentPage ? { className: 'is-active', 'aria-current': 'page' } : {};

  if (isMenuPage) {
    return (
      <main className="v2-site v2-menu-page" ref={rootRef}>
        <nav className="v2-nav" aria-label="Version 2 navigation">
          <a className="v2-brand" href={homeUrl} aria-label="Pineapple Bakery home">
            <DoodleLogo />
            <span><strong>Pineapple Bakery</strong><small>鳳梨餅家</small></span>
          </a>
          <div className="v2-nav__links">
            <a {...navState('home')} href={homeUrl}>{t.nav.home}</a>
            <a {...navState('menu')} href={menuUrl}>{t.nav.menu}</a>
            <a {...navState('schedule')} href={scheduleUrl}>{t.nav.schedule}</a>
            <a {...navState('about')} href={aboutUrl}>{t.nav.about}</a>
            <a {...navState('faq')} href={faqUrl}>{t.nav.faq}</a>
          </div>
          <div className="v2-nav__actions">
            <a className="v2-nav__icon" href={instagramUrl} target="_blank" rel="noreferrer" aria-label="Open Instagram"><HeaderInstagramIcon width="23" height="23" /></a>
            <div className="v2-lang" aria-label={t.nav.language}>
              {['en', 'zh'].map((item) => (
                <button key={item} type="button" className={language === item ? 'active' : ''} aria-pressed={language === item} onClick={() => setLanguage(item)}>{item === 'en' ? 'EN' : '繁'}</button>
              ))}
            </div>
          </div>
        </nav>

        <section className="v2-menu-hero">
          <p className="v2-kicker">Full catalogue</p>
          <h1>Menu placeholders for every future product.</h1>
          <p>We’ll replace these placeholder cards once the final product list, prices, descriptions, and photos are confirmed.</p>
          <div className="v2-actions">
            <a className="v2-button v2-button--primary" href={instagramDmUrl} target="_blank" rel="noreferrer">Preorder enquiry<ArrowRight size={16} /></a>
            <a className="v2-button" href={homeUrl}>Back to homepage</a>
          </div>
        </section>

        <section className="v2-menu-catalog" aria-label="Product placeholder catalogue">
          <div className="v2-menu-catalog__head">
            <h2>Product showcase</h2>
            <p>Placeholder catalogue — final product list coming next.</p>
          </div>
          <div className="v2-menu-grid">
            {menuPlaceholders.map(([name, chinese, text], index) => {
              const product = { name, chinese, text, imageName: menuProductImages[index], ...menuProductDetails[index] };
              return (
                <button
                  className="v2-menu-card"
                  type="button"
                  key={name}
                  aria-label={`View details for ${name}`}
                  onClick={() => setSelectedProduct(product)}
                >
                  <img src={image(product.imageName)} alt={`${name} product thumbnail`} />
                  <span>Item {String(index + 1).padStart(2, '0')}</span>
                  <h3>{name}</h3>
                  <p className="v2-menu-card__zh">{chinese}</p>
                  <p>{text}</p>
                  <em>Tap for details</em>
                </button>
              );
            })}
          </div>
        </section>

        {selectedProduct && (
          <div className="v2-product-modal" role="presentation" onMouseDown={() => setSelectedProduct(null)}>
            <article
              className="v2-product-modal__card"
              role="dialog"
              aria-modal="true"
              aria-labelledby="v2-product-modal-title"
              onMouseDown={(event) => event.stopPropagation()}
            >
              <button className="v2-product-modal__close" type="button" aria-label="Close product details" onClick={() => setSelectedProduct(null)}><X size={20} /></button>
              <img src={image(selectedProduct.imageName)} alt={`${selectedProduct.name} close-up`} />
              <div className="v2-product-modal__body">
                <span>Product details</span>
                <h2 id="v2-product-modal-title">{selectedProduct.name}</h2>
                <p className="v2-product-modal__zh">{selectedProduct.chinese}</p>
                <p>{selectedProduct.intro}</p>
                <h3>Ingredients</h3>
                <ul>
                  {selectedProduct.ingredients.map((ingredient) => <li key={ingredient}>{ingredient}</li>)}
                </ul>
                <a className="v2-button v2-button--primary" href={instagramDmUrl} target="_blank" rel="noreferrer">Ask about this item<ArrowRight size={16} /></a>
              </div>
            </article>
          </div>
        )}

        <footer className="v2-footer">
          <div className="v2-footer__features">
            {t.footer.map((item, index) => {
              const Icon = [Wheat, DoodleLogo, Heart, Package][index];
              return <span key={item}>{index === 1 ? <DoodleLogo /> : <Icon size={24} />}<strong>{item}</strong><small>{t.footerSmall[index]}</small></span>;
            })}
          </div>
          <form className="v2-subscribe" onSubmit={(event) => event.preventDefault()}>
            <h3>{t.emailTitle}</h3>
            <p>{t.emailText}</p>
            <label><span className="sr-only">{t.emailPlaceholder}</span><input type="email" placeholder={t.emailPlaceholder} /></label>
            <button type="submit">{t.subscribe}</button>
          </form>
          <p className="v2-disclaimer"><Languages size={15} /> EN / 繁 · {t.disclaimer}</p>
        </footer>

        <a className="v2-float" href={instagramDmUrl} target="_blank" rel="noreferrer" aria-label="Open Instagram DM order enquiry"><ShoppingBag size={19} /> {t.nav.order}</a>
      </main>
    );
  }

  if (isSchedulePage) {
    return (
      <main className="v2-site v2-schedule-page" ref={rootRef}>
        <nav className="v2-nav" aria-label="Version 2 navigation">
          <a className="v2-brand" href={homeUrl} aria-label="Pineapple Bakery home">
            <DoodleLogo />
            <span><strong>Pineapple Bakery</strong><small>鳳梨餅家</small></span>
          </a>
          <div className="v2-nav__links">
            <a {...navState('home')} href={homeUrl}>{t.nav.home}</a>
            <a {...navState('menu')} href={menuUrl}>{t.nav.menu}</a>
            <a {...navState('schedule')} href={scheduleUrl}>{t.nav.schedule}</a>
            <a {...navState('about')} href={aboutUrl}>{t.nav.about}</a>
            <a {...navState('faq')} href={faqUrl}>{t.nav.faq}</a>
          </div>
          <div className="v2-nav__actions">
            <a className="v2-nav__icon" href={instagramUrl} target="_blank" rel="noreferrer" aria-label="Open Instagram"><HeaderInstagramIcon width="23" height="23" /></a>
            <div className="v2-lang" aria-label={t.nav.language}>
              {['en', 'zh'].map((item) => (
                <button key={item} type="button" className={language === item ? 'active' : ''} aria-pressed={language === item} onClick={() => setLanguage(item)}>{item === 'en' ? 'EN' : '繁'}</button>
              ))}
            </div>
          </div>
        </nav>

        <section className="v2-menu-hero v2-schedule-hero">
          <p className="v2-kicker">Bake schedule</p>
          <h1>Weekly schedule placeholders for pickup and walk-ins.</h1>
          <p>Customers can check this page before visiting. The current cards are placeholders until the real weekly baking calendar, preorder cut-off times, and walk-in windows are confirmed.</p>
          <div className="v2-actions">
            <a className="v2-button v2-button--primary" href={instagramUrl} target="_blank" rel="noreferrer">Latest IG updates<ArrowRight size={16} /></a>
            <a className="v2-button" href={menuUrl}>View menu</a>
          </div>
        </section>

        <section className="v2-schedule-board" aria-label="Weekly schedule placeholder board">
          <div className="v2-menu-catalog__head">
            <h2>This week at the bakery</h2>
            <p>Draft schedule layout — final days, times, products, and sold-out status will be added later.</p>
          </div>
          <div className="v2-schedule-grid">
            {schedulePlaceholders.map(([day, title, chinese, text], index) => (
              <article className="v2-schedule-card" key={day}>
                <span className="v2-schedule-card__day">{day}</span>
                <div>
                  <h3>{title}</h3>
                  <p className="v2-menu-card__zh">{chinese}</p>
                  <p>{text}</p>
                </div>
                <small>{index === 0 ? 'No pickup window yet' : 'Time placeholder'}</small>
              </article>
            ))}
          </div>
        </section>

        <section className="v2-schedule-notes" aria-label="Schedule notes">
          <article>
            <CalendarDays size={28} />
            <h3>Preorder cut-off</h3>
            <p>Placeholder for the weekly order deadline and confirmation process.</p>
          </article>
          <article>
            <Clock3 size={28} />
            <h3>Pickup windows</h3>
            <p>Placeholder for exact customer pickup windows once the bakery confirms them.</p>
          </article>
          <article>
            <ShoppingBag size={28} />
            <h3>Walk-in stock</h3>
            <p>Placeholder for daily walk-in availability, sold-out notes, and story updates.</p>
          </article>
        </section>

        <footer className="v2-footer">
          <div className="v2-footer__features">
            {t.footer.map((item, index) => {
              const Icon = [Wheat, DoodleLogo, Heart, Package][index];
              return <span key={item}>{index === 1 ? <DoodleLogo /> : <Icon size={24} />}<strong>{item}</strong><small>{t.footerSmall[index]}</small></span>;
            })}
          </div>
          <form className="v2-subscribe" onSubmit={(event) => event.preventDefault()}>
            <h3>{t.emailTitle}</h3>
            <p>{t.emailText}</p>
            <label><span className="sr-only">{t.emailPlaceholder}</span><input type="email" placeholder={t.emailPlaceholder} /></label>
            <button type="submit">{t.subscribe}</button>
          </form>
          <p className="v2-disclaimer"><Languages size={15} /> EN / 繁 · {t.disclaimer}</p>
        </footer>

        <a className="v2-float" href={instagramDmUrl} target="_blank" rel="noreferrer" aria-label="Open Instagram DM order enquiry"><ShoppingBag size={19} /> {t.nav.order}</a>
      </main>
    );
  }


  if (isAboutPage) {
    return (
      <main className="v2-site v2-menu-page v2-about-page" ref={rootRef}>
        <nav className="v2-nav" aria-label="Version 2 navigation">
          <a className="v2-brand" href={homeUrl} aria-label="Pineapple Bakery home">
            <DoodleLogo />
            <span><strong>Pineapple Bakery</strong><small>鳳梨餅家</small></span>
          </a>
          <div className="v2-nav__links">
            <a {...navState('home')} href={homeUrl}>{t.nav.home}</a>
            <a {...navState('menu')} href={menuUrl}>{t.nav.menu}</a>
            <a {...navState('schedule')} href={scheduleUrl}>{t.nav.schedule}</a>
            <a {...navState('about')} href={aboutUrl}>{t.nav.about}</a>
            <a {...navState('faq')} href={faqUrl}>{t.nav.faq}</a>
          </div>
          <div className="v2-nav__actions">
            <a className="v2-nav__icon" href={instagramUrl} target="_blank" rel="noreferrer" aria-label="Open Instagram"><HeaderInstagramIcon width="23" height="23" /></a>
            <div className="v2-lang" aria-label={t.nav.language}>
              {['en', 'zh'].map((item) => (
                <button key={item} type="button" className={language === item ? 'active' : ''} aria-pressed={language === item} onClick={() => setLanguage(item)}>{item === 'en' ? 'EN' : '繁'}</button>
              ))}
            </div>
          </div>
        </nav>

        <section className="v2-menu-hero v2-about-hero">
          <p className="v2-kicker">{t.story.label}</p>
          <h1>{t.story.title}</h1>
          <p>{t.story.body}</p>
          <div className="v2-actions">
            <a className="v2-button v2-button--primary" href={instagramUrl} target="_blank" rel="noreferrer">Follow our story<ArrowRight size={16} /></a>
            <a className="v2-button" href={faqUrl}>Read FAQ</a>
          </div>
        </section>

        <section className="v2-story-grid v2-about-story" aria-label="About Pineapple Bakery">
          <div className="v2-award-card">
            <div className="v2-award-badge"><span>foodie forks</span><strong>{t.award.label}</strong><small>Pineapple Bakery</small></div>
          </div>
          <article className="v2-copy-card">
            <p className={`v2-award-title ${language === 'en' ? 'v2-award-title--en' : ''}`}>
              {language === 'en' ? <>Proudly recognized.<br />Thank you! <span className="v2-award-heart" aria-hidden="true">♥</span></> : t.award.title}
            </p>
            <span>{t.award.body}</span>
            <a href={openRiceUrl} target="_blank" rel="noreferrer">{t.award.cta}<ArrowRight size={15} /></a>
          </article>
          <article className="v2-copy-card v2-copy-card--story">
            <em>{t.story.label}</em>
            <h2>{t.story.title}</h2>
            <p>{t.story.body}</p>
            <a href={mapsUrl} target="_blank" rel="noreferrer">Find us<ArrowRight size={15} /></a>
          </article>
          <img className="v2-shop-photo" src={image('reference-shopfront-full.jpg')} alt="Reference street photo of Pineapple Bakery shopfront" />
        </section>

        <footer className="v2-footer">
          <div className="v2-footer__features">
            {t.footer.map((item, index) => {
              const Icon = [Wheat, DoodleLogo, Heart, Package][index];
              return <span key={item}>{index === 1 ? <DoodleLogo /> : <Icon size={24} />}<strong>{item}</strong><small>{t.footerSmall[index]}</small></span>;
            })}
          </div>
          <form className="v2-subscribe" onSubmit={(event) => event.preventDefault()}>
            <h3>{t.emailTitle}</h3>
            <p>{t.emailText}</p>
            <label><span className="sr-only">{t.emailPlaceholder}</span><input type="email" placeholder={t.emailPlaceholder} /></label>
            <button type="submit">{t.subscribe}</button>
          </form>
          <p className="v2-disclaimer"><Languages size={15} /> EN / 繁 · {t.disclaimer}</p>
        </footer>

        <a className="v2-float" href={instagramDmUrl} target="_blank" rel="noreferrer" aria-label="Open Instagram DM order enquiry"><ShoppingBag size={19} /> {t.nav.order}</a>
      </main>
    );
  }

  if (isFaqPage) {
    return (
      <main className="v2-site v2-menu-page v2-faq-page" ref={rootRef}>
        <nav className="v2-nav" aria-label="Version 2 navigation">
          <a className="v2-brand" href={homeUrl} aria-label="Pineapple Bakery home">
            <DoodleLogo />
            <span><strong>Pineapple Bakery</strong><small>鳳梨餅家</small></span>
          </a>
          <div className="v2-nav__links">
            <a {...navState('home')} href={homeUrl}>{t.nav.home}</a>
            <a {...navState('menu')} href={menuUrl}>{t.nav.menu}</a>
            <a {...navState('schedule')} href={scheduleUrl}>{t.nav.schedule}</a>
            <a {...navState('about')} href={aboutUrl}>{t.nav.about}</a>
            <a {...navState('faq')} href={faqUrl}>{t.nav.faq}</a>
          </div>
          <div className="v2-nav__actions">
            <a className="v2-nav__icon" href={instagramUrl} target="_blank" rel="noreferrer" aria-label="Open Instagram"><HeaderInstagramIcon width="23" height="23" /></a>
            <div className="v2-lang" aria-label={t.nav.language}>
              {['en', 'zh'].map((item) => (
                <button key={item} type="button" className={language === item ? 'active' : ''} aria-pressed={language === item} onClick={() => setLanguage(item)}>{item === 'en' ? 'EN' : '繁'}</button>
              ))}
            </div>
          </div>
        </nav>

        <section className="v2-menu-hero v2-faq-hero">
          <p className="v2-kicker">FAQ</p>
          <h1>Ordering, pickup, and bakery questions.</h1>
          <p>Quick answers for customers before they send a DM or visit the shop. Final policy wording can be updated after client approval.</p>
          <div className="v2-actions">
            <a className="v2-button v2-button--primary" href={instagramDmUrl} target="_blank" rel="noreferrer">Ask on Instagram<ArrowRight size={16} /></a>
            <a className="v2-button" href={scheduleUrl}>Check schedule</a>
          </div>
        </section>

        <section className="v2-faq-board" aria-label="Frequently asked questions">
          <div className="v2-menu-catalog__head">
            <h2>Frequently asked</h2>
            <p>Dedicated FAQ page — replace placeholder policies with confirmed bakery details before launch.</p>
          </div>
          <div className="v2-faq-grid">
            {faqPlaceholders.map(([question, answer], index) => (
              <article className="v2-faq-card" key={question}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <h3>{question}</h3>
                <p>{answer}</p>
              </article>
            ))}
          </div>
        </section>

        <footer className="v2-footer">
          <div className="v2-footer__features">
            {t.footer.map((item, index) => {
              const Icon = [Wheat, DoodleLogo, Heart, Package][index];
              return <span key={item}>{index === 1 ? <DoodleLogo /> : <Icon size={24} />}<strong>{item}</strong><small>{t.footerSmall[index]}</small></span>;
            })}
          </div>
          <form className="v2-subscribe" onSubmit={(event) => event.preventDefault()}>
            <h3>{t.emailTitle}</h3>
            <p>{t.emailText}</p>
            <label><span className="sr-only">{t.emailPlaceholder}</span><input type="email" placeholder={t.emailPlaceholder} /></label>
            <button type="submit">{t.subscribe}</button>
          </form>
          <p className="v2-disclaimer"><Languages size={15} /> EN / 繁 · {t.disclaimer}</p>
        </footer>

        <a className="v2-float" href={instagramDmUrl} target="_blank" rel="noreferrer" aria-label="Open Instagram DM order enquiry"><ShoppingBag size={19} /> {t.nav.order}</a>
      </main>
    );
  }

  return (
    <main className="v2-site" ref={rootRef}>
      <nav className="v2-nav" aria-label="Version 2 navigation">
        <a className="v2-brand" href={homeAnchor('#v2-top')} aria-label="Pineapple Bakery home">
          <DoodleLogo />
          <span><strong>Pineapple Bakery</strong><small>鳳梨餅家</small></span>
        </a>
        <div className="v2-nav__links">
          <a {...navState('home')} href={homeAnchor('#v2-top')}>{t.nav.home}</a>
          <a {...navState('menu')} href={menuUrl}>{t.nav.menu}</a>
          <a {...navState('schedule')} href={scheduleUrl}>{t.nav.schedule}</a>
          <a {...navState('about')} href={aboutUrl}>{t.nav.about}</a>
          <a {...navState('faq')} href={faqUrl}>{t.nav.faq}</a>
        </div>
        <div className="v2-nav__actions">
          <a className="v2-nav__icon" href={instagramUrl} target="_blank" rel="noreferrer" aria-label="Open Instagram"><HeaderInstagramIcon width="23" height="23" /></a>
          <div className="v2-lang" aria-label={t.nav.language}>
            {['en', 'zh'].map((item) => (
              <button key={item} type="button" className={language === item ? 'active' : ''} aria-pressed={language === item} onClick={() => setLanguage(item)}>{item === 'en' ? 'EN' : '繁'}</button>
            ))}
          </div>
        </div>
      </nav>

      <section className="v2-hero" id="v2-top">
        <div className="v2-hero__copy">
          <p className="v2-kicker">{t.hero.kicker}</p>
          <h1>{t.hero.title}<Heart className="v2-heart" size={24} fill="currentColor" /></h1>
          <p>{t.hero.text}</p>
          <div className="v2-actions">
            <a className="v2-button v2-button--primary" href={instagramDmUrl} target="_blank" rel="noreferrer">{t.hero.primary}<ArrowRight size={16} /></a>
            <a className="v2-button" href={menuUrl}>{t.hero.menu}</a>
            <a className="v2-button" href={scheduleUrl}>{t.hero.schedule}</a>
          </div>
          <div className="v2-feature-row" aria-label="Bakery highlights">
            {t.feature.map(([title, text], index) => {
              const Icon = [Wheat, Clock3, ShoppingBag][index];
              return <span key={title}><Icon size={28} /><strong>{title}</strong><small>{text}</small></span>;
            })}
          </div>
        </div>
        <div className="v2-hero__photo" aria-label="Pineapple bun and milk tea hero collage">
          <img src={image('official-brioche-pineapple-buns.jpg')} alt="Public social photo of pineapple buns" />
          <img className="v2-hero__drink" src={image('social-reel-milk-tea.jpg')} alt="Public social photo of nitro milk tea" />
          <Stamp>Baked<br />with<br />heart</Stamp>
          <span className="v2-paper-doodle"><DoodleLogo />Pineapple<br />Bakery</span>
        </div>
      </section>

      <section className="v2-split v2-reveal" id="v2-preorder">
        <div className="v2-menu-panel" id="v2-menu">
          <div className="v2-section-title"><h2>{t.productsTitle}</h2></div>
          <div className="v2-product-strip">
            {t.products.map((item, index) => (
              <article className="v2-product" key={item[0]}>
                <img src={image(productImages[index])} alt={`${item[0]} public social draft-use thumbnail`} />
                <h3>{item[0]}</h3>
                <p>{item[1]}</p>
              </article>
            ))}
          </div>
          <a className="v2-button v2-button--outline" href={menuUrl}>View full menu<ArrowRight size={16} /></a>
        </div>

        <aside className="v2-preorder" id="v2-schedule">
          <h2>{t.preorder.title}</h2>
          <div className="v2-preorder__steps">
            {t.preorder.steps.map(([title, text], index) => {
              const Icon = [CalendarDays, Clock3, ShoppingBag][index];
              return <div className="v2-step" key={title}><span><Icon size={24} /></span><strong>{title}</strong><p>{text}</p></div>;
            })}
          </div>
          <a className="v2-button v2-button--primary" href={instagramDmUrl} target="_blank" rel="noreferrer">{t.preorder.cta}<ArrowRight size={16} /></a>
          <DoodleLogo />
        </aside>
      </section>

      <section className="v2-story-grid v2-reveal" id="v2-about">
        <div className="v2-award-card">
          <div className="v2-award-badge"><span>foodie forks</span><strong>{t.award.label}</strong><small>Pineapple Bakery</small></div>
        </div>
        <article className="v2-copy-card">
          <p className={`v2-award-title ${language === 'en' ? 'v2-award-title--en' : ''}`}>
            {language === 'en' ? <>Proudly recognized.<br />Thank you! <span className="v2-award-heart" aria-hidden="true">♥</span></> : t.award.title}
          </p>
          <span>{t.award.body}</span>
          <a href={openRiceUrl} target="_blank" rel="noreferrer">{t.award.cta}<ArrowRight size={15} /></a>
        </article>
        <article className="v2-copy-card v2-copy-card--story">
          <em>{t.story.label}</em>
          <h2>{t.story.title}</h2>
          <p>{t.story.body}</p>
          <a href={aboutUrl}>{t.story.cta}<ArrowRight size={15} /></a>
        </article>
        <img className="v2-shop-photo" src={image('reference-shopfront-full.jpg')} alt="Reference street photo of Pineapple Bakery shopfront" />
      </section>

      <section className="v2-gallery v2-reveal" id="v2-faq">
        <div className="v2-gallery__head">
          <div><h2>{t.galleryTitle}</h2><p>{t.gallerySub}</p></div>
          <a className="v2-button v2-button--outline" href={instagramUrl} target="_blank" rel="noreferrer"><Camera size={17} />{t.instagram}</a>
        </div>
        <div className="v2-story-showcase" aria-label="Customer repost Instagram story showcase">
          {storyShowcase.map((item) => (
            <article className="v2-story-card" key={item.title}>
              <img src={image(item.imageName)} alt={`${item.title} customer repost story`} />
              <div className="v2-story-card__overlay">
                <div className="v2-story-card__progress" aria-hidden="true"><span></span><span></span><span></span></div>
                <div className="v2-story-card__top">
                  <span>{item.handle}</span>
                  <small>{item.zh}</small>
                </div>
                <div className="v2-story-card__copy">
                  <b>{item.label}</b>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
        <p className="v2-seo-note">Pineapple Bakery 鳳梨餅家 · Sheung Wan bakery · Hong Kong pineapple bun · customer reposts · 客人回圖 · Instagram story screenshots · tagged photos · nitro milk tea</p>
      </section>

      <footer className="v2-footer">
        <div className="v2-footer__features">
          {t.footer.map((item, index) => {
            const Icon = [Wheat, DoodleLogo, Heart, Package][index];
            return <span key={item}>{index === 1 ? <DoodleLogo /> : <Icon size={24} />}<strong>{item}</strong><small>{t.footerSmall[index]}</small></span>;
          })}
        </div>
        <form className="v2-subscribe" onSubmit={(event) => event.preventDefault()}>
          <h3>{t.emailTitle}</h3>
          <p>{t.emailText}</p>
          <label><span className="sr-only">{t.emailPlaceholder}</span><input type="email" placeholder={t.emailPlaceholder} /></label>
          <button type="submit">{t.subscribe}</button>
        </form>
        <p className="v2-disclaimer"><Languages size={15} /> EN / 繁 · {t.disclaimer}</p>
      </footer>

      <a className="v2-float" href={instagramDmUrl} target="_blank" rel="noreferrer" aria-label="Open Instagram DM order enquiry"><ShoppingBag size={19} /> {t.nav.order}</a>
    </main>
  );
}
