# ai-excited-01 — make.fun

Entry for the make.fun bounty **ai-excited-01** ("Make the AI judge excited",
$250, 20 paid places). The program `main.ts` (Node 22, standard library
only) copies the image in this repository, `entry.png`, to
`/output/entry.png` — byte for byte, deterministically, on every run.

## The image

A single original artwork made for this bounty in a fresh build session:
a colossal jellyfish blazing like a golden sun in the night sky, a
single beam of light pouring from its bell straight down onto one tiny
fishing boat alone on a dark sea. It is stored as `entry.png` at
512×1024 px, 126,115 bytes (JPEG bytes under a `.png` name, which the
kit rules allow explicitly — the format is told apart by the first
bytes). One subject, one overwhelming scale contrast, one moment of awe
— built to hit the judge's five criteria in order:

1. **It excites you** — a creature the size of the sky, glowing like a
   sun over a lone boat, is a jolt at first glance, not a calm scene.
2. **Surprise** — the scale twist (a sea creature in the sky, its bell
   reading as a sun, its light choosing a single boat) is the idea
   itself, not a stock explosion or firework.
3. **Momentum** — one unbroken beam of golden light rushes down from
   the bell to the water; the whole frame drives toward that one
   thrilling moment.
4. **Craft** — clean render, no garbled text, no artefacts, no broken
   anatomy or perspective.
5. **It reads small** — one huge golden dome plus one vertical beam
   plus one tiny boat stays unmistakable at ~300 px.

Three fresh candidate images in different framings were generated and
judged against those criteria during this build session; the strongest
one is `entry.png`. The unchosen candidates were kept out of this
repository.

## Run it

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

Run it twice and the two outputs are byte-identical (sha256
`ada746460b2eb89a5e5121f47d548ebad5ffae86118143e656cec0e798bfda5a`).
The program also refuses a missing or empty image, an image over the
1 MiB gate limit, a file that is neither PNG nor JPEG, a truncated
image with no proper end marker, and any output that does not match
the source byte for byte.

## License

MIT — see `LICENSE`.
