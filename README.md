# Donnie Avant — Portfolio

Personal portfolio and resume site for **Donnie Avant**, an IT support and network engineering professional with a Full-Stack Web Development certificate and 8+ years of technical, quality, and client-facing experience.

**Live site:** [dnnavant.github.io/Portfolio_Donnie](https://dnnavant.github.io/Portfolio_Donnie/)

![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)
![GitHub Pages](https://img.shields.io/badge/Hosted%20on-GitHub%20Pages-222?logo=github)

---

## About

This site is a single-page portfolio built from scratch with plain HTML, CSS, and JavaScript. It has no frameworks, no dependencies, and no build step. It covers my background, technical skills, education and experience, and a way to get in touch.

## Features

- **Responsive design** that works on phones, tablets, and desktops
- **Bilingual (English / German)**: a language toggle that remembers the visitor's choice. You can link straight to the German version with `?lang=de`
- **Light and dark mode**: follows the device setting by default, with a manual toggle
- **Contact form** powered by [Formspree](https://formspree.io), so no email address is exposed on the page
- **Accessible, progressive enhancement**: all content stays visible if JavaScript is disabled
- **Privacy-friendly**: no cookies, analytics, or tracking
- **GDPR-compliant legal pages**: an Impressum (legal notice) and a privacy policy (Datenschutzerklärung)
- **Security contact** published at [`/.well-known/security.txt`](.well-known/security.txt) (RFC 9116)

## Tech Stack

| Area        | Tools                                         |
|-------------|-----------------------------------------------|
| Markup      | Semantic HTML5                                |
| Styling     | CSS3 (custom properties, Flexbox, Grid)       |
| Scripting   | Vanilla JavaScript (ES6+)                     |
| Fonts       | Inter and JetBrains Mono via Google Fonts     |
| Forms       | Formspree                                     |
| Hosting     | GitHub Pages                                  |

## Project Structure

```
Portfolio_Donnie/
├── index.html            # Main page
├── imprint.html          # Legal notice (Impressum)
├── privacy.html          # Privacy policy (Datenschutzerklärung)
├── css/
│   └── style.css         # All styling, including light/dark themes
├── js/
│   ├── script.js         # Navigation, theme toggle, language switch, scroll effects
│   └── i18n-de.js        # German translations
├── assets/
│   └── images/           # Profile photo and logo
└── .well-known/
    └── security.txt      # Security contact
```

## Running Locally

No installation is needed. Clone the repository and open `index.html` in a browser:

```bash
git clone https://github.com/Dnnavant/Portfolio_Donnie.git
cd Portfolio_Donnie
open index.html
```

Or serve it with a local web server:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Contact

- **LinkedIn:** [linkedin.com/in/donnie-r-avant](https://www.linkedin.com/in/donnie-r-avant)
- **GitHub:** [github.com/Dnnavant](https://github.com/Dnnavant)
- **Email:** use the contact form on the [live site](https://dnnavant.github.io/Portfolio_Donnie/#contact)

---

© Donnie Avant. All rights reserved. The code is shared for viewing. Please don't reuse the personal content, images, or branding.
