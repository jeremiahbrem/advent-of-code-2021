import { readFileSync } from "fs";

export function parseInput(input: string): string[] {
  const nums = input.split(/,/);

  return nums;
}

type BoardNum = {
  num: number;
  marked: boolean;
}

type BoardRow = BoardNum[];
type Board = BoardRow[];

export function parseBoards(boardInput: string): Board[] {
  const boards: Board[] = [[]];
  const lines = boardInput.split(/\r?\n/);
  lines.forEach(x => {
    if (x != '') {
      boards[boards.length - 1]
        .push(x.split(' ')
        .filter(y => y)
        .map(z => ({ num: +z, marked: false })));
    } else {
      boards.push([]);
    }
  })
  return boards;
}

export function isWinner(board: Board): boolean {
  if (board.some(r => r.every(n => n.marked))) {
    return true;
  }
  let hasWinningColumn = false;
  board[0].forEach((n, i) => {
    if (board.every(r => r[i].marked)) {
      hasWinningColumn = true;
    }
  })
  return hasWinningColumn;
}

export function calculateWinningScore(board: Board, winningNum: number): number {
  let unMarkedSum = 0;
  board.forEach(r => r.forEach(n => {
    if (!n.marked) {
      unMarkedSum += n.num;
    }
  }));
  return unMarkedSum * winningNum;
}

export function markBoard(input: number, board: Board): void {
  board.forEach(r => r.forEach(n => {
    if (n.num === input) {
      n.marked = true
    }
  }));
}

export function partOne(input: string, boardInput: string): number {
  const boards = parseBoards(boardInput);
  const inputs = parseInput(input);
  let winner: Board | null = null;
  let winningNum: number | null = null;

  for (let i = 0; i < inputs.length; i++) {

    for (let y = 0; y < boards.length; y++) {
      markBoard(+inputs[i], boards[y]);

      if (isWinner(boards[y])) {
        winner = boards[y];
        winningNum = +inputs[i];
        break;
      }
    }
    if (winner) {
      break;
    }
  }

  return calculateWinningScore(winner!, winningNum!);
}

export function partTwo(input: string, boardInput: string): number {
  const boards = parseBoards(boardInput);
  const inputs = parseInput(input);
  const winningBoardIndexes: number[] = [];
  let lastWinner: Board | null = null;
  let lastWinningNum: number | null = null;

  for (let i = 0; i < inputs.length; i++) {

    for (let y = 0; y < boards.length; y++) {
      markBoard(+inputs[i], boards[y]);

      if (isWinner(boards[y]) && !winningBoardIndexes.includes(y)) {
        winningBoardIndexes.push(y);
      }
      if (winningBoardIndexes.length === boards.length) {
        lastWinningNum = +inputs[i];
        lastWinner = boards[y];
        break;
      }
    }
    if (lastWinner) {
      break;
    }
  }
  return calculateWinningScore(lastWinner!, lastWinningNum!);
}

if(require.main === module) {
  const boardInput = readFileSync("inputs/day4boards.txt", { encoding: "ascii"});
  const inputs = readFileSync("inputs/day4input.txt", { encoding: "ascii"});
  console.log(partOne(inputs, boardInput));
  console.log(partTwo(inputs, boardInput));
}
