import type { InitOutput } from "aoc";

let lib: InitOutput | undefined;

export function getLib() {
  if (!lib) {
    console.error("no lib");
    throw new Error("Lib not initialized");
  }
  console.debug("returning lib", lib);
  return lib;
}

export function initLib(initialized: InitOutput) {
  console.debug("lib initialized", initialized);
  lib = initialized;
}
