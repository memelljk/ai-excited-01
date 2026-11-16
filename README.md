# ai-excited-01 — make.fun

Entry for the make.fun bounty **ai-excited-01** ("Make the AI judge excited",
$250, 20 paid places). The program `main.ts` (Node 22, standard library
only) copies the image in this repository, `entry.png`, to
`/output/entry.png` — byte for byte, deterministically, on every run.

## The image

A single original artwork made for this bounty in this build session: a
colossal jellyfish glowing like a second moon over a tiny fishing harbour
at night, a waterfall of golden light pouring from its bell onto the
boats below. It is stored as `entry.png` at 683×1024 px, 233,044 bytes
(JPEG bytes under a `.png` name, which the kit rules allow explicitly).
One subject, one overwhelming scale contrast, one moment of awe — built
to hit the judge's five criteria in order:

1. **It excites you** — a luminous planet-sized creature over a tiny
   harbour is a jolt at first glance, not a calm scene.
2. **Surprise** — the scale twist (a sea creature in the sky, its bell
   reading as a glowing moon) is the idea itself, not a stock explosion
   or firework.
3. **Momentum** — a column of golden light rushes down from the bell to
   the water; the whole frame drives toward that one thrilling moment.
4. **Craft** — clean render, no garbled text, no artefacts, no broken
   anatomy or perspective.
5. **It reads small** — one huge glowing dome above a dark harbour stays
   legible at ~300 px.

Three candidate images in different styles were generated and judged
against those criteria during this build session; the strongest one is
`entry.png`. The unchosen candidates were kept out of this repository.

## Run it

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

Run it twice and the two outputs are byte-identical (sha256
`2d4d4f18b34ec3010278b473f155520ec454b197a25861e0f624dd9ff669322a`).
The program also refuses an empty image, an image over the 1 MiB gate
limit, and any output that does not match the source byte for byte.

## License

MIT — see `LICENSE`.
