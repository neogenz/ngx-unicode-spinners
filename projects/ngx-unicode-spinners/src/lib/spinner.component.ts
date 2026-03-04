import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  input,
  signal,
  untracked,
} from '@angular/core';
import { SpinnerName } from './types';
import { SPINNERS } from './spinner-data';

@Component({
  selector: 'ngx-unicode-spinners',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[attr.aria-label]': 'ariaLabel() ?? null',
    '[attr.aria-hidden]': 'ariaLabel() ? null : "true"',
    '[style.color]': 'color() ?? null',
    '[style.font-size]': 'fontSize() ?? null',
    '[style.line-height]': '"1"',
    '[style.display]': '"inline-block"',
  },
  template: `
    <span aria-hidden="true">{{ currentFrame() }}</span>
    @if (ariaLabel()) {
      <span role="status" aria-live="polite" class="sr-only">{{ ariaLabel() }}</span>
    }
  `,
  styles: `
    :host {
      white-space: nowrap;
    }
    .sr-only {
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      white-space: nowrap;
      border: 0;
    }
  `,
})
export class SpinnerComponent {
  readonly name = input.required<SpinnerName>();
  readonly interval = input<number>();
  readonly color = input<string>();
  readonly fontSize = input<string>();
  readonly playing = input<boolean>(true);
  readonly ariaLabel = input<string>();

  private readonly frameIndex = signal(0);

  private readonly spinnerData = computed(() => SPINNERS[this.name()]);

  private readonly effectiveInterval = computed(
    () => this.interval() ?? this.spinnerData().interval,
  );

  protected readonly currentFrame = computed(() => this.spinnerData().frames[this.frameIndex()]);

  constructor() {
    effect((onCleanup) => {
      const isPlaying = this.playing();
      const ms = this.effectiveInterval();
      const frameCount = this.spinnerData().frames.length;

      // spinnerData() dépend de name() — un changement de nom déclenche cet effet.
      // On reset l'index sans créer de dépendance sur frameIndex.
      untracked(() => this.frameIndex.set(0));

      if (!isPlaying) return;

      const id = setInterval(() => {
        this.frameIndex.update((i) => (i + 1) % frameCount);
      }, ms);

      onCleanup(() => clearInterval(id));
    });
  }
}
