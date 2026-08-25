import { getLib } from "../libProvider.ts";
import { defineDay } from "./types.ts";

type Extra = {
};

function solvePart1(input: string): { answer: string; extra: Extra } {
  const points = input
    .trim()
    .split("\n")
    .map((line) => line.trim().split(",").map(Number) as [number, number, number]);
  const answer = getLib().solve_day8_part1(points) as number;
  return { answer: answer.toString(), extra: {} };
}

function solvePart2(input: string): { answer: string; extra: Extra } {
  const points = input
    .trim()
    .split("\n")
    .map((line) => line.trim().split(",").map(Number) as [number, number, number]);
  const answer = getLib().solve_day8_part2(points) as number;
  return { answer: answer.toString(), extra: {} };
}

export default defineDay({
  day: 8,
  solvePart1,
  solvePart2,
});
