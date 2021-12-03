import { partOne, partTwo, parseInput } from './day2';

const sampleInput = `forward 5
down 5
forward 8
up 3
down 8
forward 2`;

describe('day 2 part 1', () => {
  it('calculates horizontal * depth', () => {
    expect(partOne(parseInput(sampleInput))).toBe(150);
  });
});
describe('day 2 part 2', () => {
  it('calculates horizontal * depth', () => {
    expect(partTwo(parseInput(sampleInput))).toBe(900);
  });
});
