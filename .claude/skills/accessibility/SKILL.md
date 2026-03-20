---
name: accessibility
description: Audit and improve accessibility in Reiknivelar calculators. Use when checking WCAG compliance, adding ARIA labels, improving keyboard navigation, or ensuring screen reader support for Icelandic UI.
---

# Accessibility Audit for Reiknivelar

## Quick Audit

1. Run Lighthouse accessibility audit in Chrome DevTools (F12 → Lighthouse → Accessibility)
2. Check keyboard navigation: Tab through all interactive elements
3. Test with screen reader (NVDA on Windows, VoiceOver on Mac)

## Key Checks

### Forms & Inputs
- [ ] All `<input>` elements have associated `<label>` elements (use `for` attribute)
- [ ] Required fields are marked with `aria-required="true"`
- [ ] Error messages use `aria-live="polite"` for screen reader announcements
- [ ] Input types are correct (`type="number"` for quantities, `type="text"` for names)

### Semantic HTML
- [ ] Use `<main>`, `<nav>`, `<section>`, `<article>` landmarks
- [ ] Heading hierarchy is logical (`h1` → `h2` → `h3`, no skipping)
- [ ] Tables have `<thead>`, `<th>` with `scope` attributes
- [ ] Lists use `<ul>`/`<ol>`, not styled `<div>`s

### Color & Contrast
- [ ] Text contrast ratio meets WCAG AA (4.5:1 for normal text, 3:1 for large text)
- [ ] Yellow accent (`#f5c800`) on dark background (`#404042`) passes contrast check
- [ ] Information is not conveyed by color alone
- [ ] Focus indicators are visible (outline on focused elements)

### Keyboard Navigation
- [ ] All interactive elements are reachable via Tab
- [ ] Tab order follows visual layout (top to bottom, left to right)
- [ ] Buttons are activatable with Enter and Space
- [ ] No keyboard traps (can Tab away from any element)
- [ ] Skip-to-content link at the top of the page

### Icelandic-Specific
- [ ] `lang="is"` is set on `<html>` element
- [ ] Screen readers will attempt Icelandic pronunciation
- [ ] Special characters (þ, ð, æ, ö, etc.) are UTF-8 encoded, not HTML entities
- [ ] Currency values include "kr." or "ISK" label for context

### Images & Icons
- [ ] All `<img>` elements have `alt` attributes
- [ ] Decorative images use `alt=""`
- [ ] SVG icons have `aria-label` or `aria-hidden="true"`

## Gotchas
- html2pdf.js-generated PDFs are NOT accessible (no tagged PDF) - this is a known limitation
- Inline styles may override focus indicators - check `:focus` styles exist
- Number formatting with dots (Icelandic style) may confuse some screen readers
- Calculator results should be announced to screen readers when they update
