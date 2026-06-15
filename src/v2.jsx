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
  Wheat
} from 'lucide-react';
import './v2.css';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const assetBase = import.meta.env.BASE_URL;
const instagramUrl = 'https://www.instagram.com/pineapplebakeryhk/';
const instagramDmUrl = 'https://ig.me/m/pineapplebakeryhk';
const openRiceUrl = 'https://www.openrice.com/en/hongkong/r-pineapple-bakery-sheung-wan-hong-kong-style-bakery-r998564';
const mapsUrl = 'https://www.google.com/maps/search/?api=1&query=Shop%202%2C%20G%2FF%2C%2087%20Wing%20Lok%20Street%2C%20Sheung%20Wan%2C%20Hong%20Kong';
const storageKey = 'pineapple-bakery-v2-language';

const image = (name) => `${assetBase}social/${name}`;

const productImages = [
  'reference-product-1.jpg',
  'reference-product-2.jpg',
  'reference-product-3.jpg',
  'reference-product-4.jpg',
  'reference-product-5.jpg'
];

const galleryImages = [
  'official-brioche-pineapple-buns.jpg',
  'social-reel-milk-tea.jpg',
  'food-reel-pineapple-bun.jpg',
  'social-reel-bun-closeup.jpg',
  'official-brioche-pineapple-buns.jpg',
  'food-reel-pineapple-bun.jpg'
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
    galleryTitle: 'Fresh from our oven',
    gallerySub: 'Follow us @pineapplebakeryhk',
    instagram: 'View more on Instagram',
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
      kicker: '香港菠蘿包與奶茶',
      title: '菠蘿包 & 氮氣奶茶',
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
    galleryTitle: '新鮮出爐',
    gallerySub: '追蹤 @pineapplebakeryhk',
    instagram: '查看更多 Instagram',
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

export default function V2App() {
  const rootRef = useRef(null);
  const [language, setLanguage] = useState(getInitialLanguage);
  const t = copy[language];

  useEffect(() => {
    document.documentElement.lang = language === 'zh' ? 'zh-Hant-HK' : 'en';
    document.body.dataset.siteVersion = 'v2';
    window.localStorage.setItem(storageKey, language);
    return () => { delete document.body.dataset.siteVersion; };
  }, [language]);

  useGSAP(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    gsap.from('.v2-nav, .v2-hero__copy > *, .v2-hero__photo', {
      y: 22,
      opacity: 0,
      duration: 0.72,
      stagger: 0.07,
      ease: 'power3.out'
    });
    gsap.utils.toArray('.v2-reveal').forEach((item) => {
      gsap.from(item, {
        y: 28,
        duration: 0.68,
        ease: 'power3.out',
        scrollTrigger: { trigger: item, start: 'top 84%' }
      });
    });
  }, { scope: rootRef, dependencies: [language], revertOnUpdate: true });

  return (
    <main className="v2-site" ref={rootRef}>
      <nav className="v2-nav" aria-label="Version 2 navigation">
        <a className="v2-brand" href="#v2-top" aria-label="Pineapple Bakery home">
          <DoodleLogo />
          <span><strong>Pineapple Bakery</strong><small>鳳梨餅家</small></span>
        </a>
        <div className="v2-nav__links">
          <a href="#v2-top">{t.nav.home}</a>
          <a href="#v2-menu">{t.nav.menu}</a>
          <a href="#v2-preorder">{t.nav.preorder}</a>
          <a href="#v2-schedule">{t.nav.schedule}</a>
          <a href="#v2-about">{t.nav.about}</a>
          <a href="#v2-faq">{t.nav.faq}</a>
        </div>
        <div className="v2-nav__actions">
          <a className="v2-nav__icon" href={instagramUrl} target="_blank" rel="noreferrer" aria-label="Open Instagram"><HeaderInstagramIcon width="23" height="23" /></a>
          <a className="v2-nav__icon" href={instagramDmUrl} target="_blank" rel="noreferrer" aria-label="Open order bag"><ShoppingBag size={23} /></a>
          <div className="v2-lang" aria-label={t.nav.language}>
            {['en', 'zh'].map((item) => (
              <button key={item} type="button" className={language === item ? 'active' : ''} aria-pressed={language === item} onClick={() => setLanguage(item)}>{item === 'en' ? 'EN' : '繁'}</button>
            ))}
          </div>
          <a className="v2-order" href={instagramDmUrl} target="_blank" rel="noreferrer">{t.nav.order}<ArrowRight size={16} /></a>
          <span className="v2-order-spark" aria-hidden="true"><i></i><i></i><i></i></span>
        </div>
      </nav>

      <section className="v2-hero" id="v2-top">
        <div className="v2-hero__copy">
          <p className="v2-kicker">{t.hero.kicker}</p>
          <h1>{t.hero.title}<Heart className="v2-heart" size={24} fill="currentColor" /></h1>
          <p>{t.hero.text}</p>
          <div className="v2-actions">
            <a className="v2-button v2-button--primary" href={instagramDmUrl} target="_blank" rel="noreferrer">{t.hero.primary}<ArrowRight size={16} /></a>
            <a className="v2-button" href="#v2-menu">{t.hero.menu}</a>
            <a className="v2-button" href="#v2-schedule">{t.hero.schedule}</a>
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
          <a className="v2-button v2-button--outline" href={instagramUrl} target="_blank" rel="noreferrer">View full menu<ArrowRight size={16} /></a>
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
          <a href={instagramUrl} target="_blank" rel="noreferrer">{t.story.cta}<ArrowRight size={15} /></a>
        </article>
        <img className="v2-shop-photo" src={image('reference-shopfront-full.jpg')} alt="Reference street photo of Pineapple Bakery shopfront" />
      </section>

      <section className="v2-gallery v2-reveal" id="v2-faq">
        <div className="v2-gallery__head">
          <div><h2>{t.galleryTitle}</h2><p>{t.gallerySub}</p></div>
          <a className="v2-button v2-button--outline" href={instagramUrl} target="_blank" rel="noreferrer"><Camera size={17} />{t.instagram}</a>
        </div>
        <div className="v2-gallery__grid">
          {galleryImages.map((name, index) => <img key={`${name}-${index}`} src={image(name)} alt="Public Instagram-style bakery thumbnail — draft use only" />)}
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
