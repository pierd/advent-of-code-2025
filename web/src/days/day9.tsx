import { getLib } from "../libProvider.ts";
import { defineDay, type VizProps } from "./types.ts";
import { lines, point2d, type Point2d } from "./utils.ts";

type Extra = {
  points: Point2d[];
};

function solvePart1(input: string): { answer: string; extra: Extra } {
  const points = lines(input).map(point2d);
  const answer = getLib().solve_day9_part1(points) as number;
  return { answer: answer.toString(), extra: { points } };
}

function solvePart2(input: string): { answer: string; extra: Extra } {
  const points = lines(input).map(point2d);
  const answer = getLib().solve_day9_part2(points) as number;
  return { answer: answer.toString(), extra: { points } };
}

function Part2({ extra: { points } }: VizProps<Extra>) {
  const minX = Math.min(...points.map(([x, _y]) => x));
  const minY = Math.min(...points.map(([_x, y]) => y));
  const maxX = Math.max(...points.map(([x, _y]) => x));
  const maxY = Math.max(...points.map(([_x, y]) => y));
  const paddingX = (maxX - minX) * 0.025;
  const paddingY = (maxY - minY) * 0.025;
  const pointsString = [...points, points[0]].map(([x, y]) => `${x},${y}`).join(" ");
  return (
    <svg viewBox={`${minX - paddingX} ${minY - paddingY} ${maxX - minX + paddingX} ${maxY - minY + paddingY}`} xmlns="http://www.w3.org/2000/svg">
      <polygon points={pointsString} fill="none" stroke="white" stroke-width="200" stroke-linejoin="round"/>
    </svg>
  );
}

export default defineDay({
  day: 9,
  solvePart1,
  solvePart2,
  Part2,
});
