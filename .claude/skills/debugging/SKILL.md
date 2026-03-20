---
name: debugging
description: Debug calculator issues in Reiknivelar. Use when a calculator has broken calculations, display errors, PDF/Excel export failures, or layout problems. Covers inline HTML/CSS/JS debugging in self-contained files.
---

# Debugging Reiknivelar Calculators

## Quick Diagnosis

1. **Identify the calculator file** - each calculator is a self-contained HTML file
2. **Open in browser** - use Chrome DevTools (F12) for debugging
3. **Check the console** - look for JavaScript errors first
4. **Reproduce the issue** - note exact inputs that trigger the bug

## Common Issue Categories

### Calculation Errors
- Check the `calculate()` function or equivalent
- Verify product catalogue array has correct `price` values (raw numbers, not formatted strings)
- Check for off-by-one errors in quantity multipliers
- Verify rounding: use `Math.round()` or `Math.ceil()` consistently

### Display / Formatting Errors
- Number formatting must use `fmtInt`/`fmtNum` helpers (not `.toLocaleString()`)
- Check CSS custom properties in `:root` are defined
- Verify responsive breakpoints work on target screen sizes

### PDF Export Issues
- html2pdf.js captures what's visible on screen
- Elements with `display: none` won't appear in PDF
- Use `.print-only` CSS class for PDF-only content
- Test in Chrome (best html2pdf compatibility)
- Check `@media print` styles for layout issues

### Excel Export Issues
- XLSX library creates workbooks from arrays
- Verify data array structure matches expected columns
- Check that number values are numbers, not strings

## Debugging Steps

```
1. git stash (save current work)
2. Open the HTML file directly in Chrome
3. F12 → Console tab → look for red errors
4. F12 → Elements tab → inspect broken layout
5. Add console.log() statements in <script> to trace values
6. Fix the issue
7. Run: python3 scripts/validate.py
8. Test PDF and Excel exports
9. Remove console.log() statements
10. git stash pop (restore work if needed)
```

## Gotchas
- Each file is self-contained: fixing a bug in one calculator does NOT fix it in others
- CSS variables are defined per-file, not shared
- Some calculators have different versions of the same helper functions
- html2pdf.js has quirks with CSS Grid layouts - may need fallback styles for print
