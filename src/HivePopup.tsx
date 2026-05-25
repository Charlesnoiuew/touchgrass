export default function HivePopup() {
  return (
    <div
      className="hive-popup-background"
      data-HIVE-POPUP-FORM-ID="77b57e4ad10742f"
      data-HIVE-POPUP-SHOW-AFTER-SECS="10"
    >
      <div className="hive-popup-modal">
        <a
          className="hive-popup-close-button"
          onClick={() => (window as any).HIVE_SDK?.('closePopupForm', '77b57e4ad10742f')}
          href="#"
        >
          &times;
        </a>
        <form
          className="hive-signup-form"
          onSubmit={(e) => { e.preventDefault(); (window as any).HIVE_SDK?.('submitSignupForm', e.currentTarget, (window as any).onFormSubmitSuccess); }}
        >
          <h2>Subscribe to our mailing list!</h2>
          <input data-HIVE-FORM-FIELD="swid" type="hidden" value="14705" />

          <label htmlFor="_HIVE-email-14705">Email</label>
          <input data-HIVE-FORM-FIELD="email" id="_HIVE-email-14705" name="email" type="email" placeholder="Enter an email..." autoComplete="email" required />

          <label htmlFor="_HIVE-firstName-14705">First Name</label>
          <input data-HIVE-FORM-FIELD="firstName" id="_HIVE-firstName-14705" name="fname" type="text" placeholder="Enter a first name..." autoComplete="given-name" />

          <label htmlFor="_HIVE-lastName-14705">Last Name</label>
          <input data-HIVE-FORM-FIELD="lastName" id="_HIVE-lastName-14705" name="lname" type="text" placeholder="Enter a last name..." autoComplete="family-name" />

          <input data-HIVE-FORM-FIELD="addToSegment" type="hidden" value="Popup Form - Homepage" />

          <div style={{ position: 'absolute', left: '-5000px' }} aria-hidden="true">
            <input type="text" data-HIVE-FORM-FIELD="areUReal" tabIndex={-1} defaultValue="" />
          </div>

          <div data-HIVE-FORM-FIELD="successMessage" style={{ display: 'none' }}>
            <h2>Thanks for joining our mailing list!</h2>
            <p>You're one step closer to touching grass - thanks!</p>
          </div>

          <button type="submit" data-HIVE-FORM-FIELD="submitButton">Subscribe</button>
        </form>
      </div>
    </div>
  );
}
