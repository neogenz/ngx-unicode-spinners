# ngx-unicode-spinners

Angular 21+ component library for animated Unicode braille spinner loading indicators. Zero dependencies. 18 unique animations.

Ported from [unicode-animations](https://github.com/gunnargray-dev/unicode-animations).

## Installation

```bash
npm install ngx-unicode-spinners
```

## Usage

```typescript
import { SpinnerComponent } from 'ngx-unicode-spinners';

@Component({
  imports: [SpinnerComponent],
  template: `<neogenz-spinner name="braille" />`,
})
export class MyComponent {}
```

### Customization

```html
<neogenz-spinner
  name="orbit"
  color="#3b82f6"
  fontSize="2rem"
  [playing]="isLoading()"
  ariaLabel="Loading..."
/>
```

## API

### `<neogenz-spinner>` Component

| Input       | Type          | Default         | Description                    |
|-------------|---------------|-----------------|--------------------------------|
| `name`      | `SpinnerName` | **required**    | Which spinner animation to use |
| `interval`  | `number`      | spinner default | Override animation speed (ms)  |
| `color`     | `string`      | inherited       | CSS color                      |
| `fontSize`  | `string`      | inherited       | CSS font-size                  |
| `playing`   | `boolean`     | `true`          | Play/pause the animation       |
| `ariaLabel` | `string`      | —               | Accessible label               |

### `UnicodeSpinnersService`

```typescript
import { UnicodeSpinnersService } from 'ngx-unicode-spinners';

@Component({ ... })
export class MyComponent {
  private spinners = inject(UnicodeSpinnersService);

  names = this.spinners.getSpinnerNames();       // all 18 names
  data  = this.spinners.getSpinner('braille');    // { frames, interval }
}
```

### Direct exports

```typescript
import { SPINNERS, SPINNER_NAMES, makeGrid, gridToBraille } from 'ngx-unicode-spinners';
```

## Available Spinners

| Name           | Chars | Interval |
|----------------|-------|----------|
| `braille`      | 1     | 80ms     |
| `braillewave`  | 4     | 100ms    |
| `dna`          | 4     | 80ms     |
| `scan`         | 4     | 70ms     |
| `rain`         | 4     | 100ms    |
| `scanline`     | 3     | 120ms    |
| `pulse`        | 3     | 180ms    |
| `snake`        | 2     | 80ms     |
| `sparkle`      | 4     | 150ms    |
| `cascade`      | 4     | 60ms     |
| `columns`      | 3     | 60ms     |
| `orbit`        | 1     | 100ms    |
| `breathe`      | 1     | 100ms    |
| `waverows`     | 4     | 90ms     |
| `checkerboard` | 3     | 250ms    |
| `helix`        | 4     | 80ms     |
| `fillsweep`    | 2     | 100ms    |
| `diagswipe`    | 2     | 60ms     |

## Accessibility

- `role="img"` on host element
- Without `ariaLabel`: `aria-hidden="true"` (decorative)
- With `ariaLabel`: visible to screen readers with `aria-live="polite"` status region

## License

MIT
