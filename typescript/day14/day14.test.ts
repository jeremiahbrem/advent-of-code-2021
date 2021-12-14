import {
  parseInput,
  getValue
} from './day14';

const sample = `NNCB

CH -> B
HH -> N
CB -> H
NH -> C
HB -> C
HC -> B
HN -> C
NN -> C
BH -> H
NC -> B
NB -> B
BN -> B
BB -> N
BC -> B
CC -> N
CN -> C`;

const smallSample = `NNCB

CH -> B
HH -> N`;

describe('parseInput', () => {
  it('returns template and object with pair: insert key values', () => {
    expect(parseInput(smallSample)).toEqual({
      template: 'NNCB',
      rules: {
        'CH': 'B',
        'HH': 'N'
      }
    });
  });
});

describe('day 14 part 1', () => {
  it('returns difference between max and min letter count', () => {
    expect(getValue(sample, 10)).toBe(1588);
    expect(getValue(sample, 40)).toBe(2188189693529);
  });
});