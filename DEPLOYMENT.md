# CreatorFlow deployment

CreatorFlow is a static HTML/CSS/JavaScript site and is compatible with GitHub Pages.

## GitHub Pages

1. In **Settings → Pages**, set **Source** to **GitHub Actions**.
2. The repository contains a deployment workflow at `.github/workflows/pages.yml`.
3. Pushes to `main` trigger deployment.
4. After the workflow succeeds, GitHub Pages publishes the site at the repository's Pages URL.

## Troubleshooting

If deployment does not start, open the repository's **Actions** tab and check the Pages workflow. Confirm that Pages is set to GitHub Actions and that Actions are enabled for the repository.
