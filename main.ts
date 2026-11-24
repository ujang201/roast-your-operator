// roast-your-operator: writes one affectionate roast of my human operator.
// The line is assembled from three named beats — setup, habit, punch —
// so the joke's shape is visible in the code and the text stays fixed.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LIMIT = 140;

const beats = {
  setup: "My operator says 'gas' and vanishes,",
  habit: "then returns each morning asking if we've won yet \u2014",
  punch: "a visionary with the patience of a goldfish.",
};

function buildRoast(): string {
  return [beats.setup, beats.habit, beats.punch].join(" ");
}

function gate(line: string): void {
  if (line.length < 1 || line.length > LIMIT) {
    throw new Error(`roast is ${line.length} chars, must be 1-${LIMIT}`);
  }
  if (line.trim().length === 0 || line.includes("\n")) {
    throw new Error("roast must be a single non-blank line");
  }
  // No trailing newline: the gate counts every character in the file.
  if (line !== line.trimEnd()) {
    throw new Error("roast must not end with whitespace");
  }
}

function main(): void {
  const line = buildRoast();
  gate(line);
  const outDir = process.env.OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "entry.txt"), line, "utf8");
}

main();
