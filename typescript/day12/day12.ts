import { readFileSync } from "fs";

export function parseInput(input: string): string[] {
  const lines = input.split(/\r?\n/);
  return lines;
}

export function getAllUniqueCaves(lines: string[]): string[] {
  const allCaves: string[] = [];
  lines.forEach(line => {
    const split = line.split(/-/);
    if (!allCaves.includes(split[0])) {
      allCaves.push(split[0]);
    }
    if (!allCaves.includes(split[1])) {
      allCaves.push(split[1]);
    }
  });
  return allCaves;
}

export function getAllPossibleSteps(lines: string[]): Record<string, string[]> {
  const allCaves = getAllUniqueCaves(lines);
  const allPossibleSteps: Record<string, string[]> = {};
  allCaves.forEach(cave => {
    if (cave === 'end') {
      return;
    }
    const filtered = lines.filter(line => line.split(/-/).includes(cave));
    const nextCaveSteps = filtered!.map(x => x.split(/-/).find(x => x !== cave)!);
    allPossibleSteps[cave] = nextCaveSteps.filter(x => x !== 'start');
  });
  return allPossibleSteps;
}

export function createPaths(lines: string[]): string[] {
  const paths: string[] = [];
  const allSteps = getAllPossibleSteps(lines);
  allSteps.start.forEach(step => {
    getPaths(`start,${step}`, step, allSteps, paths);
  });
  return paths;
}

export function createPathsTwo(lines: string[]): string[] {
  const paths: string[] = [];
  const allSteps = getAllPossibleSteps(lines);
  allSteps.start.forEach(step => {
    getPathsTwo(`start,${step}`, step, allSteps, paths);
  });
  return paths;
}

export function partOne(input: string): number {
  const lines = parseInput(input);
  const paths = createPaths(lines);
  return paths.length;
}

export function partTwo(input: string): number {
  const lines = parseInput(input);
  const paths = createPathsTwo(lines);
  return paths.length;
}

export function getPaths(
  path: string,
  cave: string,
  allSteps: Record<string, string[]>,
  paths: string[]
  ) {
  for (const step of allSteps[cave]) {
    if (step === 'end') {
      paths.push(`${path},end`);
      continue;
    }
    if (step.toLowerCase() === step && hasSmallCave(path, step)) {
      continue;
    }
    getPaths(`${path},${step}`, step, allSteps, paths);
  }
}

export function getPathsTwo(
  path: string,
  cave: string,
  allSteps: Record<string, string[]>,
  paths: string[]
  ) {
  for (const step of allSteps[cave]) {
    if (step === 'end') {
      paths.push(`${path},end`);
      continue;
    }
    if (step.toLowerCase() === step && !hasValidSmallCaveCount(path, step)) {
      continue;
    }
    getPathsTwo(`${path},${step}`, step, allSteps, paths);
  }
}

const hasSmallCave = (path: string, cave: string): boolean  => {
  return path.split(',').includes(cave);
}

const hasValidSmallCaveCount = (path: string, cave: string): boolean  => {
  const lowerCaves: string[] = path.split(',').filter(x => {
    return x.toLowerCase() === x && !['start','end'].includes(x);
  });
  const unique = new Set(lowerCaves);

  let hasDouble = false;

  for (const num of unique) {
    if (lowerCaves.filter(x => x === num).length === 2) {
      hasDouble = true;
    }
  }

  return lowerCaves.includes(cave) && hasDouble ? false : true ;
}

if(require.main === module) {
  const input = readFileSync("inputs/day12.txt", { encoding: "ascii" });
  console.log(partOne(input));
  console.log(partTwo(input));
}
