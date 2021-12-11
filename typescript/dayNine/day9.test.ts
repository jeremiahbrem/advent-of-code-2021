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

const realSample = `5434456789899876598943212349988734679896554212468998765634987654567895454569876745567898765987654678
4421345997789997987894103458976521398765432101457897664529876543988987353478965434456799974398766789
3210237896698999876789214567895320129878543212346987543212989432499976212389876521234589867219878999
8732456934567987655678925679976543234999657323657898952101296521276895423467987420145678954323989987`

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
  it('counts total of output values', () => {
    expect(partTwo(sampleInput)).toBe(1134);
  });
});
