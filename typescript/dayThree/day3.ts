import { readFileSync } from "fs";

export function parseInput(input: string): string[] {
  const nums = input.split(/\r?\n/);

  return nums;
}

export function partOne(commands: string[]): number {
  const counts = calculateMostCommon(commands);
  let gamma = '';
  let epsilon = '';

  counts.forEach(x => {
    if (x.zero > x.one) {
      gamma += '0';
      epsilon += '1';
    } else {
      gamma += '1';
      epsilon += '0';
    }
  });

  return parseInt(gamma, 2) * parseInt(epsilon, 2);
}

type MostCommon = {
  zero: number;
  one: number;
}

export function calculateMostCommon(commands: string[]): MostCommon[] {
  const length = commands[0].length;


  const counts = new Array(length).fill(0).map(x => ({
    'zero': 0, 'one': 0
  }));

  const parseNum = (num: string) => {
    for (let i = 0; i < num.length; i++) {
      if (num[i] === '0') {
        ++counts[i].zero;
      }
      if (num[i] === '1') {
        ++counts[i].one;
      }
    }
  }

  commands.forEach(x => {
    parseNum(x);
  });

  return counts;
}


export function partTwo(commands: string[]) {
  let o2GenRating = [...commands];
  let co2ScrubRating = [...commands];

  const filterO2Gen = (i: number, bit: string) => {
    o2GenRating = o2GenRating.length > 1
      ? o2GenRating.filter(x => x[i] === bit)
      : o2GenRating;
  }

  const filterCo2Scrub = (i: number, bit: string) => {
    co2ScrubRating = co2ScrubRating.length > 1
      ? co2ScrubRating.filter(x => x[i] === bit)
      : co2ScrubRating;
  }

  let o2GenIndex = 0;
  while (o2GenRating.length > 1) {
    const counts = calculateMostCommon(o2GenRating);
    const current = counts[o2GenIndex];

    if (current.one >= current.zero) {
      filterO2Gen(o2GenIndex, '1');
    }
    if (current.one < current.zero) {
      filterO2Gen(o2GenIndex, '0');
    }
    o2GenIndex++;
  }

  let cO2ScrubIndex = 0;
  while (co2ScrubRating.length > 1) {
    const counts = calculateMostCommon(co2ScrubRating);
    const current = counts[cO2ScrubIndex];

    if (current.one >= current.zero) {
      filterCo2Scrub(cO2ScrubIndex, '0');
    }
    if (current.one < current.zero) {
      filterCo2Scrub(cO2ScrubIndex, '1');
    }
    cO2ScrubIndex++;
  }

  return parseInt(o2GenRating[0], 2) * parseInt(co2ScrubRating[0], 2);
}


if(require.main === module) {
  const input = readFileSync("inputs/day3.txt", { encoding: "ascii"});
  console.log(partOne(parseInput(input)));
  console.log(partTwo(parseInput(input)));
}
