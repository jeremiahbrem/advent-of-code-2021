import { readFileSync } from "fs";

export function parseInput(input: string): number[][] {
  const lines = input.split(/\r?\n/).map(x => x.split('').map(x => +x));
  return lines;
}

export function incrementAdjacent(adjacent: Item[], lines: number[][]): void {
  for (const item of adjacent) {
    incrementItem(item, lines, false);
  }
}

export function incrementItem(item: Item, lines: number[][], initial: boolean): void {
  const { row, column, val } = item;
  lines[row][column] = val === 9
    ? 0
    : val === 0 && !initial
      ? 0
      : val + 1;
}

export function hasNewFlashes(flashes: Item[], lines: number[][]): boolean {
  let newFlashes = false;
  const currentFlashes = getFlashes(lines);
  for (const { row, column } of currentFlashes) {
    if (!flashes.find(x => x.row === row && x.column === column)) {
      newFlashes = true;
    }
  }
  return newFlashes;
}

export function getFlashes(lines: number[][]): Item[] {
  const flashes: Item[] = [];
  lines.forEach((line, row) => {
    line.forEach((val, column) => {
      if (val === 0) {
        flashes.push({row, column, val})
      }
    });
  });
  return flashes;
}

export function incrementNewFlashAdjacent(
  flashes: Item[],
  lines: number[][]): Item[] {

  const allFlashes = getFlashes(lines);
  const newFlashes = allFlashes.filter(x => {
    return !flashes.find(y => y.column === x.column && x.row === y.row)
  });

  if (newFlashes.length > 0) {
    flashes = flashes.concat(newFlashes);
  }

  newFlashes.forEach(({row, column}) => {
    const adjacent = getAdjacent(row, column, lines);
    incrementAdjacent(adjacent, lines);
  });
  return flashes;
}

export function doStep(lines: number[][]): Record<any, any> {
  lines.forEach((line, row) => {
    line.forEach((val, column) => {
      incrementItem({row, column, val}, lines, true);
    });
  });

  let flashes: Item[] = [];

  while (hasNewFlashes(flashes, lines)) {
    flashes = incrementNewFlashAdjacent(flashes, lines);
  }
  const totalFlashes = flashes.length;

  return { lines, totalFlashes };
}

type Item = {
  row: number;
  column: number;
  val: number;
}

export function getAdjacent(row: number, index: number, lines: number[][]): Item[] {
  const adjacent: Item[] = [];
  if (lines[row - 1]) {
    adjacent.push({
      row: row - 1,
      column: index,
      val: lines[row - 1][index]
    });
    if (lines[row - 1][index - 1] !== undefined) {
      adjacent.push({
        row: row - 1,
        column: index - 1,
        val: lines[row - 1][index - 1]
      });
    }
    if (lines[row - 1][index + 1] !== undefined) {
      adjacent.push({
        row: row - 1,
        column: index + 1,
        val: lines[row - 1][index + 1]
      });
    }
  }
  if (lines[row][index - 1] !== undefined) {
    adjacent.push({
      row: row,
      column: index - 1,
      val: lines[row][index - 1]
    });
  }
  if (lines[row][index + 1] !== undefined) {
    adjacent.push({
      row: row,
      column: index + 1,
      val: lines[row][index + 1]
    });
  }
  if (lines[row + 1]) {
    adjacent.push({
      row: row + 1,
      column: index,
      val: lines[row + 1][index]
    });
    if (lines[row + 1][index - 1] !== undefined) {
      adjacent.push({
        row: row + 1,
        column: index - 1,
        val: lines[row + 1][index - 1]
      });
    }
    if (lines[row + 1][index + 1] !== undefined) {
      adjacent.push({
        row: row + 1,
        column: index + 1,
        val: lines[row + 1][index + 1]
      });
    }
  }
  return adjacent;
}

export function partOne(input: string): number {
  const lines = parseInput(input);
  let flashes = 0;
  for (let i = 0; i < 100; i++) {
    const { totalFlashes } = doStep(lines);
    flashes += totalFlashes;
  }
  return flashes;
}

export function isSynchronized(lines: number[][]) {
  let synchronized = true;
  for (const line of lines) {
    for (const num of line) {
      if (num !== 0) {
        synchronized = false;
        break;
      }
    }
    if (!synchronized) {
      break;
    }
  }
  return synchronized;
}

export function partTwo(input: string): number {
  const lines = parseInput(input);
  let synchronized = false;
  let index = 0;
  for (let i = 0; !synchronized; i++) {
    doStep(lines);
    if (isSynchronized(lines)) {
      index = i + 1;
      break;
    }
  }
  return index;
}

if(require.main === module) {
  const input = readFileSync("inputs/day11.txt", { encoding: "ascii" });
  console.log(partOne(input));
  console.log(partTwo(input));
}
