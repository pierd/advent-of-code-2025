export function composeFn<FIN, MID, GOUT>(f: (input: FIN) => MID, g: (input: MID) => GOUT) {
  return (input: FIN): GOUT => {
    return g(f(input))
  }
}

export function composeMapFn<FIN, MID, GOUT>(f: (input: FIN) => MID[], g: (input: MID) => GOUT) {
  return (input: FIN): GOUT[] => {
    return f(input).map(g);
  }
}

export const mul = (a: number, b: number) => a * b;
export const sum = (a: number, b: number) => a + b;

export const trim = (input: string): string => input.trim();
export const lines = (input: string): string[] => input.trim().split("\n");
export const chars = (input: string): string[] => input.split("");

export type Point2d = [number, number];
export const point2d = (input: string): Point2d => {
  const nums = input.trim().split(",").map(Number);
  if (nums.length != 2) {
    console.error("Malformed input, expected 2 numbers separated by comma");
  }
  return [nums[0], nums[1]];
};

export type Point3d = [number, number, number];
export const point3d = (input: string): Point3d => {
  const nums = input.trim().split(",").map(Number);
  if (nums.length != 3) {
    console.error("Malformed input, expected 3 numbers separated by comma");
  }
  return [nums[0], nums[1], nums[2]];
};
