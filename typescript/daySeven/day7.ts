import { readFileSync } from "fs";

export function parseInput(input: string): number[] {
  const nums = input.split(/,/).map(x => +x);
  return nums;
}

export function calculateTotalFuelCost(inputs: number[], position: number): number {
  return inputs.reduce((acc, curr) => acc + Math.abs(curr - position), 0);
}

export function calculateTotalFuelCostTwo(inputs: number[], position: number): number {
  return inputs.reduce((acc, curr) => {
    const distance = Math.abs(curr - position);
    const currentFuelCost = calculateSingleFuelCost(distance);
    return acc + currentFuelCost;
  }, 0);
}

export function calculateSingleFuelCost(distance: number): number {
  let cost = 0;
  for (let i = 1; i <= distance; i++) {
    cost += i;
  }
  return cost;
}

export function getMax(inputs: number[]) {
  return Math.max(...inputs);
}

function getMinFuelCost(
  getTotalCost: (inputs: number[], position: number) => number,
  inputs: number[]
) {
  let minFuelCost = Infinity;

  const max = getMax(inputs);

  for (let i = 0; i <= max; i++) {
    const fuelCost = getTotalCost(inputs, i);
    minFuelCost = fuelCost < minFuelCost ? fuelCost : minFuelCost;
  }
  return minFuelCost;
}

export function partOne(input: string): number {
  const parsedInputs = parseInput(input);
  return getMinFuelCost(calculateTotalFuelCost, parsedInputs);
}

export function partTwo(input: string): number {
  const parsedInputs = parseInput(input);
  return getMinFuelCost(calculateTotalFuelCostTwo, parsedInputs);
}

if(require.main === module) {
  const input = readFileSync("inputs/day7.txt", { encoding: "ascii" });
  console.log(partOne(input));
  console.log(partTwo(input));
}
