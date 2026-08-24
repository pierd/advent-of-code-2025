import { defineDay, type VizProps } from "./types.ts";

type Extra = {
  map: string[][];
  // `${row}-${column}`
  marks: Map<string, string>;
};

function iterMapNeighbours(
  map: string[][],
  row: number,
  column: number,
  callback: (neighbour: { row: number; column: number; item: string }) => void,
) {
  [-1, 0, 1].forEach((dRow) => {
    [-1, 0, 1].forEach((dCol) => {
      const nRow = row + dRow;
      const nCol = column + dCol;
      if ((dRow === 0 && dCol === 0) || nRow < 0 || nCol < 0 || nRow >= map.length || nCol >= map[nRow].length) {
        return;
      }
      callback({
        row: nRow,
        column: nCol,
        item: map[nRow][nCol],
      });
    });
  });
}

function renderMap(map: string[][]): string {
  return map.map((row) => row.join("")).join("\n");
}

function solvePart1(input: string): { answer: string; extra: Extra } {
  const map = input
    .trim()
    .split("\n")
    .map((line) => line.trim().split(""));
  let answer = 0;
  const marks = new Map();
  map.forEach((rowItems, row) => {
    rowItems.forEach((item, column) => {
      if (item !== "@") {
        return;
      }
      let neighbours = 0;
      iterMapNeighbours(map, row, column, ({ item }) => {
        if (item === "@") {
          neighbours++;
        }
      });
      if (neighbours < 4) {
        answer++;
        marks.set(`${row}-${column}`, "x");
      }
    });
  });
  return { answer: answer.toString(), extra: { map, marks } };
}

function Part1({ extra }: VizProps<Extra>) {
  const markedMap = extra.map.map((rowItems, row) => rowItems.map((orig, column) => {
    return extra.marks.get(`${row}-${column}`) ?? orig
  }));
  return (
    <div>
      <pre>
        {renderMap(markedMap)}
      </pre>
    </div>
  );
}

function solvePart2(input: string): { answer: string; extra: Extra } {
  const map = input
    .trim()
    .split("\n")
    .map((line) => line.trim().split(""));
  let answer = 0;
  const marks = new Map();
  let toRemove: [number, number][] = [[0, 0]];  // not really removed - just to pass the first iteration
  while (toRemove.length) {
    toRemove = [];
    map.forEach((rowItems, row) => {
      rowItems.forEach((item, column) => {
        if (item !== "@") {
          return;
        }
        let neighbours = 0;
        iterMapNeighbours(map, row, column, ({ item }) => {
          if (item === "@") {
            neighbours++;
          }
        });
        if (neighbours < 4) {
          answer++;
          toRemove.push([row, column]);
        }
      });
    });
    // remove the removed items
    toRemove.forEach(([row, column]) => {
      map[row][column] = 'x'
    });
  }
  return { answer: answer.toString(), extra: { map, marks } };
}

export default defineDay({
  day: 4,
  solvePart1,
  solvePart2,
  Part1,
  Part2: Part1,
});
