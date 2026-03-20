# HTML / CSS / JS Conventions - Reiknivelar

Project-specific coding standards for the Reiknivelar calculator suite.

---

## Architecture

Each calculator is a **self-contained HTML file** with all CSS and JS inline. This is intentional:
- No build tools, no bundler, no framework
- Each file is independently deployable
- No cross-file dependencies to break
- Easy to copy as a template for new calculators

**Do not** extract CSS or JS into separate files. **Do not** add npm dependencies.

---

## HTML

### Required Meta Tags
```html
<!DOCTYPE html>
<html lang="is">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>[Calculator Name] - BYKO Leiga</title>
    <link rel="icon" href="favicon_io/favicon.ico">
    <link rel="apple-touch-icon" href="favicon_io/apple-touch-icon.png">
</head>
```

### CDN Libraries
```html
<!-- Always pin versions -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.2/html2pdf.bundle.min.js"></script>
<script src="https://cdn.sheetjs.com/xlsx-0.18.5/package/dist/xlsx.full.min.js"></script>
```

---

## CSS

### Custom Properties (`:root`)
```css
:root {
    --color-border: #e0e0e0;
    --color-surface: #ffffff;
    --color-bg: #f5f5f5;
    --color-muted: #888888;
    --color-dark: #404042;
    --color-accent: #f5c800;
    --radius-sm: 4px;
    --radius-md: 8px;
    --radius-lg: 12px;
}
```

### Font Stack
```css
body {
    font-family: 'Barlow', system-ui, Arial, sans-serif;
}
h1, h2, h3 {
    font-family: 'Barlow Condensed', system-ui, sans-serif;
}
```

### Header Pattern
Every calculator uses:
- Dark background: `#404042`
- Yellow accent stripe on left edge: `#f5c800`
- Grid-based blueprint pattern overlay
- Eyebrow text: uppercase, letterspaced, accent-colored

### Print Styles
```css
.print-only { display: none; }

@media print {
    .print-only { display: block; }
    .no-print { display: none; }
    /* Hide buttons, inputs, navigation */
}
```

---

## JavaScript

### Variable Declarations
```javascript
// Always use const or let
const items = [...];
let total = 0;

// Never use var
```

### Product Catalogue Format
```javascript
const items = [
    { id: 'ITEM-001', name: 'Lýsing', unit: 'stk', price: 1500 },
    { id: 'ITEM-002', name: 'Annað', unit: 'm', price: 750 },
];
```

### Number Formatting
```javascript
// Use project helpers - Icelandic dot-separated thousands
function fmtInt(n) {
    return String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

function fmtNum(n, decimals = 0) {
    return Number(n).toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

// Usage
fmtInt(1500);      // "1.500"
fmtInt(25000);     // "25.000"
fmtNum(1234.5, 2); // "1.234,50" (if comma decimal implemented)

// NEVER use .toLocaleString() for number display
```

### DOM Manipulation
```javascript
// Use getElementById for single elements
const input = document.getElementById('quantity');

// Use querySelector for CSS-selector-based lookup
const card = document.querySelector('.result-card');

// Cache DOM references outside loops
const output = document.getElementById('total');
for (let i = 0; i < items.length; i++) {
    // Don't re-query DOM here
}
```

### Calculation Functions
```javascript
// Pure functions preferred (input → output, no side effects)
function calculateTotal(items, quantities) {
    return items.reduce((sum, item, i) => {
        return sum + (item.price * (quantities[i] || 0));
    }, 0);
}

// Guard against NaN / division by zero
function calculateUnitPrice(total, quantity) {
    if (!quantity || quantity === 0) return 0;
    return total / quantity;
}
```

### Event Handling
```javascript
// Use addEventListener (not inline onclick attributes)
document.getElementById('calculateBtn').addEventListener('click', calculate);

// For dynamically generated elements, use event delegation
document.getElementById('itemList').addEventListener('click', (e) => {
    if (e.target.classList.contains('remove-btn')) {
        removeItem(e.target.dataset.id);
    }
});
```

---

## File Naming

| Convention | Example |
|---|---|
| Calculator files | `lowercase-with-hyphens.html` |
| Icelandic names OK | `Girdingar_reiknivel.html` (legacy pattern) |
| New files prefer | `kebab-case.html` |
| Scripts | `scripts/validate.py` |
| Assets | `favicon_io/favicon.ico` |

---

## Common Patterns

### PDF Export Button
```javascript
function exportPDF() {
    const element = document.getElementById('printArea');
    const opt = {
        margin: 10,
        filename: 'tilbod.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };
    html2pdf().set(opt).from(element).save();
}
```

### Excel Export
```javascript
function exportExcel() {
    const data = [
        ['Vara', 'Eining', 'Fjöldi', 'Verð'],
        // ... populate from calculation results
    ];
    const ws = XLSX.utils.aoa_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Tilboð');
    XLSX.writeFile(wb, 'tilbod.xlsx');
}
```
