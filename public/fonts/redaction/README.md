# Fonts note — Redaction is loaded via Adobe Fonts (Typekit)

The display typeface **Redaction** is now loaded through Liam's Adobe Fonts
kit, linked in `app/[locale]/layout.tsx`:

```html
<link rel="stylesheet" href="https://use.typekit.net/kjj6fyr.css">
```

This folder is no longer required for the fonts to work — self-hosted `.woff2`
files are **not** needed. The kit exposes seven grades:

`redaction` (clean) · `redaction-10` · `redaction-20` · `redaction-35`
· `redaction-50` · `redaction-70` · `redaction-100`

Each in roman, italic and bold (400 / 400 italic / 700). Grade tokens are
defined in `app/globals.css`:
- `--font-display` → `redaction-35` (default)
- `--font-display-clean` → `redaction`
- `--font-display-coarse` → `redaction-10` (used on `.grade-hover:hover`)

To change the default grade, edit `--font-display` in `app/globals.css`.

> Note: the kit loads on any domain (localhost, Vercel, custom domain). If it
> ever stops rendering on a new domain, check that the domain is allowed in the
> Adobe Fonts web project settings.
