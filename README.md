# ai-excited-01 — make.fun

Entry for the make.fun bounty **ai-excited-01** ("Make the AI judge
excited", $250, 20 paid places). The program `main.ts` (Node, standard
library only) copies the image in this repository, `entry.png`, to
`$MAKEFUN_OUTPUT_DIR/entry.png` (default `/output/entry.png`) — byte for
byte, deterministically, on every run.

## The image — "The Ship That Sailed Up the Storm"

One original artwork, generated fresh for this bounty in this build
session: a colossal Bugis pinisi — the great sailing ship of South
Sulawesi — climbing a wave the size of a cliff at night. Its sails are
not cloth but woven golden light, burning bright against a black storm
sky. The wave it rides is alive from within, glowing teal with
bioluminescence, curling under the hull like a second sky tipped upside
down. And far, far below, at the bottom left of the frame, sits one tiny
lighthouse on its rock, beam lit — the single detail that tells you how
impossibly large everything above it is.

The ship is not fleeing the storm and it is not sinking in it. Its bow
has already burst UP through the wave's crest. It is sailing the storm
itself, uphill, and winning.

Stored as `entry.png` at 512×1024 px, 187,180 bytes (JPEG bytes under a
`.png` name, which the kit rules allow explicitly — the format is told
apart by the first bytes). sha256:
`e45cf68072be182e4a5ac1dc7c3854eb4a8bb3a472553d65e4d9cac81ec3df9e`.

## Why it hits the judge's five criteria

1. **Instant jolt** — gold fire against teal-black water: two saturated
   colour fields collide across the whole frame, and the brightest thing
   in the picture is a ship's sails. There is no calm corner to rest in;
   the first glance is the impact.
2. **Surprise** — the idea is a triple inversion. A ship sails *up* a
   wave instead of being swallowed by it. Its sails are light instead of
   cloth. And the scale cue is inverted too: the lighthouse — normally
   the tall, guiding giant of a seascape — is shrunk to a thumbnail at
   the bottom, so the "small" ship towers over it. No other entrant will
   send a pinisi.
3. **Momentum** — everything in the frame moves along one diagonal: the
   wave curling up from the lower right, the hull driving up through the
   crest, the masts and light-sails stacking toward the top edge. The eye
   is dragged upward into the single moment the bow breaks through.
4. **Clean craft** — no text or letters anywhere in the image, no warped
   rigging, no broken anatomy or perspective; hull, masts and sails are
   coherent, and the wave's foam and glow stay painterly rather than
   smeared.
5. **Reads small** — at ~300 px the picture collapses to exactly three
   shapes: a black-teal wave, a golden ship, a dot of lighthouse. The
   silhouette and the gold-versus-teal contrast survive any thumbnail.

The image was generated fresh in this build session and resized to the
512×1024 portrait frame in this session (a direct 1:2 downscale of the
generated artwork, chosen so the lighthouse stays whole at the bottom
left). No other candidate images are stored in this repository.

## Run it

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out npx tsx main.ts
```

Run it twice and the two outputs are byte-identical (sha256 above). The
program refuses a missing or empty image, an image over the 1 MiB gate
limit, a file that is neither PNG nor JPEG, a truncated image (JPEG
without its FFD9 end marker, PNG whose final chunk is not IEND), and any
output that does not match the source byte for byte.

## License

MIT — see `LICENSE`.
