import { partOne, partTwo, parseInput } from './day1';

const sampleInput = `199
200
208
210
200
207
240
269
260
263`;

describe('day 1 part 1', () => {
  it('calculates depth increases', () => {
    expect(partOne(parseInput(sampleInput))).toBe(7);
  });
});
describe('day 1 part 2', () => {
  it('calculates depth increases', () => {
    expect(partTwo(parseInput(sampleInput))).toBe(5);
  });
});
