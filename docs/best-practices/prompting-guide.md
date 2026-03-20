# Prompting Guide - Reiknivelar

How to write effective prompts for AI-assisted development in this project.

## Core Principles

### 1. Be Specific, Not Vague
```
Bad:  "Fix the calculator"
Good: "Fix the total calculation in loftastodir.html - when the user enters
       0 for 'Fjöldi stoða', the result shows NaN instead of 0"
```

### 2. Reference the Codebase
```
Bad:  "Make a fence calculator"
Good: "Create a new fence calculator using Girdingar_reiknivel.html as the
       template. Follow conventions in CLAUDE.md."
```

### 3. Constrain the Scope
```
Bad:  "Improve this calculator"
Good: "Add input validation to motareiknivel-byko-v11.html - show a red
       border and Icelandic error message when non-numeric values are entered"
```

### 4. Specify Language
```
Bad:  "Add an error message"
Good: "Add an error message in Icelandic: 'Vinsamlegast sláðu inn gilt gildi'"
```

## Prompt Templates

### Adding a Product to a Catalogue
```
Add a new item to the product catalogue in [FILENAME]:
- id: '[PRODUCT-ID]'
- name: '[Icelandic name]'
- unit: '[stk/m/m²/etc.]'
- price: [number in ISK, no formatting]
```

### Fixing a Calculation Bug
```
In [FILENAME], the [function name] function returns incorrect results
when [specific input condition]. Expected output: [X]. Actual output: [Y].
Fix the calculation logic. Do not change any other code.
```

### Adding Export Functionality
```
Add [PDF/Excel] export to [FILENAME]. Follow the same pattern used in
[REFERENCE_FILE]. The export should include [list of data to export].
Button text in Icelandic: '[button label]'.
```

### Creating a New Calculator
```
Create a new calculator for [product type] using [TEMPLATE_FILE] as the
base template. Follow all conventions in CLAUDE.md.

Product catalogue:
| ID | Name | Unit | Price (ISK) |
|---|---|---|---|
| XX-001 | [name] | stk | [price] |

Calculation logic:
- [Describe how totals are calculated]
- [Describe any tiered pricing or discounts]

All UI text must be in Icelandic.
```

### Updating Styling
```
Update the [specific element] styling in [FILENAME] to match the design
in [REFERENCE_FILE]. Use the existing CSS custom properties from :root.
Do not extract styles to an external file.
```

## Anti-Patterns to Avoid

| Don't | Why | Do Instead |
|---|---|---|
| "Rewrite everything" | Loses working code, introduces bugs | Fix specific issues one at a time |
| "Use a framework" | Violates zero-build architecture | Keep vanilla HTML/CSS/JS |
| "Make it modern" | Too vague, leads to unwanted changes | Specify exact improvements |
| "Add all error handling" | Over-engineers, bloats code | Add handling for specific edge cases |
| Ask in English for UI text | UI must be Icelandic | Provide Icelandic text or ask AI to translate |

## Self-Check Prompts

After the AI generates code, ask:
- "Is all logic fully implemented? No placeholders or TODO comments?"
- "Does this follow the conventions in CLAUDE.md?"
- "Are all user-visible strings in Icelandic?"
- "Did you use fmtInt/fmtNum for number formatting?"
- "Did you change any files I didn't ask you to change?"

## Sources
- [DEV Community - Vibe Coding Mistakes](https://dev.to/tirumalaraonaidu/vibe-coding-mistakes-when-using-ai-tools-and-how-to-avoid-them-2p7c)
- [Medium - Navigating Vibe Coding Pitfalls](https://medium.com/@gregoryjohnunger/navigating-vibe-coding-pitfalls-with-github-copilot-ea03fe9301eb)
- [Anthropic - Skill Authoring Best Practices](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices)
