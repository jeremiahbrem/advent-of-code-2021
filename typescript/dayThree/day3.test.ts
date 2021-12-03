import { partOne, partTwo, parseInput } from './day3';

const sampleInput = `00100
11110
10110
10111
10101
01111
00111
11100
10000
11001
00010
01010`;

describe('day 2 part 1', () => {
  it('calculates power consumptionx', () => {
    expect(partOne(parseInput(sampleInput))).toBe(198);
  });
});
describe('day 2 part 2', () => {
  it('calculates life support', () => {
    expect(partTwo(parseInput(sampleInput))).toBe(230);
  });
});
