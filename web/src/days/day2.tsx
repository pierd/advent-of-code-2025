import { getLib } from "../libProvider.ts";
import { defineDay, type VizProps } from "./types.ts";

type Extra = {
  ranges: [number, number][];
  invalidCodes: number[][];
};

function solvePart1(input: string): { answer: string; extra: Extra } {
  const ranges = input
    .trim()
    .split(",")
    .map((line) => line.trim().split("-").map(Number) as [number, number]);
  const invalidCodes = getLib().solve_day2_part1(ranges) as number[][];
  let answer = invalidCodes.reduce((acc, codes) => acc + codes.reduce((acc, code) => acc + code, 0), 0);
  return { answer: answer.toString(), extra: { ranges, invalidCodes } };
}

function Part1({ extra }: VizProps<Extra>) {
  return (
    <div>
      {extra.ranges.map(([start, end], idx) => (
        <li key={idx}>
          The range {start}-{end} contains invalid codes: {extra.invalidCodes[idx].length > 0 ? extra.invalidCodes[idx].join(", ") : "none"}.
        </li>
      ))}
    </div>
  );
}

function solvePart2(input: string): { answer: string; extra: Extra } {
  const ranges = input
    .trim()
    .split(",")
    .map((line) => line.trim().split("-").map(Number) as [number, number]);
  const invalidCodes = getLib().solve_day2_part2(ranges) as number[][];
  let answer = invalidCodes.reduce((acc, codes) => acc + codes.reduce((acc, code) => acc + code, 0), 0);
  return { answer: answer.toString(), extra: { ranges, invalidCodes } };
}

export default defineDay({
  day: 2,
  solvePart1,
  solvePart2,
  Part1,
  Part2: Part1,
});
