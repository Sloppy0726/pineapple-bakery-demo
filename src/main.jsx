import React, { useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { Send, MapPin, Coffee, Croissant, Sparkles, ExternalLink, PartyPopper, ShieldCheck, MessageCircle } from 'lucide-react';
import './styles.css';

const instagramUrl = 'https://www.instagram.com/pineapplebakeryhk/';
const openRiceUrl = 'https://www.openrice.com/en/hongkong/r-pineapple-bakery-sheung-wan-hong-kong-style-bakery-r998564';
const uFoodUrl = 'https://ufood.com.hk/restaurant/news/detail/20073149/香港菠蘿包推介-港式菠蘿包必試-冰火菠蘿油-酥脆菠蘿皮-爆漿芝士餡';
const mapsUrl = 'https://www.google.com/maps/search/?api=1&query=Shop%202%2C%20G%2FF%2C%2087%20Wing%20Lok%20Street%2C%20Sheung%20Wan%2C%20Hong%20Kong';
const photoCredit = 'Public Instagram photo/reel thumbnail — draft use only';
const assetBase = import.meta.env.BASE_URL;
const fontThemeKeys = ['fraunces', 'playfair', 'dm-serif', 'young-serif', 'instrument'];

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
  useEffect(() => {
    const requestedFontTheme = new URLSearchParams(window.location.search).get('font');
    document.documentElement.dataset.fontTheme = fontThemeKeys.includes(requestedFontTheme) ? requestedFontTheme : 'young-serif';

    const targets = document.querySelectorAll('.section > .section-kicker, .section > h2, .section > p, .section-heading, .product-card, .split > div, .schedule-card, .catering-card, .location > div, .map-card, .proof-grid a, details, footer');

    if (!('IntersectionObserver' in window)) {
      targets.forEach((el) => el.classList.add('is-visible'));
      return;
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
  }, []);

  const products = [
    { icon: <Croissant />, title: 'Brioche Pineapple Bun', badge: 'Signature', image: `${assetBase}social/official-brioche-pineapple-buns.jpg`, text: 'A modern Hong Kong pineapple bun concept with a soft brioche-style crumb and golden crackly top. Price to be confirmed.' },
    { icon: <Sparkles />, title: 'Pineapple Bun with Butter', badge: 'Classic indulgence', image: `${assetBase}social/food-reel-pineapple-bun.jpg`, text: 'Warm bun, cold butter, crisp sweet crust — a premium take on the beloved cha chaan teng favourite. Price to be confirmed.' },
    { icon: <Coffee />, title: 'Nitro Milk Tea', badge: 'Drink pairing', image: `${assetBase}social/social-reel-milk-tea.jpg`, text: 'Public snippets mention nitro milk tea — positioned here as the cool, creamy pairing for fresh bakes. Details to verify.' },
    { icon: <PartyPopper />, title: 'Catering / Party Orders', badge: 'DM enquiry', image: `${assetBase}social/social-reel-bun-closeup.jpg`, text: 'For office treats, meetings, and small parties. Public Instagram snippet mentions DM for catering; no phone/WhatsApp invented.' }
  ];

  return (
    <main>
      <aside className="social-float" aria-label="Quick social links">
        <button className="social-trigger" aria-haspopup="true" aria-expanded="false">
          <InstagramIcon size={20}/>
          <span>Social</span>
        </button>
        <div className="social-menu" role="menu">
          <a role="menuitem" href={instagramUrl} target="_blank" rel="noreferrer">
            <InstagramIcon size={17}/>
            <span><strong>Instagram</strong><small>Latest bakes / DM catering</small></span>
          </a>
          <a role="menuitem" href={openRiceUrl} target="_blank" rel="noreferrer">
            <MessageCircle size={17}/>
            <span><strong>OpenRice</strong><small>Public directory listing</small></span>
          </a>
          <a role="menuitem" href={mapsUrl} target="_blank" rel="noreferrer">
            <MapPin size={17}/>
            <span><strong>Map</strong><small>Sheung Wan address search</small></span>
          </a>
        </div>
      </aside>

      <section className="hero" id="top">
        <nav className="nav" aria-label="Primary navigation">
          <a href="#top" className="brand"><span>鳳梨</span> Pineapple Bakery</a>
          <div className="nav-links">
            <a href="#menu">Menu</a>
            <a href="#visit">Visit</a>
            <a href="#catering">Catering</a>
            <a href={instagramUrl} target="_blank" rel="noreferrer">Instagram</a>
          </div>
        </nav>

        <div className="hero-bg-gallery" aria-hidden="true">
          <img className="tile tile-one" src={`${assetBase}social/food-reel-pineapple-bun.jpg`} alt="" />
          <img className="tile tile-two" src={`${assetBase}social/social-reel-milk-tea.jpg`} alt="" />
          <img className="tile tile-three" src={`${assetBase}social/social-reel-bun-closeup.jpg`} alt="" />
        </div>

        <div className="hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">Demo concept • Sheung Wan bakery</p>
            <h1>Fresh brioche pineapple buns in Sheung Wan</h1>
            <p className="subhead">A warm, modern landing page concept for Pineapple Bakery 鳳梨餅家 — highlighting signature pineapple buns, nitro milk tea, small-batch bakes, location, and Instagram DM catering enquiries.</p>
            <div className="cta-row">
              <a className="button primary" href="#menu">View Menu</a>
              <a className="button secondary" href={instagramUrl} target="_blank" rel="noreferrer"><Send size={18}/> Instagram DM</a>
            </div>
            <div className="trust-strip">
              <span><ShieldCheck size={16}/> Public info only</span>
              <span>Opening times need verification</span>
              <span>No fake prices/contact info</span>
            </div>
          </div>
          <div className="hero-card" aria-label="Public Instagram photo of Pineapple Bakery buns">
            <figure className="hero-photo">
              <img src={`${assetBase}social/official-brioche-pineapple-buns.jpg`} alt="Fresh golden pineapple buns on a bakery tray" />
              <figcaption>{photoCredit}</figcaption>
            </figure>
            <div className="hero-note">
              <strong>Baked to sell out</strong>
              <p>Check Instagram stories/posts for the latest batch and walk-in updates before visiting.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section intro">
        <p className="section-kicker">Why this page helps</p>
        <h2>One clear home for menu, visit info, and catering.</h2>
        <p>This speculative demo turns public snippets into a customer-friendly website structure. It avoids unverified claims while making the bakery easier to discover for nearby office workers, foodies, and group-order customers.</p>
      </section>

      <section className="section" id="menu">
        <div className="section-heading">
          <p className="section-kicker">Signature products</p>
          <h2>Golden buns, creamy tea, party-ready boxes.</h2>
        </div>
        <div className="product-grid">
          {products.map((item) => (
            <article className="product-card" key={item.title}>
              <img className="product-photo" src={item.image} alt={`${item.title} photo from public Instagram source`} />
              <div className="product-body">
                <div className="product-top"><div className="icon-pill">{item.icon}</div><span>{item.badge}</span></div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
                <small>{photoCredit}</small>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section split" id="visit">
        <div>
          <p className="section-kicker">Today’s bake / opening schedule</p>
          <h2>Please verify on Instagram before visiting.</h2>
          <p>Public snippets found during research mention limited opening windows. Because this is not confirmed directly from an official website, the demo labels the schedule carefully and points customers to Instagram for current walk-in and batch-time updates.</p>
          <a className="text-link" href={instagramUrl} target="_blank" rel="noreferrer">Check latest Instagram updates <ExternalLink size={15}/></a>
        </div>
        <div className="schedule-card">
          <div className="schedule-row"><span>Wed / Thu</span><strong>10:00–15:00</strong><small>Public snippet — needs verification</small></div>
          <div className="schedule-row"><span>Fri / Sat</span><strong>10:00–17:00</strong><small>Public snippet — needs verification</small></div>
          <div className="schedule-row muted"><span>Other days</span><strong>Check IG</strong><small>Latest opening / sold-out status may vary</small></div>
        </div>
      </section>

      <section className="section catering" id="catering">
        <div className="catering-card">
          <p className="section-kicker">Catering / group orders</p>
          <h2>Bring a tray of warm pineapple buns to the office.</h2>
          <p>For meetings, celebrations, and group treats, this demo directs customers to Instagram DM because public snippets mention “DM for catering.” No WhatsApp, phone number, or private contact information is invented.</p>
          <a className="button dark" href={instagramUrl} target="_blank" rel="noreferrer"><Send size={18}/> DM on Instagram for catering enquiries</a>
        </div>
      </section>

      <section className="section location">
        <div>
          <p className="section-kicker">Location</p>
          <h2>Shop 2, G/F, 87 Wing Lok Street, Sheung Wan</h2>
          <p>Near Sheung Wan — convenient for Central/Sheung Wan office workers looking for a quick bakery stop or boxed treats.</p>
          <a className="text-link" href={mapsUrl} target="_blank" rel="noreferrer"><MapPin size={16}/> Open Google Maps search</a>
        </div>
        <a className="map-card" href={mapsUrl} target="_blank" rel="noreferrer" aria-label="Open map search for Pineapple Bakery address">
          <MapPin size={36}/>
          <strong>Map placeholder</strong>
          <span>Google Maps search link for the public address</span>
        </a>
      </section>

      <section className="section proof">
        <div className="section-heading">
          <p className="section-kicker">Public social proof</p>
          <h2>Evidence to verify, not exaggerate.</h2>
        </div>
        <div className="proof-grid">
          <a href={openRiceUrl} target="_blank" rel="noreferrer"><strong>OpenRice listing</strong><span>Directory listing found for Pineapple Bakery in Sheung Wan.</span></a>
          <a href={uFoodUrl} target="_blank" rel="noreferrer"><strong>U Food / media mention</strong><span>Public media snippet around Hong Kong pineapple bun recommendations.</span></a>
          <a href={instagramUrl} target="_blank" rel="noreferrer"><strong>Instagram / social buzz</strong><span>Public Instagram profile used for CTA and latest-update direction.</span></a>
        </div>
      </section>

      <section className="section faq">
        <p className="section-kicker">FAQ</p>
        <h2>Before you go</h2>
        <details><summary>Do I need to preorder?</summary><p>This demo cannot confirm preorder rules. Please check Pineapple Bakery’s Instagram posts/stories or DM them before planning a larger order.</p></details>
        <details><summary>Can I walk in?</summary><p>Public snippets suggest walk-in opening windows, but they need verification. Check Instagram for the latest batch and sold-out status before visiting.</p></details>
        <details><summary>Do you do catering?</summary><p>Public Instagram snippet mentions DM for catering. This demo links to Instagram DM and does not invent any other contact channel.</p></details>
        <details><summary>Where are you located?</summary><p>Public directory snippets show Shop 2, G/F, 87 Wing Lok Street, Sheung Wan, Hong Kong. Please verify on Instagram or map listings before visiting.</p></details>
      </section>

      <footer>
        <div><strong>Pineapple Bakery 鳳梨餅家</strong><p>Shop 2, G/F, 87 Wing Lok Street, Sheung Wan, Hong Kong</p></div>
        <div className="footer-links"><a href={instagramUrl} target="_blank" rel="noreferrer">Instagram</a><a href={mapsUrl} target="_blank" rel="noreferrer">Map</a></div>
        <p className="disclaimer">Demo concept only — not affiliated with Pineapple Bakery. Built from public snippets and public Instagram/social thumbnails for draft visualization; uncertain details and image usage rights must be verified before real outreach or launch.</p>
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
