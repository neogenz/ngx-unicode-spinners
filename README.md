# ngx-unicode-spinners

[![npm version](https://img.shields.io/npm/v/ngx-unicode-spinners.svg)](https://www.npmjs.com/package/ngx-unicode-spinners)
[![license](https://img.shields.io/github/license/neogenz/ngx-unicode-spinners.svg)](LICENSE)
[![Angular](https://img.shields.io/badge/Angular-21%2B-red.svg)](https://angular.dev)

18 braille-based Unicode spinner animations for Angular. Zero runtime dependencies.

[**Live Demo**](https://neogenz.github.io/ngx-unicode-spinners/)

```html
<ngx-unicode-spinners name="braille" />
```

## Installation

```bash
# npm
npm install ngx-unicode-spinners
# pnpm
pnpm add ngx-unicode-spinners
```

Requires Angular 21+.

## Usage

Import `SpinnerComponent` in your standalone component or `NgModule`:

```ts
import { SpinnerComponent } from 'ngx-unicode-spinners';

@Component({
  imports: [SpinnerComponent],
  template: `<ngx-unicode-spinners name="orbit" color="#6ee7b7" fontSize="1.5rem" />`,
})
export class MyComponent {}
```

## Inputs

| Input      | Type        | Default    | Description                                      |
|------------|-------------|------------|--------------------------------------------------|
| `name`     | `SpinnerName` | required | Spinner to display (see list below)             |
| `interval` | `number`    | per-spinner | Frame interval in ms                            |
| `color`    | `string`    | inherited  | CSS color value                                  |
| `fontSize` | `string`    | inherited  | CSS font-size value                              |
| `playing`  | `boolean`   | `true`     | Start/stop animation                             |
| `ariaLabel`| `string`    | —          | Accessible label. If omitted, spinner is hidden from assistive technology. |

## Available spinners

| Name           | Name          | Name         |
|----------------|---------------|--------------|
| `braille`      | `rain`        | `orbit`      |
| `braillewave`  | `scanline`    | `breathe`    |
| `dna`          | `pulse`       | `waverows`   |
| `scan`         | `snake`       | `checkerboard` |
| `sparkle`      | `cascade`     | `helix`      |
| `columns`      | `fillsweep`   | `diagswipe`  |

List all names at runtime:

```ts
import { SPINNER_NAMES } from 'ngx-unicode-spinners';

console.log(SPINNER_NAMES); // readonly SpinnerName[]
```

## Accessibility

By default the spinner is decorative (`aria-hidden="true"`). Pass `ariaLabel` to make it announced:

```html
<ngx-unicode-spinners name="braille" ariaLabel="Loading results" />
```

This sets `aria-label` on the host and adds an `aria-live="polite"` sr-only span inside.

## Custom spinners

`makeGrid` and `gridToBraille` are exported for building your own frame sequences. Each braille character encodes a 4-row × 2-column dot grid.

```ts
import { makeGrid, gridToBraille } from 'ngx-unicode-spinners';

// Create a 4×8 grid (= 4 braille chars wide)
const grid = makeGrid(4, 8);

// Light up some dots
grid[0][0] = true;
grid[3][7] = true;

const frame = gridToBraille(grid); // single string of braille chars
```

Or use `UnicodeSpinnersService` if you prefer injection:

```ts
import { UnicodeSpinnersService } from 'ngx-unicode-spinners';

@Injectable({ providedIn: 'root' })
export class MyService {
  constructor(private spinners: UnicodeSpinnersService) {
    const grid = this.spinners.makeGrid(4, 4);
    const frame = this.spinners.gridToBraille(grid);
  }
}
```

## Recipes

### Loading button

```html
<button [disabled]="loading">
  @if (loading) {
    <ngx-unicode-spinners name="orbit" fontSize="0.9em" ariaLabel="Saving..." />
  }
  {{ loading ? 'Saving...' : 'Save' }}
</button>
```

### Conditional display

```html
@if (isLoading) {
  <ngx-unicode-spinners name="scan" ariaLabel="Loading data" />
} @else {
  <app-content [data]="data" />
}
```

### Inline status indicator

```html
<span class="status">
  <ngx-unicode-spinners name="braille" fontSize="1em" color="currentColor" />
  Syncing...
</span>
```

## Development

```bash
npm start        # Demo app at http://localhost:4200
npm run build    # Build library to dist/ngx-unicode-spinners/
npm test         # Run tests with Vitest
```

## License

MIT
