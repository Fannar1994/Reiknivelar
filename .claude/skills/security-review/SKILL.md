---
name: security-review
description: Review Reiknivelar calculators for security issues. Use when auditing client-side JavaScript for XSS, checking CDN integrity, reviewing user input handling, or assessing data exposure risks on a public GitHub Pages site.
---

# Security Review for Reiknivelar

## Context

This is a **public static site** on GitHub Pages. There is no backend, no database, no authentication. All code is publicly visible. The primary security concerns are client-side vulnerabilities and supply chain risks.

## Security Checklist

### Input Handling
- [ ] User inputs are validated before use in calculations
- [ ] No `eval()` or `Function()` constructors with user input
- [ ] `innerHTML` is not used with user-supplied data (use `textContent` instead)
- [ ] Number inputs use `parseFloat()`/`parseInt()` with validation
- [ ] No SQL injection possible (no database, but good habit)

### XSS Prevention
- [ ] User input is never inserted into HTML via `innerHTML` without sanitization
- [ ] Event handlers don't execute user-controlled strings
- [ ] URL parameters (if used) are sanitized before rendering
- [ ] No `document.write()` with dynamic content

### CDN & Supply Chain
- [ ] All CDN scripts use pinned versions (not `latest`)
- [ ] Consider adding Subresource Integrity (SRI) hashes to CDN `<script>` tags:
  ```html
  <script src="https://cdn.example.com/lib@1.0.0/lib.min.js"
          integrity="sha384-HASH_HERE"
          crossorigin="anonymous"></script>
  ```
- [ ] Review CDN sources periodically for known vulnerabilities

### Data Exposure
- [ ] No API keys, tokens, or secrets in any HTML/JS file
- [ ] No internal URLs, IP addresses, or system paths
- [ ] No customer data hardcoded in examples
- [ ] `.gitignore` excludes sensitive files

### Headers & Meta
- [ ] `<meta charset="UTF-8">` prevents encoding-based attacks
- [ ] Consider adding `<meta http-equiv="Content-Security-Policy">` for extra protection
- [ ] No sensitive information in `<meta>` tags

### localStorage
- [ ] If localStorage is used, data is validated when read back
- [ ] No sensitive data stored in localStorage (it's not encrypted)
- [ ] localStorage data is treated as untrusted input

## Gotchas
- GitHub Pages serves everything publicly - assume all code is readable by anyone
- Client-side calculations can be manipulated by users in DevTools - never trust client-side math for anything critical (quotes are informational, not binding)
- html2pdf.js and XLSX are third-party dependencies - monitor for CVEs
- Service Workers (if added later) need careful scope configuration
