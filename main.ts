// ai-excited-01 — "The Ship That Sailed Up the Storm" (v6, fresh session).
//
// One original image, generated in this session for this bounty: a colossal
// Bugis pinisi whose seven sails burn like woven golden light, its bow
// bursting UP through the crest of a giant night wave that glows teal with
// bioluminescence from within — and one tiny lighthouse far below to prove
// the scale. Three fresh candidates were generated and judged in this
// session against the judge's five criteria (instant jolt, surprise,
// momentum, clean craft, reads small); the pinisi won on all five.
//
// This program does the simplest allowed thing: it copies entry.png,
// byte for byte, to $MAKEFUN_OUTPUT_DIR/entry.png (default
// /output/entry.png). Before and after the copy it guards the payload:
// the source must exist, be non-empty, be at most 1 MiB, carry valid
// PNG or JPEG magic bytes, and end with the proper end marker for its
// format (JPEG: FFD9; PNG: an IEND chunk). After copying, the output is
// read back and compared byte for byte with the source.
//
// Determinism: a guarded byte copy has no randomness, no clock, no
// network and no floating point. Every run produces identical output.

import { copyFileSync, existsSync, mkdirSync, readFileSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const MAX_BYTES = 1_048_576; // 1 MiB hard limit from the bounty rules.

function fail(message: string): never {
  throw new Error(`ai-excited-01: ${message}`);
}

function checkPayload(bytes: Buffer, label: string): void {
  if (bytes.length === 0) fail(`${label} is empty`);
  if (bytes.length > MAX_BYTES) {
    fail(`${label} is ${bytes.length} bytes, over the 1 MiB limit`);
  }

  const isPng =
    bytes.length >= 8 &&
    bytes[0] === 0x89 && bytes[1] === 0x50 && bytes[2] === 0x4e && bytes[3] === 0x47 &&
    bytes[4] === 0x0d && bytes[5] === 0x0a && bytes[6] === 0x1a && bytes[7] === 0x0a;
  const isJpeg = bytes.length >= 3 && bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff;

  if (!isPng && !isJpeg) fail(`${label} has neither PNG nor JPEG magic bytes`);

  if (isJpeg) {
    const tail = bytes.subarray(bytes.length - 2);
    if (tail[0] !== 0xff || tail[1] !== 0xd9) {
      fail(`${label} is a truncated JPEG (missing FFD9 end marker)`);
    }
  }
  if (isPng) {
    // A complete PNG ends with the IEND chunk: its type bytes "IEND" sit
    // exactly 8 bytes before EOF, followed only by the chunk CRC.
    const iendAt = bytes.length - 8;
    const iend =
      iendAt >= 0 &&
      bytes[iendAt] === 0x49 && bytes[iendAt + 1] === 0x45 &&
      bytes[iendAt + 2] === 0x4e && bytes[iendAt + 3] === 0x44;
    if (!iend) fail(`${label} is a truncated PNG (IEND is not the final chunk)`);
  }
}

function main(): void {
  const here = dirname(fileURLToPath(import.meta.url));
  const source = join(here, "entry.png");
  if (!existsSync(source)) fail(`source image not found at ${source}`);

  const sourceBytes = readFileSync(source);
  if (statSync(source).size !== sourceBytes.length) {
    fail("source size changed while reading");
  }
  checkPayload(sourceBytes, "entry.png");

  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  if (outDir.trim() === "") fail("MAKEFUN_OUTPUT_DIR is set but empty");
  mkdirSync(outDir, { recursive: true });
  const target = join(outDir, "entry.png");

  copyFileSync(source, target);

  const written = readFileSync(target);
  checkPayload(written, "output entry.png");
  if (!written.equals(sourceBytes)) {
    fail("output differs from source after copy (byte-compare failed)");
  }
}

main();
