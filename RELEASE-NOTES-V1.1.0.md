# El Mundo de Nico V1.1.0 — Mundo Vivo

V1.1.0 intensifies the colorful, playful identity of Nico's world without changing the React/Vite + GitHub OIDC + Bicep + Azure Static Web Apps deployment architecture.

## Experience upgrades

- Introduces a soft, original browser-synthesized background melody with an always-accessible music control. The site attempts playback immediately; browsers that block audible autoplay start it on the visitor's first interaction.
- Rebuilds the El Suspiro visual as a bright Picture Day school scene rather than a dark/ghostly image.
- Gives Suspiro a friendly cloud-like face and makes him draggable with mouse, pen, or finger using Pointer Events.
- Rebuilds the hungry-dad interaction around a real illustrated pancake meal with fruit, butter, syrup, steam, a success burst, and a short relief chime.
- Adds rhinoceros beetles that scurry around the viewport as scroll progress changes.
- Brightens and increases saturation of the Picture Day/Nico imagery while preserving the underlying canonical art.
- Increases color across the hero, adventure cards, Nico section, curiosities, words experience, family cards, laboratory and footer.
- Respects prefers-reduced-motion by disabling nonessential ambient motion.

## Technical notes

- No new npm dependencies.
- Music and the relief chime are generated with the Web Audio API; no copyrighted audio file is bundled.
- Suspiro dragging uses Pointer Events and pointer capture for mouse/touch parity.
- Infrastructure resources, names and production domain remain unchanged.
