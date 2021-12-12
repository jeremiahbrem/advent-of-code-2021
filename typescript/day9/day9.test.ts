import {
  getAdjacent,
  isLowest,
  partOne,
  parseInput,
  calculateBasinSize,
  partTwo
} from './day9';

const sampleInput = `2199943210
3987894921
9856789892
8767896789
9899965678`;

const testInput = `123
456
987`;

describe('getAdjacent', () => {
  it('should create an array of all adjacent nums', () => {
    const testArray = [
      ['1','4','6'],
      ['3','7','2']
    ];
    const positions = [
      {row: 0, column: 0, expected:
        [
          { row: 0, column: 0, val: 1 },
          { row: 0, column: 1, val: 4 },
          { row: 1, column: 0, val: 3 }
        ]},
      {row: 0, column: 1, expected:
        [
          { row: 0, column: 1, val: 4 },
          { row: 0, column: 0, val: 1 },
          { row: 0, column: 2, val: 6 },
          { row: 1, column: 1, val: 7 },
        ]},
      {row: 0, column: 2, expected:
        [
          { row: 0, column: 2, val: 6 },
          { row: 0, column: 1, val: 4 },
          { row: 1, column: 2, val: 2 }
        ]},
      {row: 1, column: 0, expected:
        [
          { row: 1, column: 0, val: 3 },
          { row: 0, column: 0, val: 1 },
          { row: 1, column: 1, val: 7 }
        ]},
      {row: 1, column: 1, expected:
        [
          { row: 1, column: 1, val: 7 },
          { row: 0, column: 1, val: 4 },
          { row: 1, column: 0, val: 3 },
          { row: 1, column: 2, val: 2 },
        ]},
      {row: 1, column: 2, expected:
        [
          { row: 1, column: 2, val: 2 },
          { row: 0, column: 2, val: 6 },
          { row: 1, column: 1, val: 7 }
        ]},
    ];
    positions.forEach(({row, column, expected}) => {
      expect(getAdjacent(row, column, testArray)).toEqual(expected);
    })
  })
});
describe('parseInput', () => {
  it('parses input into array of arrays', () => {
    expect(parseInput(testInput)).toEqual([
      ['1','2','3'], ['4','5','6'], ['9','8','7']
    ]);
  });
})
describe('getLow', () => {
  it('returns the lowest num in an array', () => {
    expect(isLowest([{val: 1},{val: 4},{val: 6}], 1)).toBeTruthy();
    expect(isLowest([{val: 3},{val: 7},{val: 2}], 3)).toBeFalsy();
    expect(isLowest([{val: 3},{val: 2},{val: 2}], 2)).toBeFalsy();
  });
});
describe('calculateBasinSize', () => {
  it('calculates size of basin with given low position', () => {
    const lines = parseInput(sampleInput);
    expect(calculateBasinSize(0,1,lines)).toBe(3);
    expect(calculateBasinSize(0,9,lines)).toBe(9);
    expect(calculateBasinSize(2,2,lines)).toBe(14);
    expect(calculateBasinSize(4,6,lines)).toBe(9);
  });
});

describe('day 9 part 1', () => {
  it('counts total risk', () => {
    expect(partOne(sampleInput)).toBe(15);
  });
});
describe('day 9 part 2', () => {
  it('returns product of top three basin sizes', () => {
    expect(partTwo(sampleInput)).toBe(1134);
  });
});
