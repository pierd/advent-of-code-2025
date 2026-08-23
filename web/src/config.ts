export const YEAR = 2025;
export const DAY_COUNT = 25;

export function puzzleUrl(day: number, part2: boolean = false): string {
  return `https://adventofcode.com/${YEAR}/day/${day}${part2 ? "#part2" : ""}`;
}

export function puzzleInputUrl(day: number): string {
  return `https://adventofcode.com/${YEAR}/day/${day}/input`;
}

export function clampDay(day: number): number {
  if (!Number.isInteger(day) || day < 1 || day > DAY_COUNT) {
    return 1;
  }
  return day;
}

export function dayFromHash(): number {
  const match = /^#(\d+)$/.exec(location.hash);
  return clampDay(match ? Number(match[1]) : 1);
}

export function inputKey(day: number): string {
  return `aoc-${YEAR}-day-${day}-input`;
}

export function loadInput(day: number): string {
  return localStorage.getItem(inputKey(day)) ?? "";
}

export function saveInput(day: number, input: string): void {
  localStorage.setItem(inputKey(day), input);
}
