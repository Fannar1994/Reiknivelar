# Reiknivelar

**GitHub Pages URL:** https://fannar1994.github.io/Reiknivelar/

A collection of Icelandic construction/rental calculators for **BYKO Leiga**, published via GitHub Pages.

## Calculators

| Calculator | File | Description |
|---|---|---|
| [Girðinga reiknivél](Girdingar_reiknivel.html) | `Girdingar_reiknivel.html` | Industrial fence calculator |
| [Hjólapalla reiknivél](hjolapallar_reiknivel_sp.html) | `hjolapallar_reiknivel_sp.html` | Pallet racking calculator |
| [Loftastoðir](loftastodir.html) | `loftastodir.html` | Verðlaus efnislisti fyrir loftastoðir, mótabita og fylgihluti, með vörutenglum á BYKO |
| [Steypumótareiknivél](motareiknivel-byko-v11.html) | `motareiknivel-byko-v11.html` | Concrete form calculator |
| [Vinnupalla reiknivél](vinnupalla-reiknivel.html) | `vinnupalla-reiknivel.html` | Work platform calculator |
| [Vinnupalla reiknivél (ný útgáfa)](vinnupalla-reiknivel_new.html) | `vinnupalla-reiknivel_new.html` | Work platform calculator (new version) |

## Loftastoðir og undirsláttur

Reiknivélin `loftastodir.html` er **efnislisti án leigu- og söluverðs**. Hún varðveitir leigunúmer, sölunúmer úr Item Description 2, hæðarbil, framleiðendaflokkun og þær burðartölur sem eru studdar viðeigandi gögnum.

- Leita eftir vörunúmerum eða heiti og sía loftastoðir eftir hæð, EN 1065 flokki og staðfestum burði.
- Velja magn, sjá samantekt valinna vara og sækja efnislista í PDF eða Excel.
- Fá tengil á tiltekna vöru á byko.is þar sem hann er staðfestur; annars tengil á viðeigandi vöruflokk.
- Vista breytingar sjálfkrafa í vafra viðkomandi tækis (localStorage). Þetta er **ekki miðlæg vistun eða samstilling milli tækja**.
- Sækja JSON-öryggisafrit með verkefnisupplýsingum og magntölum og hlaða því inn síðar, einnig í öðrum vafra.
- Eldri útgáfur vistunar (v2–v4) eru endurheimtar með tilheyrandi vörunúmeravörpun, þ.m.t. leiðréttingu eftir brottnám B45.

**Öryggi:** Hæðarsía og burðartölur eru upplýsingar til vöruleitar. Þær koma ekki í stað uppsetningar- eða burðarhönnunar. Óstaðfestar tölur eru merktar. Ekki er sýnt verð í efnislista.

## Tech Stack

- **Vanilla HTML5, CSS3, JavaScript** – no frameworks, no build tools
- **html2pdf.js** (v0.10.2) – PDF material-list generation
- **XLSX** (v0.18.5) – Excel export
- **GitHub Pages** – static site deployment

## Development

Each calculator is a self-contained HTML file with inline CSS and JavaScript. There is no build step – files are served as-is.

### Validation

Run the validation script to check all HTML files for required meta tags and conventions:

```bash
python3 scripts/validate.py
```

### Adding a New Calculator

1. Copy an existing calculator HTML file as a template
2. Update the header, title, and product catalogue
3. Add a card to `index.html`
4. Update this README

### AI-Assisted Development

This project includes a `CLAUDE.md` file and `.claude/skills/` directory for AI-assisted development with Claude Code. See `CLAUDE.md` for project conventions and coding rules.

## Publishing (GitHub Pages)

The site is deployed from the **`main`** branch, folder **`/(root)`**.
An `index.html` landing page at the repo root links to each calculator.
Deployment is automatic via GitHub Actions on push to `main`.
