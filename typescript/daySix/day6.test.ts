import {
  getInitialCounts,
  partOne,
  partTwo,
  updateCounts } from './day6';

const sampleInput = `3,4,3,1,2`;

describe('getInitialCounts', () => {
  it('calculates initial fish timer counts', () => {
    expect(getInitialCounts(sampleInput)).toEqual({
      0: 0,
      1: 1,
      2: 1,
      3: 2,
      4: 1,
      5: 0,
      6: 0,
      7: 0,
      8: 0
    });
  });
});
describe('updateCounts', () => {
  it('updates fish timer counts', () => {
    const testSample = getInitialCounts(`0, 1, 4, 0, 6, 8, 8`);
    expect(updateCounts(testSample)).toEqual({
      0: 1,
      1: 0,
      2: 0,
      3: 1,
      4: 0,
      5: 1,
      6: 2,
      7: 2,
      8: 2
    });
  });
});
describe('day 6 part 1', () => {
  it('calculates number of fish after 80 days', () => {
    expect(partOne(sampleInput)).toBe(5934);
  });
});
describe('day 6 part 2', () => {
  it('calculates number of fish after 256 days', () => {
    expect(partTwo(sampleInput)).toBe(26984457539);
  });
});
