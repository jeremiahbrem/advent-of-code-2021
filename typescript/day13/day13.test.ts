import {
  foldRow,
  foldRows,
  foldLeft,
  partOne,
  partTwo
} from './day13';

const sample = `6,10
0,14
9,10
0,3
10,4
4,11
6,0
6,12
4,1
0,13
10,12
3,4
3,0
8,4
1,10
2,14
8,10
9,0

fold along y=7
fold along x=5`;

describe('foldRow', () => {
  it('creates new folded row from larger left and smaller right rows', () => {
    const arrayLeft = [true, false, true, false, false, true];
    const arrayRight = [false, true, true];
    expect(foldRow(arrayLeft, arrayRight)).toEqual([true, false, true, true, true, true]);
  });
  it('creates new folded row from larger right and smaller left rows', () => {
    const arrayLeft = [false, true, true];
    const arrayRight = [true, false, true, false, false, true];
    expect(foldRow(arrayLeft, arrayRight)).toEqual([true, false, false, true, true, true]);
  });
  it('creates new folded row from equal right and left rows', () => {
    const arrayLeft = [false, true, true, false];
    const arrayRight = [true, false, false, true];
    expect(foldRow(arrayLeft, arrayRight)).toEqual([true, true, true, true]);
  });
});
describe('foldRows', () => {
  it('creates new folded rows from larger bottom and smaller top rows', () => {
    const arrayTop = [
      [true, false, true],
      [true, true, false],
      [false, true, false]
    ];
    const arrayBottom = [
      [ true, false, true],
      [false, true, true],
      [false, false, false],
      [true, false, false]
    ];
    expect(foldRows(arrayTop, arrayBottom)).toEqual([
      [true, false, false],
      [true, false, true],
      [true, true, true],
      [true, true, true]
    ]);
  });
  it('creates new folded rows from smaller bottom and larger top rows', () => {
    const arrayTop = [
      [ true, false, true],
      [false, true, true],
      [false, false, false],
      [true, false, false]
    ];
    const arrayBottom = [
      [true, false, true],
      [true, true, false],
      [false, true, false]
    ];
    expect(foldRows(arrayTop, arrayBottom)).toEqual([
      [true, false, true],
      [false, true, true],
      [true, true, false],
      [true, false, true]
    ]);
  });
  it('creates new folded rows from equal bottom and top rows', () => {
    const arrayTop = [
      [ true, false, true],
      [false, true, true],
      [false, false, false],
      [true, false, false]
    ];
    const arrayBottom = [
      [true, false, true],
      [true, true, false],
      [false, true, false],
      [false, false, true]
    ];
    expect(foldRows(arrayTop, arrayBottom)).toEqual([
      [true, false, true],
      [false, true, true],
      [true, true, false],
      [true, false, true]
    ]);
  });
});
describe('foldLeft', () => {
  it('returns new paper folded left', () => {
    const paper = [
      [true, false, true, false, true],
      [false, true, true, false, false],
      [false, false, false, true, true]
    ];
    expect(foldLeft(paper, 2)).toEqual([
      [true, false],
      [false, true],
      [true, true]
    ]);
  });
});
describe('day 13 part 1', () => {
  it('counts total visible dots', () => {
    expect(partOne(sample)).toBe(17);
  });
});
describe('day 13 part 2', () => {
  it('produces final folded paper', () => {
    expect(partTwo(sample)).toEqual([
      ['#','#','#','#','#'],
      ['#','.','.','.','#'],
      ['#','.','.','.','#'],
      ['#','.','.','.','#'],
      ['#','#','#','#','#'],
      ['.','.','.','.','.'],
      ['.','.','.','.','.'],
    ]);
  });
});