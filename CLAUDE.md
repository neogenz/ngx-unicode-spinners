# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

pnpm, not npm — the lockfile is `pnpm-lock.yaml`.

```bash
pnpm start        # Serve demo app at http://localhost:4200
pnpm build        # Build library → dist/ngx-unicode-spinners/
pnpm build:demo   # Build demo app → dist/demo/
pnpm watch        # Build library in watch mode
pnpm test         # Run tests with Vitest
pnpm lint
pnpm format:check
```

`ng build` alone fails: both projects declare a build target, so the CLI cannot
pick one. Every build script names its project explicitly.

To run a single test file:
```bash
pnpm ng test --include="**/spinner.component.spec.ts"
```

## Releasing

Bump `version` in `projects/ngx-unicode-spinners/package.json`, commit, then:

```bash
git tag vX.Y.Z && git push --follow-tags
```

Pushing a `v*` tag runs `.github/workflows/release.yml`, which tests, builds, and
publishes `ngx-unicode-spinners` to npm via Trusted Publishing (OIDC) — no token,
no OTP, provenance attached. GitHub mints a short-lived identity token that npm
trusts because `neogenz/ngx-unicode-spinners` + `release.yml` are registered as a
Trusted Publisher on the package.

**Never `npm publish` from a laptop** — the account has 2FA on writes, so it fails
with `EOTP` and would produce an unsigned artifact.

The run uses the workflow file from the *tagged* commit. If a tag predates a
workflow change, move it (`git tag -f vX.Y.Z && git push -f origin vX.Y.Z`) —
safe only while that version has never been published.

## Architecture

Angular 22 monorepo with two projects:

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
