# Code Review Checklist - Reiknivelar

Use this checklist when reviewing PRs or AI-generated code for this project.

---

## HTML Structure
- [ ] File has `<!DOCTYPE html>` declaration
- [ ] `<html lang="is">` attribute is set
- [ ] `<meta charset="UTF-8">` is present
- [ ] `<meta name="viewport" content="width=device-width, initial-scale=1.0">` is present
- [ ] `<title>` tag has descriptive Icelandic title
- [ ] Favicon links point to `favicon_io/` directory
- [ ] All CSS is inline in `<style>` tags (not external files)
- [ ] All JS is inline in `<script>` tags at bottom of `<body>` (not external files)
- [ ] CDN scripts use pinned versions (not `latest`)

## CSS
- [ ] Uses CSS custom properties from `:root` (not hardcoded colors)
- [ ] Font stack matches project conventions (Barlow, Barlow Condensed)
- [ ] Dark header (`#404042`) with yellow accent stripe (`#f5c800`)
- [ ] Grid-based blueprint pattern overlay on header
- [ ] Card-based layout with shadows
- [ ] Responsive at mobile (375px), tablet (768px), desktop (1024px+)
- [ ] `.print-only` and `@media print` styles included if PDF export exists
- [ ] No unused CSS rules

## JavaScript
- [ ] Uses `const`/`let` only (no `var`)
- [ ] Function names are descriptive camelCase
- [ ] Product catalogue uses `{ id, name, unit, price }` object format
- [ ] Prices stored as raw numbers (not formatted strings)
- [ ] Number formatting uses `fmtInt`/`fmtNum` (not `.toLocaleString()`)
- [ ] Calculation functions are pure where possible
- [ ] DOM queries use `getElementById()` / `querySelector()`
- [ ] No `eval()`, `Function()`, or `document.write()` with dynamic content
- [ ] No `innerHTML` with user-supplied data (use `textContent`)
- [ ] No `console.log()` left in production code
- [ ] No unused functions or variables

## Content & Localization
- [ ] All user-visible text is in Icelandic
- [ ] Icelandic characters (þ, ð, æ, ö, etc.) are correct
- [ ] Currency displayed as ISK with correct formatting
- [ ] Units are correct (stk, m, m², dagar, etc.)

## Exports
- [ ] PDF export works in Chrome
- [ ] PDF includes all visible data
- [ ] PDF layout is not cut off or overlapping
- [ ] Excel export (if present) produces valid `.xlsx`
- [ ] Excel numbers are numeric (not text)

## Integration
- [ ] New calculator has a card in `index.html`
- [ ] New calculator has a row in `README.md` table
- [ ] `python3 scripts/validate.py` passes
- [ ] No files added to `.gitignore` that shouldn't be

## Security
- [ ] No API keys, tokens, or secrets in code
- [ ] No internal URLs or IP addresses
- [ ] CDN scripts could use SRI hashes (recommended)
- [ ] User input is validated before use

## Performance
- [ ] File size is reasonable (< 150KB for HTML)
- [ ] No unnecessary libraries loaded
- [ ] Google Fonts use `display=swap`
- [ ] No heavy computation on page load
