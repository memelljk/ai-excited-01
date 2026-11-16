# AI Excited — The Ship That Sailed Up the Storm

A giant Bugis pinisi, seven sails burning like woven gold, climbs
straight up the face of a towering night wave instead of sailing
across it. The wave itself glows teal from within, lit by
bioluminescence, and far below, a single tiny lighthouse blinks —
the only thing in the frame that tells you how enormous the ship
really is. It is a picture about daring to go up when every instinct
says to go around.

## Why a pinisi

The brief asked for a theme no other entrant would send, and for a
picture that lands in the first half-second. A pinisi is that theme:
a wooden sailing ship from South Sulawesi, built by hand, carrying
centuries of seafaring pride — and here it is doing something no
ship should be able to do, riding vertically up a wall of water.
The image is rooted in Bugis heritage, which makes it personal and
unrepeatable, not a generic fantasy ship. The vertical climb gives
the eye one direction and one moment: the bow breaking through the
crest, sails lit, sea glowing beneath.

## The picture

- **Format:** PNG, portrait 512 × 1024 px, 187,180 bytes
- **SHA-256:** `e45cf68072be182e4a5ac1dc7c3854eb4a8bb3a472553d65e4d9cac81ec3df9e`
- **No text anywhere inside the image.** One dominant subject, clean
  silhouettes, nothing that needs reading.

## How the picture meets the five judging criteria

1. **Instant jolt.** A ship sailing *up* a wave is wrong in the best
   way — the eye catches the impossibility before it reads any
   detail. Gold sails against a black-teal sea is a contrast that
   hits from across the room.
2. **Surprise.** Scale and roles are flipped twice: the wave is a
   mountain the ship climbs, and the lighthouse — normally the
   tallest thing on a coast — is a speck at the bottom. Nobody
   expects a pinisi in an AI-art contest at all.
3. **Momentum.** Everything points one way: the bow, the curve of
   the wave, the lean of the sails, the spray — all of it drives the
   eye upward to the crest, to a single frozen moment of breakthrough.
4. **Clean craft.** No letters, no logos, no watermark, no broken
   anatomy. The ship's rigging, hull, and sails are whole; the wave
   reads as one shape, not a collage of fragments.
5. **Reads small.** At thumbnail size the picture is still one
   unmistakable thing: a golden-sailed ship climbing a glowing wave.
   The lighthouse vanishes at small sizes and the image loses
   nothing — the ship alone carries it.

## What `main.ts` does

`main.ts` is a small, deterministic Node program (TypeScript with
erasable syntax — no build step). Its only job is to deliver
`entry.png` into the output folder:

1. It finds `entry.png` sitting next to itself and refuses to go on
   if the file is missing, empty, or larger than 1 MiB (1,048,576 bytes).
2. It checks the opening bytes: a PNG must start with the standard
   eight-byte PNG signature; a JPEG must start with `FF D8 FF`.
   Anything else is rejected as not a picture.
3. It checks the ending, too: a JPEG must finish with `FF D9`, and
   a PNG must finish with an IEND chunk. A file cut short fails here.
4. It writes the bytes to `$MAKEFUN_OUTPUT_DIR/entry.png`
   (default `/output/entry.png`), creating the folder if needed.
5. It reads the written file back and demands a byte-for-byte match
   with the source before reporting success.

There is no randomness, no clock, no network, and no floating-point
math anywhere — running it twice on the same entry always produces
the identical file.

## Verification

- Run `main.ts` twice with different output folders: both outputs
  are byte-identical to the repo's `entry.png` (same SHA-256 as above).
- Negative checks, run against throwaway copies so the repo is never
  touched: a JPEG missing its `FF D9` ending is refused, a file with
  wrong opening bytes is refused, and a missing `entry.png` is refused
  — each exits with code 1 and a guard message naming the problem.
- `node main.ts` and `bun main.ts` both run cleanly.

## License

See `LICENSE`.
