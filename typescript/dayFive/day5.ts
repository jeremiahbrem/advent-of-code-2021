import { readFileSync } from "fs";

type Line = {
  x1: number;
  x2: number;
  y1: number;
  y2: number;
}

export function parseInput(input: string): Line[] {
  const lines = input.split(/\r?\n/);
  return lines.map(line => {
    const split = line.split(/ -\> /);
    const pointOneSplit = split[0].split(/,/);
    const pointTwoSplit = split[1].split(/,/);
    const x1 = +pointOneSplit[0];
    const y1 = +pointOneSplit[1];
    const x2 = +pointTwoSplit[0];
    const y2 = +pointTwoSplit[1];
    return { x1, y1, x2, y2 };
  })
}

type Point = {
  crossed: number;
}

export function createDiagram(size: number): Point[][] {
  const diagram: Point[][] = [];
  for (let i = 0; i < size; i++) {
    diagram.push([]);
    for (let y = 0; y < size; y++) {
      diagram[i].push({ crossed: 0 });
    }
  }
  return diagram;
}

type DiagramProps = {
  diagram: Point[][];
  x1: number;
  x2: number;
  y1: number;
  y2: number;
}

export function countCrossingsOfTwoOrMore(diagram: Point[][]): number {
  let count = 0;
  diagram.forEach(row => row.forEach(point => {
    if (point.crossed >= 2) {
      count++;
    }
  }));
  return count;
}

export function drawLineOnDiagram(props: DiagramProps): void {
  const { x1, x2, y1, y2 } = props;

  if (x1 != x2 && y1 != y2) {
    return;
  }

  if (x1 === x2) {
    drawVerticalLine(props);
  }
  if (y1 === y2) {
    drawHorizontalLine(props);
  }
}

export function drawLineOnDiagramPart2(props: DiagramProps): void {
  const { x1, x2, y1, y2 } = props;

  if (x1 === x2) {
    drawVerticalLine(props);
  }
  else if (y1 === y2) {
    drawHorizontalLine(props);
  }
  else {
    drawDiagonalLine(props);
  }
}

export function drawVerticalLine(props: DiagramProps) {
  const { diagram, x1, y1, y2 } = props;

  const increment = (y: number): number => {
    let newY = y;
    if (y1 > y2) {
      return newY - 1;
    } else {
      return newY + 1;
    }
  };

  const compare = (y: number, y1: number, y2: number): boolean => {
    return (y2 >= y1
      ? y <= y2
      : y >= y2);
  }

  for (let y = y1; compare(y, y1, y2); y = increment(y)) {
    diagram[y][x1].crossed++;
  }
}

export function drawHorizontalLine(props: DiagramProps) {
  const { diagram, x1, x2, y1 } = props;

  const increment = (x: number) => {
    let newX = x;
    if (x1 > x2) {
      return newX - 1;
    } else {
      return newX + 1;
    }
  };

  const compare = (x: number, x1: number, x2: number): boolean => {
    return x2 >= x1
      ? x <= x2
      : x >= x2;
  }

  for (let x = x1; compare(x, x1, x2); x = increment(x)) {
    diagram[y1][x].crossed++;
  }
}

export function drawDiagonalLine(props: DiagramProps) {
  const { diagram, x1, x2, y1, y2 } = props;

  const incrementX = (x: number) => {
    let newX = x;
    if (x1 > x2) {
      return newX - 1;
    } else {
      return newX + 1;
    }
  };
  const incrementY = (y: number) => {
    let newY = y;
    if (y1 > y2) {
      return newY - 1;
    } else {
      return newY + 1;
    }
  };

  const compare = (n: number, n1: number, n2: number): boolean => {
    return n2 >= n1
      ? n <= n2
      : n >= n2;
  }

  for (let x = x1, y = y1; compare(x, x1, x2); x = incrementX(x), y = incrementY(y)) {
    diagram[y][x].crossed++;
  }
}

export function partOne(input: string): number {
  const diagram = createDiagram(1000);
  const lines = parseInput(input);
  lines.forEach(line => drawLineOnDiagram({
    diagram, ...line
  }));
  return countCrossingsOfTwoOrMore(diagram);
}

export function partTwo(input: string): number {
  const diagram = createDiagram(1000);
  const lines = parseInput(input);
  lines.forEach(line => drawLineOnDiagramPart2({
    diagram, ...line
  }));
  return countCrossingsOfTwoOrMore(diagram);
}

if(require.main === module) {
  const inputs = readFileSync("inputs/day5.txt", { encoding: "ascii"});
  console.log(partOne(inputs));
  console.log(partTwo(inputs));
}
