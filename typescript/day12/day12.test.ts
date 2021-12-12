import {
  getAllUniqueCaves,
  parseInput,
  getAllPossibleSteps,
  createPaths,
  partOne,
  partTwo
} from './day12';

const sample = `start-A
start-b
A-c
A-b
b-d
A-end
b-end`;

const expectedPaths = `start,A,b,A,c,A,end
start,A,b,A,end
start,A,b,end
start,A,c,A,b,A,end
start,A,c,A,b,end
start,A,c,A,end
start,A,end
start,b,A,c,A,end
start,b,A,end
start,b,end`;

describe('getAllUniqueCaves', () => {
  it('returns array of all unique caves', () => {
    const lines = parseInput(sample);
    expect(getAllUniqueCaves(lines)).toEqual([
      'start','A','b','c','d','end'
    ]);
  });
});
describe('getAllPossibleSteps', () => {
  it('returns all possible steps for each cave', () => {
    const lines = parseInput(sample);
    expect(getAllPossibleSteps(lines)).toEqual({
      start: ['A','b'],
      A: ['c','b','end'],
      b: ['A','d','end'],
      c: ['A'],
      d: ['b'],
    })
  });
});
describe('createPaths', () => {
  it('creates all path combinations', () => {
    const lines = parseInput(sample);
    const expected = parseInput(expectedPaths);
    expect(createPaths(lines).sort()).toEqual(expected.sort());
  })
})
describe('day 12 part 1', () => {
  it('counts total valid paths', () => {
    expect(partOne(sample)).toBe(10);
  });
});
describe('day 12 part 2', () => {
  it('counts total valid paths', () => {
    expect(partTwo(sample)).toBe(36);
  });
});