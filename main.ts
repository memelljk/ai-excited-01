// Publisher for the ai-excited-01 artwork.
//
// Job in one sentence: take the picture that lives next to this file,
// prove that it is a well-formed image within the size allowance, place
// an exact duplicate into the output folder, then prove the duplicate
// matches the original octet by octet.
//
// The program is intentionally boring and repeatable. It consults no
// clock, draws no random numbers, opens no network connection and does
// no fractional arithmetic, so the same input always yields the same
// output and the same verdict.
//
// Guarding happens in two separate phases on purpose. Phase one runs
// before anything is copied and rejects a missing, empty, oversized or
// malformed source. Phase two runs on the file that actually landed in
// the output folder: it repeats the format examination, insists the
// format stayed the same, and then compares every byte, so a copy that
// was truncated or altered in transit can never pass as a success.

import { copyFileSync, existsSync, mkdirSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

type PictureKind = "png-picture" | "jpeg-picture";

const OCTET_CEILING: number = 1048576;
const FALLBACK_FOLDER: string = "/output";
const PICTURE_NAME: string = "entry.png";

const PNG_OPENING: readonly number[] = [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a];
const JPEG_OPENING: readonly number[] = [0xff, 0xd8, 0xff];
const JPEG_CLOSING: readonly number[] = [0xff, 0xd9];
const PNG_IEND_TRAILER: readonly number[] = [
  0x00, 0x00, 0x00, 0x00, 0x49, 0x45, 0x4e, 0x44, 0xae, 0x42, 0x60, 0x82,
];

function halt(reason: string): never {
  console.error("entry publisher stopped: " + reason);
  process.exit(1);
}

function beginsWith(data: Uint8Array, prefix: readonly number[]): boolean {
  if (data.length < prefix.length) {
    return false;
  }
  for (let at = 0; at < prefix.length; at += 1) {
    if (data[at] !== prefix[at]) {
      return false;
    }
  }
  return true;
}

function finishesWith(data: Uint8Array, suffix: readonly number[]): boolean {
  if (data.length < suffix.length) {
    return false;
  }
  const offset: number = data.length - suffix.length;
  for (let at = 0; at < suffix.length; at += 1) {
    if (data[offset + at] !== suffix[at]) {
      return false;
    }
  }
  return true;
}

function recognisePicture(data: Uint8Array, label: string): PictureKind {
  if (beginsWith(data, PNG_OPENING)) {
    return "png-picture";
  }
  if (beginsWith(data, JPEG_OPENING)) {
    return "jpeg-picture";
  }
  halt(label + " does not start with a PNG or JPEG signature");
}

function confirmClosing(data: Uint8Array, kind: PictureKind, label: string): void {
  if (kind === "jpeg-picture") {
    if (finishesWith(data, JPEG_CLOSING) === false) {
      halt(label + " is a JPEG that lacks its closing FF D9 marker");
    }
    return;
  }
  if (finishesWith(data, PNG_IEND_TRAILER) === false) {
    halt(label + " is a PNG that does not finish with an IEND chunk");
  }
}

function examinePayload(data: Uint8Array, label: string): PictureKind {
  if (data.length === 0) {
    halt(label + " is empty, so there is no picture to publish");
  }
  if (data.length > OCTET_CEILING) {
    halt(label + " uses " + data.length + " bytes, above the 1048576 byte allowance");
  }
  const kind: PictureKind = recognisePicture(data, label);
  confirmClosing(data, kind, label);
  return kind;
}

function planRoutes(): { origin: string; target: string; folder: string } {
  const homeFolder: string = dirname(fileURLToPath(import.meta.url));
  const origin: string = join(homeFolder, PICTURE_NAME);
  const requested: string | undefined = process.env.MAKEFUN_OUTPUT_DIR;
  const folder: string =
    requested === undefined || requested === "" ? FALLBACK_FOLDER : requested;
  return { origin: origin, target: join(folder, PICTURE_NAME), folder: folder };
}

function compareOctets(left: Uint8Array, right: Uint8Array, label: string): void {
  if (left.length !== right.length) {
    halt(label + " changed length while being copied");
  }
  for (let at = 0; at < left.length; at += 1) {
    if (left[at] !== right[at]) {
      halt(label + " differs from the original at byte position " + at);
    }
  }
}

function runPublisher(): void {
  const routes = planRoutes();

  if (existsSync(routes.origin) === false) {
    halt("no source picture was found at " + routes.origin);
  }

  let original: Uint8Array;
  try {
    original = readFileSync(routes.origin);
  } catch {
    halt("the source picture exists but could not be read");
  }
  const sourceKind: PictureKind = examinePayload(original, "source picture");

  mkdirSync(routes.folder, { recursive: true });
  copyFileSync(routes.origin, routes.target);

  let duplicate: Uint8Array;
  try {
    duplicate = readFileSync(routes.target);
  } catch {
    halt("the copied picture could not be read back for checking");
  }
  const copyKind: PictureKind = examinePayload(duplicate, "copied picture");
  if (copyKind !== sourceKind) {
    halt("copied picture changed format while being copied");
  }
  compareOctets(original, duplicate, "copied picture");

  console.log(
    "published " + duplicate.length + " bytes to " + routes.target + " and verified every byte",
  );
}

runPublisher();
