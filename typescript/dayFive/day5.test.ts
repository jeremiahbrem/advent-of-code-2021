import {
  createDiagram,
  drawHorizontalLine,
  drawVerticalLine,
  drawDiagonalLine,
  parseInput,
  countCrossingsOfTwoOrMore,
  partOne,
  partTwo } from './day5';

const sampleInput = `0,9 -> 5,9
8,0 -> 0,8
9,4 -> 3,4
2,2 -> 2,1
7,0 -> 7,4
6,4 -> 2,0
0,9 -> 2,9
3,4 -> 1,4
0,0 -> 8,8
5,5 -> 8,2`;

describe('createDiagram', () => {
  it('creates a diagram with x rows and x columns', () => {
    expect(createDiagram(2)).toEqual([
      [ { crossed: 0 }, { crossed: 0 }, ],
      [ { crossed: 0 }, { crossed: 0 }, ],
    ]);
  });
});
describe('drawVerticalLine', () => {
  it('draws a vertical line on the diagram', () => {
    const diagram = createDiagram(2);
    const props = { diagram, x1: 1, x2: 1, y1: 0, y2: 1 };
    drawVerticalLine(props);
    expect(diagram).toEqual([
      [ { crossed: 0 }, { crossed: 1 }, ],
      [ { crossed: 0 }, { crossed: 1 }, ],
    ]);
  });
});
describe('drawHorizontalLine', () => {
  it('draws a horizontal line on the diagram', () => {
    const diagram = createDiagram(2);
    const props = { diagram, x1: 0, x2: 1, y1: 0, y2: 0 };
    drawHorizontalLine(props);
    expect(diagram).toEqual([
      [ { crossed: 1 }, { crossed: 1 }, ],
      [ { crossed: 0 }, { crossed: 0 }, ],
    ]);
  });
});
describe('drawDiagnonalLine', () => {
  it('draws a diagonal line on the diagram', () => {
    const diagram = createDiagram(2);
    const props = { diagram, x1: 0, x2: 1, y1: 1, y2: 0 };
    drawDiagonalLine(props);
    expect(diagram).toEqual([
      [ { crossed: 0 }, { crossed: 1 }, ],
      [ { crossed: 1 }, { crossed: 0 }, ],
    ]);
  });
});
describe('countCrossingsOfTwoOrMore', () => {
  it('returns the number of points crossed two or more times', () => {
    const diagram = [
      [ { crossed: 2 }, { crossed: 1 }, { crossed: 2 },],
      [ { crossed: 2 }, { crossed: 0 }, { crossed: 1 } ],
    ];
    expect(countCrossingsOfTwoOrMore(diagram)).toBe(3);
  })
});
describe('parseInput', () => {
  it('createds points from line input', () => {
    const testInput = `8,0 -> 0,8\r\n9,4 -> 3,4`;
    expect(parseInput(testInput)).toEqual([
      { x1: 8, y1: 0, x2: 0, y2: 8 },
      { x1: 9, y1: 4, x2: 3, y2: 4 },
    ]);
  })
});

describe('day 5 part 1', () => {
  it('calculates number of double point crossings', () => {
    expect(partOne(sampleInput)).toBe(5);
  });
});
describe('day 5 part 2', () => {
  it('calculates number of double point crossings', () => {
    expect(partTwo(sampleInput)).toBe(12);
  });
});
