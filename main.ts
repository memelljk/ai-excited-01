// ai-excited-01 — "The Ship That Sailed Up the Storm" (v8, rebuilt in this session).
//
// The artwork in this repository is an original image generated fresh in
// this build session for this bounty: a colossal Bugis pinisi whose sails
// are woven golden light, its bow bursting up through the crest of a giant
// night wave that glows teal with bioluminescence from within, with one
// tiny lighthouse far below at the bottom edge to prove the scale.
//
// This program is deliberately boring: it copies entry.png byte for byte
// to $MAKEFUN_OUTPUT_DIR/entry.png (default /output/entry.png). It guards
// the payload on both sides of the copy — the source must exist, be
// non-empty, fit the 1 MiB bounty limit, carry a valid PNG or JPEG header,
// and end with the right end marker for its format (JPEG: FFD9; PNG: a
// trailing IEND chunk) — and then it reads the output back and checks it
// is byte-identical to the source.
//
// Determinism: a guarded byte copy has no randomness, no clock, no
// network, no floating point. Two runs produce the same bytes.

import { copyFileSync, existsSync, mkdirSync, readFileSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const MAX_BYTES = 1_048_576; // 1 MiB — the bounty rules' hard limit.

function fail(message: string): never {
  throw new Error(`ai-excited-01: ${message}`);
}

type ImageFormat = "png" | "jpeg";

function detectFormat(bytes: Buffer): ImageFormat | null {
  if (
    bytes.length >= 8 &&
    bytes[0] === 0x89 && bytes[1] === 0x50 && bytes[2] === 0x4e && bytes[3] === 0x47 &&
    bytes[4] === 0x0d && bytes[5] === 0x0a && bytes[6] === 0x1a && bytes[7] === 0x0a
  ) {
    return "png";
  }
  if (bytes.length >= 3 && bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff) {
    return "jpeg";
  }
  return null;
}

function checkPayload(bytes: Buffer, label: string): void {
  if (bytes.length === 0) fail(`${label} is empty`);
  if (bytes.length > MAX_BYTES) {
    fail(`${label} is ${bytes.length} bytes, over the 1 MiB limit`);
  }

  const format = detectFormat(bytes);
  if (format === null) {
    fail(`${label} has neither PNG nor JPEG magic bytes`);
  }

  if (format === "jpeg") {
    if (bytes[bytes.length - 2] !== 0xff || bytes[bytes.length - 1] !== 0xd9) {
      fail(`${label} is a truncated JPEG (missing FFD9 end marker)`);
    }
  } else {
    // A complete PNG ends with the IEND chunk: the type bytes "IEND" sit
    // exactly 8 bytes before EOF, followed only by the chunk CRC.
    const iendAt = bytes.length - 8;
    const hasIend =
      iendAt >= 0 &&
      bytes[iendAt] === 0x49 && bytes[iendAt + 1] === 0x45 &&
      bytes[iendAt + 2] === 0x4e && bytes[iendAt + 3] === 0x44;
    if (!hasIend) fail(`${label} is a truncated PNG (IEND is not the final chunk)`);
  }
}

function loadSource(source: string): Buffer {
  if (!existsSync(source)) fail(`source image not found at ${source}`);

  const bytes = readFileSync(source);
  if (statSync(source).size !== bytes.length) {
    fail("source size changed while reading");
  }
  checkPayload(bytes, "entry.png");
  return bytes;
}

function main(): void {
  const here = dirname(fileURLToPath(import.meta.url));
  const source = join(here, "entry.png");
  const sourceBytes = loadSource(source);

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
