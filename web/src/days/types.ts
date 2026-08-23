import type { ComponentType } from "react";

export type VizProps<Extra = unknown> = {
  day: number;
  input: string;
  answer: string | undefined;
  extra: Extra;
};

export type DayPuzzle<Extra1 = unknown, Extra2 = unknown> = {
  day: number;
  title?: string;
  solvePart1: (input: string) => { answer: string; extra: Extra1 };
  solvePart2: (input: string) => { answer: string; extra: Extra2 };
  Part1?: ComponentType<VizProps<Extra1>>;
  Part2?: ComponentType<VizProps<Extra2>>;
};

export function defineDay<Extra1 = unknown, Extra2 = unknown>(
  puzzle: DayPuzzle<Extra1, Extra2>
): DayPuzzle<Extra1, Extra2> {
  return puzzle;
}
