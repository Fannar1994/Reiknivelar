---
name: performance
description: Optimize performance of Reiknivelar calculators. Use when pages load slowly, files are too large, or Core Web Vitals need improvement. Covers static HTML optimization without build tools.
---

# Performance Optimization for Reiknivelar

## Quick Audit

1. Run Lighthouse performance audit: Chrome DevTools → Lighthouse → Performance
2. Check file sizes: large HTML files (>100KB) may need optimization
3. Test on slow 3G: Chrome DevTools → Network → Throttling → Slow 3G

## Current File Sizes

Monitor these - each calculator is a single HTML file:
```bash
ls -lhS *.html
```

Files over 100KB should be investigated for optimization opportunities.

## Optimization Checklist

### Critical Path
- [ ] CSS is inline (already done by design - no external stylesheet blocking)
- [ ] JS is inline at bottom of `<body>` (already done by design)
- [ ] CDN scripts (html2pdf.js, XLSX) loaded with `defer` or at bottom
- [ ] No render-blocking resources

### Images
- [ ] Use WebP format where possible (with fallback)
- [ ] Favicon is optimized (small file size)
- [ ] No unnecessary images loaded on page load
- [ ] Use `loading="lazy"` for below-fold images

### Fonts
- [ ] Google Fonts loaded with `display=swap` to prevent FOIT
- [ ] Only load needed font weights (400, 600, 700)
- [ ] Consider `font-display: swap` in `@font-face`

### JavaScript
- [ ] No heavy computation on page load
- [ ] Calculation functions run only on user action (button click)
- [ ] DOM queries cached in variables (not re-queried every calculation)
- [ ] Event listeners use delegation where appropriate

### HTML Size
- [ ] Remove commented-out code
- [ ] Remove unused CSS rules
- [ ] Remove unused JavaScript functions
- [ ] Minimize inline comments in production

### Caching
- [ ] GitHub Pages sets appropriate cache headers automatically
- [ ] CDN libraries are versioned (cache-busted on upgrade)
- [ ] Consider preloading critical fonts: `<link rel="preload" href="..." as="font">`

## Gotchas
- No build tool means no minification - keep files clean manually
- html2pdf.js is ~400KB - it's loaded on every calculator page
- XLSX library is ~300KB - only load on pages that need Excel export
- Google Fonts add ~50-100KB per font family - already part of the design system
- GitHub Pages has a soft 100GB/month bandwidth limit
