import { defineDay, type VizProps } from "./types.ts";

type Extra = {
  status: { rotation: string; dial: number; clicks?: number }[];
};

function solvePart1(input: string): { answer: string; extra: Extra } {
  const rotations = input
    .trim()
    .split("\n")
    .map((line) => line.trim());
  let answer = 0;
  let dial = 50;
  const status = [];
  for (const rotation of rotations) {
    const direction = rotation[0] === "L" ? -1 : 1;
    const steps = parseInt(rotation.substring(1));
    dial = (dial + direction * steps + 100) % 100;
    status.push({ rotation, dial });
    if (dial === 0) {
      answer += 1;
    }
  }
  return { answer: answer.toString(), extra: { status } };
}

function Part1({ extra }: VizProps<Extra>) {
  return (
    <div>
      <li>The dial starts by pointing at 50.</li>
      {extra.status.map(({ rotation, dial }, idx) => (
        <li key={idx}>
          The dials is rotated {rotation} to point at {dial}.
        </li>
      ))}
    </div>
  );
}

function solvePart2(input: string): { answer: string; extra: Extra } {
  const rotations = input
    .trim()
    .split("\n")
    .map((line) => line.trim());
  let answer = 0;
  let dial = 50;
  const status = [];
  for (const rotation of rotations) {
    const direction = rotation[0] === "L" ? -1 : 1;
    let steps = parseInt(rotation.substring(1));
    const fullTurns = Math.floor(steps / 100);
    steps %= 100;
    const newDial = dial + direction * steps;
    const clicks = fullTurns + (newDial > 100 || (newDial < 0 && dial !== 0) ? 1 : 0);
    answer += clicks;
    dial = (newDial + 100) % 100;
    status.push({ rotation, dial, clicks });
    if (dial === 0) {
      answer += 1;
    }
  }
  return { answer: answer.toString(), extra: { status } };
}

function Part2({ extra }: VizProps<Extra>) {
  return (
    <div>
      <li>The dial starts by pointing at 50.</li>
      {extra.status.map(({ rotation, dial, clicks }, idx) => (
        <li key={idx}>
          The dials is rotated <code>{rotation}</code> to point at{" "}
          {dial === 0 ? <code>{dial}</code> : dial}
          {clicks ? <>; during this rotation, it points at 0 <code>{clicks} times</code></> : ""}
          .
        </li>
      ))}
    </div>
  );
}

export default defineDay({
  day: 1,
  solvePart1,
  solvePart2,
  Part1,
  Part2,
});
