# Deployment architecture — mundodenico.com

## Production flow

```text
Developer / GitHub main
        |
        v
GitHub Actions
  - Node 22
  - npm ci / audit
  - Vite production build
        |
        v
GitHub OIDC token
        |
        v
Microsoft Entra federated identity
(resource-group-scoped Contributor)
        |
        +----> Bicep reconciliation
        |       rg-mundodenico-web-prod
        |          └─ swa-mundodenico-prod
        |
        +----> Retrieve SWA deployment token at runtime
                    |
                    v
             Deploy prebuilt dist/
                    |
                    v
             Azure Static Web Apps
                    |
                    +--> Azure default hostname smoke test
                    |
                    └--> mundodenico.com custom domain
```

## Security / operational choices inherited from ExoNuvia

- No long-lived Azure client secret in GitHub.
- Workload identity federation through GitHub OIDC.
- GitHub service principal scoped to the website resource group rather than broad subscription access.
- Bicep remains source of truth for the hosting resource.
- Website deployment does not mutate DNS records.
- Custom-domain work is a separate explicit operation.
- Static Web Apps deployment token is fetched during the workflow and masked.
- Build and smoke-test gates are part of production deployment.
- Security headers live with the app in `public/staticwebapp.config.json`.

## V1 backend posture

V1 intentionally has no application database, login system or child profile store. Interactions run locally in React. This keeps cost, attack surface, privacy scope and operational complexity low while the brand/site experience is established.
