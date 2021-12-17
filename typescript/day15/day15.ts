import { readFileSync } from "fs";

export function parseInput(input: string): string[] {
  const lines = input.split(/\r?\n/);
  return lines;
}

export function duplicateRight(lines: string[], max: number): string[] {
  let copy = lines;
  const length = copy.length;
  const width = copy[0].length;
  let newCopy = [...copy];
  let que: string[] = new Array(length);

  for (let i = 0; i < max; i++) {
    for (let y = 0; y < length; y++) {
      for (let x = 0; x < width; x++) {
        const next = +newCopy[y][x] + 1 === 10 ? 1 : +newCopy[y][x] + 1;
        copy[y] += `${next}`;
        if (x === 0) {
          que[y] = '';
        }
        que[y] += `${next}`;
      }
    }
    newCopy = [...que];
  }
  return copy;
}

export function duplicateInitialDown(lines: string[]): string[] {
  let copy = lines;
  const length = copy.length;
  const width = copy[0].length;
  let newCopy = [...copy];
  let que: string[] = new Array(length);
  for (let i = 0; i < length; i++) {
    que[i] = '';
  }

  for (let i = 0; i < 4; i++) {
    for (let y = 0; y < length; y++) {
      for (let x = 0; x < width; x++) {
        const next = +newCopy[y][x] + 1 === 10 ? 1 : +newCopy[y][x] + 1;
        if (!copy[length * (i + 1) + y]) {
          copy[length * (i + 1) + y] = '';
        }
        copy[length * (i + 1) + y] += `${next}`;
        if (x === 0) {
          que[y] = '';
        }
        que[y] += `${next}`;
      }
    }
    newCopy = [...que];
  }
  return copy;
}

export function createdDuplicatedInput(input: string): string[] {
  let lines = input.split(/\r?\n/);
  lines = duplicateInitialDown(lines);
  lines = duplicateRight(lines, 4)
  return lines;
}

type Node = {
  risk: number;
  adjacent: Record<string, number>;
}

export function createUnvisitedMap(lines: string[]): Map<string, Node> {
  const maxY = lines.length - 1;
  const maxX = lines[0].length - 1;
  const nodeMap: Map<string, Node> = new Map();

  const isStart = (x: number, y: number) => x === 0 && y === 0;

  for (let y = 0; y <= maxY; y++) {
    for (let x = 0; x <= maxX; x++) {
      const node: Node = {
        risk: y === 0 && x === 0 ? 0 : Infinity,
        adjacent: {},
      };
      if (y < maxY && !isStart(x,y + 1)) {
        node.adjacent[`${x},${y + 1}`] = +lines[y + 1][x];
      }
      if (y > 0 && !isStart(x,y - 1)) {
        node.adjacent[`${x},${y - 1}`] = +lines[y - 1][x];
      }
      if (x > 0 && !isStart(x - 1,y)) {
        node.adjacent[`${x - 1},${y}`] = +lines[y][x - 1];
      }
      if (x < maxX && !isStart(x + 1,y)) {
        node.adjacent[`${x + 1},${y}`] = +lines[y][x + 1];
      }
      nodeMap.set(`${x},${y}`, node);
    }
  }
  return nodeMap;
}

export function updateDistances(
  current: Node,
  unvisited: Map<string, Node>,
  distances: Record<string, number>) {

  const adjacent = current.adjacent;
  for (const item in adjacent) {
    if (!unvisited.get(item)) {
      continue;
    }
    const retrieved = unvisited.get(item)!;
    if (current.risk + adjacent[item] < retrieved.risk) {
      retrieved.risk = current.risk + adjacent[item];
      unvisited.set(item, retrieved);
    }
    distances[item] = retrieved.risk;
  }
}

export function findLowestRisk(
  unvisited: Map<string, Node>,
  endKey: string,
  ): number {
  let unvisitedMap = new Map(unvisited);
  let current = unvisitedMap.get('0,0')!;
  unvisitedMap.delete('0,0');
  let lowestRisk = 0;
  let distances: Record<string, number> = {};

  while (unvisitedMap.size > 0) {
    updateDistances(current, unvisitedMap, distances);
    let lowest = Infinity;
    let nextKey = '';

    for (const key in distances) {
      if (distances[key] < lowest) {
        lowest = distances[key];
        nextKey = key;
      }
    }

    delete distances[nextKey];
    current = unvisited.get(nextKey)!;

    if (nextKey === endKey) {
      lowestRisk = current.risk;
      break;
    }

    unvisitedMap.delete(nextKey);
  }
  return lowestRisk;
}

export function partOne(input: string): number {
  const lines = parseInput(input);
  const map = createUnvisitedMap(lines);
  return findLowestRisk(map, `${lines[0].length - 1},${lines.length - 1}`);
}

export function partTwo(input: string): number {
  const lines = createdDuplicatedInput(input);
  const map = createUnvisitedMap(lines);
  return findLowestRisk(map, `${lines[0].length - 1},${lines.length - 1}`);
}

if(require.main === module) {
  const input = readFileSync("inputs/day15.txt", { encoding: "ascii" });
  console.log(partOne(input));
  console.log(partTwo(input));
}
