import { Injectable } from '@angular/core';
import { SpinnerData, SpinnerName } from './types';
import { SPINNERS, SPINNER_NAMES } from './spinner-data';
import { makeGrid, gridToBraille } from './braille-utils';

@Injectable({ providedIn: 'root' })
export class UnicodeSpinnersService {
  getSpinner(name: SpinnerName): SpinnerData {
    return SPINNERS[name];
  }

  getSpinnerNames(): readonly SpinnerName[] {
    return SPINNER_NAMES;
  }

  getAllSpinners(): Readonly<Record<SpinnerName, SpinnerData>> {
    return SPINNERS;
  }

  makeGrid(rows: number, cols: number): boolean[][] {
    return makeGrid(rows, cols);
  }

  gridToBraille(grid: boolean[][]): string {
    return gridToBraille(grid);
  }
}
