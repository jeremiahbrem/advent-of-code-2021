import { readFileSync } from "fs";

export function parseInput(input: string): string[] {
  const commands = input.split(/\r?\n/);

  return commands;
}

export function partOne(commands: string[]): number {
  let horizontal = 0;
  let depth = 0;

  commands.forEach(x =>
  {
      const splitString = x.split(' ');
      const amount = parseInt(splitString[1]);
      const move = splitString[0];

      switch (move) {
        case 'forward': horizontal += amount; break;
        case 'up': depth -= amount; break;
        case 'down': depth += amount; break;
      }
  });
  return horizontal * depth;
}

export function partTwo(commands: string[]): number {
  let horizontal = 0;
  let depth = 0;
  let aim = 0;

  commands.forEach(x =>
  {
      const splitString = x.split(' ');
      const amount = parseInt(splitString[1]);
      const move = splitString[0];

      switch (move) {
        case 'forward':
          horizontal += amount;
          depth += amount * aim;
          break;

        case 'up':
          aim -= amount;
          break;

        case 'down':
          aim += amount;
          break;
      }
  });
  return horizontal * depth;
}


if(require.main === module) {
  const input = readFileSync("inputs/day2.txt", { encoding: "ascii"});
  console.log(partOne(parseInput(input)));
  console.log(partTwo(parseInput(input)));
}
