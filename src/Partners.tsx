import { useState, useEffect } from 'react';
import logo from './assets/logo.png';
import Footer from './Footer';

export default function Partners() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [heroVisible, setHeroVisible] = useState(false);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [interest, setInterest] = useState('');
  const [submitted, setSubmitted] = useState(false);

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
    const t = setTimeout(() => setHeroVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <>
      <nav className={`nav${scrolled ? ' scrolled' : ''}`}>
        <a href="/"><img src={logo} alt="Touch Grass Music Fest" className="nav-logo" /></a>
        <ul className="nav-links">
          <li><a href="/#lineup">Lineup</a></li>
          <li><a href="/tickets">Tickets</a></li>
          <li><a href="/about">About</a></li>
          <li><a href="/partners" className="nav-cta nav-active-cta">Sponsorship Inquiries</a></li>
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
      <section className="pt-hero">
        <div className="pt-hero-glow" />
        <div className={`pt-hero-content${heroVisible ? ' pt-hero-visible' : ''}`}>
          <p className="pt-hero-eyebrow">Work With Us</p>
          <h1 className="pt-hero-headline">Sponsorship<br/><span className="pt-lime">Inquiries</span></h1>
          <p className="pt-hero-sub">Oct. 3, 2026 · Orlando Amphitheater · Orlando, FL</p>
        </div>
      </section>

      {/* FORM SECTION */}
      <section className="pt-form-section">
        <div className="pt-form-inner">

          {submitted ? (
            <div className="pt-success">
              <div className="pt-success-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              </div>
              <h2 className="pt-success-title">Inquiry Received</h2>
              <p className="pt-success-body">Thank you for reaching out. We'll review your inquiry and get back to you within one business day.</p>
              <a href="/" className="pt-success-back">Back to Home</a>
            </div>
          ) : (
            <>
              <div className="pt-form-header">
                <p className="pt-form-eyebrow">Let's Connect</p>
                <h2 className="pt-form-title">Tell Us About Your Brand</h2>
                <p className="pt-form-sub">Fill out the form below and a member of our team will be in touch shortly.</p>
              </div>

              <form className="pt-form" onSubmit={handleSubmit} noValidate>
                <div className="pt-form-row">
                  <div className="pt-field">
                    <label className="pt-label">First Name <span className="pt-req">*</span></label>
                    <input
                      className="pt-input"
                      type="text"
                      placeholder="First name"
                      value={firstName}
                      onChange={e => setFirstName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="pt-field">
                    <label className="pt-label">Last Name <span className="pt-req">*</span></label>
                    <input
                      className="pt-input"
                      type="text"
                      placeholder="Last name"
                      value={lastName}
                      onChange={e => setLastName(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="pt-field">
                  <label className="pt-label">Company</label>
                  <input
                    className="pt-input"
                    type="text"
                    placeholder="Company or brand name"
                    value={company}
                    onChange={e => setCompany(e.target.value)}
                  />
                </div>

                <div className="pt-field">
                  <label className="pt-label">Email <span className="pt-req">*</span></label>
                  <input
                    className="pt-input"
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="pt-field">
                  <label className="pt-label">Phone</label>
                  <input
                    className="pt-input"
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                  />
                </div>

                <div className="pt-field">
                  <label className="pt-label">How would you like to partner with Touch Grass Music Fest? <span className="pt-req">*</span></label>
                  <textarea
                    className="pt-input pt-textarea"
                    placeholder="Tell us about your partnership goals, budget range, or any specific activations you have in mind..."
                    value={interest}
                    onChange={e => setInterest(e.target.value)}
                    rows={5}
                    required
                  />
                </div>

                <button type="submit" className="pt-submit">
                  Submit Inquiry
                </button>
              </form>
            </>
          )}
        </div>
      </section>

      <Footer />
    </>
  );
}
