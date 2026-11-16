# A Ship Riding Light Over a Living Sea

My entry for ai-excited-01 is a single tall picture of a Bugis Pinisi
under full sail at night, caught in the instant its bow breaks upward
through the crest of an enormous wave.

Nothing in the scene sits still. The vessel climbs rather than floats,
the ocean glows from underneath, and far below a lighthouse so small
it could fit on a thumbnail reminds you how large everything else is.

## What you are looking at

Seven sails carry the ship, and none of them is plain cloth. Each one
shines as if gold thread had been woven straight into the canvas, so
the rigging becomes a tower of warm light against a dark sky.

The wave does the opposite work. Its colour is a deep teal that seems
lit from inside the water itself, the way plankton blooms flare when
a hull disturbs them at night. Foam, spray and hull all meet at one
bright breaking point near the top of the frame.

Down at the bottom edge, almost easy to miss on first viewing, stands
that solitary lighthouse. It is the only building in the picture and
it earns its place purely by being tiny: one glance at it rescales
the ship and the wave from large to gigantic.

That delay is deliberate. The eye celebrates the sails first, rides
the glowing crest second, and only then discovers the lighthouse —
and the whole scene grows in the imagination at the exact moment the
smallest object in it is finally noticed.

## Why it fits what the judges reward

**A jolt on first sight.** Height does the opening work. The portrait
shape stacks wave, hull and sails into one rising column, and the
clash between golden light above and teal glow below registers
before any detail does.

**An idea you did not expect.** Ocean waves are normally the thing a
ship survives, preferably by going around or over them gently. Here
the wave is a ramp and the ship takes it at speed, sailing up the
storm instead of waiting for the storm to pass.

**One clear direction of travel.** Every line leans the same way:
the wave curls upward, the bow points upward, the sails billow
upward. Your eye boards at the lighthouse, rides the crest, and
leaves through the topmost sail without ever changing direction.

**Finished, uncluttered craft.** There are no words, letters or
logos anywhere in the artwork, no stray marks, and no second subject
competing for attention. One ship, one wave, one distant light.

**Legible when shrunk.** Reduce the picture to a few hundred pixels
and the essentials survive intact: a bright triangular cluster of
sails, a dark hull silhouette, and a luminous curl beneath it. The
story still reads in about a second.

## The file itself

- Name in this repository: `entry.png`
- Dimensions: 512 wide by 1024 tall, a two-to-one portrait frame
- Size on disk: 187180 bytes
- SHA-256: `e45cf68072be182e4a5ac1dc7c3854eb4a8bb3a472553d65e4d9cac81ec3df9e`
- Stored bytes are a JPEG stream, even though the file name ends in
  `.png`; the delivery program identifies pictures by their opening
  bytes rather than by trusting a name.

## How delivery works

Running `main.ts` with Node copies the picture into the folder named
by the `MAKEFUN_OUTPUT_DIR` environment variable, falling back to
`/output` when that variable is unset. Before anything moves, the
program confirms the source is present, non-empty and no larger than
1048576 bytes, and that it genuinely opens and closes like a PNG or
a JPEG. After the copy lands, it reads the new file back and compares
it against the original byte by byte, refusing to report success if
even a single byte disagrees.
