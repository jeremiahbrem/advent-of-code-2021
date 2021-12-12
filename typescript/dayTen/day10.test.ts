import {
  isValidClosing,
  partOne,
  getLineCompletion,
  calculateLineCompletionScore,
  partTwo
} from './day10';

const sampleInput = `[({(<(())[]>[[{[]{<()<>>
[(()[<>])]({[<{<<[]>>(
{([(<{}[<>[]}>{[]{[(<()>
(((({<>}<{<{<>}{[]{[]{}
[[<[([]))<([[{}[[()]]]
[{[{({}]{}}([{[{{{}}([]
{<[[]]>}<{[{[{[]{()[[[]
[<(<(<(<{}))><([]([]()
<{([([[(<>()){}]>(<<{{
<{([{{}}[<[[[<>{}]]]>[]]`;

describe('isValidClosing', () => {
  it('determines if closing char is valid', () => {
    const testees = [
      { array: ['{', '['], char: ']', expected: true },
      { array: ['{', '{'], char: '}', expected: true },
      { array: ['{', '<'], char: '>', expected: true },
      { array: ['{', '('], char: ')', expected: true },
    ];
    testees.forEach(({ array, char, expected }) => {
      expect(isValidClosing(char, array)).toBe(expected);
    });
  });
  it('determines if closing char is invalid', () => {
    const testees = [
      { array: ['{', '['], char: '}', expected: false },
      { array: ['{', '{'], char: '>', expected: false },
      { array: ['{', '<'], char: ')', expected: false },
      { array: ['{', '('], char: ']', expected: false },
    ];
    testees.forEach(({ array, char, expected }) => {
      expect(isValidClosing(char, array)).toBe(expected);
    });
  });
})
describe('getLineCompletion', () => {
  it('returns array of objects with completed chars and score', () => {
    expect(getLineCompletion([
      '<','{','(','[','{','{','}','}','[','<','[','[','[','<','>','{','}',']',']',']','>','[',']',']'
    ])).toEqual([
      { closing: ']', score: 2 },
      { closing: ')', score: 1 },
      { closing: '}', score: 3 },
      { closing: '>', score: 4 },
    ])
  })
});
describe('day 9 part 1', () => {
  it('counts total error score', () => {
    expect(partOne(sampleInput)).toBe(26397);
  });
});
describe('calculateCompletionScore', () => {
  it('calculates total line completion score', () => {
    expect(calculateLineCompletionScore([
      { closing: ']', score: 2 },
      { closing: ')', score: 1 },
      { closing: '}', score: 3 },
      { closing: '>', score: 4 },
    ])).toBe(294);
  })
})
describe('day 10 part 2', () => {
  it('returns middle line completion score', () => {
    expect(partTwo(sampleInput)).toBe(288957);
  });
});
