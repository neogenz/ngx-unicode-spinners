/**
 * Braille Grid Utility
 *
 * Each braille char is a 2-col x 4-row dot grid.
 * Dot numbering & bit values:
 *   Row 0:  dot1 (0x01)  dot4 (0x08)
 *   Row 1:  dot2 (0x02)  dot5 (0x10)
 *   Row 2:  dot3 (0x04)  dot6 (0x20)
 *   Row 3:  dot7 (0x40)  dot8 (0x80)
 *
 * Base codepoint: U+2800
 */
const BRAILLE_DOT_MAP = [
  [0x01, 0x08], // row 0
  [0x02, 0x10], // row 1
  [0x04, 0x20], // row 2
  [0x40, 0x80], // row 3
];

/**
 * Convert a 2D boolean grid into a braille string.
 * grid[row][col] = true means dot is raised.
 * Width must be even (2 dot-columns per braille char).
 */
export function gridToBraille(grid: boolean[][]): string {
  const rows = grid.length;
  const cols = grid[0] ? grid[0].length : 0;
  const charCount = Math.ceil(cols / 2);
  let result = '';
  for (let c = 0; c < charCount; c++) {
    let code = 0x2800;
    for (let r = 0; r < 4 && r < rows; r++) {
      for (let d = 0; d < 2; d++) {
        const col = c * 2 + d;
        if (col < cols && grid[r] && grid[r][col]) {
          code |= BRAILLE_DOT_MAP[r][d];
        }
      }
    }
    result += String.fromCodePoint(code);
  }
  return result;
}

/** Create an empty grid of given dimensions */
export function makeGrid(rows: number, cols: number): boolean[][] {
  if (rows <= 0 || cols <= 0) return [];
  return Array.from({ length: rows }, () => Array(cols).fill(false));
}
