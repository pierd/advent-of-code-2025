import type { InitOutput } from "aoc";

let lib: InitOutput | undefined;

export function getLib() {
  if (!lib) {
    throw new Error("Lib not initialized");
  }
  return lib;
}

export function initLib(initialized: InitOutput) {
  lib = initialized;
}
