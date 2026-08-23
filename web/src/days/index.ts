import type { DayPuzzle } from "./types.ts";

const modules = import.meta.glob<DayPuzzle>("./day*.tsx", {
  eager: true,
  import: "default",
});

const byDay = new Map<number, DayPuzzle>();

for (const puzzle of Object.values(modules)) {
  byDay.set(puzzle.day, puzzle);
}

export function getDay(day: number): DayPuzzle {
  return (
    byDay.get(day) ?? {
      day,
      solvePart1: () => ({ answer: "", extra: {} }),
      solvePart2: () => ({ answer: "", extra: {} }),
    }
  );
}
