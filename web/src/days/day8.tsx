import { getLib } from "../libProvider.ts";
import { defineDay } from "./types.ts";
import { lines, point3d } from "./utils.ts";

type Extra = {};

function solvePart1(input: string): { answer: string; extra: Extra } {
  const answer = getLib().solve_day8_part1(lines(input).map(point3d)) as number;
  return { answer: answer.toString(), extra: {} };
}

function solvePart2(input: string): { answer: string; extra: Extra } {
  const answer = getLib().solve_day8_part2(lines(input).map(point3d)) as number;
  return { answer: answer.toString(), extra: {} };
}

export default defineDay({
  day: 8,
  solvePart1,
  solvePart2,
});
