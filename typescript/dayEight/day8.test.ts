import {
  countUniqueSegments,
  retrieveOutput,
  getOutputValue,
  createDecoder,
  partOne,
  partTwo
} from './day8';

const sampleInput = `be cfbegad cbdgef fgaecd cgeb fdcge agebfd fecdb fabcd edb | fdgacbe cefdb cefbgd gcbe
edbfga begcd cbg gc gcadebf fbgde acbgfd abcde gfcbed gfec | fcgedb cgb dgebacf gc
fgaebd cg bdaec gdafb agbcfd gdcbef bgcad gfac gcb cdgabef | cg cg fdcagb cbg
fbegcd cbd adcefb dageb afcb bc aefdc ecdab fgdeca fcdbega | efabcd cedba gadfec cb
aecbfdg fbg gf bafeg dbefa fcge gcbea fcaegb dgceab fcbdga | gecf egdcabf bgf bfgea
fgeab ca afcebg bdacfeg cfaedg gcfdb baec bfadeg bafgc acf | gebdcfa ecba ca fadegcb
dbcfg fgd bdegcaf fgec aegbdf ecdfab fbedc dacgb gdcebf gf | cefg dcbef fcge gbcadfe
bdfegc cbegaf gecbf dfcage bdacg ed bedf ced adcbefg gebcd | ed bcgafe cdgba cbgef
egadfb cdbfeg cegd fecab cgb gbdefca cg fgcdab egfdb bfceg | gbdfcae bgc cg cgb
gcafb gcf dcaebfg ecagb gf abcdeg gaef cafbge fdbac fegbdc | fgae cfgab fg bagce`;

describe('countUniqueSegments', () => {
  it('should count segments with unique length', () => {
    const lines = [
      { line: "x | fdgacbe cefdb cefbgd gcbe", expected: 2 },
      { line: "x | fcgedb cgb dgebacf gc", expected: 3 },
      { line: "x | cg cg fdcagb cbg", expected: 3 },
      { line: "x | efabcd cedba gadfec cb", expected: 1 },
    ];
    lines.forEach(({ line, expected }) => expect(countUniqueSegments(line)).toBe(expected));
  })
});
describe('retrieveOutput', () => {
  it('should split signal and output', () => {
    const line = `be cfbegad cbdgef fgaecd cgeb fdcge agebfd fecdb fabcd edb | fdgacbe cefdb cefbgd gcbe`;
    expect(retrieveOutput(line)).toEqual(
      ['fdgacbe', 'cefdb', 'cefbgd', 'gcbe']);
  })
});
describe('decodeSignals', () => {
  it('should create key/value string to number pairs for decoding', () => {
    const testInput = `acedgfb cdfbe gcdfa fbcad dab cefabd cdfgeb eafb cagedb ab | cdfeb fcadb cdfeb cdbaf`;
    expect(createDecoder(testInput)).toEqual({
      'abcdefg': 8,
      'bcdef': 5,
      'acdfg': 2,
      'abcdf': 3,
      'abd': 7,
      'abcdef': 9,
      'bcdefg': 6,
      'abef': 4,
      'abcdeg': 0,
      'ab': 1,
    })
  })
});
describe('getOutputValue', () => {
  it('should calculate decoded output value for a given line', () => {
    const line = `acedgfb cdfbe gcdfa fbcad dab cefabd cdfgeb eafb cagedb ab | cdfeb fcadb cdfeb cdbaf`;
    expect(getOutputValue(line)).toBe(5353);
  });
})
describe('day 8 part 1', () => {
  it('counts total amount of segments with unique length', () => {
    expect(partOne(sampleInput)).toBe(26);
  });
});
describe('day 8 part 2', () => {
  it('counts total of output values', () => {
    expect(partTwo(sampleInput)).toBe(61229);
  });
});
