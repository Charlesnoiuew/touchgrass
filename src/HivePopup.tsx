import { useState, useEffect } from 'react';

const COOKIE_KEY = 'tgmf_popup_signed_up';

function getCookie(name: string) {
  return document.cookie.split('; ').some(c => c.startsWith(name + '='));
}
function setCookie(name: string, days: number) {
  const exp = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=1; expires=${exp}; path=/`;
}

declare global {
  interface Window { HIVE_SDK?: (...args: unknown[]) => void; onPopupFormSubmitSuccess?: () => void; }
}

export default function HivePopup() {
  const [visible, setVisible] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (getCookie(COOKIE_KEY)) return;
    const timer = setTimeout(() => setVisible(true), 10000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    window.onPopupFormSubmitSuccess = () => {
      setCookie(COOKIE_KEY, 365);
      setSubmitted(true);
      setTimeout(() => setVisible(false), 2500);
    };
    return () => { delete window.onPopupFormSubmitSuccess; };
  }, []);

  function close() { setVisible(false); }

  if (!visible) return null;

  return (
    <div className="popup-bg" onClick={(e) => { if (e.target === e.currentTarget) close(); }}>
      <div className="popup-modal">
        <button className="popup-close" onClick={close} aria-label="Close">&times;</button>

        {submitted ? (
          <div className="popup-success">
            <div className="popup-success-icon">✓</div>
            <h2 className="popup-success-title">You're in!</h2>
            <p className="popup-success-sub">You're one step closer to touching grass.</p>
          </div>
        ) : (
          <>
            <p className="popup-eyebrow">Stay in the Loop</p>
            <h2 className="popup-title">TOUCH GRASS<br/><span className="popup-title-lime">IS COMING</span></h2>
            <p className="popup-sub">Be the first to know about ticket drops, performer announcements, and festival updates.</p>
            <hr className="popup-divider" />

            <form
              className="hive-signup-form popup-hive-form"
              onSubmit={(e) => {
                e.preventDefault();
                if (window.HIVE_SDK) {
                  window.HIVE_SDK('submitSignupForm', e.currentTarget, window.onPopupFormSubmitSuccess);
                }
              }}
            >
              <input data-HIVE-FORM-FIELD="swid" type="hidden" value="14705" />
              <input data-HIVE-FORM-FIELD="addToSegment" type="hidden" value="Popup Form - Homepage" />
              <div style={{ position: 'absolute', left: '-5000px' }} aria-hidden="true">
                <input type="text" data-HIVE-FORM-FIELD="areUReal" tabIndex={-1} defaultValue="" />
              </div>

              <div className="popup-field">
                <label className="popup-label" htmlFor="popup-email">EMAIL</label>
                <input className="popup-input" data-HIVE-FORM-FIELD="email" id="popup-email" name="email" type="email" placeholder="you@example.com" autoComplete="email" required />
              </div>
              <div className="popup-field">
                <label className="popup-label" htmlFor="popup-fname">FIRST NAME</label>
                <input className="popup-input" data-HIVE-FORM-FIELD="firstName" id="popup-fname" name="fname" type="text" placeholder="First" autoComplete="given-name" />
              </div>
              <div className="popup-field">
                <label className="popup-label" htmlFor="popup-lname">LAST NAME</label>
                <input className="popup-input" data-HIVE-FORM-FIELD="lastName" id="popup-lname" name="lname" type="text" placeholder="Last" autoComplete="family-name" />
              </div>

              <button className="popup-btn" type="submit" data-HIVE-FORM-FIELD="submitButton">
                SUBSCRIBE
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
