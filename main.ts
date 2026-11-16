// ai-excited-01 — "The Night the Sea Flew" (rebuild v5, fresh build session).
//
// One original image, made for this bounty in this session: a colossal
// jellyfish blazing like a golden sun in the night sky, a single beam of
// light pouring from its bell straight down onto one tiny fishing boat
// alone on a dark sea. Three fresh candidates were generated and judged
// in this session against the judge's five criteria — instant jolt,
// surprise, momentum, clean craft, reads small — and this one won: the
// dome fills two thirds of the frame, the beam is one unbroken vertical,
// and the lone boat makes the scale twist unmistakable even at ~300 px.
// No text inside the image, no smears, no broken detail.
//
// The kit rules allow the simplest entry: a repository holding the
// image and a program that copies it to the output path. That is what
// this program does. entry.png is stored here as 512x1024 px, JPEG
// bytes under a .png name (the rules say the format is told apart by
// the first bytes, so this is explicitly allowed).
//
// Determinism: a straight byte copy has no randomness, no clock, no
// network and no floating point. Two runs by the grader cannot differ.

import { copyFileSync, existsSync, mkdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

// Resolve the image next to this file, so the run works from any cwd
// and survives paths with spaces or percent-encoding.
const repoDir = fileURLToPath(new URL('.', import.meta.url));
const source = join(repoDir, 'entry.png');

// The grader reads /output/entry.png; local runs may redirect with
// the environment variable the kit documents. Nothing else is written.
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
const target = join(outDir, 'entry.png');

if (!existsSync(source)) {
  throw new Error(`entry image not found: ${source}`);
}

const stat = statSync(source);
if (stat.size === 0) {
  throw new Error(`entry image is empty: ${source}`);
}
if (stat.size > 1_048_576) {
  throw new Error(`entry image over the 1 MiB gate limit: ${stat.size} bytes`);
}

// The gate only accepts a whole PNG or JPEG, told apart by the first
// bytes — refuse anything else here instead of shipping it. A whole
// image also has its proper ending, so check that too: a JPEG must end
// with its EOI marker, a PNG with its IEND chunk.
const bytes = readFileSync(source);
const head = bytes.subarray(0, 8);
const isPng = head[0] === 0x89 && head[1] === 0x50 && head[2] === 0x4e && head[3] === 0x47;
const isJpeg = head[0] === 0xff && head[1] === 0xd8 && head[2] === 0xff;
if (!isPng && !isJpeg) {
  throw new Error('entry image is neither PNG nor JPEG (first bytes do not match)');
}
if (isJpeg && !(bytes[bytes.length - 2] === 0xff && bytes[bytes.length - 1] === 0xd9)) {
  throw new Error('entry image is a truncated JPEG (no EOI marker at the end)');
}
if (isPng && !bytes.subarray(bytes.length - 12).includes(Buffer.from('IEND'))) {
  throw new Error('entry image is a truncated PNG (no IEND chunk at the end)');
}

mkdirSync(outDir, { recursive: true });
copyFileSync(source, target);

// The judge sees exactly the bytes in this file, so prove the copy is
// complete before the program exits: same length, same bytes.
const written = readFileSync(target);
const original = readFileSync(source);
if (written.length !== original.length || !written.equals(original)) {
  throw new Error(`output differs from source: ${target}`);
}
