import { readFileSync } from "fs";

export function parseInput(input: string): string[] {
  const lines = input.split(/\r?\n/);
  return lines;
}

export function retrieveOutput(line: string): string[] {
  const outputString = line.split(/ \| /)[1];
  return outputString.split(/ /);
}

export function retrieveSignals(line: string): string[] {
  const signalString = line.split(/ \/ /)[0];
  return signalString.split(/ /);
}

export function createDecoder(line: string): Record<string, number> {
  const allLetters = ['a','b','c','d','e','f','g'];
  const signals = retrieveSignals(line);
  const one = signals.find(x => x.length === 2);
  const oneA = one![0];
  const oneB = one![1];
  const four = signals.find(x => x.length === 4);
  const seven = signals.find(x => x.length === 3);
  const eight = signals.find(x => x.length === 7);
  const fiveLengths = signals.filter(x => x.length === 5);
  const sixLengths = signals.filter(x => x.length === 6);
  const three = fiveLengths.find(x => (
    x.includes(oneA) && x.includes(oneB)
  ));
  const leftSide = allLetters.filter(x => !three?.includes(x));
  const zero = sixLengths.find(x => (
    x.includes(oneA) && x.includes(oneB) &&
    x.includes(leftSide[0]) && x.includes(leftSide[1])
  ));
  const nine = sixLengths.find(x => (
    x.includes(oneA) && x.includes(oneB) && x !== zero
  ));
  const six = sixLengths.find(x => x !== zero && x !== nine);
  const lowerLeft = allLetters.find(x => !nine?.includes(x));
  const two = fiveLengths.find(x => x !== three && x.includes(lowerLeft!));
  const five = fiveLengths.find(x => x !== two && x !== three);

  return {
    [sortLetters(zero!)]: 0,
    [sortLetters(one!)]: 1,
    [sortLetters(two!)]: 2,
    [sortLetters(three!)]: 3,
    [sortLetters(four!)]: 4,
    [sortLetters(five!)]: 5,
    [sortLetters(six!)]: 6,
    [sortLetters(seven!)]: 7,
    [sortLetters(eight!)]: 8,
    [sortLetters(nine!)]: 9
  }
}

const sortLetters = (signal: string): string => {
  const arr = signal.split('');
  const sorted = arr.sort();
  return sorted.join('');
}

export function getOutputValue(line: string): number {
  const decoder = createDecoder(line);
  const output = retrieveOutput(line);
  const value = output.map(x => `${decoder[sortLetters(x)]}`);
  return +value.join('');
}

export function countUniqueSegments(line: string): number {
  const uniqueSegmentLengths = [2,3,4,7];
  const output = retrieveOutput(line);
  const uniqueCount = output.filter(x => uniqueSegmentLengths.includes(x.length));
  return uniqueCount.length;
}

export function partOne(input: string): number {
  const lines = parseInput(input);
  let count = 0;
  lines.forEach(line => {
    count += countUniqueSegments(line);
  });
  return count;
}

export function partTwo(input: string): number {
  const lines = parseInput(input);
  let total = 0;
  lines.forEach(line => total += getOutputValue(line));
  return total;
}

if(require.main === module) {
  const input = readFileSync("inputs/day8.txt", { encoding: "ascii" });
  console.log(partOne(input));
  console.log(partTwo(input));
}
