import { readFileSync } from "fs";

type Velocity = {
  x: number;
  y: number;
}

type Position = Velocity;

type ParsedInput = {
  targetX: TargetXRange;
  targetY: TargetYRange;
}

export function parseInput(input: string): ParsedInput {
  const xRange = input.match(/x=([1-9]?[0-9]?[0-9]?..[1-9]?[0-9]?[0-9]?)/);
  const splitX = xRange![1].split(/\.\./);
  const targetX = { minX: +splitX[0], maxX: +splitX[1] };
  const yRange = input.match(/y=(-?[1-9]?[0-9]?[0-9]?..-?[1-9]?[0-9]?[0-9]?)/);
  const splitY = yRange![1].split(/\.\./);
  const targetY = { minY: +splitY[1], maxY: +splitY[0] };
  return { targetX, targetY };
}

export function doStep(velocity: Velocity, position: Position): void {
  position.x += velocity.x;
  position.y += velocity.y;
  velocity.x += (velocity.x === 0
    ? 0
    : (velocity.x > 0 ? -1 : 1));
  velocity.y -= 1;
}

type TargetXRange = {
  minX: number;
  maxX: number;
}

type TargetYRange = {
  minY: number;
  maxY: number;
}

export function inRange(targetX: TargetXRange, targetY: TargetYRange, position: Position): boolean {
  const { minX, maxX } = targetX;
  const { minY, maxY } = targetY;
  const { x, y } = position;
  return x >= minX && x <= maxX && y <= minY && y >= maxY;
}

export function overShot(targetX: TargetXRange, targetY: TargetYRange, position: Position): boolean {
  const { maxX } = targetX;
  const { maxY } = targetY;
  const { x, y } = position;
  return x > maxX || y < maxY;
}

export function partOne(input: string): number {
  const { targetX, targetY } = parseInput(input);
  let maxY = -Infinity;

  let position = { x: 0, y: 0 };

  for (let i = 0; i < 255; i++) {
    for (let j = -255; j < 255; j++) {
      let yVals: number[] = [];
      let velocity = { x: i, y: j };
      while (!overShot(targetX, targetY, position) && !inRange(targetX, targetY, position)) {
        doStep(velocity, position);
        if (!overShot(targetX, targetY, position)) {
          yVals.push(position.y);
        }
      }
      if (inRange(targetX, targetY, position)) {
        const currentMaxY = Math.max(...yVals);
        maxY = currentMaxY > maxY ? currentMaxY : maxY;
      }
      position = { x: 0, y: 0 };
    }
  }
  return maxY;
}

export function partTwo(input: string): number {
  const { targetX, targetY } = parseInput(input);
  let validVelocityCount = 0;
  let position = { x: 0, y: 0 };

  for (let i = 0; i < 255; i++) {
    for (let j = -255; j < 255; j++) {
      let velocity = { x: i, y: j };
      while (!overShot(targetX, targetY, position) && !inRange(targetX, targetY, position)) {
        doStep(velocity, position);
      }
      if (inRange(targetX, targetY, position)) {
        validVelocityCount++;
      }
      position = { x: 0, y: 0 };
    }
  }
  return validVelocityCount;
}

if(require.main === module) {
  const input = readFileSync("inputs/day17.txt", { encoding: "ascii" });
  console.log(partOne(input));
  console.log(partTwo(input));
}