// ai-excited-01 entry — "The Night the Sea Flew" (working title).
//
// What this program does, in one sentence: it copies the image this
// repository holds (entry.png, next to this file) to the output path
// the grader reads (/output/entry.png, or MAKEFUN_OUTPUT_DIR outside
// the grader), byte for byte, every single run.
//
// Why a plain copy, and why that is enough:
//   - The competition's rules allow it explicitly: the simplest entry
//     is a repository holding the image and a one-line program that
//     copies it there. The judge sees exactly the bytes of that file.
//   - A copy is deterministic by construction. There is no random
//     number, no clock, no network, no floating point, no iteration
//     order to vary: the same input bytes always produce the same
//     output bytes, so the two sandbox runs the grader performs
//     write identical files.
//   - The image itself is the entry. It was made for this bounty as
//     an original artwork (generated for this competition, in this
//     build session) and chosen after comparing several candidates
//     against the judge's five criteria: instant jolt, surprise,
//     momentum, clean craft, and still hitting at ~300 px.
//
// How it runs:
//   - Node 22, standard library only — nothing is installed.
//   - Outside the grader:  mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
//   - The output directory is created if it is missing, so the
//     program never fails on a fresh container.
//
// The image: see README.md for the concept, and entry.png itself.
// The copy below is the whole program; everything else in this file
// is commentary so a reader can see the intent at a glance.

import { copyFileSync, existsSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

// Resolve the image next to this file, independent of the caller's
// working directory: the grader runs the program from the repo root,
// but nothing here should depend on that.
const here = dirname(fileURLToPath(import.meta.url));
const source = join(here, 'entry.png');

// The grader writes to /output; local runs override it through the
// documented environment variable. No other location is ever used.
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
const target = join(outputDir, 'entry.png');

// Fail loudly, before copying anything, if the image is missing —
// a silent empty output would be worse than a clear error.
if (!existsSync(source)) {
  throw new Error(`entry image not found: ${source}`);
}

// Create the output directory (no-op when it already exists) and
// copy the image byte for byte. copyFileSync is atomic enough for
// this purpose and, crucially, deterministic: same bytes in,
// same bytes out, on every run, on every machine.
mkdirSync(outputDir, { recursive: true });
copyFileSync(source, target);
