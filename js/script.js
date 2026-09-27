// ==========================================================================
// Donnie Avant — Portfolio Site
// Small progressive-enhancement script: mobile nav, footer year, scroll reveal.
// ==========================================================================

// Mark JS as active. CSS only hides .reveal elements when this class is
// present, so if this script fails to load or run, all content stays
// visible by default (see css/style.css).
document.documentElement.classList.add('js');

// localStorage can be unavailable (private mode, blocked storage) — never let
// that break the page.
const storage = {
  get(key) {
    try { return localStorage.getItem(key); } catch (e) { return null; }
  },
  set(key, value) {
    try { localStorage.setItem(key, value); } catch (e) { /* ignore */ }
  },
};

document.addEventListener('DOMContentLoaded', () => {
  // Footer year
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Current page language ('en' or 'de'); set by setLanguage() below
  let currentLang = 'en';

  // ------------------------------------------------------------------
  // Light / dark mode
  // Follows the device setting until the visitor picks one; the choice is
  // remembered (and applied before paint by the small script in <head>).
  // ------------------------------------------------------------------
  const themeToggle = document.getElementById('themeToggle');
  const systemDark = window.matchMedia('(prefers-color-scheme: dark)');
  const effectiveTheme = () =>
    document.documentElement.getAttribute('data-theme') || (systemDark.matches ? 'dark' : 'light');

  function updateThemeButton() {
    if (!themeToggle) return;
    const isDark = effectiveTheme() === 'dark';
    themeToggle.classList.toggle('is-dark', isDark);
    const labels = currentLang === 'de'
      ? ['Zum hellen Modus wechseln', 'Zum dunklen Modus wechseln']
      : ['Switch to light mode', 'Switch to dark mode'];
    themeToggle.setAttribute('aria-label', isDark ? labels[0] : labels[1]);
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const next = effectiveTheme() === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      storage.set('theme', next);
      updateThemeButton();
    });
    systemDark.addEventListener('change', updateThemeButton);
    updateThemeButton();
  }

  // ------------------------------------------------------------------
  // Language (English / German)
  // English text lives in index.html; German text lives in js/i18n-de.js,
  // matched by each element's data-i18n key. A ?lang=de (or ?lang=en) link
  // opens the site in that language; otherwise the visitor's last choice
  // is remembered.
  // ------------------------------------------------------------------
  const de = window.I18N_DE || {};
  const langToggle = document.getElementById('langToggle');
  const metaDescription = document.querySelector('meta[name="description"]');
  const english = {
    title: document.title,
    description: metaDescription ? metaDescription.content : '',
  };

  // Swap each tagged element (or attribute) between its original English
  // value and the German one. The English value is saved on first use.
  const translate = (attr, read, write) => {
    document.querySelectorAll(`[${attr}]`).forEach((el) => {
      const key = el.getAttribute(attr);
      if (el.dataset.en === undefined) el.dataset.en = read(el);
      write(el, currentLang === 'de' && de[key] !== undefined ? de[key] : el.dataset.en);
    });
  };

  const setLanguage = (lang) => {
    currentLang = lang === 'de' ? 'de' : 'en';
    document.documentElement.lang = currentLang;

    translate('data-i18n', (el) => el.innerHTML, (el, v) => { el.innerHTML = v; });
    translate('data-i18n-aria', (el) => el.getAttribute('aria-label'), (el, v) => el.setAttribute('aria-label', v));
    translate('data-i18n-alt', (el) => el.getAttribute('alt'), (el, v) => el.setAttribute('alt', v));

    // Long texts (privacy policy, legal notice) are written out in both
    // languages as separate blocks: <div data-lang="en"> / <div data-lang="de">
    document.querySelectorAll('[data-lang]').forEach((block) => {
      block.hidden = block.getAttribute('data-lang') !== currentLang;
    });

    // Each page names its own title keys via <body data-page="...">
    const page = document.body.dataset.page || 'meta';
    const tmp = document.createElement('textarea'); // decode &amp; etc. for the tab title
    tmp.innerHTML = currentLang === 'de' && de[`${page}.title`] ? de[`${page}.title`] : english.title;
    document.title = tmp.value;
    if (metaDescription) {
      metaDescription.content = currentLang === 'de' && de[`${page}.description`]
        ? de[`${page}.description`]
        : english.description;
    }

    if (langToggle) {
      // The button always offers the *other* language
      const toGerman = currentLang === 'en';
      langToggle.textContent = toGerman ? 'DE' : 'EN';
      langToggle.lang = toGerman ? 'de' : 'en';
      langToggle.setAttribute('aria-label', toGerman ? 'Auf Deutsch anzeigen' : 'View in English');
    }
    // Keep the theme button's label in the current language too
    updateThemeButton();
  };

  const urlLang = new URLSearchParams(window.location.search).get('lang');
  setLanguage(urlLang || storage.get('lang') || 'en');

  if (langToggle) {
    langToggle.addEventListener('click', () => {
      setLanguage(currentLang === 'en' ? 'de' : 'en');
      storage.set('lang', currentLang);
    });
  }

  // Profile photo: if assets/profile.jpg hasn't been added yet, show the
  // initials placeholder instead of a broken-image icon. Once you add the
  // real file, this never fires and your photo shows as a normal image
  // (no JS required for that case).
  const profilePhoto = document.getElementById('profilePhoto');
  if (profilePhoto) {
    const markEmptyIfBroken = () => {
      // naturalWidth is 0 for a failed load, whether it failed before or
      // after this listener attached — the browser fetches images as soon
      // as it parses them, so by the time this script runs the request may
      // have already finished (or failed).
      if (profilePhoto.complete && profilePhoto.naturalWidth === 0) {
        const frame = profilePhoto.closest('.hero__photo');
        if (frame) frame.classList.add('hero__photo--empty');
      }
    };
    profilePhoto.addEventListener('error', markEmptyIfBroken);
    markEmptyIfBroken();
  }

  // Nav logo: if the logo image fails to load, show the "DA" text instead
  const navBrand = document.getElementById('navBrand');
  const navLogo = document.getElementById('navLogo');
  if (navBrand && navLogo) {
    const showTextIfBroken = () => {
      if (navLogo.complete && navLogo.naturalWidth === 0) {
        navBrand.classList.add('nav__brand--no-logo');
      }
    };
    navLogo.addEventListener('error', showTextIfBroken);
    showTextIfBroken();
  }

  // Resume button: only show it once assets/resume.pdf actually exists.
  // (This check needs a web server, so the button appears on the live site
  // or with `python3 -m http.server`, but not when opening the file directly.)
  const resumeBtn = document.getElementById('resumeBtn');
  if (resumeBtn && window.fetch && window.location.protocol !== 'file:') {
    fetch(resumeBtn.getAttribute('href'), { method: 'HEAD' })
      .then((res) => {
        if (res.ok) resumeBtn.hidden = false;
      })
      .catch(() => {});
  }

  // Mobile nav toggle
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });

    // Close mobile menu after clicking a link
    navLinks.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Timeline entries: hovering previews the details (pure CSS). Clicking an
  // entry pins its details open until the X is clicked.
  document.querySelectorAll('.tl-item').forEach((item) => {
    const head = item.querySelector('.tl-item__head');
    const close = item.querySelector('.tl-item__close');
    if (!head || !close) return;

    head.addEventListener('click', () => {
      item.classList.add('is-pinned');
      item.classList.remove('is-dismissed');
      head.setAttribute('aria-expanded', 'true');
    });

    close.addEventListener('click', () => {
      item.classList.remove('is-pinned');
      // Keep the hover preview from instantly reopening it under the mouse
      item.classList.add('is-dismissed');
      head.setAttribute('aria-expanded', 'false');
      head.focus();
    });

    item.addEventListener('mouseleave', () => item.classList.remove('is-dismissed'));
  });

  // ------------------------------------------------------------------
  // Contact form: checks the fields, then sends them to Formspree, which
  // emails them to you. Your email address never appears on the page.
  // ------------------------------------------------------------------
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    const t = (key, english) => (currentLang === 'de' && de[key]) || english;
    const status = document.getElementById('cfStatus');
    const submitBtn = contactForm.querySelector('.contact-form__submit');
    const fields = [
      {
        input: document.getElementById('cfName'),
        error: document.getElementById('cfNameError'),
        check: (v) => v.trim().length > 0,
        message: () => t('form.errName', 'Please enter your name.'),
      },
      {
        input: document.getElementById('cfEmail'),
        error: document.getElementById('cfEmailError'),
        check: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()),
        message: () => t('form.errEmail', 'Please enter a valid email address.'),
      },
      {
        input: document.getElementById('cfMessage'),
        error: document.getElementById('cfMessageError'),
        check: (v) => v.trim().length >= 20,
        message: () => t('form.errMessage', 'Please write a message (at least 20 characters).'),
      },
    ];

    const validate = (field) => {
      const ok = field.check(field.input.value);
      field.input.setAttribute('aria-invalid', ok ? 'false' : 'true');
      field.error.textContent = ok ? '' : field.message();
      return ok;
    };

    // Re-check a field as the visitor fixes it
    fields.forEach((field) => {
      field.input.addEventListener('input', () => {
        if (field.input.getAttribute('aria-invalid') === 'true') validate(field);
      });
    });

    const setStatus = (text, type) => {
      status.textContent = text;
      status.className = 'contact-form__status' + (type ? ` is-${type}` : '');
    };

    contactForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      setStatus('', '');

      const results = fields.map(validate);
      if (results.includes(false)) {
        fields[results.indexOf(false)].input.focus();
        return;
      }

      if (contactForm.action.includes('YOUR_FORM_ID')) {
        setStatus(t('form.notSetup', 'The contact form isn\'t set up yet. Please reach me on LinkedIn for now.'), 'error');
        return;
      }

      submitBtn.disabled = true;
      submitBtn.textContent = t('form.sending', 'Sending…');
      try {
        const response = await fetch(contactForm.action, {
          method: 'POST',
          body: new FormData(contactForm),
          headers: { Accept: 'application/json' },
        });
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        contactForm.reset();
        fields.forEach((field) => field.input.removeAttribute('aria-invalid'));
        setStatus(t('form.success', 'Thank you! Your message has been sent. I\'ll get back to you as soon as I can.'), 'success');
      } catch (err) {
        setStatus(t('form.error', 'Sorry, your message couldn\'t be sent. Please try again later or reach me on LinkedIn.'), 'error');
      } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = t('form.send', 'Send Message');
      }
    });
  }

  // Reveal-on-scroll for cards and sections
  const revealTargets = document.querySelectorAll(
    '.skill-card, .transfer-card, .project-card, .fact, .contact-form, .contact__social, .section__title, .about__text, .timeline'
  );

  revealTargets.forEach((el) => el.classList.add('reveal'));

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -10% 0px' }
    );

    revealTargets.forEach((el) => observer.observe(el));
  } else {
    // Fallback: just show everything if IntersectionObserver isn't supported
    revealTargets.forEach((el) => el.classList.add('is-visible'));
  }

  // Safety net: on some devices/browsers a fast swipe-scroll or an
  // unusual layout can cause the observer to miss an element. Nothing on
  // this site should be able to stay hidden forever, so reveal anything
  // still unrevealed a couple of seconds after load.
  window.setTimeout(() => {
    revealTargets.forEach((el) => el.classList.add('is-visible'));
  }, 2500);
});
