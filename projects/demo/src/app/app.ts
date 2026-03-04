import { Component } from '@angular/core';
import { SpinnerComponent, SPINNER_NAMES, SpinnerName } from 'ngx-unicode-spinners';

@Component({
  selector: 'app-root',
  imports: [SpinnerComponent],
  template: `
    <h1>ngx-unicode-spinners Demo</h1>
    <div class="grid">
      @for (name of spinnerNames; track name) {
        <div class="spinner-card">
          <ngx-unicode-spinners [name]="name" fontSize="2rem" />
          <code>{{ name }}</code>
        </div>
      }
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
        padding: 2rem;
        font-family: system-ui, sans-serif;
        background: #1a1a2e;
        color: #e0e0e0;
        min-height: 100vh;
      }
      h1 {
        text-align: center;
        margin-bottom: 2rem;
      }
      .grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
        gap: 1.5rem;
        max-width: 900px;
        margin: 0 auto;
      }
      .spinner-card {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.5rem;
        padding: 1.5rem;
        border: 1px solid #333;
        border-radius: 8px;
        background: #16213e;
      }
      code {
        font-size: 0.8rem;
        color: #8899aa;
      }
    `,
  ],
})
export class App {
  protected readonly spinnerNames: readonly SpinnerName[] = SPINNER_NAMES;
}
