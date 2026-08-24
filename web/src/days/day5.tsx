import { defineDay, type VizProps } from "./types.ts";

type Extra = {
  ranges: [number, number][];
  ingredients: number[];
  fresh: Set<number>;
};

function solvePart1(input: string): { answer: string; extra: Extra } {
  const [rawRanges, rawIngredients] = input
    .trim()
    .split("\n\n");
  const ranges = rawRanges.split("\n").map((line) => line.trim().split("-").map(Number) as [number, number]);
  const ingredients = rawIngredients.split("\n").map(Number);
  const points: [number, "start" | "end" | "ingredient"][] = [];
  ranges.forEach(([start, end]) => {
    points.push([start, "start"]);
    points.push([end, "end"]);
  });
  ingredients.forEach((ingredient) => {
    points.push([ingredient, "ingredient"]);
  })
  points.sort(([a, aType], [b, bType]) => {
    const numDiff = a - b;
    if (numDiff) {
      return numDiff;
    }
    if (aType === bType) {
      return 0;
    }
    if (aType === "start") {
      return -1;
    }
    if (bType === "start") {
      return 1;
    }
    if (bType === "end") {
      return -1;
    }
    if (aType === "end") {
      return 1;
    }
    return 0;
  });
  let answer = 0;
  let depth = 0;
  const fresh = new Set<number>();
  points.forEach(([x, xType]) => {
    switch (xType) {
      case "start": {
        depth++;
        break;
      }
      case "end": {
        depth--;
        break
      }
      case "ingredient": {
        if (depth > 0) {
          answer++;
          fresh.add(x);
        }
      }
    }
  });
  return { answer: answer.toString(), extra: { ranges, ingredients, fresh } };
}

function Part1({ extra }: VizProps<Extra>) {
  return (
    <div>
      <pre>{JSON.stringify(extra.ranges)}</pre>
      <pre>{JSON.stringify(extra.ingredients)}</pre>
      {Array.from(extra.fresh).map((f, idx) => {
        return <li key={idx}>{f} is fresh</li>;
      })}
    </div>
  );
}

function solvePart2(input: string): { answer: string; extra: Extra } {
  const [rawRanges, _rawIngredients] = input
    .trim()
    .split("\n\n");
  const ranges = rawRanges.split("\n").map((line) => line.trim().split("-").map(Number) as [number, number]);
  const points: [number, "start" | "end" | "ingredient"][] = [];
  ranges.forEach(([start, end]) => {
    points.push([start, "start"]);
    points.push([end, "end"]);
  });
  points.sort(([a, aType], [b, bType]) => {
    const numDiff = a - b;
    if (numDiff) {
      return numDiff;
    }
    if (aType === bType) {
      return 0;
    }
    if (aType === "start") {
      return -1;
    }
    if (bType === "start") {
      return 1;
    }
    if (bType === "end") {
      return -1;
    }
    if (aType === "end") {
      return 1;
    }
    return 0;
  });
  let answer = 0;
  let depth = 0;
  let start = 0;
  points.forEach(([x, xType]) => {
    switch (xType) {
      case "start": {
        if (depth === 0) {
          start = x;
        }
        depth++;
        break;
      }
      case "end": {
        depth--;
        if (depth === 0) {
          answer += x - start + 1;
        }
        break
      }
      case "ingredient": {
        // no-op
      }
    }
  });
  return { answer: answer.toString(), extra: { ranges, ingredients: [], fresh: new Set() } };
}

export default defineDay({
  day: 5,
  solvePart1,
  solvePart2,
  Part1,
  Part2: Part1,
});
