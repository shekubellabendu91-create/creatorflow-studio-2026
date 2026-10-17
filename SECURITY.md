# Security and privacy notes

## Data flow
- CreatorFlow Studio generates content locally in the browser. It does not currently call a backend or external AI API.
- CreatorDesk stores project records in the current browser's local storage. This is not encrypted storage and is not synchronized or backed up automatically.
- Do not enter passwords, payment-card details, authentication secrets, or sensitive client data into either demo.

## Repository hygiene
- Never commit access tokens, passwords, private keys, production credentials, or real customer data.
- Review changes and workflow logs before publishing.
- Keep GitHub Actions permissions limited to the tasks each workflow needs.
- Review third-party actions and dependency changes before merging.

## Reporting
This repository is a small public demo without a dedicated security response service. If you find a security issue, do not publish secrets or personal data in an issue; contact the repository owner privately where possible.
