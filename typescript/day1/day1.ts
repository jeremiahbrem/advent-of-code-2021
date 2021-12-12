import { readFileSync } from "fs";

export function parseInput(input: string): number[] {
  const lines = input.split(/\r?\n/);
  const depths = lines.map(x => parseInt(x));

  return depths;
}

export function partOne(depths: number[]): number {
  let increases = 0;

  for (let i = 0; i < depths.length; i++)
  {
    if (i != 0 && depths[i - 1] < depths[i])
    {
      increases++;
    }
  }
  return increases;
}

export function partTwo(depths: number[]): number {
  let increases = 0;

  for (let i = 2; i + 1 < depths.length; i++)
  {
      var sumOne = depths[i] + depths[i - 1] + depths[i - 2];
      var sumTwo = depths[i + 1] + depths[i] + depths[i - 1];
      if (sumTwo > sumOne)
      {
        increases++;
      }
  }
  return increases;
}


if(require.main === module) {
  const input = readFileSync("inputs/day1.txt", { encoding: "ascii"});
  console.log(partOne(parseInput(input)));
  console.log(partTwo(parseInput(input)));
}
