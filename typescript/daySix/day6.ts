import { readFileSync } from "fs";

export function parseInput(input: string): number[] {
  const nums = input.split(/,/).map(x => +x);

  return nums;
}

export function partOne(input: string): number {
  return calculateFishCounts(input, 80);
}

export function partTwo(input: string): number {
  return calculateFishCounts(input, 256);
}

export type Counts = Record<number, number>;

const timerIndexes = new Array(9).fill(0);

function calculateFishCounts(input: string, days: number): number {
  let counts = getInitialCounts(input);

  for (let i = 0; i < days; i++) {
    counts = updateCounts(counts);
  }

  let sum = 0;
  timerIndexes.forEach((x, i) => sum += counts[i]);
  return sum;
}

export function getInitialCounts(input: string): Counts {
  let timers = parseInput(input);

  const counts: Counts = {};

  timerIndexes.forEach((x, i) => counts[i] = 0);
  timers.forEach(x => counts[x]++);
  return counts;
}

export function updateCounts(counts: Counts): Counts {
  const newCounts: Counts = {};

  timerIndexes.forEach((x, i) => {
    if (i === 6) {
      newCounts[i] = (counts[7] ?? 0) + (counts[0] ?? 0);
    }
    else if (i === 8) {
      newCounts[i] = counts[0] ?? 0;
    } else {
      newCounts[i] = counts[i + 1] ?? 0;
    }
  });

  return newCounts;
}

if(require.main === module) {
  const inputs = readFileSync("inputs/day6.txt", { encoding: "ascii" });
  console.log(partOne(inputs));
  console.log(partTwo(inputs));
}
