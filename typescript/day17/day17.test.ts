import {
  doStep,
  inRange,
  overShot,
  parseInput,
  partOne,
  partTwo
} from './day17';

const sample = 'target area: x=20..30, y=-10..-5';

describe('doStep', () => {
  it('it updates position and velocity values', () => {
    const items = [
      {
        position: { x: 0, y: 0 },
        velocity: { x: 7, y: 2 },
        expectedPos: { x: 7, y: 2 },
        expectedVel: { x: 6, y: 1 }
      },
      {
        position: { x: 0, y: 0 },
        velocity: { x: 9, y: 0 },
        expectedPos: { x: 9, y: 0 },
        expectedVel: { x: 8, y: -1 }
      },
      {
        position: { x: 21, y: 3 },
        velocity: { x: 0, y: -3 },
        expectedPos: { x: 21, y: 0 },
        expectedVel: { x: 0, y: -4 }
      },
    ]

    items.forEach(({ position, velocity, expectedPos, expectedVel }) => {
      doStep(velocity, position);
      expect(velocity).toEqual(expectedVel);
      expect(position).toEqual(expectedPos);
    });

  });
});

describe('inRange', () => {
  it('determines if position is in target range', () => {
    const targetX = { minX: 10, maxX: 20 };
    const targetY = { minY: -10, maxY: -20 };
    expect(inRange(targetX, targetY, { x: 11, y: -11 })).toBeTruthy();
    expect(inRange(targetX, targetY, { x: 11, y: -9 })).toBeFalsy();
    expect(inRange(targetX, targetY, { x: 10, y: -10 })).toBeTruthy();
    expect(inRange(targetX, targetY, { x: 21, y: -19 })).toBeFalsy();
  });
});

describe('overShot', () => {
  it('determines if position overshot the target range', () => {
    const targetX = { minX: 10, maxX: 20 };
    const targetY = { minY: -10, maxY: -20 };
    expect(overShot(targetX, targetY, { x: 11, y: -21 })).toBeTruthy();
    expect(overShot(targetX, targetY, { x: 10, y: -19 })).toBeFalsy();
    expect(overShot(targetX, targetY, { x: 21, y: -10 })).toBeTruthy();
    expect(overShot(targetX, targetY, { x: 10, y: -20 })).toBeFalsy();
  });
});

describe('parseInput', () => {
  it('parses input into target x and target y ranges', () => {
    const sample = 'target area: x=20..30, y=-10..-5';
    expect(parseInput(sample)).toEqual({
      targetX: { minX: 20, maxX: 30 },
      targetY: { minY: -5, maxY: -10 }
    });
  });
});

describe('partOne', () => {
  it('calculates highest possible y position', () => {
    expect(partOne(sample)).toBe(45);
  });
});
describe('partTwo', () => {
  it('calculates total count of possible initial velocities', () => {
    expect(partTwo(sample)).toBe(112);
  });
});