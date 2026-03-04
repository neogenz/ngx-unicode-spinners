# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm start        # Serve demo app at http://localhost:4200
npm run build    # Build library (dist/ngx-unicode-spinners/) + demo
npm run watch    # Build in watch mode
npm test         # Run tests with Vitest
```

To run a single test file:
```bash
npx ng test --include="**/spinner.component.spec.ts"
```

## Architecture

Angular 21 monorepo with two projects:

- **`projects/ngx-unicode-spinners/`** — publishable library (zero runtime deps)
- **`projects/demo/`** — demo app consuming the library via path alias `ngx-unicode-spinners → dist/ngx-unicode-spinners`

### Library Structure

```
src/lib/
├── spinner.component.ts       # Standalone component (ngx-unicode-spinners)
├── spinner-data.ts            # 18 pre-computed braille spinner animations
├── braille-utils.ts           # makeGrid() / gridToBraille() for procedural generation
├── types.ts                   # SpinnerName, SpinnerData types
├── unicode-spinners.service.ts # Service: getSpinner(), getSpinnerNames(), getAllSpinners()
public-api.ts                  # Barrel exports
```

### Key Patterns

- **SpinnerComponent** uses Angular signals + OnPush. Animation runs via `setInterval`, cleared on destroy to prevent leaks. Inputs: `name` (required), `interval`, `color`, `fontSize`, `playing`, `ariaLabel`.
- **Accessibility**: `role="img"` on host. Without `ariaLabel` → `aria-hidden="true"`. With label → `aria-live="polite"` + sr-only span.
- **Braille rendering**: each character encodes a 4×2 dot grid via bit flags on top of U+2800. `gridToBraille()` converts a 2D boolean grid to a braille Unicode string.
- Spinner frames are either static arrays (in `spinner-data.ts`) or generated procedurally using `makeGrid` + `gridToBraille`.

### Testing

Vitest with fake timers (`vi.useFakeTimers()`). Tests live alongside source files (`*.spec.ts`).
