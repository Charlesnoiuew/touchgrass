import { useEffect, useState } from 'react';

declare global {
  interface Window {
    HIVE_SDK: (action: string, ...args: unknown[]) => void;
    onFormSubmitSuccess: () => void;
  }
}

function isSuppressed(): boolean {
  const v = localStorage.getItem('tgmf_popup_suppressed');
  if (!v) return false;
  if (v === 'subscribed') return true;
  const expiry = Number(v);
  if (expiry && Date.now() < expiry) return true;
  localStorage.removeItem('tgmf_popup_suppressed');
  return false;
}

export default function HivePopup() {
  const [show, setShow] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (isSuppressed()) return;
    const timer = setTimeout(() => setShow(true), 10000);
    return () => clearTimeout(timer);
  }, []);

  function close() {
    setShow(false);
    if (!submitted) {
      const expiry = Date.now() + 3 * 24 * 60 * 60 * 1000;
      localStorage.setItem('tgmf_popup_suppressed', String(expiry));
    }
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const email = (form.querySelector('input[name="email"]') as HTMLInputElement)?.value;
    const fname = (form.querySelector('input[name="fname"]') as HTMLInputElement)?.value;
    const lname = (form.querySelector('input[name="lname"]') as HTMLInputElement)?.value;
    if (!email) return;

    // Submit to Hive via their API endpoint
    fetch('https://app.hive.co/api/signup_widget/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        swid: 14705,
        email,
        first_name: fname,
        last_name: lname,
        segment: 'Popup Form - Homepage',
      }),
    }).catch(() => {});

    setSubmitted(true);
    localStorage.setItem('tgmf_popup_suppressed', 'subscribed');
  }

  if (!show) return null;

  return (
    <>
      <style>{`
        .tg-overlay {
          position: fixed;
          inset: 0;
          z-index: 999999;
          background: rgba(0,0,0,0.8);
          backdrop-filter: blur(6px);
          -webkit-backdrop-filter: blur(6px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          animation: tg-fade-in .25s ease;
        }
        @keyframes tg-fade-in { from { opacity: 0 } to { opacity: 1 } }
        @keyframes tg-slide-up { from { opacity: 0; transform: translateY(28px) } to { opacity: 1; transform: translateY(0) } }
        .tg-modal {
          position: relative;
          width: 100%;
          max-width: 460px;
          background: #0a0d0a;
          border: 1px solid rgba(170,255,0,0.2);
          border-radius: 16px;
          padding: 40px 36px 36px;
          box-shadow: 0 0 60px rgba(170,255,0,0.08), 0 24px 80px rgba(0,0,0,0.8);
          animation: tg-slide-up .3s cubic-bezier(.22,1,.36,1);
        }
        .tg-close {
          position: absolute;
          top: 14px; right: 14px;
          width: 34px; height: 34px;
          border-radius: 50%;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.1);
          color: rgba(255,255,255,0.5);
          font-size: 18px;
          cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          transition: background .15s, color .15s, border-color .15s;
          line-height: 1;
        }
        .tg-close:hover { background: rgba(170,255,0,0.1); border-color: rgba(170,255,0,0.3); color: #aaff00; }
        .tg-eyebrow {
          font-size: .5rem; font-weight: 900; letter-spacing: .42em;
          text-transform: uppercase; color: rgba(170,255,0,0.7);
          margin-bottom: 8px; font-family: 'Barlow', sans-serif;
        }
        .tg-headline {
          font-family: 'Barlow Condensed', sans-serif; font-weight: 900;
          font-size: clamp(2rem,7vw,2.8rem); text-transform: uppercase;
          line-height: .9; letter-spacing: -.02em; color: #fff; margin-bottom: 8px;
        }
        .tg-headline span { color: #aaff00; text-shadow: 0 0 28px rgba(170,255,0,0.45); }
        .tg-sub {
          font-size: .78rem; color: rgba(255,255,255,0.38); line-height: 1.6;
          margin-bottom: 24px; font-family: 'Barlow', sans-serif;
        }
        .tg-divider { height: 1px; background: rgba(255,255,255,0.07); margin-bottom: 22px; }
        .tg-form { display: flex; flex-direction: column; gap: 12px; }
        .tg-label {
          font-size: .52rem; font-weight: 700; letter-spacing: .18em;
          text-transform: uppercase; color: rgba(255,255,255,0.38);
          margin-bottom: 4px; display: block; font-family: 'Barlow', sans-serif;
        }
        .tg-input {
          width: 100%; background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1); border-radius: 8px;
          padding: 12px 14px; font-size: .92rem; color: #fff;
          outline: none; font-family: 'Barlow', sans-serif;
          transition: border-color .2s, box-shadow .2s; box-sizing: border-box;
        }
        .tg-input::placeholder { color: rgba(255,255,255,0.2); }
        .tg-input:focus { border-color: #aaff00; box-shadow: 0 0 0 3px rgba(170,255,0,0.12); }
        .tg-submit {
          width: 100%; background: #aaff00; color: #000;
          font-family: 'Barlow Condensed', sans-serif; font-weight: 900;
          font-size: 1rem; letter-spacing: .12em; text-transform: uppercase;
          padding: 14px 24px; border-radius: 8px; border: none; cursor: pointer;
          transition: opacity .2s, transform .15s; margin-top: 4px;
          box-shadow: 0 0 28px rgba(170,255,0,0.2);
        }
        .tg-submit:hover { opacity: .88; transform: translateY(-2px); }
        .tg-success-title {
          font-family: 'Barlow Condensed', sans-serif; font-weight: 900;
          font-size: clamp(1.8rem,5vw,2.4rem); text-transform: uppercase;
          color: #aaff00; text-shadow: 0 0 24px rgba(170,255,0,0.4);
          margin-bottom: 10px;
        }
        .tg-success-body {
          font-size: .88rem; color: rgba(255,255,255,0.45); line-height: 1.65;
          font-family: 'Barlow', sans-serif;
        }
        @media (max-width: 480px) {
          .tg-modal { padding: 32px 20px 28px; }
        }
      `}</style>

      <div className="tg-overlay" onClick={(e) => { if (e.target === e.currentTarget) close(); }}>
        <div className="tg-modal" role="dialog" aria-modal="true" aria-label="Stay in the loop">
          <button className="tg-close" onClick={close} aria-label="Close">&times;</button>

          {submitted ? (
            <>
              <p className="tg-eyebrow">See you there</p>
              <h2 className="tg-success-title">You're In!</h2>
              <p className="tg-success-body">You're one step closer to touching grass — see you Oct. 3rd in Orlando.</p>
            </>
          ) : (
            <>
              <p className="tg-eyebrow">Stay in the loop</p>
              <h2 className="tg-headline">Touch Grass<br /><span>Is Coming</span></h2>
              <p className="tg-sub">Be the first to know about ticket drops, performer announcements, and festival updates.</p>
              <div className="tg-divider" />
              <form className="tg-form" onSubmit={handleSubmit}>
                <div>
                  <label className="tg-label" htmlFor="popup-email">Email *</label>
                  <input className="tg-input" id="popup-email" name="email" type="email" placeholder="your@email.com" autoComplete="email" required />
                </div>
                <div>
                  <label className="tg-label" htmlFor="popup-fname">First Name</label>
                  <input className="tg-input" id="popup-fname" name="fname" type="text" placeholder="First name" autoComplete="given-name" />
                </div>
                <div>
                  <label className="tg-label" htmlFor="popup-lname">Last Name</label>
                  <input className="tg-input" id="popup-lname" name="lname" type="text" placeholder="Last name" autoComplete="family-name" />
                </div>
                <button className="tg-submit" type="submit">Subscribe</button>
              </form>
            </>
          )}
        </div>
      </div>
    </>
  );
}
