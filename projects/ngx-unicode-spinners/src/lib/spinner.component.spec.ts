import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, signal } from '@angular/core';
import { vi, beforeEach, afterEach, describe, it, expect } from 'vitest';
import { SpinnerComponent } from './spinner.component';
import { SPINNERS } from './spinner-data';
import { SpinnerName } from './types';

@Component({
  imports: [SpinnerComponent],
  template: `<ngx-unicode-spinners
    [name]="name()"
    [interval]="interval()"
    [color]="color()"
    [fontSize]="fontSize()"
    [playing]="playing()"
    [ariaLabel]="ariaLabel()"
  />`,
})
class TestHostComponent {
  name = signal<SpinnerName>('braille');
  interval = signal<number | undefined>(undefined);
  color = signal<string | undefined>(undefined);
  fontSize = signal<string | undefined>(undefined);
  playing = signal(true);
  ariaLabel = signal<string | undefined>(undefined);
}

describe('SpinnerComponent', () => {
  const braille = SPINNERS['braille'];

  let fixture: ComponentFixture<TestHostComponent>;
  let host: TestHostComponent;

  beforeEach(async () => {
    vi.useFakeTimers();
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    host = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
    vi.useRealTimers();
  });

  function getFrameText(): string {
    return fixture.nativeElement.querySelector('ngx-unicode-spinners span[aria-hidden]')
      .textContent;
  }

  function getSpinnerEl(): HTMLElement {
    return fixture.nativeElement.querySelector('ngx-unicode-spinners');
  }

  it('should render the first frame immediately', () => {
    expect(getFrameText()).toBe(braille.frames[0]);
  });

  it('should advance frames over time', () => {
    vi.advanceTimersByTime(braille.interval);
    fixture.detectChanges();
    expect(getFrameText()).toBe(braille.frames[1]);
  });

  it('should loop back to first frame after last', () => {
    vi.advanceTimersByTime(braille.interval * braille.frames.length);
    fixture.detectChanges();
    expect(getFrameText()).toBe(braille.frames[0]);
  });

  it('should pause animation when playing is false', () => {
    host.playing.set(false);
    fixture.detectChanges();
    vi.advanceTimersByTime(braille.interval * 5);
    fixture.detectChanges();
    expect(getFrameText()).toBe(braille.frames[0]);
  });

  it('should resume animation when playing toggles back to true', () => {
    host.playing.set(false);
    fixture.detectChanges();
    vi.advanceTimersByTime(500);

    host.playing.set(true);
    fixture.detectChanges();
    vi.advanceTimersByTime(braille.interval);
    fixture.detectChanges();
    expect(getFrameText()).toBe(braille.frames[1]);
  });

  it('should use custom interval when provided', () => {
    host.interval.set(200);
    fixture.detectChanges();

    vi.advanceTimersByTime(200);
    fixture.detectChanges();
    expect(getFrameText()).toBe(braille.frames[1]);
  });

  it('should apply color style', () => {
    host.color.set('#ff0000');
    fixture.detectChanges();
    expect(getSpinnerEl().style.color).toBe('rgb(255, 0, 0)');
  });

  it('should apply fontSize style', () => {
    host.fontSize.set('2rem');
    fixture.detectChanges();
    expect(getSpinnerEl().style.fontSize).toBe('2rem');
  });

  it('should set aria-hidden when no ariaLabel', () => {
    const el = getSpinnerEl();
    expect(el.getAttribute('aria-hidden')).toBe('true');
    expect(el.getAttribute('aria-label')).toBeNull();
  });

  it('should set aria-label and remove aria-hidden when ariaLabel provided', () => {
    host.ariaLabel.set('Loading');
    fixture.detectChanges();
    const el = getSpinnerEl();
    expect(el.getAttribute('aria-label')).toBe('Loading');
    expect(el.getAttribute('aria-hidden')).toBeNull();
  });

  it('should show sr-only status span when ariaLabel provided', () => {
    host.ariaLabel.set('Loading');
    fixture.detectChanges();
    const srSpan = fixture.nativeElement.querySelector('ngx-unicode-spinners .sr-only');
    expect(srSpan).toBeTruthy();
    expect(srSpan.textContent.trim()).toBe('Loading');
  });

  it('should reset frame index to 0 when name changes mid-animation', () => {
    // Advance into braille a few frames
    vi.advanceTimersByTime(braille.interval * 3);
    fixture.detectChanges();
    expect(getFrameText()).toBe(braille.frames[3]);

    // Switch spinner — should reset to frame 0, not frame 3
    host.name.set('orbit');
    fixture.detectChanges();
    expect(getFrameText()).toBe(SPINNERS['orbit'].frames[0]);
  });

  it('should not animate when playing starts as false', () => {
    fixture.destroy();
    vi.useRealTimers();
    vi.useFakeTimers();

    TestBed.resetTestingModule();
    TestBed.configureTestingModule({ imports: [TestHostComponent] }).compileComponents();
    const f = TestBed.createComponent(TestHostComponent);
    f.componentInstance.playing.set(false);
    f.detectChanges();

    vi.advanceTimersByTime(braille.interval * 5);
    f.detectChanges();
    const frameText = f.nativeElement.querySelector(
      'ngx-unicode-spinners span[aria-hidden]',
    ).textContent;
    expect(frameText).toBe(braille.frames[0]);
    f.destroy();
  });

  it('should not leak intervals on destroy', () => {
    fixture.destroy();
    vi.advanceTimersByTime(1000);
  });
});
