# El Mundo de Nico — Website V1.1.0

Flagship React/Vite website for **mundodenico.com**, focused specifically on Nico and his stories inside the broader *Entre dichos y aventuras* universe.

## Creative direction

The site is not a generic author/catalog page. It is a **living illustrated storybook** whose UI follows Nico's literal imagination. The V1 visual language combines warm paper, tactile editorial texture, bold modern color, layered cards, hand-drawn doodles, responsive motion, and small interactive surprises.

V1 centers on:

- **El día que papá casi se muere de hambre** as the current flagship / in-progress story.
- **El Suspiro** as a major established adventure.
- Nico's literal interpretation of adult expressions.
- Milo as an important recurring family character.
- Alex (Dad) and Elena (Mom).
- Nico's recurring interests: rhinoceros beetles, smooth stones, golden caps, suspicious puddles/possible portals, experiments, games and sweets.

## V1 experiences

- Responsive immersive hero with existing Nico artwork and animated/drawn world motifs.
- Interactive “Papá casi se muere de hambre” scene — click **Salvar a papá**.
- “Words come alive” interaction using the phrase *muriendo de hambre*.
- Nico character dossier and recurring-interest cards.
- Family section for Alex, Elena and Milo.
- Nico's interactive Lab: combine objects and trigger deterministic outcomes.
- Mobile-first navigation and touch-friendly controls.
- `prefers-reduced-motion` support.
- No child accounts or child-data collection in V1.

## Tech stack

Same deployment philosophy as ExoNuvia:

- React 18
- Vite 5
- GitHub Actions
- GitHub → Azure OIDC (no permanent Azure client secret)
- Bicep-managed Azure Static Web App
- Short-lived SWA deployment token fetched during workflow
- Production build validation + smoke test
- Static Web Apps security headers / SPA fallback

## Azure defaults

- Resource group: `rg-mundodenico-web-prod`
- Static Web App: `swa-mundodenico-prod`
- Location: `centralus`
- SKU: `Free`
- Production domain: `mundodenico.com`

## First deployment

### 1. Push repo to GitHub

Create a dedicated repo, e.g. `mundo-de-nico`.

### 2. Bootstrap Azure + OIDC once from an administrator workstation

```powershell
.\scripts\bootstrap-azure.ps1 -GitHubOwner "YOUR_GITHUB_OWNER" -GitHubRepo "YOUR_REPO"
```

The script prints the three GitHub Actions secrets:

- `AZURE_CLIENT_ID`
- `AZURE_TENANT_ID`
- `AZURE_SUBSCRIPTION_ID`

Add them at **GitHub → Settings → Secrets and variables → Actions**.

### 3. Push/merge to `main`

`.github/workflows/deploy.yml` will:

1. install/build,
2. authenticate to Azure with OIDC,
3. validate and reconcile Bicep,
4. retrieve the SWA deployment credential at runtime,
5. deploy `dist/`,
6. smoke-test the Azure hostname.

### 4. Connect `mundodenico.com`

After the SWA exists:

```powershell
.\scripts\configure-custom-domain.ps1
```

Follow the TXT validation and apex alias/flattening instructions emitted by the script. DNS is intentionally kept separate from normal website deployments.

## Local development

```bash
npm ci
npm run dev
```

Production build:

```bash
npm run build
```

## Artwork

Existing project images are in `public/art/` and are treated as replaceable canonical assets. As the final art for **El día que papá casi se muere de hambre**, Milo, Alex and Elena is approved, it can be added without rewriting the page architecture.

Recommended production asset convention:

```text
public/art/
  nico-hero.webp
  milo.webp
  alex.webp
  elena.webp
  stories/
    el-suspiro-cover.webp
    papa-hambre-cover.webp
```

Do not introduce generic stock/AI-looking character art in place of canonical characters.

## Child privacy posture

V1 intentionally keeps the interactive experiences local in the browser and does not require child profiles. `public/privacy/` is a technical starting point only. Before adding analytics, commerce, mailing lists, forms, user accounts, advertising, third-party embeds, or personalization, update the privacy/legal implementation to match the actual production services.
