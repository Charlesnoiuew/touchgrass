import { useState, useEffect } from 'react';
import logo from './assets/logo.png';
import heroLogo from './assets/TGMF.png';
import flyer from './assets/flyer.jpg';
import Footer from './Footer';
import HivePopup from './HivePopup';

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled]  = useState(false);
  const [nlFirst, setNlFirst]    = useState('');
  const [nlLast, setNlLast]      = useState('');
  const [nlEmail, setNlEmail]    = useState('');
  const [nlStatus, setNlStatus]  = useState<'idle'|'loading'|'success'>('idle');
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const target = new Date('2026-10-03T12:00:00-04:00').getTime();
    function tick() {
      const diff = target - Date.now();
      if (diff <= 0) { setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 }); return; }
      setCountdown({
        days:    Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours:   Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    }
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

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
        if (e.isIntersecting) { (e.target as HTMLElement).classList.add('visible'); io.unobserve(e.target); }
      }),
      { threshold: 0.08 }
    );
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);

  function handleNewsletter(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (nlStatus === 'loading') return;
    setNlStatus('loading');
    (window as any).HIVE_SDK?.('submitSignupForm', e.currentTarget, () => {
      setNlStatus('success');
      setNlFirst(''); setNlLast(''); setNlEmail('');
    });
  }

  return (
    <>
      {/* NAV */}
      <nav className={`nav${scrolled ? ' scrolled' : ''}`}>
        <a href="#home"><img src={logo} alt="Touch Grass Music Fest" className="nav-logo" /></a>
        <ul className="nav-links">
          <li><a href="/lineup">Lineup</a></li>
          <li><a href="/tickets">Tickets</a></li>
          <li><a href="/about">About</a></li>
          <li><a href="/partners" className="nav-cta">Sponsorship Inquiries</a></li>
        </ul>
        <button className="burger-btn" onClick={() => setMenuOpen(true)} aria-label="Open menu">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
            <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
          </svg>
        </button>
      </nav>

      {/* DRAWER */}
      <div className={`drawer${menuOpen ? ' open' : ''}`} aria-hidden={!menuOpen}>
        <div className="drawer-header">
          <img src={logo} alt="TGMF" className="drawer-logo" />
          <button className="drawer-close" onClick={() => setMenuOpen(false)} aria-label="Close">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>
        <nav className="drawer-nav">
          {([['/lineup','Lineup'],['/tickets','Tickets'],['/about','About'],['/partners','Sponsorship Inquiries']] as [string,string][]).map(([href,label]) => (
            <a key={href} href={href} onClick={() => setMenuOpen(false)}>{label}<span className="arrow">→</span></a>
          ))}
        </nav>
      </div>

      {/* HERO */}
      <section className="hero" id="home">
        <div className="hero-glow-outer" />
        <div className="hero-content">
          <div className="hero-badge">Oct. 3, 2026&nbsp;&nbsp;·&nbsp;&nbsp;Orlando Amphitheater&nbsp;&nbsp;·&nbsp;&nbsp;Orlando, FL</div>
          <img src={heroLogo} alt="Touch Grass Music Fest" className="hero-logo" />
          <div className="hero-countdown" aria-label="Countdown to festival">
            {[
              { label: 'Days',    value: countdown.days },
              { label: 'Hours',   value: countdown.hours },
              { label: 'Minutes', value: countdown.minutes },
              { label: 'Seconds', value: countdown.seconds },
            ].map(({ label, value }, i) => (
              <div key={label} className="hero-countdown-cell">
                {i > 0 && <span className="hero-countdown-sep">:</span>}
                <span className="hero-countdown-num">{String(value).padStart(2, '0')}</span>
                <span className="hero-countdown-label">{label}</span>
              </div>
            ))}
          </div>
          <div className="hero-btns">
            <a href="#tickets" className="btn-lime">Get Tickets</a>
            <a href="/lineup"  className="btn-ghost">Full Lineup</a>
          </div>
        </div>
        <div className="hero-ticker">
          <div className="hero-ticker-track">
            {[...Array(3)].map((_,i) => (
              <span key={i} className="hero-ticker-inner">
                PARTYNEXTDOOR<span className="hero-ticker-dot">·</span>JID<span className="hero-ticker-dot">·</span>AMINÉ<span className="hero-ticker-dot">·</span>MONALEO<span className="hero-ticker-dot">·</span>FLO MILLI<span className="hero-ticker-dot">·</span>TIACORINE<span className="hero-ticker-dot">·</span>DDG<span className="hero-ticker-dot">·</span>COCHISE<span className="hero-ticker-dot">·</span>CHRIS PATRICK<span className="hero-ticker-dot">·</span>ARMANI WHITE<span className="hero-ticker-dot">·</span>JENEVIEVE<span className="hero-ticker-dot">·</span>WYNNE<span className="hero-ticker-dot">·</span>BIZZY CROOK<span className="hero-ticker-dot">·</span>JOVANIE<span className="hero-ticker-dot">·</span>TRAP SUSHI<span className="hero-ticker-dot">·</span>CHERELE<span className="hero-ticker-dot">·</span>
              </span>
            ))}
          </div>
        </div>
        <div className="hero-scroll">
          <span>Scroll</span>
          <svg className="hero-scroll-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
        </div>
        <div className="hero-fade" />
      </section>

      {/* LINEUP */}
      <section className="lineup-section" id="lineup">
        <div className="lineup-inner">
          <div className="lineup-header reveal">
            <div className="section-eyebrow">
              <div className="section-eyebrow-line" />
              <span className="section-eyebrow-text">Oct. 3, 2026 · Orlando, FL</span>
            </div>
            <h2>The<br/>Lineup</h2>
          </div>
          <div className="lineup-body">
            <div className="artist-block">
              <div className="headliner-name reveal reveal-d1">PARTYNEXTDOOR</div>
              <p className="tier-label reveal reveal-d2">Also Performing</p>
              <div className="tier-2 reveal reveal-d2">JID<span className="dot-1">·</span>AMINÉ<span className="dot-1">·</span>MONALEO<span className="dot-1">·</span>FLO MILLI</div>
              <div className="tier-3 reveal reveal-d3">TIACORINE<span className="dot-2">·</span>DDG<span className="dot-2">·</span>COCHISE<span className="dot-2">·</span>CHRIS PATRICK</div>
              <div className="tier-4 reveal reveal-d3">ARMANI WHITE<span className="dot-3">·</span>JENEVIEVE<span className="dot-3">·</span>WYNNE<span className="dot-3">·</span>BIZZY CROOK</div>
              <div className="tier-5 reveal reveal-d4">JOVANIE<span className="dot-3">·</span>LIZZY ASHLEIGH<span className="dot-3">·</span>TRAP SUSHI<span className="dot-3">·</span>CHERELE</div>
              <div className="specials reveal reveal-d4">
                <p style={{ color: '#ffffff' }}>Bae Brigade Battle hosted by Storymode Bae &amp; Girls Love Karaoke</p>
                <p style={{ color: '#ffffff' }}>Sets by DJ Peewee &amp; JYNN + Special Guests</p>
              </div>
              <div className="lineup-foot reveal">
                <div className="lineup-foot-info">
                  <div className="lineup-foot-date">OCT. 3, 2026</div>
                  <div className="lineup-foot-venue">Orlando Amphitheater · Orlando, FL</div>
                </div>
                <a href="/lineup" className="btn-lime-solid">View Full Lineup</a>
              </div>
            </div>
            <div className="poster-sticky reveal reveal-d2">
              <div className="poster-card">
                <img src={flyer} alt="Touch Grass Music Fest Official Lineup" className="poster-flyer" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TICKETS */}
      <section className="tk-tiers-section" id="tickets">
        <div className="tk-tiers-inner">
          <div className="tk-section-head reveal">
            <div className="section-eyebrow">
              <div className="section-eyebrow-line" />
              <span className="section-eyebrow-text">Limited Availability</span>
            </div>
            <h2 className="tk-section-h2">Get Your Tickets</h2>
          </div>
          <div className="tk-cards-grid">
            <div className="tcard reveal reveal-d1">
              <div className="tcard-top"><div className="tcard-tier">GA</div></div>
              <div className="tcard-price-row"><div className="tcard-price">$209</div><div className="tcard-price-label">Taxes &amp; fees included</div></div>
              <p className="tcard-afterpay">*Pay in 4 interest-free payments of $52.22 with Afterpay</p>
              <ul className="tcard-perks"><li>Entry to the Hottest New Festival</li><li>Local Food Vendors</li><li>Main Merch Store</li></ul>
              <a href="https://link.dice.fm/Touch_Grass-GA" target="_blank" rel="noopener noreferrer" className="tcard-btn">Buy GA Tickets</a>
            </div>
            <div className="tcard tcard-featured reveal reveal-d2">
              <div className="tcard-top"><div className="tcard-tier">VIP</div></div>
              <div className="tcard-price-row"><div className="tcard-price">$467</div><div className="tcard-price-label">Taxes &amp; fees included</div></div>
              <p className="tcard-afterpay">*Pay in 4 interest-free payments of $116.71, or over 6-12 months with Afterpay</p>
              <ul className="tcard-perks"><li>Dedicated Fast Entry Lanes</li><li>Access to VIP Lounge</li><li>Front Row Viewing</li><li>VIP Bars</li><li>Designated Lockers</li><li>Merch Voucher</li></ul>
              <a href="https://link.dice.fm/Touch_Grass-VIP" target="_blank" rel="noopener noreferrer" className="tcard-btn">Buy VIP Tickets</a>
            </div>
            <div className="tcard reveal reveal-d3">
              <div className="tcard-top"><div className="tcard-tier tcard-tier-sm">Locker<br/>Rental</div></div>
              <div className="tcard-price-row"><div className="tcard-price">$14.99</div></div>
              <p className="tcard-locker-note"><strong>Two (2) Locker Locations</strong><br/>GA Lockers &nbsp;·&nbsp; VIP Lockers</p>
              <p className="tcard-locker-body">Why stress about losing your ID, dancing with a full backpack, or carrying around new merch? Keep your items safe and secure throughout the weekend and your phone fully charged.</p>
              <a href="https://secure.mobilecharginglockers.com/event/touch-grass-music-festival-2026" target="_blank" rel="noopener noreferrer" className="tcard-btn">Secure Locker</a>
            </div>
          </div>
        </div>
      </section>

      {/* VIBE SECTION */}
      <section className="vibe-section" id="about">
        <div className="vibe-inner">
          <p className="vibe-tagline reveal">One day. Two stages. Music,<br/>community and good vibes!</p>
          <div className="vibe-video-wrap reveal reveal-d1">
            <iframe
              src="https://www.youtube.com/embed/KEC73SJZn2E?si=CsB63-9r6O87dD6e"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="nl-section">
        <div className="nl-inner reveal">
          <div className="nl-text">
            <h2 className="nl-headline">Stay in Touch!</h2>
            <p className="nl-sub">Join our newsletter and be the first to know about ticket drops, performers and schedule.</p>
          </div>
          {nlStatus === 'success' ? (
            <div className="nl-success">You're in! We'll keep you posted.</div>
          ) : (
            <form className="nl-form hive-signup-form" onSubmit={handleNewsletter}>
              <input data-HIVE-FORM-FIELD="swid" type="hidden" value="14709" />
              <input data-HIVE-FORM-FIELD="addToSegment" type="hidden" value="Signup Form - Homepage" />
              <div style={{ position: 'absolute', left: '-5000px' }} aria-hidden="true">
                <input type="text" data-HIVE-FORM-FIELD="areUReal" tabIndex={-1} defaultValue="" />
              </div>
              <p className="nl-form-label">Name</p>
              <div className="nl-name-row">
                <div className="nl-field">
                  <label className="nl-label">First Name<span className="nl-req">*</span></label>
                  <input className="nl-input" data-HIVE-FORM-FIELD="firstName" id="_HIVE-firstName-14709" name="fname" type="text" value={nlFirst} onChange={e => setNlFirst(e.target.value)} placeholder="First" autoComplete="given-name" />
                </div>
                <div className="nl-field">
                  <label className="nl-label">Last Name<span className="nl-req">*</span></label>
                  <input className="nl-input" data-HIVE-FORM-FIELD="lastName" id="_HIVE-lastName-14709" name="lname" type="text" value={nlLast} onChange={e => setNlLast(e.target.value)} placeholder="Last" autoComplete="family-name" />
                </div>
              </div>
              <div className="nl-field">
                <label className="nl-label">Email<span className="nl-req">*</span></label>
                <input className="nl-input" data-HIVE-FORM-FIELD="email" id="_HIVE-email-14709" name="email" type="email" value={nlEmail} onChange={e => setNlEmail(e.target.value)} required placeholder="you@example.com" autoComplete="email" />
              </div>
              <p className="nl-consent">Sign up for news and updates</p>
              <button className="nl-btn" data-HIVE-FORM-FIELD="submitButton" type="submit" disabled={nlStatus === 'loading'}>
                {nlStatus === 'loading' ? 'Subscribing...' : 'Submit'}
              </button>
              <div data-HIVE-FORM-FIELD="successMessage" style={{ display: 'none' }}>
                <h2>Thanks for joining our mailing list</h2>
                <p>You've been successfully subscribed - thanks!</p>
              </div>
            </form>
          )}
        </div>
      </section>

      <Footer />
      <HivePopup />
    </>
  );
}
