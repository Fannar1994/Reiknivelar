# Common AI Mistakes - Reiknivelar

A living document tracking AI-generated mistakes, failures, and lessons learned. Add new entries as they happen to build institutional knowledge.

---

## How to Use This File

When the AI makes a mistake:
1. Add a new entry under the relevant category
2. Describe what happened, what went wrong, and the fix
3. Add a "Prevention" note so the mistake doesn't repeat
4. Reference this file in CLAUDE.md or skill files if the mistake is common

---

## Categories

### 1. Code Structure Mistakes

#### Extracting CSS/JS into separate files
- **What happened**: AI refactored inline styles into external `.css` files
- **Why it's wrong**: This project intentionally uses inline `<style>` and `<script>` to keep each calculator self-contained
- **Prevention**: CLAUDE.md explicitly states "Do NOT extract CSS/JS into separate files"

#### Adding npm/node dependencies
- **What happened**: AI suggested installing packages via npm
- **Why it's wrong**: Zero-build static site with no `package.json` by design
- **Prevention**: CLAUDE.md states "Do NOT add npm/node dependencies"

#### Using `var` instead of `const`/`let`
- **What happened**: AI generated legacy JavaScript patterns
- **Why it's wrong**: Project convention requires modern `const`/`let`
- **Prevention**: validate.py checks for this; reviewer should catch it

---

### 2. Number Formatting Mistakes

#### Mixing `.toLocaleString()` with custom formatters
- **What happened**: AI used `.toLocaleString('de-DE')` in some places and `fmtInt`/`fmtNum` in others
- **Why it's wrong**: Inconsistent formatting. Project uses shared regex-based helpers (`fmtInt`, `fmtNum`) for Icelandic-style dot-separated thousands
- **Prevention**: Always use `fmtInt`/`fmtNum`. Never introduce `.toLocaleString()`

#### Hardcoding formatted numbers in data
- **What happened**: AI stored prices as `"1.500"` (string) instead of `1500` (number)
- **Why it's wrong**: Prices are plain numbers; formatting happens at render time
- **Prevention**: Price arrays use raw numbers: `{ price: 1500 }`, not `{ price: "1.500" }`

---

### 3. Language & Localization Mistakes

#### Writing UI text in English
- **What happened**: AI generated button labels, headers, and error messages in English
- **Why it's wrong**: All UI text must be in Icelandic (`lang="is"`)
- **Prevention**: Prompt should specify "all text in Icelandic" or reference CLAUDE.md

#### Incorrect Icelandic characters
- **What happened**: AI used wrong characters (e.g., `ö` instead of `ó`, missing `þ`, `ð`, `æ`)
- **Why it's wrong**: Icelandic has specific characters that must be correct
- **Prevention**: Review all Icelandic text carefully; use reference from existing calculators

---

### 4. Design System Mistakes

#### Wrong color values
- **What happened**: AI used arbitrary colors instead of CSS custom properties
- **Why it's wrong**: Design system uses `--color-*` variables defined in `:root`
- **Prevention**: Always reference existing `:root` variables; never hardcode colors

#### Missing header pattern
- **What happened**: AI created a plain header without the dark background + yellow accent stripe
- **Why it's wrong**: All calculators must follow the BYKO design language
- **Prevention**: Copy header section from existing calculator as template

#### Wrong font family
- **What happened**: AI used default system fonts or Google Fonts not in the design system
- **Why it's wrong**: Project uses Barlow (body) and Barlow Condensed (headers)
- **Prevention**: Check `:root` font-family declarations in existing calculators

---

### 5. Workflow Mistakes

#### Forgetting to update `index.html`
- **What happened**: AI created a new calculator file but didn't add a card to the landing page
- **Why it's wrong**: New calculators are unreachable without a link from index.html
- **Prevention**: `new-calculator` skill includes this step; validate.py should check

#### Forgetting to update `README.md`
- **What happened**: New calculator added but README table not updated
- **Why it's wrong**: README becomes stale and misleading
- **Prevention**: `new-calculator` skill includes this step

#### Not running `validate.py`
- **What happened**: AI made changes without running validation
- **Why it's wrong**: CI will catch it, but wastes a PR cycle
- **Prevention**: Always run `python3 scripts/validate.py` before committing

---

### 6. Security Mistakes

#### Exposing sensitive data in client-side code
- **What happened**: API keys or internal URLs embedded in HTML/JS
- **Why it's wrong**: All code is publicly visible on GitHub Pages
- **Prevention**: Never embed secrets; this is a static public site

#### Using `innerHTML` with user input
- **What happened**: AI used `element.innerHTML = userInput` without sanitization
- **Why it's wrong**: XSS vulnerability
- **Prevention**: Use `textContent` for user data; only use `innerHTML` for trusted templates

#### Loading scripts from unversioned CDNs
- **What happened**: AI used `latest` instead of pinned version in CDN URLs
- **Why it's wrong**: Breaking changes or supply chain attacks
- **Prevention**: Pin CDN versions (e.g., `@0.10.2`); CLAUDE.md requires this

---

### 7. AI-Specific Behavioral Mistakes

#### Over-engineering simple requests
- **What happened**: Asked to fix a button; AI rewrote the entire form layout
- **Why it's wrong**: Scope creep; unnecessary changes introduce risk
- **Prevention**: Prompt with "only modify X, do not change anything else"

#### Generating placeholder comments instead of code
- **What happened**: AI wrote `// TODO: implement calculation logic here` instead of actual code
- **Why it's wrong**: Incomplete implementation
- **Prevention**: Ask Claude to self-check: "Is all logic fully implemented? No placeholders?"

#### Context drift in long sessions
- **What happened**: AI forgot project conventions after many messages
- **Why it's wrong**: Starts violating CLAUDE.md rules
- **Prevention**: Start fresh sessions; re-provide CLAUDE.md context; keep sessions focused

#### Hallucinating file paths or function names
- **What happened**: AI referenced files or functions that don't exist
- **Why it's wrong**: Leads to errors and confusion
- **Prevention**: Always read files before referencing them; verify paths exist

---

## Template for New Entries

```markdown
#### [Short description of mistake]
- **What happened**: [What the AI did]
- **Why it's wrong**: [Why this is incorrect for this project]
- **Prevention**: [How to avoid this in the future]
- **Date**: [When it happened]
- **Severity**: [Low/Medium/High]
```
