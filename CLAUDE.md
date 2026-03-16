# Reiknivelar – CLAUDE.md

## Project Overview

**Reiknivelar** (Icelandic: "Calculators") is a collection of construction/rental calculators for **BYKO Leiga**. Deployed as a static site via GitHub Pages at https://fannar1994.github.io/Reiknivelar/

## Tech Stack

- **Vanilla HTML5, CSS3, JavaScript** – no frameworks, no build tools
- **html2pdf.js** (v0.10.2 CDN) – PDF generation
- **XLSX** (v0.18.5 CDN) – Excel export
- **Google Fonts** – Barlow, Barlow Condensed
- **Deployment** – GitHub Pages via `.github/workflows/static.yml` on push to `main`

## Architecture

```
/
├── index.html                         # Landing page (card grid linking to calculators)
├── Girdingar_reiknivel.html           # Industrial fence calculator
├── hjolapallar_reiknivel_sp.html      # Pallet racking calculator
├── loftastodir.html                   # Ceiling post calculator
├── motareiknivel-byko-v11.html        # Concrete form calculator
├── vinnupalla-reiknivel.html          # Work platform calculator (largest, ~3500 lines)
├── favicon_io/                        # Favicon assets
├── .github/workflows/static.yml       # GitHub Pages deploy workflow
└── .nojekyll                          # Disables Jekyll processing
```

Each calculator is a **self-contained HTML file** with inline `<style>` and `<script>`. This is intentional – it keeps each calculator independently deployable and avoids cross-file dependency issues.

## Coding Rules

### HTML Structure

- All UI text is in **Icelandic** (`lang="is"`)
- Every calculator file must include `<meta charset="UTF-8">` and `<meta name="viewport" ...>`
- Use favicon links: `favicon_io/favicon.ico` and `favicon_io/apple-touch-icon.png`

### CSS Conventions

- Use CSS custom properties (variables) defined in `:root` for theming:
  - `--color-border`, `--color-surface`, `--color-bg`, `--color-muted`
  - `--color-dark: #404042` (header background)
  - `--color-accent: #f5c800` (yellow accent stripe)
  - `--radius-sm`, `--radius-md`, `--radius-lg`
- Font stack: `'Barlow', system-ui, Arial, sans-serif`
- Headers use: `'Barlow Condensed', system-ui, sans-serif`
- Include `.print-only` and `@media print` styles for PDF/print output
- All styles are inline `<style>` within each HTML file

### JavaScript Conventions

- All scripts are inline `<script>` at the bottom of each HTML file
- Use `const`/`let` (never `var`)
- Use descriptive function names in camelCase
- Product/item catalogues are defined as arrays of objects with `id`, `name`, `unit`, `price` properties
- Calculation functions should be pure where possible (input → output, no side effects)
- DOM manipulation uses `document.getElementById()` and `document.querySelector()`
- Number formatting: use `.toLocaleString('de-DE')` for Icelandic-style number formatting (dot thousands separator)

### Design Language

- Dark header (`#404042`) with yellow accent stripe (`#f5c800`) on the left edge
- Grid-based blueprint pattern overlay on headers
- Card-based layouts with subtle shadows
- Eyebrow text above titles: uppercase, letterspaced, accent-colored
- Responsive design using CSS Grid/Flexbox

## Workflow

- **Deploy**: Push to `main` triggers GitHub Pages deployment automatically
- **No build step**: Files are served as-is
- **Testing**: Manual browser testing – open HTML files directly or via local server
- **PDF export**: Test html2pdf output in Chrome (best compatibility)
- **Excel export**: Test XLSX output opens correctly in Excel/LibreOffice

## Common Pitfalls

- Do NOT extract CSS/JS into separate files – the inline pattern is intentional
- Do NOT add npm/node dependencies – this is a zero-build static site
- Preserve number formatting consistency (`toLocaleString('de-DE')`)
- When adding new calculators, also add a card to `index.html` and update `README.md`
- CDN scripts (html2pdf, XLSX) must use specific pinned versions, not `latest`
