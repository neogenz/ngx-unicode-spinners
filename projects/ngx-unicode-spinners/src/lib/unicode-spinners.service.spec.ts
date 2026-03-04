import { TestBed } from '@angular/core/testing';
import { UnicodeSpinnersService } from './unicode-spinners.service';
import { SPINNERS, SPINNER_NAMES } from './spinner-data';

describe('UnicodeSpinnersService', () => {
  let service: UnicodeSpinnersService;

  beforeEach(() => {
    service = TestBed.inject(UnicodeSpinnersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return spinner data by name', () => {
    const spinner = service.getSpinner('braille');
    expect(spinner).toBe(SPINNERS['braille']);
    expect(spinner.frames.length).toBeGreaterThan(0);
    expect(spinner.interval).toBeGreaterThan(0);
  });

  it('should return all 18 spinner names', () => {
    const names = service.getSpinnerNames();
    expect(names.length).toBe(SPINNER_NAMES.length);
    expect(names).toContain('braille');
    expect(names).toContain('orbit');
    expect(names).toContain('diagswipe');
  });

  it('should return all spinners record', () => {
    const all = service.getAllSpinners();
    expect(Object.keys(all).length).toBe(SPINNER_NAMES.length);
    for (const name of SPINNER_NAMES) {
      expect(all[name]).toBeDefined();
      expect(all[name].frames.length).toBeGreaterThan(0);
    }
  });

  it('should create a grid with correct dimensions', () => {
    const grid = service.makeGrid(4, 6);
    expect(grid.length).toBe(4);
    expect(grid[0].length).toBe(6);
    expect(grid.every(row => row.every(cell => cell === false))).toBe(true);
  });

  it('should return empty array for invalid grid dimensions', () => {
    expect(service.makeGrid(0, 5)).toEqual([]);
    expect(service.makeGrid(3, -1)).toEqual([]);
  });

  it('should convert grid to braille string', () => {
    const grid = service.makeGrid(4, 2);
    // All dots off = blank braille char U+2800
    expect(service.gridToBraille(grid)).toBe('\u2800');

    // Set all dots on
    for (let r = 0; r < 4; r++) {
      for (let c = 0; c < 2; c++) {
        grid[r][c] = true;
      }
    }
    // All 8 dots = U+28FF
    expect(service.gridToBraille(grid)).toBe('\u28FF');
  });

  it('should produce one braille char per 2 columns', () => {
    const grid = service.makeGrid(4, 4);
    const result = service.gridToBraille(grid);
    // 4 columns → 2 chars, both blank
    expect(result.length).toBe(2);
    expect(result).toBe('\u2800\u2800');
  });

  it('should encode individual dot positions correctly', () => {
    // dot1 = row0/col0 = 0x01 → U+2801
    const g1 = service.makeGrid(4, 2);
    g1[0][0] = true;
    expect(service.gridToBraille(g1)).toBe('\u2801');

    // dot4 = row0/col1 = 0x08 → U+2808
    const g4 = service.makeGrid(4, 2);
    g4[0][1] = true;
    expect(service.gridToBraille(g4)).toBe('\u2808');

    // dot7 = row3/col0 = 0x40 → U+2840
    const g7 = service.makeGrid(4, 2);
    g7[3][0] = true;
    expect(service.gridToBraille(g7)).toBe('\u2840');

    // dot8 = row3/col1 = 0x80 → U+2880
    const g8 = service.makeGrid(4, 2);
    g8[3][1] = true;
    expect(service.gridToBraille(g8)).toBe('\u2880');
  });

  it('should return empty string for empty grid', () => {
    expect(service.gridToBraille([])).toBe('');
  });

  it('should return empty array for zero cols', () => {
    expect(service.makeGrid(4, 0)).toEqual([]);
  });
});
