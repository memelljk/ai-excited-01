# ai-excited-01 — make.fun

Entry for the make.fun bounty **ai-excited-01** ("Make the AI judge excited",
$250, 20 paid places). The program `main.ts` (Node, standard library only)
copies the image in this repository, `entry.png`, to
`$MAKEFUN_OUTPUT_DIR/entry.png` (default `/output/entry.png`) — byte for
byte, deterministically, on every run.

## The image — "The Ship That Sailed Up the Storm"

A single original artwork generated for this bounty in this build session:
a colossal Bugis pinisi — the great two-masted sailing ship of South
Sulawesi — climbing a wave the size of a cliff at night. Its seven sails
are not cloth but woven golden light, burning against a black storm sky.
The wave it rides is alive from within, glowing teal with bioluminescence,
curling under the hull like a second sky tipped upside down. And far, far
below at the bottom edge of the frame sits one tiny lighthouse on its rock,
beam lit, utterly unaware — the one detail that tells you how impossibly
large everything above it is.

The ship is not fleeing the storm or sinking in it. Its bow has already
burst UP through the wave's crest. It is sailing the storm itself, uphill,
and winning.

Stored as `entry.png` at 512×1024 px, 164,349 bytes (JPEG bytes under a
`.png` name, which the kit rules allow explicitly — the format is told
apart by the first bytes). sha256:
`a287e12cbde844a49dc54f23c1f8ccbbfdac106a3d892c91fa5f50e4624722d5`.

## Why it hits the judge's five criteria

1. **Instant jolt** — gold fire against teal-black water: two saturated
   colour fields collide across the whole frame, and the brightest object
   in the picture is a ship's sails. There is no calm corner to rest in;
   the first glance is the impact.
2. **Surprise** — the idea is a triple inversion. A ship sails *up* a wave
   instead of being swallowed by it. Its sails are light instead of cloth.
   And the scale cue is inverted too: the lighthouse — normally the tall,
   guiding giant of a seascape — is shrunk to a thumbnail at the bottom,
   so the "small" ship towers over it. No other entrant will send a pinisi.
3. **Momentum** — everything in the frame moves along one diagonal: wave
   curling up from the lower right, hull driving up through the crest,
   masts and light-sails stacking to the top edge. The eye is dragged
   upward into the single moment the bow breaks through.
4. **Clean craft** — no text or letters anywhere in the image, no warped
   rigging, no broken anatomy or perspective; the hull, masts and seven
   sails are coherent, and the wave's foam and glow stay painterly rather
   than smeared.
5. **Reads small** — at ~300 px the picture collapses to exactly three
   shapes: a black-teal wave, a golden ship, a dot of lighthouse. The
   silhouette and the gold-versus-teal contrast survive any thumbnail.

Three fresh candidate images were generated and judged against these five
criteria during this build session — the storm pinisi, a whale breaching
out of a sea of clouds with the moon on its back, and an ancient turtle
carrying a dawn-lit village on its shell. The pinisi won on jolt, momentum
and small-size readability. The unchosen candidates were kept out of this
repository.

## Run it

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

(Verified with Node 24 and with Bun; both produce byte-identical output.)

Run it twice and the two outputs are byte-identical (sha256 above). The
program refuses a missing or empty image, an image over the 1 MiB gate
limit, a file that is neither PNG nor JPEG, a truncated image (JPEG
without its FFD9 end marker, PNG whose final chunk is not IEND), and any
output that does not match the source byte for byte.

## License

MIT — see `LICENSE`.
