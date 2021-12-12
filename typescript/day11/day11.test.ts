import {
  getAdjacent,
  doStep,
  parseInput,
  partOne,
  partTwo
} from './day11';

const smallTestInput = `11111
19991
19191
19991
11111`;

const smallTestAfterOne = `34543
40004
50005
40004
34543`;

const smallTestAfterTwo = `45654
51115
61116
51115
45654`;

const sampleInput = `5483143223
2745854711
5264556173
6141336146
6357385478
4167524645
2176841721
6882881134
4846848554
5283751526`;

const expectedAfterOne = `6594254334
3856965822
6375667284
7252447257
7468496589
5278635756
3287952832
7993992245
5957959665
6394862637`;

const expectedAfterTwo = `8807476555
5089087054
8597889608
8485769600
8700908800
6600088989
6800005943
0000007456
9000000876
8700006848`;

describe('getAdjacent', () => {
  it('returns objects containing data for each adjacent item (not including given position)', () => {
    const testInput = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9]
    ];
    expect(getAdjacent(1, 1, testInput)).toEqual([
      { row: 0, column: 1, val: 2 },
      { row: 0, column: 0, val: 1 },
      { row: 0, column: 2, val: 3 },
      { row: 1, column: 0, val: 4 },
      { row: 1, column: 2, val: 6 },
      { row: 2, column: 1, val: 8 },
      { row: 2, column: 0, val: 7 },
      { row: 2, column: 2, val: 9 },
    ]);
  });
});
describe('doStep', () => {
  const input = smallTestInput;
  const lines = parseInput(input);
  const biggerInput = sampleInput;
  const biggerLines = parseInput(biggerInput);
  it('increments energy (and adjacent items if flashed) for each num', () => {
    expect(doStep(lines).lines).toEqual(parseInput(smallTestAfterOne));
    expect(doStep(lines).lines).toEqual(parseInput(smallTestAfterTwo));
  });
  it('gets correct output with bigger sample', () => {
    expect(doStep(biggerLines).lines).toEqual(parseInput(expectedAfterOne));
    expect(doStep(biggerLines).lines).toEqual(parseInput(expectedAfterTwo));
  })
});

describe('day 11 part 1', () => {
  it('counts total flashes', () => {
    expect(partOne(sampleInput)).toBe(1656);
  });
});
describe('day 11 part 2', () => {
  it('returns step of all synchronized', () => {
    expect(partTwo(sampleInput)).toBe(195);
  });
});
