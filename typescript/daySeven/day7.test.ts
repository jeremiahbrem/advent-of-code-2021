import {
  calculateTotalFuelCost,
  calculateTotalFuelCostTwo,
  calculateSingleFuelCost,
  getMax,
  parseInput,
  partOne,
  partTwo
} from './day7';

const sampleInput = `16,1,2,0,4,2,7,1,2,14`;

describe('getMax', () => {
  it('calculates max in array', () => {
    expect(getMax(parseInput(sampleInput))).toBe(16);
  })
});
describe('calculateTotalFuelCost', () => {
  it('calculates the total fuel cost (sum of distances from each number to given number)', () => {
    const parsedInput = parseInput(sampleInput);
    expect(calculateTotalFuelCost(parsedInput, 2)).toBe(37);
  });
});
describe('calculateTotalFuelCostTwo', () => {
  it('calculates the total increasing fuel cost (sum of distances from each number to given number)', () => {
    const parsedInput = parseInput(sampleInput);
    expect(calculateTotalFuelCostTwo(parsedInput, 5)).toBe(168);
  });
});
describe('calculateSingleFuelCost', () => {
  it('calculates the fuel cost of a single distance traveled', () => {
    expect(calculateSingleFuelCost(11)).toBe(66);
  });
});
describe('day 7 part 1', () => {
  it('calculates total fuel cost', () => {
    expect(partOne(sampleInput)).toBe(37);
  });
});
describe('day 7 part 2', () => {
  it('calculates total increasing fuel cost', () => {
    expect(partTwo(sampleInput)).toBe(168);
  });
});
