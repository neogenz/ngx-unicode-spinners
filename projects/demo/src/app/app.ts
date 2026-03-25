import { Component, signal } from '@angular/core';
import { SpinnerComponent, SPINNERS, SPINNER_NAMES } from 'ngx-unicode-spinners';

@Component({
  selector: 'app-root',
  imports: [SpinnerComponent],
  template: `
    <div class="page" [class.light]="light()">
      <header>
        <div class="header-row">
          <h1>ngx-unicode-spinners</h1>
          <button
            class="theme-btn"
            (click)="light.set(!light())"
            [attr.aria-label]="light() ? 'Switch to dark theme' : 'Switch to light theme'"
          >
            {{ light() ? '🌙' : '☀️' }}
          </button>
        </div>
        <p class="tagline">
          18 braille-based Unicode spinner animations for Angular. Zero dependencies.
        </p>
        <div class="install-box">
          <code>npm install ngx-unicode-spinners</code>
        </div>
      </header>

      <main>
        <section>
          <h2>All Spinners</h2>
          <div class="grid">
            @for (s of spinnerList; track s.name) {
              <div class="card">
                <ngx-unicode-spinners [name]="s.name" fontSize="2rem" color="var(--accent)" />
                <code class="spinner-name">{{ s.name }}</code>
                <span class="spinner-meta"> {{ s.frameCount }} frames · {{ s.interval }}ms </span>
              </div>
            }
          </div>
        </section>

        <section class="examples">
          <h2>Usage</h2>

          <h3>Quick Start</h3>
          <pre><code>{{ quickStart }}</code></pre>

          <h3>With Accessibility</h3>
          <pre><code>{{ a11y }}</code></pre>

          <h3>Loading Button</h3>
          <pre><code>{{ loadingBtn }}</code></pre>

          <h3>Custom Spinner</h3>
          <pre><code>{{ custom }}</code></pre>
        </section>
      </main>

      <footer>
        <a href="https://github.com/neogenz/ngx-unicode-spinners" target="_blank" rel="noopener">
          GitHub
        </a>
        <span class="sep">·</span>
        <a href="https://www.npmjs.com/package/ngx-unicode-spinners" target="_blank" rel="noopener">
          npm
        </a>
        <span class="sep">·</span>
        <span>MIT License</span>
      </footer>
    </div>
  `,
  styles: `
    :host {
      display: block;
    }

    .page {
      --bg: #0f0f1a;
      --surface: #1a1a2e;
      --border: #2a2a3e;
      --text: #e0e0e0;
      --muted: #8899aa;
      --accent: #6ee7b7;
      --code-bg: #12121e;

      min-height: 100vh;
      padding: 2rem 1.5rem;
      background: var(--bg);
      color: var(--text);
      font-family:
        system-ui,
        -apple-system,
        sans-serif;
    }

    .page.light {
      --bg: #f8f9fa;
      --surface: #fff;
      --border: #ddd;
      --text: #1a1a2e;
      --muted: #666;
      --accent: #059669;
      --code-bg: #f0f0f5;
    }

    header {
      text-align: center;
      max-width: 640px;
      margin: 0 auto 3rem;
    }

    .header-row {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 1rem;
    }

    h1 {
      font-size: 2rem;
      font-weight: 700;
      margin: 0;
    }

    .tagline {
      color: var(--muted);
      margin: 0.5rem 0 1.5rem;
      line-height: 1.5;
    }

    .install-box code {
      display: inline-block;
      background: var(--code-bg);
      border: 1px solid var(--border);
      border-radius: 6px;
      padding: 0.5rem 1.5rem;
      font-size: 0.9rem;
      color: var(--text);
    }

    .theme-btn {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: 8px;
      padding: 0.35rem 0.55rem;
      font-size: 1.1rem;
      cursor: pointer;
      line-height: 1;
    }

    main {
      max-width: 800px;
      margin: 0 auto;
    }

    h2 {
      font-size: 1.2rem;
      color: var(--accent);
      margin: 2.5rem 0 1rem;
    }

    h3 {
      font-size: 0.95rem;
      margin: 1.5rem 0 0.5rem;
      color: var(--text);
    }

    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
      gap: 1rem;
    }

    .card {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.4rem;
      padding: 1.25rem 0.75rem;
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: 8px;
      transition: border-color 0.2s;
    }

    .card:hover {
      border-color: var(--accent);
    }

    .spinner-name {
      font-size: 0.8rem;
      color: var(--text);
    }

    .spinner-meta {
      font-size: 0.65rem;
      color: var(--muted);
    }

    pre {
      background: var(--code-bg);
      border: 1px solid var(--border);
      border-radius: 8px;
      padding: 1.25rem;
      overflow-x: auto;
      font-size: 0.8rem;
      line-height: 1.6;
      color: var(--text);
    }

    footer {
      text-align: center;
      margin: 3rem auto 0;
      padding: 1.5rem 0;
      max-width: 800px;
      border-top: 1px solid var(--border);
      color: var(--muted);
      font-size: 0.85rem;
    }

    footer a {
      color: var(--accent);
      text-decoration: none;
    }

    footer a:hover {
      text-decoration: underline;
    }

    .sep {
      margin: 0 0.5rem;
    }
  `,
})
export class App {
  protected readonly light = signal(false);

  protected readonly spinnerList = SPINNER_NAMES.map((name) => ({
    name,
    frameCount: SPINNERS[name].frames.length,
    interval: SPINNERS[name].interval,
  }));

  protected readonly quickStart = `import { SpinnerComponent } from 'ngx-unicode-spinners';

@Component({
  imports: [SpinnerComponent],
  template: \`<ngx-unicode-spinners name="orbit" color="#6ee7b7" />\`,
})
export class MyComponent {}`;

  protected readonly a11y = `<!-- Decorative (hidden from assistive tech) -->
<ngx-unicode-spinners name="braille" />

<!-- Announced by screen readers -->
<ngx-unicode-spinners name="braille" ariaLabel="Loading results" />`;

  protected readonly loadingBtn = `<button [disabled]="loading">
  @if (loading) {
    <ngx-unicode-spinners name="orbit" fontSize="0.9em" ariaLabel="Saving..." />
  }
  {{ loading ? 'Saving...' : 'Save' }}
</button>`;

  protected readonly custom = `import { makeGrid, gridToBraille } from 'ngx-unicode-spinners';

const grid = makeGrid(4, 8);
grid[0][0] = true;
grid[3][7] = true;
const frame = gridToBraille(grid);`;
}
