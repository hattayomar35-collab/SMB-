// The one source of truth for SMB language and text direction. This classic
// script runs before paint; app.js and future components use this same API.
(() => {
  const supported = new Set(['en', 'fr', 'ar']);
  const readSaved = () => {
    try {
      const value = localStorage.getItem('smb-language') || localStorage.getItem('smb-lang');
      return supported.has(value) ? value : 'en';
    } catch {
      return 'en';
    }
  };
  let language = readSaved();
  let translate = key => key;
  let localize = () => {};

  const apply = () => {
    const root = document.documentElement;
    root.lang = language;
    root.dir = language === 'ar' ? 'rtl' : 'ltr';
    root.dataset.language = language;
    root.dataset.direction = language === 'ar' ? 'rtl' : 'ltr';
    const selector = document.querySelector('#language');
    if (selector) selector.value = language;
  };

  window.SMBLanguage = Object.freeze({
    get language() { return language; },
    get direction() { return language === 'ar' ? 'rtl' : 'ltr'; },
    get isRTL() { return language === 'ar'; },
    t(key) { return translate(key); },
    configure(options = {}) {
      if (typeof options.translate === 'function') translate = options.translate;
      if (typeof options.localize === 'function') localize = options.localize;
    },
    apply,
    localize(root = document.body) { localize(root); },
    setLanguage(next) {
      language = supported.has(next) ? next : 'en';
      try { localStorage.setItem('smb-language', language); } catch {}
      apply();
      window.dispatchEvent(new CustomEvent('smb:languagechange', {
        detail: { language, direction: language === 'ar' ? 'rtl' : 'ltr' }
      }));
      return language;
    }
  });

  apply();
})();
