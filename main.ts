// ai-excited-01 — entry shipper, ninth draft.
//
// One job only: carry entry.png, byte for byte, into the folder the
// harness points at with MAKEFUN_OUTPUT_DIR (or /output when that
// variable is unset). The picture is inspected before the copy — and
// the copy is re-read and compared afterwards — so a broken or
// foreign file can never slip through as an entry. Nothing here is
// random, timed, or fetched from anywhere: the same input always
// produces the same output.

import { existsSync, mkdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

// A single picture may not be larger than one mebibyte.
const BYTE_CAP = 1048576;

// The opening bytes every genuine PNG file carries.
const PNG_OPEN = [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a];
// The opening bytes every genuine JPEG file carries.
const JPEG_OPEN = [0xff, 0xd8, 0xff];
// The four letters naming the closing chunk of a PNG file.
const PNG_CLOSE = [0x49, 0x45, 0x4e, 0x44];
// The two bytes that close a JPEG file.
const JPEG_CLOSE = [0xff, 0xd9];

type PictureKind = "png" | "jpeg";

// True when the first bytes of `blob` equal the given `head`.
function opensWith(blob: Buffer, head: number[]): boolean {
  if (blob.length < head.length) return false;
  for (let i = 0; i < head.length; i++) {
    if (blob[i] !== head[i]) return false;
  }
  return true;
}

// Work out which picture format `blob` claims to be, or null when it
// claims to be neither PNG nor JPEG.
function kindOf(blob: Buffer): PictureKind | null {
  if (opensWith(blob, PNG_OPEN)) return "png";
  if (opensWith(blob, JPEG_OPEN)) return "jpeg";
  return null;
}

// True when the tail of the file matches its format: a PNG must end
// with an IEND chunk (type letters eight bytes from the end), a JPEG
// must end with the two bytes FF D9.
function tailIsWhole(blob: Buffer, kind: PictureKind): boolean {
  if (kind === "jpeg") {
    return blob.length >= 2 && opensWith(blob.subarray(blob.length - 2), JPEG_CLOSE);
  }
  if (blob.length < 12) return false;
  return opensWith(blob.subarray(blob.length - 8, blob.length - 4), PNG_CLOSE);
}

// Read the entry picture next to this file, refusing anything that
// fails any of the checks. Returns the raw bytes on success.
function fetchEntry(source: string): Buffer {
  if (!existsSync(source)) {
    throw new Error(`entry picture is missing: ${source}`);
  }
  const size = statSync(source).size;
  if (size === 0) {
    throw new Error("entry picture is empty (0 bytes)");
  }
  if (size > BYTE_CAP) {
    throw new Error(`entry picture is ${size} bytes, over the ${BYTE_CAP} byte cap`);
  }
  const blob = readFileSync(source);
  const kind = kindOf(blob);
  if (kind === null) {
    throw new Error("entry picture is neither a PNG nor a JPEG (opening bytes do not match)");
  }
  if (!tailIsWhole(blob, kind)) {
    throw new Error(`entry picture is a truncated ${kind.toUpperCase()} (closing marker missing)`);
  }
  return blob;
}

// Write `blob` into `targetDir/entry.png`, then read it straight back
// and demand an exact byte-for-byte match with what was written.
function placeEntry(blob: Buffer, targetDir: string): string {
  mkdirSync(targetDir, { recursive: true });
  const target = join(targetDir, "entry.png");
  writeFileSync(target, blob);
  const back = readFileSync(target);
  if (!back.equals(blob)) {
    throw new Error("written entry.png does not match the source byte for byte");
  }
  return target;
}

function run(): void {
  const here = dirname(fileURLToPath(import.meta.url));
  const source = join(here, "entry.png");
  const targetDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  const picture = fetchEntry(source);
  const target = placeEntry(picture, targetDir);
  console.log(`entry.png delivered: ${picture.length} bytes -> ${target}`);
}

try {
  run();
} catch (err) {
  console.error(`ai-excited-01: ${err instanceof Error ? err.message : String(err)}`);
  process.exit(1);
}
