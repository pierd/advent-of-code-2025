import { defineDay } from "./types.ts";
import { sum } from "./utils.ts";

type Extra = {};

const START = "S";
const SPLITTER = "^";

function find(map: string[][], needle: string): [number, number] | undefined {
  for (let row = 0; row < map.length; row++) {
    for (let column = 0; column < map[row].length; column++) {
      if (map[row][column] === needle) {
        return [row, column];
      }
    }
  }
}

function solvePart1(input: string): { answer: string; extra: Extra } {
  const map = input.trim().split("\n").map((line) => line.trim().split(""));
  const start = find(map, START);
  if (!start) {
    return { answer: "", extra: {} };
  }
  const [startRow, startColumn] = start;
  let columns = new Set<number>();
  columns.add(startColumn);
  let row = startRow;
  let answer = 0;
  while (row < map.length - 1) {
    const newColumns = new Set<number>();
    columns.forEach((column) => {
      if (map[row + 1][column] === SPLITTER) {
        answer++;
        newColumns.add(column - 1);
        newColumns.add(column + 1);
      } else {
        newColumns.add(column);
      }
    });
    columns = newColumns;
    row++;
  }
  return { answer: answer.toString(), extra: {} };
}

function solvePart2(input: string): { answer: string; extra: Extra } {
  const map = input.trim().split("\n").map((line) => line.trim().split(""));
  const start = find(map, START);
  if (!start) {
    return { answer: "", extra: {} };
  }
  const [startRow, startColumn] = start;
  let columns = new Map<number, number>();
  columns.set(startColumn, 1);
  let row = startRow;
  while (row < map.length - 1) {
    const newColumns = new Map<number, number>();
    columns.forEach((timelines, column) => {
      if (map[row + 1][column] === SPLITTER) {
        newColumns.set(column - 1, (newColumns.get(column - 1) ?? 0) + timelines);
        newColumns.set(column + 1, (newColumns.get(column + 1) ?? 0) + timelines);
      } else {
        newColumns.set(column, (newColumns.get(column) ?? 0) + timelines);
      }
    });
    columns = newColumns;
    row++;
  }
  const answer = Array.from(columns).map(([_k, v]) => v).reduce(sum);
  return { answer: answer.toString(), extra: {} };
}

export default defineDay({
  day: 7,
  solvePart1,
  solvePart2,
});
