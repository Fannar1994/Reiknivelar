# Vibe Coding Guide - Reiknivelar

How to effectively use AI-assisted development (vibe coding) with this project.

## What Is Vibe Coding?

Vibe coding is an AI-first development workflow where you describe what you want in natural language, and the AI generates, refines, and debugs the code. You guide the AI rather than writing every line yourself.

> "The most important skill in vibe coding is knowing what to ask for, and knowing when to reject the answer."

## Workflow for This Project

### 1. Plan Before Prompting
- Sketch what the calculator should do (inputs, outputs, logic)
- Identify which existing calculator is most similar (use as template)
- List the product catalogue items and prices
- Define edge cases (zero inputs, very large numbers, etc.)

### 2. Prompt with Context
Always reference project conventions:
```
Create a new calculator for [product]. Follow the conventions in CLAUDE.md.
Use Girdingar_reiknivel.html as the template. All UI text in Icelandic.
Product catalogue: [list items with IDs, names, units, prices]
```

### 3. Review Every Change
- Read the generated code - don't blindly accept
- Check that it follows the inline CSS/JS pattern
- Verify Icelandic text is correct
- Test calculations with known values
- Run `python3 scripts/validate.py`

### 4. Iterate in Small Steps
- Don't ask for everything at once
- Build incrementally: structure → data → logic → styling → export
- Commit working checkpoints frequently

### 5. Keep Sessions Focused
- One calculator or one feature per session
- Start fresh sessions for unrelated work
- Re-provide CLAUDE.md context if the AI starts drifting

## Effective Prompts for This Project

### Good Prompts
```
"Add a new row to the product catalogue in Girdingar_reiknivel.html
with id 'GR-015', name 'Hliðarstyrkur', unit 'stk', price 2500"

"The total calculation in loftastodir.html is wrong when quantity
is zero - it shows NaN. Fix the division-by-zero case."

"Add an Excel export button to hjolapallar_reiknivel_sp.html that
exports the results table. Follow the same pattern as vinnupalla-reiknivel.html"
```

### Bad Prompts
```
"Make it better" (too vague)
"Rewrite this calculator" (too broad, loses working code)
"Add a backend" (violates project architecture)
"Use React" (violates zero-framework rule)
```

## When NOT to Vibe Code

- **Complex business logic** - write calculation formulas manually and verify them
- **Pricing data** - get exact prices from the business, don't let AI guess
- **Icelandic text** - have a native speaker review AI-generated Icelandic
- **Security-sensitive changes** - review manually, don't trust AI blindly

## Tools to Use

| Tool | Purpose |
|---|---|
| Claude Code | Primary AI coding assistant |
| Chrome DevTools | Debugging, responsive testing, Lighthouse |
| `validate.py` | Automated HTML convention checks |
| Git | Version control, branching, PRs |
| GitHub Actions | CI/CD pipeline |

## Sources & Further Reading

- [Softr - 8 Vibe Coding Best Practices](https://www.softr.io/blog/vibe-coding-best-practices)
- [SitePoint - Vibe Coding Guide 2026](https://www.sitepoint.com/vibe-coding-2026-complete-guide/)
- [Google Cloud - What Is Vibe Coding](https://cloud.google.com/discover/what-is-vibe-coding)
- [Appwrite - Complete Vibe Coding Guide](https://appwrite.io/blog/post/the-complete-vibe-coding-guide-2025)
- [roadmap.sh - Vibe Coding](https://roadmap.sh/vibe-coding)
