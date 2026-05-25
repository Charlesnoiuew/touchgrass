import { useState, useEffect } from 'react';
import logo from './assets/logo.png';
import Footer from './Footer';

type FaqItem = { q: string; a: string | React.ReactNode };
type FaqCategory = { num: string; title: string; items: FaqItem[] };

const categories: FaqCategory[] = [
  {
    num: '1',
    title: 'Tickets & Entry',
    items: [
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
    ],
  },
  {
    num: '2',
    title: 'Admission & Cancellation',
    items: [
      {
        q: 'When will the set times be released?',
        a: "We'll drop the full schedule approximately two weeks before the fest on our social media.",
      },
      {
        q: 'Is there re-entry?',
        a: 'Re-Entry is not permitted at Orlando Amphitheater. Please ensure that everything you will need for the event is brought in with you. If you do leave at any point in the evening you will not be allowed back in without a new ticket. If you are ejected from the venue due to a policy violation there will be no re-entry allowed.',
      },
      {
        q: 'What happens if it rains?',
        a: "We are a rain or shine event. However for everyone's safety, we actively monitor weather conditions that may affect the event. If things get dangerous (lightning/high winds), we will pause sets and provide updates via our social media channels.",
      },
    ],
  },
  {
    num: '3',
    title: 'Travel & Lodging',
    items: [
      {
        q: 'Where is the best place to park?',
        a: 'Accessible Parking is located on-site. Parking off property is park at your own risk.',
      },
      {
        q: 'Is there camping?',
        a: 'No. This is a one day event, you will have to leave after last performer.',
      },
      {
        q: 'Is the festival ADA accessible?',
        a: (
          <>
            Absolutely. We provide dedicated viewing platforms and accessible restrooms. Please check in at the Info Booth for an ADA wristband.{' '}
            <a href="/ada" className="faq-inline-link">View our full ADA Accessibility Guide →</a>
          </>
        ),
      },
    ],
  },
  {
    num: '4',
    title: 'Venue Info & Policy',
    items: [
      {
        q: 'Are we ADA Accessible?',
        a: (
          <>
            For our guests with ADA needs, we are committed to ensuring a comfortable and accessible experience. Please visit our{' '}
            <a href="/ada" className="faq-inline-link">ADA Accessibility Guide</a>.
          </>
        ),
      },
      {
        q: 'What is the Venue Bag Policy?',
        a: (
          <span>
            Clear bags up to 12″ x 6″ x 12″ are allowed.<br />
            ✅ Small non-clear bags are allowed if they are 6″ x 9″ or smaller.<br />
            ✅ One-gallon clear freezer bags (like a Ziplock) are also allowed.<br />
            🚫 Backpacks, large purses, and other non-clear bags are prohibited.<br /><br />
            All items will be searched upon entry. Guests have the right to refuse a bag search, and the venue has the right to refuse entry. If you have items that are not allowed, please return them to your vehicle or discard them at the entry gates.
          </span>
        ),
      },
    ],
  },
  {
    num: '5',
    title: 'Etc.',
    items: [
      {
        q: 'How do I contact you?',
        a: (
          <>
            You can reach us anytime via{' '}
            <a href="mailto:info@touchgrassmusicfest.com" className="faq-inline-link">email</a>
            . We aim to respond quickly — usually within one business day.
          </>
        ),
      },
    ],
  },
];

export default function FAQ() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState<string | null>(null);

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
    const io = new IntersectionObserver(entries => entries.forEach(e => {
      if (e.isIntersecting) { (e.target as HTMLElement).classList.add('visible'); io.unobserve(e.target); }
    }), { threshold: 0.06 });
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);

  const toggle = (key: string) => setOpen(open === key ? null : key);

  return (
    <>
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
          {([['/#lineup','Lineup'],['/tickets','Tickets'],['/about','About'],['/partners','Sponsorship Inquiries']] as [string,string][]).map(([href,label]) => (
            <a key={href} href={href} onClick={() => setMenuOpen(false)}>{label}<span className="arrow">→</span></a>
          ))}
        </nav>
      </div>

      {/* HERO */}
      <section className="faq-hero">
        <div className="faq-hero-glow" />
        <div className="faq-hero-content">
          <p className="faq-hero-eyebrow">Everything You Need to Know</p>
          <h1 className="faq-hero-headline">FAQ</h1>
          <p className="faq-hero-sub">Oct. 3, 2026 · Orlando Amphitheater · Orlando, FL</p>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="faq-body">
        <div className="faq-body-inner">
          {categories.map(cat => (
            <div key={cat.num} className="faq-cat reveal">
              <div className="faq-cat-header">
                <span className="faq-cat-num">{cat.num}</span>
                <h2 className="faq-cat-title">{cat.title}</h2>
              </div>
              <div className="faq-cat-items">
                {cat.items.map((item, i) => {
                  const key = `${cat.num}-${i}`;
                  const isOpen = open === key;
                  return (
                    <div key={key} className={`faq-item${isOpen ? ' faq-item-open' : ''}`}>
                      <button className="faq-item-q" onClick={() => toggle(key)}>
                        <span>{item.q}</span>
                        <svg className="faq-item-chevron" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="6 9 12 15 18 9"/>
                        </svg>
                      </button>
                      <div className="faq-item-a">
                        <div className="faq-item-a-inner">{item.a}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="faq-cta-strip">
        <p className="faq-cta-text">Still have questions?</p>
        <a href="mailto:info@touchgrassmusicfest.com" className="faq-cta-btn">Email Us</a>
      </section>

      <Footer />
    </>
  );
}
