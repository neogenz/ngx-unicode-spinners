export type SpinnerName =
  | 'braille'
  | 'braillewave'
  | 'dna'
  | 'scan'
  | 'rain'
  | 'scanline'
  | 'pulse'
  | 'snake'
  | 'sparkle'
  | 'cascade'
  | 'columns'
  | 'orbit'
  | 'breathe'
  | 'waverows'
  | 'checkerboard'
  | 'helix'
  | 'fillsweep'
  | 'diagswipe';

export interface SpinnerData {
  readonly frames: readonly string[];
  readonly interval: number;
}
