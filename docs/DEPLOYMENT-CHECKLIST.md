# V1 deployment checklist

1. Create a dedicated GitHub repository and push these files.
2. Run `scripts/bootstrap-azure.ps1` once with the real GitHub owner/repository.
3. Add the three printed Azure values to GitHub Actions secrets.
4. Push/merge `main`; confirm the deploy workflow is green.
5. Open the Azure Static Web Apps default hostname and test desktop + phone.
6. Run `scripts/configure-custom-domain.ps1`.
7. Add/verify the required ownership TXT and apex mapping in the DNS hosting `mundodenico.com`.
8. Confirm `https://mundodenico.com` is valid over HTTPS.
9. Before public launch, replace/approve any artwork that is not yet final canonical art.
10. Before enabling analytics, email collection, checkout, advertising, embeds or accounts, update the privacy implementation to match the production services.
