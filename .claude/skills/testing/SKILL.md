---
name: testing
description: Test Reiknivelar calculators for correctness. Use when validating calculator behavior, checking HTML conventions, testing PDF/Excel exports, or verifying responsive layout. Includes CI validation and manual browser testing.
---

# Testing Reiknivelar Calculators

## Automated Validation

Run the CI validation script:
```bash
python3 scripts/validate.py
```

This checks:
- Required `<meta>` tags (`charset`, `viewport`)
- `lang="is"` attribute
- Favicon links present
- No use of `var` (must be `const`/`let`)

## Manual Testing Checklist

### Functional Testing
- [ ] Open each modified calculator in Chrome
- [ ] Enter typical input values → verify correct output
- [ ] Enter zero values → verify no division-by-zero or NaN
- [ ] Enter very large values → verify no overflow or layout break
- [ ] Enter decimal values → verify correct rounding
- [ ] Clear all fields → verify clean reset

### PDF Export Testing
- [ ] Click PDF export button
- [ ] Verify PDF opens/downloads correctly
- [ ] Check all data appears in PDF (no missing sections)
- [ ] Check layout is not cut off or overlapping
- [ ] Verify Icelandic characters render correctly in PDF
- [ ] Test in Chrome (primary) and Firefox (secondary)

### Excel Export Testing
- [ ] Click Excel export button
- [ ] Open `.xlsx` file in Excel or LibreOffice
- [ ] Verify column headers are correct
- [ ] Verify numeric values are numbers (not text)
- [ ] Verify Icelandic characters display correctly

### Responsive / Mobile Testing
- [ ] Chrome DevTools → Toggle device toolbar (Ctrl+Shift+M)
- [ ] Test at 375px width (iPhone SE)
- [ ] Test at 768px width (iPad)
- [ ] Test at 1024px width (laptop)
- [ ] Verify no horizontal scrolling
- [ ] Verify buttons are tap-friendly (min 44x44px)

### Cross-Browser Testing
- [ ] Chrome (primary target)
- [ ] Firefox
- [ ] Safari (if available)
- [ ] Edge

## Testing New Calculators

When a new calculator is added, also verify:
- [ ] Card appears on `index.html` landing page
- [ ] Card link navigates to the correct HTML file
- [ ] Entry exists in `README.md` table
- [ ] `validate.py` passes with the new file included

## Gotchas
- html2pdf.js renders differently in Firefox vs Chrome - always prioritize Chrome
- XLSX library may format dates differently across locales
- Icelandic characters (þ, ð, æ, ö, etc.) can break in some PDF fonts
- No automated unit tests exist - all testing is manual or via validate.py
