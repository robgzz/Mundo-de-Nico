# El Mundo de Nico — V1.0.0

## Theme

**A living storybook that thinks like Nico.**

## New

- Full React/Vite flagship landing experience for `mundodenico.com`.
- Current creative flagship: **El día que papá casi se muere de hambre**.
- Interactive “save Dad” micro-scene tied to Alex's phrase.
- “Donde las palabras cobran vida” interactive phrase treatment.
- **El Suspiro** story presentation using existing project artwork.
- Nico profile and recurring obsessions: rhinoceros beetles, smooth stones, golden caps and suspicious puddles.
- Family section featuring **Alex, Elena and Milo**.
- Milo integrated as a recurring site motif and family character.
- Interactive Nico Lab with deterministic ingredient outcomes.
- Custom hand-drawn SVG motifs and tactile paper UI.
- Responsive/mobile composition and reduced-motion support.

## Production architecture

- React 18 + Vite 5.
- Azure Static Web Apps managed with Bicep.
- GitHub Actions deployment.
- GitHub OIDC to Microsoft Entra; no stored Azure client secret.
- Resource-group-scoped deployment identity.
- Runtime retrieval of SWA deployment token.
- Build validation and production smoke test.
- Separate custom-domain workflow/script for `mundodenico.com`.
- Security headers and SPA fallback in `staticwebapp.config.json`.

## Privacy posture

V1 does not implement child accounts or persistent child profiles. Interactive features are local browser experiences. Legal/privacy copy remains a production checklist item if analytics, forms, commerce, third-party embeds or personalization are later introduced.
