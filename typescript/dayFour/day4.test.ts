import { partOne, partTwo, parseBoards, isWinner, calculateWinningScore, markBoard } from './day4';

const sampleInput = `7,4,9,5,11,17,23,2,0,14,21,24,10,16,13,6,15,25,12,22,18,20,8,19,3,26,1`;

const sampleBoards = `22 13 17 11  0
8  2 23  4 24
21  9 14 16  7
6 10  3 18  5
1 12 20 15 19

3 15  0  2 22
9 18 13 17  5
19  8  7 25 23
20 11 10 24  4
14 21 16 12  6

14 21 17 24  4
10 16 15  9 19
18  8 23 26 20
22 11 13  6  5
2  0 12  3  7`;

describe('parseBoard', () => {
  it('creates array of boards ready for marking', () => {
    const testInput = `1 2 10
    3 4 5

    10 7 6
    5 4 3`;
    expect(parseBoards(testInput)).toEqual([
      [
        [{ num: 1, marked: false }, { num: 2, marked: false }, { num: 10, marked: false }],
        [{ num: 3, marked: false }, { num: 4, marked: false }, { num: 5, marked: false }],
      ],
      [
        [{ num: 10, marked: false }, { num: 7, marked: false }, { num: 6, marked: false }],
        [{ num: 5, marked: false }, { num: 4, marked: false }, { num: 3, marked: false }],
      ],
    ])
  })
});
describe('isWinner', () => {
  it('finds winning row', () => {
    const winningBoard = [
      [{ num: 1, marked: true }, { num: 2, marked: true }],
      [{ num: 3, marked: false }, { num: 4, marked: false }],
    ];
    expect(isWinner(winningBoard)).toBeTruthy();
  });
  it('finds winning column', () => {
    const winningBoard = [
      [{ num: 1, marked: true }, { num: 2, marked: false }],
      [{ num: 3, marked: true }, { num: 4, marked: false }],
    ];
    expect(isWinner(winningBoard)).toBeTruthy();
  });
  it('does not find winning board', () => {
    const losingBoard = [
      [{ num: 1, marked: true }, { num: 2, marked: false }],
      [{ num: 3, marked: false }, { num: 4, marked: true }],
    ];
    expect(isWinner(losingBoard)).toBeFalsy();
  });
});
describe('calculateWinningScore', () => {
  it('calculates the score of the winning board', () => {
    const winningBoard = [
      [{ num: 1, marked: true }, { num: 2, marked: true }],
      [{ num: 3, marked: false }, { num: 4, marked: false }],
    ];
    const winningNum = 4;
    expect(calculateWinningScore(winningBoard, winningNum)).toBe(28);
  });
});
describe('markBoard', () => {
  const testBoard = [
    [{ num: 1, marked: false }, { num: 2, marked: false }],
    [{ num: 2, marked: false }, { num: 4, marked: false }],
  ];
  it ('marks a matching number', () => {
    markBoard(2, testBoard);
    expect(testBoard).toEqual([
      [{ num: 1, marked: false }, { num: 2, marked: true }],
      [{ num: 2, marked: true }, { num: 4, marked: false }],
    ])
  })
})
describe('day 4 part 1', () => {
  it('calculates winning board score', () => {
    expect(partOne(sampleInput, sampleBoards)).toBe(4512);
  });
});
describe('day 4 part 2', () => {
  it('calculates last winning board score', () => {
    expect(partTwo(sampleInput, sampleBoards)).toBe(1924);
  });
});
