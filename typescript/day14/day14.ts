import { readFileSync } from "fs";

export function parseInput(input: string): Record<string, any> {
  const lines = input.split(/\r?\n/);
  const template = lines[0];
  const rules: Record<string, string> = {};
  lines.slice(2)
    .forEach(x => {
      const split = x.split(/ -> /);
      rules[split[0]] = split[1];
    });
  return { template, rules };
}

export function getInitialKeyCount(template: string, rules: Record<string, string>): Record<string, number> {
  let keyCount: Record<string, number> = {};

  for (const rule in rules) {
    keyCount[rule] = 0;
  }
  for (let i = 1; i < template.length; i++) {
    const key = template[i - 1] + template[i];
    if (rules[key]) {
      keyCount[key]++
    }
  }
  return keyCount;
}

export function doSteps(
  steps: number,
  keyCount: Record<string, number>,
  rules: Record<string, string>): Record<string, number> {
  let countCopy = {...keyCount};

  for (let j = 0; j < steps; j++) {
    let newKeyCount = {...countCopy};
    for (const rule in rules) {
      const count = countCopy[rule];
      const insert = rules[rule];
      if (count > 0) {
        const split = rule.split('');
        newKeyCount[`${split[0]}${insert}`] += count;
        newKeyCount[`${insert}${split[1]}`] += count;
        newKeyCount[rule] -= count;
      }
    }
    countCopy = newKeyCount;
  }
  return countCopy;
}

export function getAllUniqueLetters(keyCount: Record<string, number>): Record<string, number> {
  const allUniqueLetters: Record<string, number> = {};

  for (const [key, value] of Object.entries(keyCount)) {
    const split = key.split('');
    allUniqueLetters[split[1]] = (allUniqueLetters[split[1]]?? 0) + value;
  }

  return allUniqueLetters;
}

export function getMaxMin(allLetters: Record<string, number>) {
  let max = 0;
  let min = Infinity;

  for (const count of Object.values(allLetters)) {
    if (count > max) {
      max = count;
    }
    if (count < min) {
      min = count;
    }
  }
  return { max, min };
}

export function getValue(input: string, steps: number): number {
  const { template, rules } = parseInput(input);
  let keyCount = getInitialKeyCount(template, rules);
  const newCount = doSteps(steps, keyCount, rules);
  const allUniqueLetters = getAllUniqueLetters(newCount);
  const { max, min } = getMaxMin(allUniqueLetters);

  return max - min;
}

if(require.main === module) {
  const input = readFileSync("inputs/day14.txt", { encoding: "ascii" });
  console.log(getValue(input, 1));
  console.log(getValue(input, 40));
}
