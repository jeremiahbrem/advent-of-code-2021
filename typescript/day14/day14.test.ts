import {
  parseInput,
  getValue,
  doSteps
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
describe('doStep', () => {
  it('returns new key count', () => {
    const { rules } = parseInput(sample);
    const initial = {
      CH: 0,
      HH: 0,
      CB: 1,
      NH: 0,
      HB: 0,
      HC: 0,
      HN: 0,
      NN: 1,
      BH: 0,
      NC: 1,
      NB: 0,
      BN: 0,
      BB: 0,
      BC: 0,
      CC: 0,
      CN: 0
    };
    expect(doSteps(1, initial, rules)).toEqual({
      CH: 1,
      HH: 0,
      CB: 0,
      NH: 0,
      HB: 1,
      HC: 0,
      HN: 0,
      NN: 0,
      BH: 0,
      NC: 1,
      NB: 1,
      BN: 0,
      BB: 0,
      BC: 1,
      CC: 0,
      CN: 1
    })
  });
});
describe('day 14 part 1', () => {
  it('returns difference between max and min letter count', () => {
    expect(getValue(sample, 10)).toBe(1588);
    expect(getValue(sample, 40)).toBe(2188189693529);
  });
});