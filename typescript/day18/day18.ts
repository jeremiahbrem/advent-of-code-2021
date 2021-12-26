import { readFileSync } from "fs";

export function parseInput(input: string): string[] {
  const lines = input.split(/\r?\n/);

  return lines;
}

export function addNumbers(numOne: string, numTwo: string): string {
  return `[${numOne},${numTwo}]`;
}

type ExplodingPair = {
  start: number;
  end: number;
  pair: string;
}

type AdjacentNum = {
  start: number;
  end: number;
  num: string;
};

type SplittingNum = AdjacentNum;

export function getExplodingPair(number: string): ExplodingPair | undefined {
  let currentLevel = 0;

  for (let i = 1; i < number.length; i++) {
    if (number[i] === '[') {
      currentLevel++;
    }
    if (currentLevel === 4) {
      const start = i;
      let j = i;
      while (number[j] !== ']') {
        j++;
      }
      return { start, end: j, pair: number.slice(i, j + 1) };
    }
    if (number[i] === ']') {
      currentLevel--;
    }
  }
}

export function getSplittingNum(number: string): SplittingNum | undefined {
  const match = number.match(/[0-9][0-9]/);
  if (match) {
    return { num: match[0], start: match.index!, end: match.index! + 2 };
  }
}

export function getLeftNumber(start: number, number: string): AdjacentNum | undefined {
  for (let i = start; i > 0; i--) {
    if (number[i].match(/[0-9]/)) {
      let start = i;
      let num = number[i];
      if (number[i - 1] && number[i - 1].match(/[0-9]/)) {
        start = i - 1;
        num = number[i - 1] + num;
      }
      return { start, end: i + 1, num: number.slice(start, i + 1) }
    }
  }
}

export function getRightNumber(start: number, number: string): AdjacentNum | undefined {
  for (let i = start; i < number.length; i++) {
    if (number[i].match(/[0-9]/)) {
      let end = i + 1;
      let start = i;
      let num = number[i];
      if (number[i + 1] && number[i + 1].match(/[0-9]/)) {
        num = num + number[i + 1];
        end = i + 2;
      }
      return { start, end, num: number.slice(start, end) }
    }
  }
}

export function updateLeftNum(
  leftNum: AdjacentNum,
  number: string,
  pairNums: RegExpMatchArray): string {

  let newNumber = '';
  const { start, end, num } = leftNum;
  newNumber = number.slice(0, start);
  const newLeftNum = +num + +pairNums![0];
  newNumber += `${newLeftNum}`;
  let newEnd = end;
  newNumber += number.slice(newEnd);
  return newNumber;
}

export function updateRightNum(
  rightNum: AdjacentNum,
  number: string,
  pairNums: RegExpMatchArray): string {

  let newNumber = '';
  const { start, end, num } = rightNum;
  newNumber = number.slice(0, start);
  const newRightNum = +num + +pairNums![1];
  newNumber += `${newRightNum}`;
  let newEnd = end;
  newNumber += number.slice(newEnd);
  return newNumber;
}


export function updateExplodingPair(
  explodingPair: ExplodingPair,
  number: string): string {

  const { start, end, pair } = explodingPair;
  let newNumber = '';
  newNumber = number.slice(0, start);
  newNumber += '0';
  newNumber += number.slice(end + 1);
  return newNumber;
}

export function explode(number: string, explodingPair: ExplodingPair): string {
  let newNumber = number;
  const { start, end, pair } = explodingPair;
  const pairNums = pair.match(/[0-9][0-9]?/g)!;
  newNumber = updateExplodingPair(explodingPair, newNumber);
  const leftNum = getLeftNumber(start - 1, newNumber);
  let rightStart = end - (pair.length - 2);

  if (leftNum) {
    const result = updateLeftNum(leftNum, newNumber, pairNums);
    if (result.length > newNumber.length) {
      rightStart += 1;
    }
    newNumber = result;
  }

  const rightNum = getRightNumber(rightStart, newNumber);
  if (rightNum) {
    newNumber = updateRightNum(rightNum, newNumber, pairNums);
  }
  return newNumber;
}

export function split(number: string, splitNum: SplittingNum): string {
  const { start, end, num } = splitNum;
  let newNumber = number.slice(0, start);
  const leftNum = Math.floor(+num / 2);
  const rightNum = Math.ceil(+num / 2);
  newNumber += `[${leftNum},${rightNum}]`;
  newNumber += number.slice(end);
  return newNumber;
}

export function getFinalSum(addedNum: string): string {
  let newString = addedNum;
  while (getExplodingPair(newString) || getSplittingNum(newString)) {
    const explodePair = getExplodingPair(newString);

    if (explodePair) {
      newString = explode(newString, explodePair);
      continue;
    }

    const splitNum = getSplittingNum(newString);
    if (splitNum) {
      newString = split(newString, splitNum);
      continue;
    }
  }
  return newString;
}

const matchRegex = /\[[0-9]?[0-9]?[0-9]?[0-9],[0-9]?[0-9]?[0-9]?[0-9]\]/;

export function replacePair(string: string): string {
  let newString = '';
  const match = string.match(matchRegex)!;
  const split = match[0].split(/,/);
  const newNum = 3 * +(split[0].replace(/\[/, '')) + 2 * +(split[1].replace(/\]/, ''));
  newString = string.slice(0, match.index!);
  newString += `${newNum}`;
  newString += string.slice(match.index! + match[0].length);
  return newString;
}

export function replacePairs(number: string): string {
  let newString = number;
  while (newString.match(matchRegex)) {
    newString = replacePair(newString);
  }
  return newString;
}

export function reduceNums(nums: string[]): string {
  return nums.reduce((a, b) => {
    const addNum = addNumbers(a, b);
    return getFinalSum(addNum);
  });
}

export function partOne(input: string): number {
  const lines = parseInput(input);
  const finalSum = reduceNums(lines);
  return +replacePairs(finalSum);
}

export function partTwo(input: string): number {
  const lines = parseInput(input);
  let max = -Infinity;

  for (let i = 0; i < lines.length; i++) {
    for (let j = 0; j < lines.length; j++) {
      if (i === j) {
        continue;
      }
      const finalSum = reduceNums([lines[i], lines[j]]);
      const magnitude = +replacePairs(finalSum);
      if (magnitude > max) {
        max = magnitude;
      }
    }
  }
  return max;
}

if(require.main === module) {
  const input = readFileSync("inputs/day18.txt", { encoding: "ascii" });
  console.log(partOne(input));
  console.log(partTwo(input));
}