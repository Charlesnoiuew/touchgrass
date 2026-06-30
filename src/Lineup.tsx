import { useState, useEffect } from 'react';
import logo from './assets/logo.png';
import Footer from './Footer';

import partynextdoor from './assets/partynextdoor.webp';
import jid            from './assets/jid.webp';
import amine          from './assets/amine.webp';
import flomilli       from './assets/flomilli.webp';
import monaleo        from './assets/image copy copy copy copy copy copy copy copy copy copy copy.png';
import ddg            from './assets/ddg.webp';
import cochise        from './assets/cochise.webp';
import chrispatrick   from './assets/chrispatrick.webp';
import armaniwhite    from './assets/armaniwhite.webp';
import jenevieve      from './assets/jenevieve.webp';
import wynne          from './assets/wynne.webp';
import bizzyCrook     from './assets/bizzyCrook.webp';
import jovanie        from './assets/jovanie.webp';
import lizzyashleigh  from './assets/lizzyashleigh.webp';
import trapsushi      from './assets/trapsushi.webp';
import girlslovekaraoke from './assets/girlslovekaraoke.webp';
import smb            from './assets/smb.webp';
import cherele        from './assets/cherele.webp';
import slayr          from './assets/9AAD3757-B5FB-41EC-B530-322197C9E972.jpg';
import trim           from './assets/2955EAA5-B395-4A7C-85AF-7491189DF5EE.jpg';

type Tier = 'headliner' | 'main' | 'mid' | 'supporting' | 'special';

type Artist = {
  name: string;
  img: string;
  tier: Tier;
};

const artists: Artist[] = [
  { name: 'PARTYNEXTDOOR', img: partynextdoor,    tier: 'headliner' },
  { name: 'JID',           img: jid,              tier: 'main' },
  { name: 'AMINÉ',         img: amine,            tier: 'main' },
  { name: 'MONALEO',       img: monaleo,          tier: 'main' },
  { name: 'FLO MILLI',     img: flomilli,         tier: 'main' },
  { name: 'DDG',           img: ddg,              tier: 'mid' },
  { name: 'COCHISE',       img: cochise,          tier: 'mid' },
  { name: 'CHRIS PATRICK', img: chrispatrick,     tier: 'mid' },
  { name: 'ARMANI WHITE',  img: armaniwhite,      tier: 'mid' },
  { name: 'JENEVIEVE',     img: jenevieve,        tier: 'supporting' },
  { name: 'WYNNE',         img: wynne,            tier: 'supporting' },
  { name: 'BIZZY CROOK',   img: bizzyCrook,       tier: 'supporting' },
  { name: 'JOVANIE',       img: jovanie,          tier: 'supporting' },
  { name: 'LIZZY ASHLEIGH',img: lizzyashleigh,    tier: 'supporting' },
  { name: 'CHERELE',       img: cherele,          tier: 'supporting' },
  { name: 'SLAYR',         img: slayr,            tier: 'supporting' },
  { name: 'TRIM',          img: trim,             tier: 'supporting' },
  { name: 'TRAP SUSHI',    img: trapsushi,        tier: 'special' },
  { name: 'GIRLS LOVE KARAOKE', img: girlslovekaraoke, tier: 'special' },
  { name: 'BAE BRIGADE BATTLE', img: smb,         tier: 'special' },
];

export default function Lineup() {
  const [menuOpen, setMenuOpen]           = useState(false);
  const [scrolled, setScrolled]           = useState(false);
  const [lightbox, setLightbox]           = useState<Artist | null>(null);
  const [lightboxIdx, setLightboxIdx]     = useState(0);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = (menuOpen || lightbox) ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen, lightbox]);

  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { setLightbox(null); return; }
      if (e.key === 'ArrowRight') {
        const next = (lightboxIdx + 1) % artists.length;
        setLightboxIdx(next);
        setLightbox(artists[next]);
      }
      if (e.key === 'ArrowLeft') {
        const prev = (lightboxIdx - 1 + artists.length) % artists.length;
        setLightboxIdx(prev);
        setLightbox(artists[prev]);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lightbox, lightboxIdx]);

  function openLightbox(a: Artist) {
    const idx = artists.findIndex(x => x.name === a.name);
    setLightboxIdx(idx);
    setLightbox(a);
  }
  function goNext() {
    const next = (lightboxIdx + 1) % artists.length;
    setLightboxIdx(next);
    setLightbox(artists[next]);
  }
  function goPrev() {
    const prev = (lightboxIdx - 1 + artists.length) % artists.length;
    setLightboxIdx(prev);
    setLightbox(artists[prev]);
  }

  return (
    <>
      {/* NAV */}
      <nav className={`nav${scrolled ? ' scrolled' : ''}`}>
        <a href="/"><img src={logo} alt="Touch Grass Music Fest" className="nav-logo" /></a>
        <ul className="nav-links">
          <li><a href="/#lineup">Lineup</a></li>
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
          {([['/#lineup','Lineup'],['/#tickets','Tickets'],['/about','About'],['/partners','Sponsorship Inquiries']] as [string,string][]).map(([href,label]) => (
            <a key={href} href={href} onClick={() => setMenuOpen(false)}>{label}<span className="arrow">→</span></a>
          ))}
        </nav>
      </div>

      {/* LIGHTBOX */}
      {lightbox && (
        <div className="lbox-backdrop" onClick={() => setLightbox(null)}>
          <button className="lbox-nav lbox-prev" onClick={e => { e.stopPropagation(); goPrev(); }} aria-label="Previous">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
          </button>
          <div className="lbox-card" onClick={e => e.stopPropagation()}>
            <button className="lbox-close" onClick={() => setLightbox(null)} aria-label="Close">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
            <div className="lbox-img-wrap">
              <img src={lightbox.img} alt={lightbox.name} className="lbox-img" />
            </div>
            <div className="lbox-body">
              <p className="lbox-tier">{lightbox.tier === 'headliner' ? 'Headliner' : 'Performing'}</p>
              <h2 className="lbox-name">{lightbox.name}</h2>
              <p className="lbox-date">Oct. 3, 2026 · Orlando Amphitheater · Orlando, FL</p>
              <a href="/tickets" className="lbox-btn">Get Tickets</a>
            </div>
          </div>
          <button className="lbox-nav lbox-next" onClick={e => { e.stopPropagation(); goNext(); }} aria-label="Next">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
          </button>
        </div>
      )}

      {/* PAGE HEADER */}
      <div className="lp-header">
        <div className="lp-header-inner">
          <p className="lp-header-eyebrow">Oct. 3, 2026 · Orlando, FL</p>
          <h1 className="lp-header-title">Full Lineup</h1>
          <p className="lp-header-sub">Tap any artist to see more</p>
        </div>
      </div>

      {/* MARQUEE */}
      <div className="ab2-marquee-bar">
        <div className="ab2-marquee-track">
          {[...Array(4)].map((_,i) => (
            <span key={i} className="ab2-marquee-inner">
              TOUCH GRASS MUSIC FEST<span className="ab2-marquee-dot">✦</span>OCT. 3, 2026<span className="ab2-marquee-dot">✦</span>ORLANDO AMPHITHEATER<span className="ab2-marquee-dot">✦</span>ORLANDO, FL<span className="ab2-marquee-dot">✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* HEADLINER FEATURE */}
      <section className="lp-headliner-section">
        <button className="lp-headliner-card" onClick={() => openLightbox(artists[0])}>
          <div className="lp-headliner-img-wrap">
            <img src={artists[0].img} alt={artists[0].name} className="lp-headliner-img" />
            <div className="lp-headliner-overlay" />
          </div>
          <div className="lp-headliner-text">
            <p className="lp-headliner-label">Headliner</p>
            <h2 className="lp-headliner-name">{artists[0].name}</h2>
            <span className="lp-headliner-cta">View Artist →</span>
          </div>
        </button>
      </section>

      {/* GRID */}
      <section className="lp-grid-section">
        <div className="lp-grid-inner">
          <div className="lp-grid">
            {artists.slice(1).map((a) => (
              <button key={a.name} className={`lp-card lp-card-${a.tier}`} onClick={() => openLightbox(a)}>
                <div className="lp-card-img-wrap">
                  <img src={a.img} alt={a.name} className="lp-card-img" />
                  <div className="lp-card-overlay" />
                </div>
                <div className="lp-card-label">
                  <span className="lp-card-name">{a.name}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="lp-cta">
        <div className="lp-cta-inner">
          <h2 className="lp-cta-headline">Ready to show up?</h2>
          <p className="lp-cta-sub">Oct. 3, 2026 · Orlando Amphitheater · Orlando, FL</p>
          <a href="/tickets" className="btn-lime lp-cta-btn">Get Tickets Now</a>
        </div>
      </section>

      <Footer />
    </>
  );
}
