import logo from './assets/logo.png';
import Footer from './Footer';
import teamPhoto from './assets/KTD04988 copy.png';
import jazzyGunsPhoto from './assets/JazzyGuns.jpg';
import dwayneKyngPhoto from './assets/454230631_1131797807920150_2625928852286231267_n.jpg';
import yaBoyRoshiPhoto from './assets/files_5165199-2026-05-22T00-16-50-387Z-image.png';
import lupasanPhoto from './assets/image copy copy copy copy copy copy copy.png';
import sheeraPhoto from './assets/image copy copy copy copy copy copy copy copy.png';
import { useEffect, useState } from 'react';

type Social = { platform: string; handle: string; url: string };
type Member = { idx: string; name: string; photo?: string; socials: Social[] };

const members: Member[] = [
  {
    idx: '01', name: 'JazzyGunz', photo: jazzyGunsPhoto,
    socials: [
      { platform: 'Instagram', handle: '@_jazzyguns', url: 'https://www.instagram.com/_jazzyguns/' },
      { platform: 'YouTube',   handle: '@JazzyGuns',  url: 'https://www.youtube.com/@JazzyGuns' },
    ],
  },
  {
    idx: '02', name: 'Dwayne Kyng', photo: dwayneKyngPhoto,
    socials: [
      { platform: 'Instagram', handle: '@_dwaynekyng', url: 'https://www.instagram.com/_dwaynekyng/' },
      { platform: 'YouTube',   handle: '@DwayneKyng',  url: 'https://www.youtube.com/@DwayneKyng' },
    ],
  },
  {
    idx: '03', name: 'YaBoyRoshi', photo: yaBoyRoshiPhoto,
    socials: [
      { platform: 'Instagram', handle: '@yaboyroshi', url: 'https://www.instagram.com/yaboyroshi' },
      { platform: 'YouTube',   handle: '@YaBoyRoshi', url: 'https://www.youtube.com/c/YaBoyRoshi/videos' },
    ],
  },
  {
    idx: '04', name: 'Sheera', photo: sheeraPhoto,
    socials: [
      { platform: 'Instagram', handle: '@itzsheera', url: 'https://www.instagram.com/itzsheera/' },
      { platform: 'Twitter',   handle: '@itzsheera', url: 'https://x.com/itzsheera' },
    ],
  },
  {
    idx: '05', name: 'Lupasan', photo: lupasanPhoto,
    socials: [
      { platform: 'YouTube',   handle: '@Lupasan',       url: 'https://www.youtube.com/@Lupasan' },
      { platform: 'Instagram', handle: '@lupasan4ever',  url: 'https://www.instagram.com/lupasan4ever' },
    ],
  },
];

function SocialIcon({ platform }: { platform: string }) {
  if (platform === 'YouTube') {
    return (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
      </svg>
    );
  }
  if (platform === 'Twitter') {
    return (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    );
  }
  if (platform === 'Instagram') {
    return (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
      </svg>
    );
  }
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/>
    </svg>
  );
}

export default function About() {
  const [menuOpen, setMenuOpen]         = useState(false);
  const [scrolled, setScrolled]         = useState(false);
  const [heroVisible, setHeroVisible]   = useState(false);
  const [activeMember, setActiveMember] = useState<Member | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = (menuOpen || activeMember) ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen, activeMember]);

  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>('.reveal');
    const io = new IntersectionObserver(entries => entries.forEach(e => {
      if (e.isIntersecting) { (e.target as HTMLElement).classList.add('visible'); io.unobserve(e.target); }
    }), { threshold: 0.06 });
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setActiveMember(null); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <>
      <nav className={`nav${scrolled ? ' scrolled' : ''}`}>
        <a href="/"><img src={logo} alt="Touch Grass Music Fest" className="nav-logo" /></a>
        <ul className="nav-links">
          <li><a href="/#lineup">Lineup</a></li>
          <li><a href="/tickets">Tickets</a></li>
          <li><a href="/about" className="nav-active">About</a></li>
          <li><a href="/partners" className="nav-cta">Sponsorship Inquiries</a></li>
        </ul>
        <button className="burger-btn" onClick={() => setMenuOpen(true)} aria-label="Open menu">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
            <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
          </svg>
        </button>
      </nav>

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

      {activeMember && (
        <div className="mp-backdrop" onClick={() => setActiveMember(null)}>
          <div className={`mp-panel${activeMember.photo ? '' : ' mp-panel-noimg'}`} onClick={e => e.stopPropagation()}>
            <button className="mp-close" onClick={() => setActiveMember(null)} aria-label="Close">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
            {activeMember.photo ? (
              <div className="mp-photo-wrap">
                <img src={activeMember.photo} alt={activeMember.name} className="mp-photo" />
                <div className="mp-photo-fade" />
              </div>
            ) : (
              <div className="mp-initials-banner">
                <span className="mp-initials-text">{activeMember.name.split(' ').map((w: string) => w[0] ?? '').join('').slice(0,2)}</span>
              </div>
            )}
            <div className="mp-body">
              <p className="mp-idx">{activeMember.idx}</p>
              <h2 className="mp-name">{activeMember.name}</h2>
              <div className="mp-divider" />
              <p className="mp-socials-label">Find them online</p>
              <div className="mp-socials">
                {activeMember.socials.map(s => (
                  <a key={s.platform} href={s.url} target="_blank" rel="noopener noreferrer" className="mp-social-link">
                    <span className="mp-social-icon"><SocialIcon platform={s.platform} /></span>
                    <span className="mp-social-platform">{s.platform}</span>
                    <span className="mp-social-handle">{s.handle}</span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      <section className="ab2-hero">
        <div className="ab2-hero-photo-wrap">
          <img src={teamPhoto} alt="Touch Grass TV" className="ab2-hero-photo" />
          <div className="ab2-hero-overlay" />
        </div>
        <div className={`ab2-hero-content${heroVisible ? ' ab2-hero-visible' : ''}`}>
          <p className="ab2-hero-eyebrow">Meet the team behind it all</p>
          <h1 className="ab2-hero-headline">Touch Grass <span className="ab2-lime">TV</span></h1>
          <p className="ab2-hero-sub">A creative collective built by the culture — not the algorithm.</p>
        </div>
        <div className="ab2-hero-scroll-hint">
          <span>Scroll</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
        </div>
      </section>

      {/* MISSION & VISION */}
      <section className="ab2-section" style={{ background: 'var(--bg)' }}>
        <div className="ab2-inner">
          <div className="ab2-mv-grid reveal">
            <div className="ab2-mv-block">
              <p className="ab2-mv-eyebrow" style={{ color: '#ffffff' }}>Our Mission</p>
              <h2 className="ab2-mv-heading"><span style={{ color: '#84cc16' }}>Building Community</span><br/><span style={{ color: '#84cc16' }}>Through Music</span></h2>
              <p className="ab2-mv-body">Touch Grass Music Fest was born from a simple idea: bring people together — away from their screens, out in the open air, and connected through live music. We exist to create an experience that feels like more than just a concert. One day, one community, infinite energy.</p>
            </div>
            <div className="ab2-mv-block">
              <p className="ab2-mv-eyebrow" style={{ color: '#ffffff' }}>Our Vision</p>
              <h2 className="ab2-mv-heading"><span style={{ color: '#84cc16' }}>A Festival Built</span><br/><span style={{ color: '#84cc16' }}>By the Culture</span></h2>
              <p className="ab2-mv-body">We envision Touch Grass as the annual destination where emerging and established artists meet a passionate, diverse fanbase in an intimate setting. Curated by creators who actually live the culture, this is a festival that reflects what the generation actually wants — authentic, electric, and unapologetically real.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="ab2-section ab2-dark">
        <div className="ab2-inner">
          <p className="ab2-members-eyebrow reveal">The Collective</p>
          <p className="ab2-members-hint reveal">Tap a name to learn more</p>
          <div className="ab2-members-list">
            {members.map((m, i) => (
              <button key={m.name} className={`ab2-member-row reveal reveal-d${Math.min(i+1,4)}`} onClick={() => setActiveMember(m)}>
                {m.photo && <img src={m.photo} alt={m.name} className="ab2-member-thumb" />}
                <span className="ab2-member-idx">{m.idx}</span>
                <span className="ab2-member-name">{m.name}</span>
                <span className="ab2-member-arrow">→</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
