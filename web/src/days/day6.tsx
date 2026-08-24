import { defineDay } from "./types.ts";
import { mul, sum } from "./utils.ts";

type Extra = {};

function solvePart1(input: string): { answer: string; extra: Extra } {
  const lines = input.trim().split("\n").map((line) => line.trim());
  if (lines.length === 0) {
    return { answer: "", extra: {} };
  }
  const operations = lines.pop()?.split(/\s+/) as ("*" | "+")[];
  const rows = lines.map((line) => line.split(/\s+/).map(Number));
  console.log(lines, rows, operations);
  const results = operations.map((oper, idx) => {
    return rows.map((row) => row[idx]).reduce(oper === "*" ? mul : sum);
  });
  const answer = results.reduce(sum);
  return { answer: answer.toString(), extra: {} };
}

function solvePart2(input: string): { answer: string; extra: Extra } {
  const lines = input.trim().split("\n");
  if (lines.length === 0) {
    return { answer: "", extra: {} };
  }
  const numbers: number[][] = [];
  const operations: (typeof sum | typeof mul)[] = [];
  let currentNumbers: number[] = [];
  for (let idx = lines[0].length; idx >= 0; idx--) {
    let column = lines.map((line) => line.charAt(idx)).join("").trim();
    if (column.trim().length === 0) {
      continue;
    }
    let operation = undefined;
    if (column.endsWith("*")) {
      operation = mul;
    } else if (column.endsWith("+")) {
      operation = sum;
    }
    if (operation) {
      column = column.substring(0, column.length - 1);
    }
    currentNumbers.push(Number(column));
    if (operation) {
      numbers.push(currentNumbers);
      currentNumbers = [];
      operations.push(operation);
    }
  }
  console.log(numbers, operations);
  const results = operations.map((oper, idx) => numbers[idx].reduce(oper));
  const answer = results.reduce(sum);
  return { answer: answer.toString(), extra: {} };
}

export default defineDay({
  day: 6,
  solvePart1,
  solvePart2,
});
