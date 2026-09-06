# Kingsway Global Steel Enterprise (KGS) — one-page site

Industrial one-pager for KGS, a Lagos supplier of construction, industrial and oil field steel materials.

Zero build step: plain HTML, CSS and vanilla JS. Fonts load from Google Fonts; everything else is self-contained.

## Structure

```
index.html      page content
css/style.css   all styling (dark steel theme, animations, responsive rules)
js/main.js      nav, scroll reveal, counters, hero parallax, form success state
favicon.svg     tab icon
images/         drop real photos here (see "Adding photos")
netlify.toml    Netlify publish settings + cache headers
```

## Run locally

Any static server works:

```bash
python3 -m http.server 5173
```

Then open http://localhost:5173.

## Deploy to Netlify

Option A — Git deploy (recommended): push this repo to GitHub, then in Netlify choose
**Add new site → Import an existing project**. The `netlify.toml` already sets the publish
directory to the repo root with no build command, so accept the defaults and deploy.

Option B — Drag and drop: zip or drag the whole folder onto https://app.netlify.com/drop.

After the first deploy, update the two `kingswayglobalsteel.netlify.app` URLs in `index.html`
(canonical link and JSON-LD) to the real site URL or custom domain.

## Quote form

The "Request a Quote" form uses [Netlify Forms](https://docs.netlify.com/forms/setup/).
It works automatically on Netlify with no extra setup. Submissions appear under
**Site → Forms** in the Netlify dashboard, and you can add email notifications there
so KGS gets each request in their inbox. A honeypot field is included for spam filtering.

On a plain local server the form will 404 on submit; that is expected.

## Editing content

- Phone number and WhatsApp links: search `2347037544971` in `index.html`.
- Address and map link: search `Alhaji Jimoh` in `index.html`.
- Products, services and "Why KGS" copy are plain HTML in their sections.
- Brand colours live at the top of `css/style.css` under `:root`.

## Adding photos

The site currently uses illustrated SVG icons and CSS textures instead of stock imagery.
To add real yard/product photos, put them in `images/` and, for example, set a background on
the hero or add an `<img>` inside each product card. Also add an `images/og.jpg`
(1200×630) for link previews on WhatsApp and social media; `index.html` already references it.
