# Deployment & Roadmap - Reiknivelar

## Current State

| Aspect | Status |
|---|---|
| Hosting | GitHub Pages (free, static) |
| Deploy trigger | Push to `main` via GitHub Actions |
| CI | `python3 scripts/validate.py` on PRs |
| Build step | None (zero-build static site) |
| CDN libs | html2pdf.js v0.10.2, XLSX v0.18.5 |
| Custom domain | None (uses `fannar1994.github.io/Reiknivelar/`) |

## Deployment Pipeline

```
Developer / AI ──► Feature Branch ──► PR ──► CI Validation ──► Merge to main ──► GitHub Pages Deploy
                                              │
                                              ├── validate.py checks HTML conventions
                                              └── Branch protection enforces pass
```

### How to Deploy
1. Create a feature branch from `main`
2. Make changes to calculator HTML files
3. Open a PR targeting `main`
4. CI runs `python3 scripts/validate.py` automatically
5. Once CI passes and PR is approved, merge to `main`
6. GitHub Actions (`.github/workflows/static.yml`) deploys to GitHub Pages
7. Live at https://fannar1994.github.io/Reiknivelar/ within ~2 minutes

---

## Roadmap

### Phase 1 - Foundation (Current)
- [x] Static HTML calculators deployed via GitHub Pages
- [x] CI validation pipeline with `validate.py`
- [x] Claude Code integration (CLAUDE.md + skills)
- [x] PDF export (html2pdf.js)
- [x] Excel export (XLSX)
- [x] Landing page with calculator grid

### Phase 2 - Quality & Polish
- [ ] **Accessibility audit** - add ARIA labels, keyboard navigation, screen reader support
- [ ] **Mobile optimization** - test and fix all calculators on small screens
- [ ] **Print stylesheet improvements** - better PDF output formatting
- [ ] **Error handling** - input validation with Icelandic error messages
- [ ] **Loading states** - show spinners during PDF/Excel generation
- [ ] **Offline support** - Service Worker for offline calculator usage

### Phase 3 - Features
- [ ] **Shared component extraction** - common header/footer as reusable HTML templates (keep inline but use consistent copy-paste patterns)
- [ ] **Calculator comparison** - side-by-side quote comparison
- [ ] **Save/Load quotes** - localStorage-based quote persistence
- [ ] **URL parameters** - shareable calculator states via query strings
- [ ] **History tracking** - recent calculations in localStorage
- [ ] **Dark mode** - optional dark theme toggle

### Phase 4 - Scale
- [ ] **Custom domain** - e.g., `reiknivelar.byko.is`
- [ ] **Analytics** - lightweight analytics (Plausible/Umami, no cookies)
- [ ] **Performance monitoring** - Core Web Vitals tracking
- [ ] **Automated visual regression testing** - screenshot comparison in CI
- [ ] **Multi-language support** - English translations as secondary option
- [ ] **API integration** - live pricing from BYKO systems (if available)

### Phase 5 - Advanced
- [ ] **PWA** - installable as Progressive Web App
- [ ] **Barcode/QR scanning** - scan product codes to populate calculators
- [ ] **Customer portal** - saved quotes per customer (would require backend)
- [ ] **PDF template customization** - branded quote templates

---

## GitHub Pages Limits to Know

| Limit | Value |
|---|---|
| Max site size | 1 GB |
| Deploy timeout | 10 minutes |
| Bandwidth (soft) | 100 GB/month |
| Build frequency (soft) | 10 builds/hour |
| Server-side code | Not supported |

## Risk Register

| Risk | Impact | Mitigation |
|---|---|---|
| CDN library goes offline | PDF/Excel export breaks | Pin specific versions, consider self-hosting libs |
| GitHub Pages outage | Site unavailable | Mirror to Netlify/Vercel as backup |
| Calculator logic errors | Wrong quotes to customers | Add unit tests, validation script |
| Large file sizes | Slow page load | Monitor file sizes, optimize images |
| Breaking change in html2pdf.js | PDF export fails | Pin version, test before upgrading |
