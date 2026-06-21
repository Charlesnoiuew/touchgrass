import { useState, useEffect } from 'react';
import logo from './assets/logo.png';
import Footer from './Footer';

const TICKET_URL = 'https://www.touchgrassmusicfest.com';

const tiers = [
  {
    id: 'ga',
    tier: 'GA',
    tierSm: false,
    price: '$209',
    afterpay: '*Pay in 4 interest-free payments of $52.22 with Afterpay',
    featured: false,
    perks: [
      'Entry to the Hottest New Festival',
      'Local Food Vendors',
      'Main Merch Store',
    ],
    locker: null,
    cta: 'Buy GA Tickets',
    url: 'https://link.dice.fm/Touch_Grass-GA',
  },
  {
    id: 'vip',
    tier: 'VIP',
    tierSm: false,
    price: '$467',
    afterpay: '*Pay in 4 interest-free payments of $116.71, or over 6-12 months with Afterpay',
    featured: true,
    perks: [
      'Dedicated Fast Entry Lanes',
      'Access to VIP Lounge',
      'Front Row Viewing',
      'VIP Bars',
      'Designated Lockers',
      'Merch Voucher',
    ],
    locker: null,
    cta: 'Buy VIP Tickets',
    url: 'https://link.dice.fm/Touch_Grass-VIP',
  },
  {
    id: 'locker',
    tier: 'Locker Rental',
    tierSm: true,
    price: '$14.99',
    afterpay: null,
    featured: false,
    perks: null,
    locker: {
      note: 'Two (2) Locker Locations — GA Lockers · VIP Lockers',
      body: 'Why stress about losing your ID, dancing with a full backpack, or carrying around new merch? Keep your items safe and secure throughout the day and your phone fully charged.',
    },
    cta: 'Secure a Locker',
    url: 'https://secure.mobilecharginglockers.com/event/touch-grass-music-festival-2026',
  },
];

const faqs = [
  {
    q: 'Where can I buy tickets?',
    a: 'Only purchase through our official website or authorized partners. Reselling tickets is strictly prohibited. Beware of third-party resellers!',
  },
  {
    q: 'Do I need to print my ticket?',
    a: "Nope, we're eco-friendly. Just have your digital QR code ready on your phone with the brightness turned up.",
  },
  {
    q: 'What is the refund policy?',
    a: 'All ticket sales are final.',
  },
  {
    q: 'Are there age restrictions?',
    a: 'Touch Grass Music Fest is an all ages event. Must be 21+ to purchase alcohol.',
  },
  {
    q: 'Is there re-entry?',
    a: 'Re-Entry is not permitted at Orlando Amphitheater. Please ensure that everything you will need for the event is brought in with you. If you do leave at any point in the evening you will not be allowed back in without a new ticket.',
  },
  {
    q: 'What happens if it rains?',
    a: "We are a rain or shine event. However for everyone's safety, we actively monitor weather conditions that may affect the event. If things get dangerous (lightning/high winds), we will pause sets and provide updates via our social media channels.",
  },
  {
    q: 'Is the festival ADA accessible?',
    a: 'Absolutely. We provide dedicated viewing platforms and accessible restrooms. Please check in at the Info Booth for an ADA wristband. View our full ADA Accessibility Guide at touchgrassmusicfest.com/ada.',
  },
];

export default function Tickets() {
  const [menuOpen, setMenuOpen]   = useState(false);
  const [scrolled, setScrolled]   = useState(false);
  const [openFaq, setOpenFaq]     = useState<number | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>('.reveal');
    const io = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) {
          (e.target as HTMLElement).classList.add('visible');
          io.unobserve(e.target);
        }
      }),
      { threshold: 0.08 }
    );
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <>
      {/* NAV */}
      <nav className={`nav${scrolled ? ' scrolled' : ''}`}>
        <a href="/"><img src={logo} alt="Touch Grass Music Fest" className="nav-logo" /></a>
        <ul className="nav-links">
          <li><a href="/#lineup">Lineup</a></li>
          <li><a href="/tickets" className="nav-active">Tickets</a></li>
          <li><a href="/about">About</a></li>
          <li>
            <a href="/partners" className="nav-cta">
              Sponsorship Inquiries
            </a>
          </li>
        </ul>
        <button className="burger-btn" onClick={() => setMenuOpen(true)} aria-label="Open menu">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
            <line x1="3" y1="6" x2="21" y2="6"/>
            <line x1="3" y1="12" x2="21" y2="12"/>
            <line x1="3" y1="18" x2="21" y2="18"/>
          </svg>
        </button>
      </nav>

      {/* DRAWER */}
      <div className={`drawer${menuOpen ? ' open' : ''}`} aria-hidden={!menuOpen}>
        <div className="drawer-header">
          <img src={logo} alt="TGMF" className="drawer-logo" />
          <button className="drawer-close" onClick={() => setMenuOpen(false)} aria-label="Close menu">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>
        <nav className="drawer-nav">
          {([
            ['/#lineup',  'Lineup'],
            ['/tickets',  'Tickets'],
            ['/about',    'About'],
            ['/partners', 'Sponsorship Inquiries'],
          ] as [string, string][]).map(([href, label]) => (
            <a key={href} href={href} onClick={() => setMenuOpen(false)}>
              {label}<span className="arrow">→</span>
            </a>
          ))}
        </nav>
      </div>

      {/* HERO */}
      <section className="tk-hero tk-hero-dark">
        <div className="tk-hero-glow" />
        <div className="tk-hero-content">
          <p className="tk-hero-eyebrow">Limited Availability</p>
          <h1 className="tk-hero-headline">It's Time To<br/><span className="tk-lime">Touch Grass</span></h1>
          <p className="tk-hero-sub">Oct. 3, 2026 · Orlando Amphitheater · Orlando, FL</p>
          <a href="#tiers" className="tk-hero-cta">View Ticket Options</a>
        </div>
        <div className="tk-hero-scroll">
          <span>Scroll</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9"/>
          </svg>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="tk-marquee-bar">
        <div className="tk-marquee-track">
          {[...Array(4)].map((_, i) => (
            <span key={i} className="tk-marquee-inner">
              OCT. 3, 2026
              <span className="tk-marquee-dot">✦</span>
              ORLANDO AMPHITHEATER
              <span className="tk-marquee-dot">✦</span>
              GA · VIP · LOCKER
              <span className="tk-marquee-dot">✦</span>
              ALL AGES
              <span className="tk-marquee-dot">✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* TICKET TIERS */}
      <section className="tk-tiers-section" id="tiers">
        <div className="tk-tiers-inner">
          <div className="tk-section-head reveal">
            <div className="section-eyebrow">
              <div className="section-eyebrow-line" />
              <span className="section-eyebrow-text">Choose Your Experience</span>
            </div>
            <h2 className="tk-section-h2">Ticket Options</h2>
          </div>

          <div className="tk-cards-grid">
            {tiers.map((t, i) => (
              <div
                key={t.id}
                className={`tcard${t.featured ? ' tcard-featured' : ''} reveal reveal-d${i + 1}`}
              >
                <div className="tcard-top">
                  <div className={`tcard-tier${t.tierSm ? ' tcard-tier-sm' : ''}`}>
                    {t.tier.includes(' ') ? (
                      <>{t.tier.split(' ')[0]}<br/>{t.tier.split(' ').slice(1).join(' ')}</>
                    ) : t.tier}
                  </div>
                </div>
                <div className="tcard-price-row">
                  <div className="tcard-price">{t.price}</div>
                  {!t.locker && <div className="tcard-price-label">Taxes &amp; fees included</div>}
                </div>
                {t.afterpay && <p className="tcard-afterpay">{t.afterpay}</p>}
                {t.perks && (
                  <ul className="tcard-perks">
                    {t.perks.map(p => <li key={p}>{p}</li>)}
                  </ul>
                )}
                {t.locker && (
                  <>
                    <p className="tcard-locker-note"><strong>{t.locker.note.split('—')[0].trim()}</strong><br/>{t.locker.note.split('—')[1]?.trim()}</p>
                    <p className="tcard-locker-body">{t.locker.body}</p>
                  </>
                )}
                <a
                  href={t.url ?? TICKET_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="tcard-btn"
                  onClick={() => {
                    if ((t.id === 'ga' || t.id === 'vip') && typeof (window as any).fbq === 'function') {
                      (window as any).fbq('track', 'AddToCart', { content_category: 'Festival Ticket' });
                    }
                  }}
                >{t.cta}</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT'S INCLUDED STRIP */}
      <section className="tk-includes-section">
        <div className="tk-includes-inner">
          <div className="tk-includes-grid">
            {[
              { icon: '🎤', label: 'Live Performances', desc: '20+ artists across multiple sets' },
              { icon: '🍴', label: 'Local Food Vendors', desc: 'Curated local Orlando food scene' },
              { icon: '🛍', label: 'Merch Store', desc: 'Exclusive TGMF drops on-site' },
              { icon: '🎧', label: 'DJ Sets', desc: 'Non-stop music all day' },
              { icon: '📸', label: 'Photo Moments', desc: 'Curated activation spaces' },
              { icon: '🌿', label: 'Outdoor Venue', desc: 'Orlando Amphitheater open-air' },
            ].map(item => (
              <div key={item.label} className="tk-include-card reveal">
                <div className="tk-include-icon">{item.icon}</div>
                <div className="tk-include-label">{item.label}</div>
                <div className="tk-include-desc">{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="tk-faq-section">
        <div className="tk-faq-inner">
          <div className="tk-section-head reveal" style={{ marginBottom: 48 }}>
            <div className="section-eyebrow">
              <div className="section-eyebrow-line" />
              <span className="section-eyebrow-text">Need to Know</span>
            </div>
            <h2 className="tk-section-h2">FAQ</h2>
          </div>
          <div className="tk-faq-list">
            {faqs.map((f, i) => (
              <div key={i} className={`tk-faq-item${openFaq === i ? ' tk-faq-open' : ''}`}>
                <button className="tk-faq-q" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  <span>{f.q}</span>
                  <svg
                    className="tk-faq-chevron"
                    width="18" height="18" viewBox="0 0 24 24"
                    fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                  >
                    <polyline points="6 9 12 15 18 9"/>
                  </svg>
                </button>
                <div className="tk-faq-a">
                  <p>{f.a}</p>
                </div>
              </div>
            ))}
          </div>
          <div style={{textAlign:'center',marginTop:'40px'}}>
            <a href="/faq" className="tk-faq-more">View Full FAQ →</a>
          </div>
        </div>
      </section>

      {/* CTA STRIP */}
      <section className="tk-cta-section">
        <div className="tk-cta-inner">
          <p className="tk-cta-eyebrow">Don't miss out</p>
          <h2 className="tk-cta-headline">Tickets Are Going Fast</h2>
          <p className="tk-cta-sub">Oct. 3, 2026 · Orlando Amphitheater · All Ages</p>
          <a href={TICKET_URL} target="_blank" rel="noopener noreferrer" className="tk-cta-btn">
            Get Tickets Now
          </a>
        </div>
      </section>

      <Footer />
    </>
  );
}
