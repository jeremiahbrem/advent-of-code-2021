import { readFileSync } from "fs";

export function parseInput(input: string): Record<string, any> {
  const lines = input.split(/\r?\n/);
  const divider = lines.findIndex(x => !x);
  const dotStrings = lines.slice(0, divider);
  const folds = lines.slice(divider + 1);
  const dots: Record<string, number>[] = [];
  let maxX = 0;
  let maxY = 0;

  dotStrings.forEach(line => {
    const split = line.split(',');
    const x = +split[0];
    const y = +split[1];
    if (x > maxX - 1) {
      maxX = x + 1;
    }
    if (y > maxY - 1) {
      maxY = y + 1;
    }
    dots.push({x, y});
  })

  const paper: boolean[][] = [];

  for (let y = 0; y < maxY; y++) {
    for (let x = 0; x < maxX; x++) {
      if (!paper[y]) {
        paper[y] = [];
      }
      paper[y][x] = false;
    }
  }
  dots.forEach(({x,y}) => paper[y][x] = true);
  return { paper, folds };
}

type RowStat = {
  row: boolean[];
  position: 'left' | 'right';
}

type RowDiff = {
  max: RowStat;
  min: RowStat;
  diff: number;
}

export function rowDiff(arrayLeft: boolean[], arrayRight: boolean[]): RowDiff {
  let max: RowStat;
  let min: RowStat;
  let diff: number = 0;

  if (arrayLeft.length > arrayRight.length) {
    max = { row: arrayLeft, position: 'left' };
    min = { row: arrayRight, position: 'right' };
    diff = max.row.length - min.row.length;
  } else {
    max = { row: arrayRight, position: 'right' };
    min = { row: arrayLeft, position: 'left' };
    diff = max.row.length - min.row.length;
  }

  return { max, min, diff }
}

type RowsStat = {
  rows: boolean[][]
  position: 'top' | 'bottom';
}

type RowsDiff = {
  max: RowsStat;
  min: RowsStat;
  diff: number;
}

export function topBottomDiff(top: boolean[][], bottom: boolean[][]): RowsDiff {
  let max: RowsStat;
  let min: RowsStat;
  let diff: number = 0;

  if (top.length > bottom.length) {
    max = { rows: top, position: 'top' };
    min = { rows: bottom, position: 'bottom' };
    diff = max.rows.length - min.rows.length;
  } else {
    max = { rows: bottom, position: 'bottom' };
    min = { rows: top, position: 'top' };
    diff = max.rows.length - min.rows.length;
  }

  return { max, min, diff }
}

export function foldRow(arrayLeft: boolean[], arrayRight: boolean[]): boolean[] {
  const { max, min, diff } = rowDiff(arrayLeft, arrayRight);
  let newRow: boolean[] = [...max.row];

  if (max.position === 'right') {
    newRow.reverse();
  } else {
    min.row.reverse();
  }

  for (let i = newRow.length - 1; i >= diff; i--) {
    if (min.row[i - diff]) {
      newRow[i] = true;
    }
  }
  return newRow;
}

export function foldRows(top: boolean[][], bottom: boolean[][]): boolean[][] {
  const { max, min, diff } = topBottomDiff(top, bottom);
  let newRows: boolean[][] = [...max.rows];

  if (max.position === 'bottom') {
    newRows.reverse();
  } else {
    min.rows.reverse();
  }

  for (let i = newRows.length - 1; i >= diff; i--) {
    for (let j = 0; j < newRows[i].length; j++) {
      if (min.rows[i - diff][j]) {
        newRows[i][j] = true;
      }
    }
  }
  return newRows;
}

export function foldLeft(paper: boolean[][], position: number): boolean[][] {
  const newPaper: boolean[][] = [];
  paper.forEach(row => {
    const arrayLeft = row.slice(0, position);
    const arrayRight = row.slice(position + 1);
    newPaper.push(foldRow(arrayLeft, arrayRight));
  });
  return newPaper;
}

export function foldUp(paper: boolean[][], position: number): boolean[][] {
  const top = paper.slice(0, position);
  const bottom = paper.slice(position + 1);
  return foldRows(top, bottom);
}

export function doFold(fold: string, paper: boolean[][]): boolean[][] {
  const split = fold.split(' ')[2].split(/=/);
  const direction = split[0];
  const position = +split[1];
  let newPaper: boolean[][] = [];

  if (direction === 'x') {
    newPaper = foldLeft(paper, position);
  } else {
    newPaper = foldUp(paper, position);
  }
  return newPaper;
}

export function partOne(input: string): number {
  const { paper, folds } = parseInput(input);
  const newPaper = doFold(folds[0], paper);

  let count = 0;
  newPaper.forEach(row => {
    row.forEach(column => {
      if (column) {
        count++;
      }
    })
  });

  return count;
}

export function partTwo(input: string): any[][] {
  const { paper, folds } = parseInput(input);
  let newPaper: boolean[][] = [...paper];
  folds.forEach((fold: string) => newPaper = doFold(fold, newPaper));
  const dots = newPaper.map(y => y.map(x => x ? '#' : '.'));
  return dots;
}

if(require.main === module) {
  const input = readFileSync("inputs/day13.txt", { encoding: "ascii" });
  // console.log(partOne(input));
  console.log(partTwo(input));
}
