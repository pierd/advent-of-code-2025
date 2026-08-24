import { defineDay, type VizProps } from "./types.ts";

type Extra = {
  banks: number[][];
  joltages: number[];
};

function solveBankLength(bank: number[], length: number): number {
  if (length === 1) {
    return Math.max(...bank);
  }
  const max = Math.max(...bank.slice(0, -(length - 1)));
  const maxIdx = bank.findIndex((x) => x === max);
  return (
    max * 10 ** (length - 1) +
    solveBankLength(bank.slice(maxIdx + 1), length - 1)
  );
}

function solveBank(bank: number[]): number {
  return solveBankLength(bank, 2);
}

function solvePart1(input: string): { answer: string; extra: Extra } {
  const banks = input
    .trim()
    .split("\n")
    .map((line) => line.split("").map(Number) as number[]);
  const joltages = banks.map(solveBank);
  const answer = joltages.reduce((acc, x) => acc + x);
  return { answer: answer.toString(), extra: { banks, joltages } };
}

function Part1({ extra }: VizProps<Extra>) {
  return (
    <div>
      {extra.banks.map((bank, idx) => (
        <li key={idx}>
          {bank.join("")}: {extra.joltages[idx]}
        </li>
      ))}
    </div>
  );
}

function solvePart2(input: string): { answer: string; extra: Extra } {
  const banks = input
    .trim()
    .split("\n")
    .map((line) => line.split("").map(Number) as number[]);
  const joltages = banks.map((bank) => solveBankLength(bank, 12));
  const answer = joltages.reduce((acc, x) => acc + x);
  return { answer: answer.toString(), extra: { banks, joltages } };
}

export default defineDay({
  day: 3,
  solvePart1,
  solvePart2,
  Part1,
  Part2: Part1,
});
