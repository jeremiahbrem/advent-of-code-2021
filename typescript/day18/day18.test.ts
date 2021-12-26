import {
  addNumbers,
  getExplodingPair,
  getLeftNumber,
  getRightNumber,
  updateLeftNum,
  updateRightNum,
  updateExplodingPair,
  explode,
  getSplittingNum,
  split,
  getFinalSum,
  replacePair,
  replacePairs,
  partOne,
  partTwo
} from './day18';

const sample = `[[[0,[5,8]],[[1,7],[9,6]]],[[4,[1,2]],[[1,4],2]]]
[[[5,[2,8]],4],[5,[[9,9],0]]]
[6,[[[6,2],[5,6]],[[7,6],[4,7]]]]
[[[6,[0,7]],[0,9]],[4,[9,[9,0]]]]
[[[7,[6,4]],[3,[1,3]]],[[[5,5],1],9]]
[[6,[[7,3],[3,2]]],[[[3,8],[5,7]],4]]
[[[[5,4],[7,7]],8],[[8,3],8]]
[[9,3],[[9,9],[6,[4,9]]]]
[[2,[[7,7],7]],[[5,8],[[9,3],[0,2]]]]
[[[[5,2],5],[8,[3,7]]],[[5,[7,5]],[4,4]]]`;

describe('addNumbers', () => {
  it('adds to numbers and return new string', () => {
    const numOne = '[1,2]';
    const numTwo = '[[3,4],5]';
    expect(addNumbers(numOne, numTwo)).toBe('[[1,2],[[3,4],5]]');
  });
});

describe('getExplodingPair', () => {
  it('extracts first exploding pair if existing', () => {
    expect(getExplodingPair('[[[[[9,8],1],2],3],4]')).toEqual({
      start: 4,
      end: 8,
      pair: '[9,8]'
    });
    expect(getExplodingPair('[[[[[4,3],4],4],[7,[[8,4],9]]],[1,1]]')).toEqual({
      start: 4,
      end: 8,
      pair: '[4,3]'
    });
  });
  it('returns undefined if no exploding pairs', () => {
    expect(getExplodingPair('[[[9,[3,8]],[[0,9],6]],[[[3,7],[4,9]],3]]')).toBeUndefined();
  });
});

describe('getLeftNumber', () => {
  it('it gets first number to left if existing', () => {
    expect(getLeftNumber(12, '[7,[6,[5,[4,[3,2]]]]]')).toEqual({
      start: 10,
      end: 11,
      num: '4'
    });
    expect(getLeftNumber(12, '[7,[6,[5,[10,[3,2]]]]]')).toEqual({
      start: 10,
      end: 12,
      num: '10'
    });
  });
});

describe('getRightNumber', () => {
  it('it gets first number to right if existing', () => {
    expect(getRightNumber(8, '[[[[[9,8],1],2],3],4]')).toEqual({
      start: 10,
      end: 11,
      num: '1'
    });
    expect(getRightNumber(8, '[[[[[9,8],10],2],3],4]')).toEqual({
      start: 10,
      end: 12,
      num: '10'
    });
  });
});

describe('updateLeftNum', () => {
  it('updates first left number and returns new number string', () => {
    const leftNum = { start: 10, end: 11, num: '4' };
    const pairNums = '[3,2]'.match(/[0-9][0-9]?/g);
    expect(updateLeftNum(leftNum, '[7,[6,[5,[4,[3,2]]]]]', pairNums!)).toBe(
      '[7,[6,[5,[7,[3,2]]]]]'
    );
  });
  it('updates first double digit left number and returns new number string', () => {
    const leftNum = { start: 10, end: 12, num: '10' };
    const pairNums = '[3,2]'.match(/[0-9][0-9]?/g);
    expect(updateLeftNum(leftNum, '[7,[6,[5,[10,[3,2]]]]]', pairNums!)).toBe(
      '[7,[6,[5,[13,[3,2]]]]]'
    );
  });
  it('updates first left number and returns new number string with new double digit number', () => {
    const leftNum = { start: 10, end: 11, num: '8' };
    const pairNums = '[3,2]'.match(/[0-9][0-9]?/g);
    expect(updateLeftNum(leftNum, '[7,[6,[5,[8,[3,2]]]]]', pairNums!)).toBe(
      '[7,[6,[5,[11,[3,2]]]]]'
    );
  });
});

describe('updateRightNum', () => {
  it('updates first right number and returns new number string', () => {
    const rightNum = { start: 10, end: 11, num: '1' };
    const pairNums = '[9,8]'.match(/[0-9][0-9]?/g);
    expect(updateRightNum(rightNum, '[[[[[9,8],1],2],3],4]', pairNums!)).toBe(
      '[[[[[9,8],9],2],3],4]'
    );
  });
  it('updates first double digit right number and returns new number string', () => {
    const rightNum = { start: 10, end: 12, num: '10' };
    const pairNums = '[9,8]'.match(/[0-9][0-9]?/g);
    expect(updateRightNum(rightNum, '[[[[[9,8],10],2],3],4]', pairNums!)).toBe(
      '[[[[[9,8],18],2],3],4]'
    );
  });
  it('updates first right number and returns new number string with new double digit number', () => {
    const rightNum = { start: 10, end: 11, num: '8' };
    const pairNums = '[9,8]'.match(/[0-9][0-9]?/g);
    expect(updateRightNum(rightNum, '[[[[[9,8],8],2],3],4]', pairNums!)).toBe(
      '[[[[[9,8],16],2],3],4]'
    );
  });
});

describe('updateExplodingPair', () => {
  it('replaces exploding pair with 0', () => {
    const pair = {
      start: 4,
      end: 8,
      pair: '[9,8]'
    };
    expect(updateExplodingPair(pair, '[[[[[9,8],1],2],3],4]')).toBe(
      '[[[[0,1],2],3],4]'
    );
  });
});

describe('explode', () => {
  it('returns new exploded number string with num on right', () => {
    const pair = {
      start: 4,
      end: 8,
      pair: '[9,8]'
    }
    expect(explode('[[[[[9,8],1],2],3],4]', pair)).toBe(
      '[[[[0,9],2],3],4]'
    );
  });
  it('returns new exploded number string with num on left', () => {
    const pair = {
      start: 12,
      end: 16,
      pair: '[3,2]'
    }
    expect(explode('[7,[6,[5,[4,[3,2]]]]]', pair)).toBe(
      '[7,[6,[5,[7,0]]]]'
    );
  });
  it('returns new exploded number string nums on both sides', () => {
    const pair = {
      start: 10,
      end: 14,
      pair: '[7,3]'
    }
    expect(explode('[[3,[2,[1,[7,3]]]],[6,[5,[4,[3,2]]]]]', pair)).toBe(
      '[[3,[2,[8,0]]],[9,[5,[4,[3,2]]]]]'
    );
  });
});

describe('getSplittingNum', () => {
  it('retrieves splitting num if exists', () => {
    expect(getSplittingNum('[[[[0,7],4],[15,[0,13]]],[1,1]]')).toEqual({
      num: '15',
      start: 13,
      end: 15
    });
  });
});

describe('split', () => {
  it('returns new number string after splitting', () => {
    const splitNum = { start: 13, end: 15, num: '15' };
    expect(split('[[[[0,7],4],[15,[0,13]]],[1,1]]', splitNum)).toBe(
      '[[[[0,7],4],[[7,8],[0,13]]],[1,1]]'
    );
  });
});

describe('replacePair', () => {
  it('replaces pair with product', () => {
    expect(replacePair('[[1,2],3]')).toBe('[7,3]');
  });
});

describe('replacePairs', () => {
  it('replaces all pairs with product', () => {
    expect(replacePairs('[[1,2],3]')).toBe('27');
    expect(replacePairs('[[1,2],[[3,4],5]]')).toBe('143');
    expect(replacePairs('[[[[8,7],[7,7]],[[8,6],[7,7]]],[[[0,7],[6,6]],[8,7]]]')).toBe('3488');
  });
});

describe('getFinalSum', () => {
  it('returns final sum of adding two numbers', () => {
    let numOne = '[[[[4,3],4],4],[7,[[8,4],9]]]';
    let numTwo = '[1,1]';
    let addSum = addNumbers(numOne, numTwo);
    expect(getFinalSum(addSum)).toBe(
      '[[[[0,7],4],[[7,8],[6,0]]],[8,1]]'
    );

    numOne = '[[[[7,7],[7,7]],[[8,7],[8,7]]],[[[7,0],[7,7]],9]]';
    numTwo = '[[[[4,2],2],6],[8,7]]';
    addSum = addNumbers(numOne, numTwo);
    expect(getFinalSum(addSum)).toBe(
      '[[[[8,7],[7,7]],[[8,6],[7,7]]],[[[0,7],[6,6]],[8,7]]]'
    );
  });
});

describe('partOne', () => {
  it('gets magnitude of final sum', () => {
    expect(partOne(sample)).toBe(4140);
  });
});
describe('partTwo', () => {
  it('gets largets magnitude', () => {
    expect(partTwo(sample)).toBe(3993);
  });
});