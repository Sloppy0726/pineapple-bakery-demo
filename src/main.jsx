import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Send, MapPin, Coffee, Croissant, Sparkles, ExternalLink, PartyPopper, ShieldCheck, MessageCircle } from 'lucide-react';
import './styles.css';

const instagramUrl = 'https://www.instagram.com/pineapplebakeryhk/';
const openRiceUrl = 'https://www.openrice.com/en/hongkong/r-pineapple-bakery-sheung-wan-hong-kong-style-bakery-r998564';
const uFoodUrl = 'https://ufood.com.hk/restaurant/news/detail/20073149/香港菠蘿包推介-港式菠蘿包必試-冰火菠蘿皮-爆漿芝士餡';
const mapsUrl = 'https://www.google.com/maps/search/?api=1&query=Shop%202%2C%20G%2FF%2C%2087%20Wing%20Lok%20Street%2C%20Sheung%20Wan%2C%20Hong%20Kong';
const assetBase = import.meta.env.BASE_URL;
const fontThemeKeys = ['fraunces', 'playfair', 'dm-serif', 'young-serif', 'instrument'];
const languageKeys = ['en', 'zh'];
const languageStorageKey = 'pineapple-bakery-language';
const languages = [
  { code: 'en', label: 'EN', name: 'English' },
  { code: 'zh', label: '繁', name: '繁體中文' }
];

function getInitialLanguage() {
  const requestedLanguage = new URLSearchParams(window.location.search).get('lang');
  if (languageKeys.includes(requestedLanguage)) return requestedLanguage;

  const savedLanguage = window.localStorage.getItem(languageStorageKey);
  if (languageKeys.includes(savedLanguage)) return savedLanguage;

  const browserLanguages = [navigator.language, ...(navigator.languages || [])].filter(Boolean);
  const prefersChinese = browserLanguages.some((lang) => lang.toLowerCase().startsWith('zh'));
  return prefersChinese ? 'zh' : 'en';
}

const copy = {
  en: {
    photoCredit: 'Public Instagram photo/reel thumbnail — draft use only',
    socialLabel: 'Social',
    socialMenu: {
      instagram: 'Latest bakes / DM catering',
      openrice: 'Public directory listing',
      map: 'Sheung Wan address search'
    },
    nav: { menu: 'Menu', visit: 'Visit', catering: 'Catering', language: 'Language' },
    hero: {
      eyebrow: 'Demo concept • Sheung Wan bakery',
      title: 'Fresh brioche pineapple buns in Sheung Wan',
      subhead: 'A warm, modern landing page concept for Pineapple Bakery 鳳梨餅家 — highlighting signature pineapple buns, nitro milk tea, small-batch bakes, location, and Instagram DM catering enquiries.',
      viewMenu: 'View Menu',
      dm: 'Instagram DM',
      trust: ['Public info only', 'Opening times need verification', 'No fake prices/contact info'],
      photoAlt: 'Fresh golden pineapple buns on a bakery tray',
      cardLabel: 'Public Instagram photo of Pineapple Bakery buns',
      noteTitle: 'Baked to sell out',
      noteText: 'Check Instagram stories/posts for the latest batch and walk-in updates before visiting.'
    },
    intro: {
      kicker: 'Why this page helps',
      title: 'One clear home for menu, visit info, and catering.',
      text: 'This speculative demo turns public snippets into a customer-friendly website structure. It avoids unverified claims while making the bakery easier to discover for nearby office workers, foodies, and group-order customers.'
    },
    menu: {
      kicker: 'Signature products',
      title: 'Golden buns, creamy tea, party-ready boxes.'
    },
    products: [
      { title: 'Brioche Pineapple Bun', badge: 'Signature', text: 'A modern Hong Kong pineapple bun concept with a soft brioche-style crumb and golden crackly top. Price to be confirmed.' },
      { title: 'Pineapple Bun with Butter', badge: 'Classic indulgence', text: 'Warm bun, cold butter, crisp sweet crust — a premium take on the beloved cha chaan teng favourite. Price to be confirmed.' },
      { title: 'Nitro Milk Tea', badge: 'Drink pairing', text: 'Public snippets mention nitro milk tea — positioned here as the cool, creamy pairing for fresh bakes. Details to verify.' },
      { title: 'Catering / Party Orders', badge: 'DM enquiry', text: 'For office treats, meetings, and small parties. Public Instagram snippet mentions DM for catering; no phone/WhatsApp invented.' }
    ],
    visit: {
      kicker: 'Today’s bake / opening schedule',
      title: 'Please verify on Instagram before visiting.',
      text: 'Public snippets found during research mention limited opening windows. Because this is not confirmed directly from an official website, the demo labels the schedule carefully and points customers to Instagram for current walk-in and batch-time updates.',
      link: 'Check latest Instagram updates',
      rows: [
        ['Wed / Thu', '10:00–15:00', 'Public snippet — needs verification'],
        ['Fri / Sat', '10:00–17:00', 'Public snippet — needs verification'],
        ['Other days', 'Check IG', 'Latest opening / sold-out status may vary']
      ]
    },
    catering: {
      kicker: 'Catering / group orders',
      title: 'Bring a tray of warm pineapple buns to the office.',
      text: 'For meetings, celebrations, and group treats, this demo directs customers to Instagram DM because public snippets mention “DM for catering.” No WhatsApp, phone number, or private contact information is invented.',
      copyButton: 'Copy catering DM text',
      copied: 'Copied — paste into Instagram DM',
      copyError: 'Copy failed — select the text below',
      productCopyButton: 'Copy DM enquiry',
      productCopied: 'DM text copied',
      openInstagram: 'Open Instagram profile',
      previewLabel: 'Suggested DM:',
      dmDraft: 'Hi Pineapple Bakery, I’d like to ask about catering / group orders. Could you please share the available options, minimum order, lead time, and pickup details? Thank you!'
    },
    location: {
      kicker: 'Location',
      title: 'Shop 2, G/F, 87 Wing Lok Street, Sheung Wan',
      text: 'Near Sheung Wan — convenient for Central/Sheung Wan office workers looking for a quick bakery stop or boxed treats.',
      link: 'Open Google Maps search',
      mapTitle: 'Map placeholder',
      mapText: 'Google Maps search link for the public address',
      mapLabel: 'Open map search for Pineapple Bakery address'
    },
    proof: {
      kicker: 'Public social proof',
      title: 'Evidence to verify, not exaggerate.',
      items: [
        ['OpenRice listing', 'Directory listing found for Pineapple Bakery in Sheung Wan.'],
        ['U Food / media mention', 'Public media snippet around Hong Kong pineapple bun recommendations.'],
        ['Instagram / social buzz', 'Public Instagram profile used for CTA and latest-update direction.']
      ]
    },
    faq: {
      kicker: 'FAQ',
      title: 'Before you go',
      items: [
        ['Do I need to preorder?', 'This demo cannot confirm preorder rules. Please check Pineapple Bakery’s Instagram posts/stories or DM them before planning a larger order.'],
        ['Can I walk in?', 'Public snippets suggest walk-in opening windows, but they need verification. Check Instagram for the latest batch and sold-out status before visiting.'],
        ['Do you do catering?', 'Public Instagram snippet mentions DM for catering. This demo links to Instagram DM and does not invent any other contact channel.'],
        ['Where are you located?', 'Public directory snippets show Shop 2, G/F, 87 Wing Lok Street, Sheung Wan, Hong Kong. Please verify on Instagram or map listings before visiting.']
      ]
    },
    legal: {
      kicker: 'Future compliance placeholders',
      title: 'Privacy and terms ready for client approval.',
      privacyTitle: 'Privacy Policy placeholder',
      privacyText: 'Draft note: this demo only remembers language preference locally in the visitor’s browser. It does not run analytics, collect form submissions, or store customer details. Replace with a lawyer/client-approved policy before adding forms, payments, newsletter, pixels, or analytics.',
      termsTitle: 'Terms / disclaimer placeholder',
      termsText: 'Draft note: this is a speculative demo, not the official Pineapple Bakery website. Public social imagery and uncertain business details must be approved or replaced before sales outreach or launch.',
      privacyLink: 'Privacy',
      termsLink: 'Terms'
    },
    footerDisclaimer: 'Demo concept only — not affiliated with Pineapple Bakery. Built from public snippets and public Instagram/social thumbnails for draft visualization; uncertain details and image usage rights must be verified before real outreach or launch.'
  },
  zh: {
    photoCredit: '公開 Instagram 相片／Reel 縮圖 — 只供草稿示意',
    socialLabel: '社交',
    socialMenu: {
      instagram: '最新出爐／DM 到會查詢',
      openrice: '公開餐廳資料',
      map: '上環地址搜尋'
    },
    nav: { menu: '餐單', visit: '到訪', catering: '到會', language: '語言' },
    hero: {
      eyebrow: '網站示意 • 上環麵包店',
      title: '上環新鮮出爐牛油菠蘿包',
      subhead: '為 Pineapple Bakery 鳳梨餅家設計的溫暖現代 landing page 概念 — 集中展示招牌菠蘿包、氮氣奶茶、小批量烘焙、位置及 Instagram DM 到會查詢。',
      viewMenu: '睇餐單',
      dm: 'Instagram DM',
      trust: ['只使用公開資料', '營業時間需要核實', '不虛構價錢／聯絡方式'],
      photoAlt: '焗盤上的金黃菠蘿包',
      cardLabel: 'Pineapple Bakery 菠蘿包公開 Instagram 相片',
      noteTitle: '每日新鮮出爐，售完即止',
      noteText: '到訪前請先查看 Instagram story／post，確認最新出爐批次、Walk-in 及售罄情況。'
    },
    intro: {
      kicker: '網站作用',
      title: '餐單、到訪資料、到會查詢，一頁睇晒。',
      text: '這個示意網站把公開資料整理成顧客容易理解的結構；避免未核實聲稱，同時令附近上班族、食客及團體訂購客人更容易找到店舖資訊。'
    },
    menu: {
      kicker: '招牌產品',
      title: '金黃菠蘿包、香滑奶茶、派對分享盒。'
    },
    products: [
      { title: 'Brioche 菠蘿包', badge: '招牌', text: '港式菠蘿包的現代版本：鬆軟 brioche 口感配金黃酥脆菠蘿皮。價錢有待確認。' },
      { title: '菠蘿油', badge: '經典滋味', text: '熱辣辣菠蘿包夾凍牛油，酥皮香甜，是茶記經典的升級演繹。價錢有待確認。' },
      { title: '氮氣奶茶', badge: '飲品配搭', text: '公開資料曾提及氮氣奶茶；此處定位為配搭新鮮烘焙的冰涼香滑飲品。詳情需核實。' },
      { title: '到會／派對訂單', badge: 'DM 查詢', text: '適合辦公室小食、會議及小型派對。公開 Instagram 資料提及可 DM 到會；沒有虛構電話或 WhatsApp。' }
    ],
    visit: {
      kicker: '今日出爐／營業時間',
      title: '到訪前請先在 Instagram 核實。',
      text: '資料搜集時找到的公開片段提及有限營業時段。由於不是官方網站直接確認，示意頁會清楚標示「需核實」，並引導客人到 Instagram 查看最新 Walk-in 及出爐時間。',
      link: '查看最新 Instagram 更新',
      rows: [
        ['星期三／四', '10:00–15:00', '公開資料 — 需要核實'],
        ['星期五／六', '10:00–17:00', '公開資料 — 需要核實'],
        ['其他日子', '查看 IG', '最新營業／售罄情況或有變動']
      ]
    },
    catering: {
      kicker: '到會／團體訂購',
      title: '把一盤熱辣辣菠蘿包帶到辦公室。',
      text: '會議、慶祝、團體小食都可引導至 Instagram DM 查詢；因公開資料提及「DM for catering」。本示意頁不虛構 WhatsApp、電話或私人聯絡資料。',
      copyButton: '複製到會 DM 文字',
      copied: '已複製 — 可貼到 Instagram DM',
      copyError: '複製失敗 — 請選取下方文字',
      productCopyButton: '複製 DM 查詢',
      productCopied: 'DM 文字已複製',
      openInstagram: '開啟 Instagram profile',
      previewLabel: '建議 DM：',
      dmDraft: '你好 Pineapple Bakery，我想查詢到會／團體訂購。請問有咩選擇、最低訂購量、需要幾多日前預訂，以及取貨安排？謝謝！'
    },
    location: {
      kicker: '位置',
      title: '香港上環永樂街87號地下2號舖',
      text: '鄰近上環，方便中上環上班族快速購買新鮮麵包或辦公室分享盒。',
      link: '開啟 Google Maps 搜尋',
      mapTitle: '地圖位置',
      mapText: '使用公開地址開啟 Google Maps 搜尋',
      mapLabel: '開啟 Pineapple Bakery 地址地圖搜尋'
    },
    proof: {
      kicker: '公開佐證',
      title: '如實展示資料，避免誇大。',
      items: [
        ['OpenRice 資料', '找到 Pineapple Bakery 上環店的公開餐廳資料。'],
        ['U Food／媒體提及', '關於香港菠蘿包推介的公開媒體資料。'],
        ['Instagram／社交熱度', '以公開 Instagram profile 作為 CTA 及最新資訊方向。']
      ]
    },
    faq: {
      kicker: '常見問題',
      title: '到訪前須知',
      items: [
        ['需要預訂嗎？', '此示意頁不能確認預訂規則。大量訂購前，請查看 Pineapple Bakery Instagram post／story 或直接 DM 查詢。'],
        ['可以 Walk-in 嗎？', '公開資料顯示可能有 Walk-in 時段，但需要核實。到訪前請先查看 Instagram 最新批次及售罄狀態。'],
        ['有到會服務嗎？', '公開 Instagram 資料提及可 DM 到會。本示意頁只連到 Instagram DM，沒有虛構其他聯絡方式。'],
        ['地址在哪裡？', '公開資料顯示為香港上環永樂街87號地下2號舖。到訪前請在 Instagram 或地圖資料再作確認。']
      ]
    },
    legal: {
      kicker: '日後合規位置',
      title: '私隱政策及條款位置已預留。',
      privacyTitle: '私隱政策 placeholder',
      privacyText: '草稿說明：此示意網站只會在訪客瀏覽器本機記住語言選擇；沒有分析追蹤、表格提交或儲存顧客資料。如日後加入表格、付款、訂閱、像素或分析工具，必須先換成客戶／法律審批版本。',
      termsTitle: '條款／免責聲明 placeholder',
      termsText: '草稿說明：這是網站示意概念，並非 Pineapple Bakery 官方網站。公開社交圖片及未核實商業資料，正式推廣或上線前必須取得批准或替換。',
      privacyLink: '私隱',
      termsLink: '條款'
    },
    footerDisclaimer: '示意網站概念 — 非 Pineapple Bakery 官方或關聯網站。內容由公開資料及公開 Instagram／社交縮圖整理作草稿展示；未確定資料及圖片使用權必須在正式推廣或上線前核實。'
  }
};

function InstagramIcon({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="2" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" />
      <circle cx="17.5" cy="6.5" r="1.15" fill="currentColor" />
    </svg>
  );
}

function App() {
  const [language, setLanguage] = useState(getInitialLanguage);
  const [copyStatus, setCopyStatus] = useState('idle');

  const t = copy[language];

  async function copyToClipboard(text) {
    if (navigator.clipboard?.writeText) {
      try {
        await navigator.clipboard.writeText(text);
        return;
      } catch {
        // Fall back to the temporary textarea method below.
      }
    }

    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.setAttribute('readonly', '');
    textArea.style.position = 'fixed';
    textArea.style.top = '-9999px';
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
  }

  async function handleCopyCateringDm() {
    try {
      await copyToClipboard(t.catering.dmDraft);
      setCopyStatus('copied');
      window.setTimeout(() => setCopyStatus('idle'), 3500);
    } catch {
      setCopyStatus('error');
    }
  }

  useEffect(() => {
    const requestedFontTheme = new URLSearchParams(window.location.search).get('font');
    document.documentElement.dataset.fontTheme = fontThemeKeys.includes(requestedFontTheme) ? requestedFontTheme : 'young-serif';
  }, []);

  useEffect(() => {
    document.documentElement.lang = language === 'zh' ? 'zh-Hant-HK' : 'en';
    window.localStorage.setItem(languageStorageKey, language);
  }, [language]);

  useEffect(() => {
    const targets = document.querySelectorAll('.section > .section-kicker, .section > h2, .section > p, .section-heading, .product-card, .split > div, .schedule-card, .catering-card, .location > div, .map-card, .proof-grid a, .legal-card, details, footer');

    if (!('IntersectionObserver' in window)) {
      targets.forEach((el) => el.classList.add('is-visible'));
      return undefined;
    }

    targets.forEach((el, index) => {
      el.classList.add('reveal-on-scroll');
      el.style.setProperty('--reveal-delay', `${Math.min(index % 4, 3) * 70}ms`);
    });

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        } else if (entry.boundingClientRect.top > window.innerHeight * 0.9) {
          entry.target.classList.remove('is-visible');
        }
      });
    }, { threshold: 0.18, rootMargin: '0px 0px -8% 0px' });

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [language]);

  const productMeta = useMemo(() => [
    { icon: <Croissant />, image: `${assetBase}social/official-brioche-pineapple-buns.jpg` },
    { icon: <Sparkles />, image: `${assetBase}social/food-reel-pineapple-bun.jpg` },
    { icon: <Coffee />, image: `${assetBase}social/social-reel-milk-tea.jpg` },
    { icon: <PartyPopper />, image: `${assetBase}social/social-reel-bun-closeup.jpg`, dmAction: true }
  ], []);

  const products = t.products.map((item, index) => ({ ...item, ...productMeta[index] }));

  return (
    <main>
      <aside className="social-float" aria-label="Quick social links">
        <button className="social-trigger" aria-haspopup="true" aria-expanded="false">
          <InstagramIcon size={20}/>
          <span>{t.socialLabel}</span>
        </button>
        <div className="social-menu" role="menu">
          <a role="menuitem" href={instagramUrl} target="_blank" rel="noreferrer">
            <InstagramIcon size={17}/>
            <span><strong>Instagram</strong><small>{t.socialMenu.instagram}</small></span>
          </a>
          <a role="menuitem" href={openRiceUrl} target="_blank" rel="noreferrer">
            <MessageCircle size={17}/>
            <span><strong>OpenRice</strong><small>{t.socialMenu.openrice}</small></span>
          </a>
          <a role="menuitem" href={mapsUrl} target="_blank" rel="noreferrer">
            <MapPin size={17}/>
            <span><strong>Map</strong><small>{t.socialMenu.map}</small></span>
          </a>
        </div>
      </aside>

      <section className="hero" id="top">
        <nav className="nav" aria-label="Primary navigation">
          <a href="#top" className="brand"><span className="brand-icon"><img src={`${assetBase}social/pineapple-bakery-instagram-icon.jpg`} alt="Pineapple Bakery Instagram profile icon" /></span><span>鳳梨</span> Pineapple Bakery</a>
          <div className="nav-actions">
            <div className="nav-links">
              <a href="#menu">{t.nav.menu}</a>
              <a href="#visit">{t.nav.visit}</a>
              <a href="#catering">{t.nav.catering}</a>
              <a href={instagramUrl} target="_blank" rel="noreferrer">Instagram</a>
            </div>
            <div className="language-switch" aria-label={t.nav.language}>
              {languages.map((item) => (
                <button
                  key={item.code}
                  type="button"
                  className={language === item.code ? 'active' : ''}
                  aria-pressed={language === item.code}
                  onClick={() => setLanguage(item.code)}
                >
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        </nav>

        <div className="hero-bg-gallery" aria-hidden="true">
          <img className="tile tile-one" src={`${assetBase}social/food-reel-pineapple-bun.jpg`} alt="" />
          <img className="tile tile-two" src={`${assetBase}social/social-reel-milk-tea.jpg`} alt="" />
          <img className="tile tile-three" src={`${assetBase}social/social-reel-bun-closeup.jpg`} alt="" />
        </div>

        <div className="hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">{t.hero.eyebrow}</p>
            <h1>{t.hero.title}</h1>
            <p className="subhead">{t.hero.subhead}</p>
            <div className="cta-row">
              <a className="button primary" href="#menu">{t.hero.viewMenu}</a>
              <a className="button secondary" href={instagramUrl} target="_blank" rel="noreferrer"><Send size={18}/> {t.hero.dm}</a>
            </div>
            <div className="trust-strip">
              <span><ShieldCheck size={16}/> {t.hero.trust[0]}</span>
              <span>{t.hero.trust[1]}</span>
              <span>{t.hero.trust[2]}</span>
            </div>
          </div>
          <div className="hero-card" aria-label={t.hero.cardLabel}>
            <figure className="hero-photo">
              <img src={`${assetBase}social/official-brioche-pineapple-buns.jpg`} alt={t.hero.photoAlt} />
              <figcaption>{t.photoCredit}</figcaption>
            </figure>
            <div className="hero-note">
              <strong>{t.hero.noteTitle}</strong>
              <p>{t.hero.noteText}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section intro">
        <p className="section-kicker">{t.intro.kicker}</p>
        <h2>{t.intro.title}</h2>
        <p>{t.intro.text}</p>
      </section>

      <section className="section" id="menu">
        <div className="section-heading">
          <p className="section-kicker">{t.menu.kicker}</p>
          <h2>{t.menu.title}</h2>
        </div>
        <div className="product-grid">
          {products.map((item) => (
            <article className="product-card" key={item.title}>
              <img className="product-photo" src={item.image} alt={`${item.title} photo from public Instagram source`} />
              <div className="product-body">
                <div className="product-top">
                  <div className="icon-pill">{item.icon}</div>
                  {item.dmAction ? (
                    <button className="badge-action" type="button" onClick={handleCopyCateringDm} aria-label={`${t.catering.productCopyButton}: ${t.catering.dmDraft}`}>
                      <Send size={14}/> {copyStatus === 'copied' ? t.catering.productCopied : t.catering.productCopyButton}
                    </button>
                  ) : (
                    <span>{item.badge}</span>
                  )}
                </div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
                <small>{t.photoCredit}</small>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section split" id="visit">
        <div>
          <p className="section-kicker">{t.visit.kicker}</p>
          <h2>{t.visit.title}</h2>
          <p>{t.visit.text}</p>
          <a className="text-link" href={instagramUrl} target="_blank" rel="noreferrer">{t.visit.link} <ExternalLink size={15}/></a>
        </div>
        <div className="schedule-card">
          {t.visit.rows.map((row, index) => (
            <div className={`schedule-row ${index === 2 ? 'muted' : ''}`} key={row[0]}><span>{row[0]}</span><strong>{row[1]}</strong><small>{row[2]}</small></div>
          ))}
        </div>
      </section>

      <section className="section catering" id="catering">
        <div className="catering-card">
          <p className="section-kicker">{t.catering.kicker}</p>
          <h2>{t.catering.title}</h2>
          <p>{t.catering.text}</p>
          <div className="catering-actions">
            <button className="button dark" type="button" onClick={handleCopyCateringDm}>
              <Send size={18}/> {copyStatus === 'copied' ? t.catering.copied : copyStatus === 'error' ? t.catering.copyError : t.catering.copyButton}
            </button>
            <a className="button ghost-light" href={instagramUrl} target="_blank" rel="noreferrer"><InstagramIcon size={18}/> {t.catering.openInstagram}</a>
          </div>
          <p className="dm-preview" aria-live="polite"><strong>{t.catering.previewLabel}</strong> {t.catering.dmDraft}</p>
        </div>
      </section>

      <section className="section location">
        <div>
          <p className="section-kicker">{t.location.kicker}</p>
          <h2>{t.location.title}</h2>
          <p>{t.location.text}</p>
          <a className="text-link" href={mapsUrl} target="_blank" rel="noreferrer"><MapPin size={16}/> {t.location.link}</a>
        </div>
        <a className="map-card" href={mapsUrl} target="_blank" rel="noreferrer" aria-label={t.location.mapLabel}>
          <MapPin size={36}/>
          <strong>{t.location.mapTitle}</strong>
          <span>{t.location.mapText}</span>
        </a>
      </section>

      <section className="section proof">
        <div className="section-heading">
          <p className="section-kicker">{t.proof.kicker}</p>
          <h2>{t.proof.title}</h2>
        </div>
        <div className="proof-grid">
          <a href={openRiceUrl} target="_blank" rel="noreferrer"><strong>{t.proof.items[0][0]}</strong><span>{t.proof.items[0][1]}</span></a>
          <a href={uFoodUrl} target="_blank" rel="noreferrer"><strong>{t.proof.items[1][0]}</strong><span>{t.proof.items[1][1]}</span></a>
          <a href={instagramUrl} target="_blank" rel="noreferrer"><strong>{t.proof.items[2][0]}</strong><span>{t.proof.items[2][1]}</span></a>
        </div>
      </section>

      <section className="section faq">
        <p className="section-kicker">{t.faq.kicker}</p>
        <h2>{t.faq.title}</h2>
        {t.faq.items.map((item) => <details key={item[0]}><summary>{item[0]}</summary><p>{item[1]}</p></details>)}
      </section>

      <section className="section legal-placeholders" id="privacy">
        <p className="section-kicker">{t.legal.kicker}</p>
        <h2>{t.legal.title}</h2>
        <div className="legal-grid">
          <article className="legal-card">
            <span className="legal-label">01</span>
            <h3>{t.legal.privacyTitle}</h3>
            <p>{t.legal.privacyText}</p>
          </article>
          <article className="legal-card" id="terms">
            <span className="legal-label">02</span>
            <h3>{t.legal.termsTitle}</h3>
            <p>{t.legal.termsText}</p>
          </article>
        </div>
      </section>

      <footer>
        <div><strong>Pineapple Bakery 鳳梨餅家</strong><p>{t.location.title}</p></div>
        <div className="footer-links"><a href={instagramUrl} target="_blank" rel="noreferrer">Instagram</a><a href={mapsUrl} target="_blank" rel="noreferrer">Map</a><a href="#privacy">{t.legal.privacyLink}</a><a href="#terms">{t.legal.termsLink}</a></div>
        <p className="disclaimer">{t.footerDisclaimer}</p>
      </footer>
    </main>
  );
}

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

export default App;
