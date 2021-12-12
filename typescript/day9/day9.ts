import { readFileSync } from "fs";

export function parseInput(input: string): string[][] {
  const lines = input.split(/\r?\n/).map(x => x.split(''));
  return lines;
}

export function getAdjacent(row: number, index: number, lines: string[][]): Record<string, any>[] {
  const adjacent: Record<string, number>[] = [];
  adjacent.push({
    row: row,
    column: index,
    val: +lines[row][index]
  });

  if (lines[row - 1]) {
    adjacent.push({
      row: row - 1,
      column: index,
      val: +lines[row - 1][index]
    });
  }
  if (lines[row][index - 1] !== undefined) {
    adjacent.push({
      row: row,
      column: index - 1,
      val: +lines[row][index - 1]
    });
  }
  if (lines[row][index + 1] !== undefined) {
    adjacent.push({
      row: row,
      column: index + 1,
      val: +lines[row][index + 1]
    });
  }
  if (lines[row + 1]) {
    adjacent.push({
      row: row + 1,
      column: index,
      val: +lines[row + 1][index]
    });
  }
  return adjacent;
}

export function isLowest(adjacent: Record<string, number>[], num: number): boolean {
  const nums: number[] = [];
  adjacent.forEach(x => nums.push(x.val));
  const lowest = Math.min(...nums);

  return num === lowest && adjacent.filter(x => x.val === num).length === 1;
}

export function calculateBasinSize(row: number, column: number, lines: string[][]): number {
    const basinItems = new Set<string>();
    const adjacent = getAdjacent(row, column, lines);
    basinItems.add(`${row}-${column}`);
    addToBasin(adjacent, basinItems, lines);
    return basinItems.size;
}

export function addToBasin(items: Record<string, number>[], basinItems: Set<string>, lines: string[][]) {
  if (items.length == 0) {
    return;
  }
  items.forEach(item => {
    if (item.val === 9 || basinItems.has(`${item.row}-${item.column}`)) {
      return;
    }
    basinItems.add(`${item.row}-${item.column}`);
    const adjacent = getAdjacent(item.row, item.column, lines);
    addToBasin(adjacent, basinItems, lines);
  });
}

export function partOne(input: string): number {
  const lines = parseInput(input);
  let riskSum = 0;
  lines.forEach((line, row) => {
    line.forEach((num, index) => {
      const adjacent = getAdjacent(row, index, lines);
      if (isLowest(adjacent, +num)) {
        riskSum += +num + 1;
      }
    });
  });
  return riskSum;
}

export function partTwo(input: string): number {
  const lines = parseInput(input);
  const basinSizes: number[] = [];
  const lowPoints: Record<string, any>[] = [];

  lines.forEach((line, row) => {
    line.forEach((num, column) => {
      const adjacent = getAdjacent(row, column, lines);
      if (isLowest(adjacent, +num)) {
        lowPoints.push({ row, column });
      }
    });
  });

  lowPoints.forEach(({ row, column}) => {
    basinSizes.push(calculateBasinSize(row, column, lines));
  });
  const descending = [...basinSizes];
  descending.sort((a,b) => b - a);
  return descending[0] * descending[1] * descending[2];
}

if(require.main === module) {
  const input = readFileSync("inputs/day9.txt", { encoding: "ascii" });
  console.log(partOne(input));
  console.log(partTwo(input));
}
