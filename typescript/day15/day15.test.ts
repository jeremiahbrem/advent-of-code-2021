import {
  createUnvisitedMap,
  parseInput,
  updateDistances,
  partOne,
  partTwo,
  duplicateRight,
  duplicateInitialDown,
} from './day15';

const sample = `1163751742
1381373672
2136511328
3694931569
7463417111
1319128137
1359912421
3125421639
1293138521
2311944581`;

const smallSample = `12
45`;

describe('createMap', () => {
  it('creates map of unvisited nodes', () => {
    const lines = parseInput(smallSample);
    const expected = new Map();
    expected.set('0,0', { risk: 0, adjacent:{'1,0':2,'0,1':4}});
    expected.set('1,0', { risk: Infinity, adjacent:{'1,1':5}});
    expected.set('0,1', { risk: Infinity, adjacent:{'1,1':5}});
    expected.set('1,1', { risk: Infinity, adjacent:{'1,0':2, '0,1':4}});
    expect(createUnvisitedMap(lines)).toEqual(expected);
  });
});
describe('checkAdjacentRisks', () => {
  const unvisited = new Map();
  unvisited.set('1,0', { risk: Infinity, adjacent:{'1,1':5}});
  unvisited.set('0,1', { risk: Infinity, adjacent:{'1,1':5}});
  unvisited.set('1,1', { risk: Infinity, adjacent:{'1,0':2, '0,1':4}});

  it('it updates adjacent risks', () => {
    const current = { risk: 0, adjacent:{'1,0':2,'0,1':4}};
    updateDistances(current, unvisited, {});
    const expected = new Map();
    expected.set('1,0', { risk: 2, adjacent:{'1,1':5}});
    expected.set('0,1', { risk: 4, adjacent:{'1,1':5}});
    expected.set('1,1', { risk: Infinity, adjacent:{'1,0':2, '0,1':4}});
    expect(unvisited).toEqual(expected);
  });
  it('it updates adjacent risks again', () => {
    const current = { risk: 2, adjacent:{'1,1':5}};
    updateDistances(current, unvisited, {});
    const expected = new Map();
    expected.set('1,0', { risk: 2, adjacent:{'1,1':5}});
    expected.set('0,1', { risk: 4, adjacent:{'1,1':5}});
    expected.set('1,1', { risk: 7, adjacent:{'1,0':2, '0,1':4}});
    expect(unvisited).toEqual(expected);
  });
});
describe('duplicateInitialRight', () => {
  it('duplicates lines to the right', () => {
    const lines = parseInput(smallSample);
    expect(duplicateRight(lines, 4)).toEqual([
      '1223344556',
      '4556677889'
    ]);
  });
});
describe('duplicateInitialDown', () => {
  it('duplicates lines to the right', () => {
    const lines = parseInput(smallSample);
    expect(duplicateInitialDown(lines)).toEqual([
      '12',
      '45',
      '23',
      '56',
      '34',
      '67',
      '45',
      '78',
      '56',
      '89'
    ]);
  });
});
describe('day 15 part 1', () => {
  it('finds total risk of lowest risk path', () => {
    expect(partOne(sample)).toBe(40);
  });
});
describe('day 15 part 2', () => {
  it('finds total risk of larger lowest risk path', () => {
    expect(partTwo(sample)).toBe(315);
  });
});
