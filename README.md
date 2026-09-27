# Donnie Avant — Portfolio Site

A simple, single-page portfolio/resume site built with plain HTML, CSS, and
JavaScript (no frameworks, no build step) — ready to host for free on GitHub
Pages.

## What's in here

```
donnie-portfolio/
├── index.html        # all page content
├── css/style.css      # all styling
├── js/script.js        # mobile nav + scroll animations
├── assets/            # put your resume PDF and project images here
└── README.md
```

## 1. Things to edit before you publish

Search the files for `EDIT` and `[edit: ...]` — those are placeholders. In order of priority:

- [x] **Profile photo** — lives at `assets/images/profile_image.jpg`. Replace
      that file to change it. If it's missing, the site shows your initials ("DA").
- [x] **Logo** — `assets/images/DA_WebDev_Logo_nav.png` (a small cropped
      copy of `DA_WebDev_Logo.png`), shown in a circle at the top left.
- [ ] **Technical Skills** (`index.html`, Skills section) — filled in with
      common IT keywords. Remove anything you can't discuss confidently in an
      interview, and update "Currently Learning" as you go.
- [ ] **Projects** (`index.html`, Projects section) — **hidden for now.**
      Once you have a real project, follow the steps in the comment above
      the Projects section to show it again.
- [ ] **LinkedIn** — already linked to your real profile
      (linkedin.com/in/donnie-r-avant). Double check it's current.
- [x] **GitHub** — linked to github.com/Dnnavant.
- [ ] **Resume PDF (optional)** — save it as `assets/resume.pdf`. The
      "Download Resume" button appears automatically on the live site.
- [ ] **Phone number (optional)** — not included on the site by default for
      privacy. Add it to the Contact section yourself if you want it public.

## Contact form setup (Formspree)

The contact form emails messages to you through [Formspree](https://formspree.io),
so your email address never appears on the site. One-time setup:

1. Sign up at formspree.io with the email address you want messages sent to.
2. Create a new form (e.g. "Portfolio contact").
3. Copy the form's ID, the part after `/f/` in its endpoint URL
   (e.g. `https://formspree.io/f/abcdwxyz` → `abcdwxyz`).
4. In `index.html`, replace `YOUR_FORM_ID` in the contact form's `action`
   URL with that ID.
5. Publish, then send yourself a test message from the live site.

✅ Done: the form is connected to `https://formspree.io/f/mdekpwng`.
Every message also appears in your Formspree dashboard.

## Legal pages & security

- **`imprint.html` (Impressum / Legal Notice):** required in Germany (§ 5 DDG).
  Lists your name only, with contact through the contact form.
- **`privacy.html` (Datenschutzerklärung / Privacy Policy):** describes exactly
  what this site does: GitHub Pages hosting, the Formspree contact form,
  Google Fonts, no cookies or tracking. If you add a new service
  (analytics, embedded videos, maps...), update this page.
- **Fonts** load from Google Fonts; this is disclosed in the privacy policy
  (section 5).
- **`.well-known/security.txt`** tells people how to report a security issue.
  Update its URLs if your site address isn't `https://dnnavant.github.io/`,
  and renew the `Expires` date each year.
- **`.nojekyll`** makes GitHub Pages publish the `.well-known` folder.

These pages are templates, not legal advice.

## German version & dark mode

- **German:** the **DE / EN** button in the nav switches languages, and the
  site remembers the visitor's choice. To send someone the German version
  directly, add `?lang=de` to the link, e.g. `https://YOUR-SITE/?lang=de`.
- **Editing text:** English text is in `index.html`. The German text is in
  `js/i18n-de.js`, matched by the `data-i18n="..."` key on each element.
  When you change English text, update the German entry with the same key.
  New text without a `data-i18n` key simply stays in English.
- **Dark mode:** the moon/sun button switches themes. Until a visitor
  clicks it, the site follows their device's light/dark setting.

## 2. Preview it locally (optional)

Just open `index.html` in a browser — everything is self-contained, no
server needed. Or, if you have Python installed:

```bash
cd donnie-portfolio
python3 -m http.server 8000
# then open http://localhost:8000
```

## 3. Publish to GitHub Pages

1. Create a new repository on GitHub (public). A good name is
   `donnie-portfolio` or `<your-username>.github.io` if you want it as
   your main GitHub profile site.
2. Push these files to the repo:
   ```bash
   cd donnie-portfolio
   git init
   git add .
   git commit -m "Initial portfolio site"
   git branch -M main
   git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO.git
   git push -u origin main
   ```
3. On GitHub: go to your repo → **Settings** → **Pages**.
4. Under "Build and deployment", set **Source** to `Deploy from a branch`,
   branch `main`, folder `/ (root)`. Save.
5. GitHub will give you a live URL after a minute or two, usually:
   - `https://YOUR-USERNAME.github.io/YOUR-REPO/` (normal repo), or
   - `https://YOUR-USERNAME.github.io/` (if the repo is named
     `YOUR-USERNAME.github.io`)
6. Share that link with companies — it updates automatically every time
   you push new commits.

## 4. Updating the site later

Edit any file, then:

```bash
git add .
git commit -m "Update projects"
git push
```

GitHub Pages rebuilds automatically within a minute or two.
