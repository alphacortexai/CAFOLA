# CAFOLA site clone with custom CMS

This repository contains a **CAFOLA-branded** clone-style landing page inspired by Right at Home's structure and messaging style, plus a lightweight custom CMS.

## What is included

- `index.html`: public-facing CAFOLA site.
- `admin.html`: custom CMS UI for non-technical content editing.
- `app.js`: runtime rendering of CMS content on the public site.
- `admin.js`: CRUD operations for site content via browser `localStorage`.
- `styles.css`: shared styling for both site and CMS.

## CMS capabilities

From `admin.html`, you can:

- Edit hero content and CTA text.
- Add / edit / delete service cards.
- Add / edit / delete process steps.
- Add / edit / delete testimonials.
- Reset all data to defaults.

## How to run

Because this is a static project, open `index.html` directly in a browser, or serve locally:

```bash
python3 -m http.server 8080
```

Then visit:

- Site: `http://localhost:8080/index.html`
- CMS: `http://localhost:8080/admin.html`

## Notes

- CMS data is stored in the browser via `localStorage` using key `cafola_cms_data`.
- Content changes persist in that browser unless storage is cleared.
