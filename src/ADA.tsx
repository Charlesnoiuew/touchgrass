import { useState, useEffect } from 'react';
import logo from './assets/logo.png';
import Footer from './Footer';

type Section = { title: string; body: React.ReactNode };

const sections: Section[] = [
  {
    title: 'Wheelchair Accessibility',
    body: (
      <>
        <p>The venue is navigable for patrons with mobility disabilities. The event is held on mainly grass with some asphalt. There are accessible routes connected throughout the venue including parking, entrances, stages, accessible viewing areas, vendors, and all other activity areas.</p>
        <p>Attendees must navigate the festival grounds between stages on their own or with the support of a companion, as the festival does not offer transportation between stages.</p>
        <p>We encourage all patrons with mobility disabilities to utilize personal forms of transportation, including wheelchairs and scooters. Patrons are also permitted to bring crutches, walkers, and canes into the event. If you need to recharge your motorized mobility device, you may do so at the Accessibility Services Hub. Patrons should bring all cords and accessories needed to charge their devices. Chargers must use a 110-volt, 20 amp circuit.</p>
        <p className="ada-note">We will not be providing wheelchair or scooter rentals.</p>
      </>
    ),
  },
  {
    title: 'Accessible Parking',
    body: (
      <>
        <p>There will be a limited number of accessible parking spots for patrons with disabilities onsite, available on a first come, first served basis. Parking is not available for purchase ahead of the event. You are required to bring a valid, state-issued handicap placard, permit, or license plate to enter this parking lot. The person to whom the handicap credential is issued must be present in the vehicle, as a driver or passenger.</p>
        <p className="ada-note">It is against the law to park in an accessible parking space without the required credentials or to fraudulently use credentials in order to gain access to Accessible Parking.</p>
      </>
    ),
  },
  {
    title: 'Directions',
    body: <p className="ada-pending">Please check back 30 days prior to the event for updates.</p>,
  },
  {
    title: 'Rideshare',
    body: <p className="ada-pending">Please check back 30 days prior to the event for updates.</p>,
  },
  {
    title: 'Accessible Entry',
    body: (
      <p>There will be an Accessible entrance, located at the Main Entrance. Guests with disabilities may use this entrance to safely enter the venue. After using Accessible entry, please visit Accessibility Services immediately after so that you can keep using accessible entry for the following show days.</p>
    ),
  },
  {
    title: 'Accessibility Services Hub',
    body: (
      <>
        <p className="ada-callout">You must stop here to get your Accessibility Wristband. This wristband is free of charge and will grant you access to the accessibility services required on account of a disability or injury. There is no pre-registration before the event — this is all done onsite.</p>
        <p>Accessibility Services is conveniently located inside the Main Entrance. The exact location of this hub will be labeled on the event map when it is released. At this location, you can:</p>
        <ul className="ada-list">
          <li>Request accommodations and services you require.</li>
          <li>Get your accessibility questions answered.</li>
          <li>Get your Accessibility Wristband.</li>
        </ul>
        <div className="ada-sub-block">
          <p className="ada-sub-title">Wristband Policies</p>
          <ul className="ada-list">
            <li>Accessibility Wristbands are good for the entire duration of the event.</li>
            <li>DO NOT remove your wristband at any point during the event.</li>
            <li>Patrons may request a wristband for one companion if needed (exceptions will be made for families with young children).</li>
            <li>If a disabled guest wants to switch their companion, please bring the old companion wristband to the Accessibility Services Hub to be reissued.</li>
          </ul>
        </div>
      </>
    ),
  },
  {
    title: 'Accessible Viewing Areas',
    body: (
      <>
        <p>There will be accessible viewing areas made available to disabled guests at designated stages. For more information on how to gain access to these areas, please visit us at the Accessibility Services Hub located to the left once you enter the festival.</p>
        <div className="ada-sub-block">
          <p className="ada-sub-title">Accessible Viewing Area Policies</p>
          <ul className="ada-list">
            <li>Seating is available on a first come, first served basis.</li>
            <li>Companions may be asked to stand in the back if the viewing area reaches capacity.</li>
            <li>Guests may not save spots.</li>
            <li>Blocking the view of the guests sitting behind you is not permitted.</li>
            <li>Standing is permitted only in the very back row.</li>
            <li>Patrons and companions may not smoke in these areas.</li>
          </ul>
        </div>
      </>
    ),
  },
  {
    title: 'Service Animals',
    body: (
      <>
        <p>Service animals are permitted throughout the venue. However, emotional support animals, therapy animals, companion animals, and pets are not permitted into the event. Any animal whose task is to provide protection, emotional support, well-being, comfort, or companionship is not considered a service animal and will not be allowed into the venue. Only service animals that have been individually trained and are under the proper care of their owners will be allowed within the premises.</p>
        <p className="ada-sub-title" style={{marginTop:'1.5rem'}}>The following guidelines must be followed:</p>
        <ul className="ada-list">
          <li>All service animals must be verified by the ADA Coordinator or Manager before entering the event venue.</li>
          <li>Once verified, service animal handlers are required to fill out a Service Animal Agreement before proceeding into the event grounds. Once signed, service animals will receive a service animal wristband or tag to indicate verification.</li>
          <li>Service animals must remain by the handler's side at all times and must be harnessed, leashed, or tethered. If these devices interfere with the service animal's work or if the handler's disability prevents the use of these devices, the handler must maintain control of the animal through voice, signal, or other effective controls.</li>
          <li>Service animals must be housebroken and should use the service animal relief area.</li>
          <li>Anyone bringing an animal will be responsible for and liable for any damage or injury caused by the animal.</li>
          <li>All service animals should have legally required vaccinations. The ADA Coordinator or Manager may ask for proof of vaccination during the verification process.</li>
          <li>All service animals must receive a service animal credential at an Accessibility Services Hub in order to enter the venue.</li>
        </ul>
        <p className="ada-note" style={{marginTop:'1.25rem'}}>We ask that you do not leave your animal in your car while attending the event, as vehicles without active air conditioning may become too hot and unsafe for any animal.</p>
      </>
    ),
  },
  {
    title: 'Effective Communication Requests',
    body: (
      <>
        <p>We accept requests for any of the following services:</p>
        <ul className="ada-list">
          <li>ASL Interpretation</li>
          <li>Other forms of Effective Communication (such as: large format print/braille literature, guided tours for guests with visual disabilities, assistive listening devices, or any other accommodation not listed)</li>
        </ul>
        <p>Requests for these services must be submitted to us at least 30 days prior to the event to allow for sufficient preparation. The deadline for this event is <strong>September 3, 2026</strong>. To submit a request, please email <a href="mailto:ada@touchgrassmusicfest.com" className="ada-link">Ada@touchgrassmusicfest.com</a>.</p>
      </>
    ),
  },
  {
    title: 'Additional Services',
    body: (
      <>
        <p><strong>First Aid:</strong> We have several First Aid locations throughout the venue, noted on the event map and mobile app, if available. Professional medical staff can provide assistance to your medical needs at these locations.</p>
        <p><strong>Special Dietary Needs:</strong> The event will have food vendors that provide gluten-free dietary options. For those with special dietary needs beyond what will be offered at the event, please contact us at <a href="mailto:ada@touchgrassmusicfest.com" className="ada-link">Ada@touchgrassmusicfest.com</a>.</p>
        <p><strong>Prescription Medications:</strong> All prescription medications must be in the original manufacturer container with your name on it, which matches your government-issued photo ID. Please only bring a sufficient amount of medication for the duration of the event. Your medications must be cleared by the medical team at the event entrance.</p>
      </>
    ),
  },
];

export default function ADA() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState<number | null>(null);

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
      <section className="ada-hero">
        <div className="ada-hero-glow" />
        <div className="ada-hero-content">
          <p className="ada-hero-eyebrow">Official Touch Grass 2026</p>
          <h1 className="ada-hero-headline">Accessibility<br/><span className="ada-lime">Guide</span></h1>
          <p className="ada-hero-date">Updated March 31, 2026</p>
          <p className="ada-hero-sub">Touch Grass is an accessible event. We are dedicated to continually improving our efforts to ensure you have access to all event amenities.</p>
          <a href="mailto:ada@touchgrassmusicfest.com" className="ada-hero-contact">Questions? Email Ada@touchgrassmusicfest.com</a>
        </div>
      </section>

      {/* ACCORDION SECTIONS */}
      <section className="ada-body">
        <div className="ada-body-inner">
          {sections.map((sec, i) => {
            const isOpen = open === i;
            return (
              <div key={sec.title} className={`ada-section reveal${isOpen ? ' ada-section-open' : ''}`}>
                <button className="ada-section-header" onClick={() => setOpen(isOpen ? null : i)}>
                  <span className="ada-section-num">{String(i + 1).padStart(2, '0')}</span>
                  <span className="ada-section-title">{sec.title}</span>
                  <svg className="ada-section-chevron" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="6 9 12 15 18 9"/>
                  </svg>
                </button>
                <div className="ada-section-body">
                  <div className="ada-section-body-inner">{sec.body}</div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* CONTACT STRIP */}
      <section className="ada-contact-strip">
        <div className="ada-contact-inner">
          <h2 className="ada-contact-title">Comments, Questions & Suggestions</h2>
          <p className="ada-contact-body">Touch Grass will consider requests by patrons with disabilities for reasonable modification of event policies, practices or procedures, or for auxiliary aids and services. We encourage you to make any such request as far in advance as possible.</p>
          <a href="mailto:ada@touchgrassmusicfest.com" className="ada-contact-btn">Ada@touchgrassmusicfest.com</a>
          <p className="ada-contact-footer">We hope you find this guide informative. We look forward to seeing you at Touch Grass!</p>
        </div>
      </section>

      <Footer />
    </>
  );
}
