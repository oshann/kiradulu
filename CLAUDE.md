# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

KiraDulu (kiradulu.app, formerly PropROICal/proproical.com) is a static site of free Malaysian personal-finance calculators: salary take-home (the homepage), EPF, income tax, savings, property ROI, tenant rental quote, hire purchase, road tax and car total cost of ownership, plus an About/Contact page. No framework, no bundler; deployed to GitHub Pages via a CNAME.

Each calculator is a self-contained folder (`<name>/index.html` + its script). The root `index.html` and `salary-calculator/index.html` are the same Salary page and are edited in lockstep (the `/salary-calculator/` copy canonicalises to `/`).

## Critical architecture: source vs. deployed files are split by .gitignore

Editable calculator source is kept out of git; only the obfuscated build output is committed. Always edit the `-clean.js` files, never the plain-named ones (e.g. edit `epf-calculator/epf-calculator-clean.js`, not `epf-calculator/epf-calculator.js`). `build.js`, `package.json`, `tailwind.config.js`, `tailwind.input.css` and `Notes.txt` are also local-only. The HTML pages and `assets/*` are tracked and edited directly.

`backup/` holds manual snapshots (e.g. `backup/pre-ui-revamp-2026-09-24/` has the gitignored sources from before the UI revamp; git tag `pre-ui-revamp` marks the matching commit).

## Commands

```bash
npm run build     # obfuscates every *-clean.js -> *.js, then compiles assets/tailwind.css
npm run deploy    # build, git add the fixed file list, commit "Update build all", push origin main
```

`deploy` pushes `main`, so merge feature branches into `main` first. New tracked files must be added to the `deploy` file list in `package.json`.

There is no test suite. Verify in the browser preview (`.claude/launch.json` serves the repo root on :8080). Browsers cache the JS/CSS aggressively on that server, so hard-refresh after a rebuild.

## Shared assets (every page)

- `assets/tailwind.css`: built by the Tailwind 3.4.17 CLI (the version the old CDN served). It scans the HTML pages and the `-clean.js` sources, since the obfuscated `.js` hides class strings. Any new Tailwind class only exists after `npm run build`.
- `assets/site.css`: the "Paper Ledger" theme. It re-skins Tailwind's slate/blue/green/red utilities with `!important` (so `text-blue-700` renders brand green), plus the header/menu, collapsible explainer, 16px mobile input and print rules.
- `assets/site.js`, loaded in `<head>`:
  - header dropdowns and the mobile ☰ menu
  - dark-mode fallback
  - mobile summary bar: `data-kd-mirror="<result id>"` copies a result element's text
  - share links: `kdShareCalculation()` packs the page's localStorage input records, listed in `<body data-kd-share="...">`, into `?s=`. On load, site.js writes them back before the page script restores its saved inputs.

  Income Tax and Property ROI keep their own older `?field=value` share links.

The header (`<!-- site-header -->`) and footer (`<!-- site-footer -->`) are identical copies on every page, with the current page highlighted. Change them on all pages together.

## Property ROI page

`property-roi-calculator/index.html` is tab-based (`#tab-simple`, `#tab-projection`, `#tab-compare`), switched via `window.switchTab` in `calculator-clean.js`. Old `#about` / `#contact` links redirect to `/about/` and `/contact/`.
- `calculate()`: entry costs (via `calculateStampDutyLocal`) and monthly cashflow for the Simple tab.
- `calculateProjection(...)`: the 30-year projection table and chart.
- `getSellingMultiplier(year, propType, propClass)`: the appreciation model, the piece most likely to need tuning. `Notes.txt` records the reasoning behind specific multiplier values.
- `updateFeePresets()`: default stamp duty/legal fees for new vs. resale.

Check `Notes.txt` before changing constants (stamp duty tiers, appreciation multipliers, occupancy assumptions).
