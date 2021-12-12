import { readFileSync } from "fs";

export function parseInput(input: string): string[][] {
  const lines = input.split(/\r?\n/).map(x => x.split(''));
  return lines;
}

export const closingKey: Record<string, OpeningItem> = {
  '}': { opening: '{', score: 1197 },
  ')': { opening: '(', score: 3 },
  ']': { opening: '[', score: 57 },
  '>': { opening: '<', score: 25137 }
};

export const openingKey: Record<string, ClosingItem> = {
  '{': { closing: '}', score: 3 },
  '(': { closing: ')', score: 1 },
  '[': { closing: ']', score: 2 },
  '<': { closing: '>', score: 4 }
};

type ClosingItem = {
  closing: string;
  score: number;
}

type OpeningItem = {
  opening: string;
  score: number;
}

export function isValidClosing(
  char: string,
  opening: string[]): boolean {

  return closingKey[char].opening === opening[opening.length - 1];
}

const openingChars = ['(', '{', '<', '['];
const closingChars = [')', '}', '>', ']'];

export function calculateLineCompletionScore(closingItems: ClosingItem[]): number {
  let totalLineScore = 0;
  closingItems.forEach(({score}) => {
    totalLineScore *= 5;
    totalLineScore += score;
  });
  return totalLineScore;
}

export function getLineCompletion(line: string[]): ClosingItem[] | undefined {
  const opening: string[] = [];
  const closing: ClosingItem[] = [];
  let valid = true;

  for (const char of line) {
    if (!valid) {
      return undefined;
    }
    if (closingChars.includes(char) && !isValidClosing(char, opening)) {
      valid = false;
      break;
    }
    if (closingChars.includes(char)) {
      opening.pop();
      continue;
    }
    if (openingChars.includes(char)) {
      opening.push(char);
    }
  }

  for (let i = opening.length - 1; i >= 0; i--) {
    closing.push(openingKey[opening[i]]);
  }

  return valid ? closing : undefined;
}

export function partOne(input: string): number {
  const lines = parseInput(input);
  let errorScore = 0;

  lines.forEach(line => {
    const opening: string[] = [];
    for (const char of line) {
      if (openingChars.includes(char)) {
        opening.push(char);
        continue;
      }
      if (closingChars.includes(char) && !isValidClosing(char, opening)) {
        errorScore += closingKey[char].score;
        break;
      }
      if (closingChars.includes(char)) {
        opening.pop();
      }
    }
  });
  return errorScore;
}

export function partTwo(input: string): number {
  const lines = parseInput(input);
  let totalScores: number[] = [];
  lines.forEach(line => {
    const lineCompletion = getLineCompletion(line);
    if (!lineCompletion) {
      return;
    }
    totalScores.push(calculateLineCompletionScore(lineCompletion));
  });
  const sorted = [...totalScores];
  sorted.sort((a,b) => a - b);
  const midPoint = Math.floor(sorted.length /  2);
  return sorted[midPoint];
}

if(require.main === module) {
  const input = readFileSync("inputs/day10.txt", { encoding: "ascii" });
  console.log(partOne(input));
  console.log(partTwo(input));
}
