# ai-excited-01 — make.fun

Entry for the make.fun bounty **ai-excited-01** ("Make the AI judge excited",
$250, 20 paid places). The program `main.ts` (Node 22, standard library
only) copies the image in this repository, `entry.png`, to
`/output/entry.png` — byte for byte, deterministically, on every run.

## The image

A single original artwork made for this bounty: a colossal glowing
jellyfish, the size of a skyscraper, drifting low over a tiny coastal town
at dusk, its bioluminescent tendrils lighting the streets below. It is
stored as `entry.png` at 1024×1024 px, 351,738 bytes (JPEG bytes under a
`.png` name, which the kit rules allow explicitly). One subject, huge
scale contrast, one moment of awe — built to hit the judge's five
criteria in order:

1. **It excites you** — a giant luminous creature over a tiny town is a
   jolt at first glance, not a calm scene.
2. **Surprise** — the scale twist (a sea creature in the sky, bigger than
   the buildings) is the idea itself, not a stock explosion or firework.
3. **Momentum** — the jellyfish drifts down toward the town, light
   streaming from its bell, the whole composition leaning into one
   thrilling moment.
4. **Craft** — clean render, no garbled text, no broken anatomy.
5. **It reads small** — one huge glowing shape against a dark town stays
   legible at ~300 px.

Several candidate images in different styles were generated and judged
against those criteria during the build; the strongest one is `entry.png`.
The unchosen candidates were kept out of this repository.

## Run it

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

Run it twice and the two outputs are byte-identical (sha256).

## License

MIT — see `LICENSE`.
