# CreatorFlow Studio

CreatorFlow Studio is a lightweight, browser-based short-form content toolkit. Enter a topic and choose a platform and tone to generate a content pack containing a hook, script, caption, call to action, and hashtags.

## Live demos

- **CreatorFlow Studio:** https://shekubellabendu91-create.github.io/creatorflow-studio-2026/
- **CreatorDesk (separate prototype):** https://shekubellabendu91-create.github.io/creatorflow-studio-2026/creator-desk/

These are GitHub Pages static demos. If a demo is temporarily unavailable, run the app locally using the steps below.

## Features

### CreatorFlow Studio
- TikTok, Instagram Reels, YouTube Shorts, and Facebook Reels formats.
- Bold, friendly, educational, and motivational writing tones.
- Hook, script, caption, call to action, and hashtags generated from one topic.
- Copy buttons, input validation, inline error messages, and responsive layout.
- No account or API key required.

### CreatorDesk — separate prototype
- Browser-only client/project tracker with budgets, due dates, notes, and statuses.
- Search, status filtering, summary statistics, and CSV export.
- Data stays in local storage on the current browser/device; no cloud sync or account recovery.

## Important product disclosure

**CreatorFlow is template-based, not an AI API product.** The current generator uses deterministic JavaScript templates and does not call an AI model, external AI API, backend, or cloud service. Output quality depends on the input and built-in templates. No AI API access is included.

Neither app currently provides user accounts, cloud synchronization, payment processing, or a hosted backend. CreatorDesk is separate and is **not included in the default CreatorFlow Studio license** unless explicitly listed in the signed order.

## Run locally

No build step or third-party runtime dependency is required.

1. Download or clone this repository.
2. Open `index.html` in a modern browser to run CreatorFlow Studio.
3. Open `creator-desk/index.html` to run CreatorDesk.

Node.js 18 or newer is needed only to run the automated checks. You can also serve the repository root with any static HTTP server and visit `/` or `/creator-desk/`.

## Development and automated tests

Run from the repository root:

```sh
npm ci
npm run check
npm test
```

The tests use Node.js's built-in test runner (`node --test`) and assertions; no third-party runtime dependency is required. ESLint runs as a development-time check through `npm run lint`. Explicit test suites cover:
- Topic normalization, hashtag generation, platform/tone output, and browser UI interactions.
- Topic validation: empty input, whitespace-only input, null input, the 200-character limit, and invalid input passed to content generation.
- CreatorDesk project creation, storage failures, malformed stored data, HTML escaping, filtering, sorting, and clearing records.\n- Shared CreatorDesk validation for missing fields, invalid status/date, and out-of-range budgets.

The reusable `validateTopic(value)` function normalizes valid input, throws `TypeError` for an empty topic, and throws `RangeError` when a topic exceeds 200 characters.

GitHub Actions checks JavaScript syntax, runs all test files, and audits production dependencies on pushes and pull requests. Dependabot checks npm dependencies weekly. See [ARCHITECTURE.md](ARCHITECTURE.md), [DEPLOYMENT.md](DEPLOYMENT.md), and [SECURITY.md](SECURITY.md).

## Technology

- HTML, CSS, vanilla JavaScript
- Node.js built-in test runner, assertions, and VM for behavior tests
- No third-party runtime dependencies or build process

## Commercial / white-label licensing

Proposed one-time asking price: **US$5,000, negotiable**. This is an asking price, not a verified valuation, completed sale, or guarantee of buyer interest.

The default proposed license covers **CreatorFlow Studio only** at an agreed commit/release. It proposes perpetual, worldwide, non-exclusive commercial/white-label use, not ownership transfer or exclusivity. CreatorDesk, support, delivery details, and any other extras are included only if expressly recorded in the signed agreement. Read [LICENSE.md](LICENSE.md) before discussing a purchase. It is a proposed template, not a signed agreement or legal advice.

**Sales contact:** [shekubellabendu91@gmail.com](mailto:shekubellabendu91@gmail.com)

## Project status

This is a pre-revenue project. No paying customers, revenue, AI API integration, backend, or payment processing are claimed.

## Quality assurance

The GitHub Actions quality workflow runs on pushes, pull requests, and manual dispatch. It checks JavaScript syntax and executes the regression tests on Node.js 18, 20, and 22, generates a built-in Node.js test coverage report, audits production dependencies, and builds the Docker image. The project currently has no third-party production dependencies.

Run all local validation with:

```sh
npm ci
npm run validate
```

Run the coverage-enabled test suite separately with `npm run coverage`. Coverage is reported by Node.js's built-in test runner; it is not a claim that every line or browser behavior is covered.

## Run with Docker

Build and start the static website using Docker:

```sh
docker build -t creatorflow-studio .
docker run --rm -p 8080:80 creatorflow-studio
```

Open `http://localhost:8080` for CreatorFlow Studio and `http://localhost:8080/creator-desk/` for the separate CreatorDesk prototype. The container serves static files with Nginx; it does not add a backend, accounts, AI API, or cloud data storage.
\n## Optional AWS infrastructure\n\nThe `terraform/` directory defines an optional AWS deployment using a private S3 bucket and CloudFront Origin Access Control. It is separate from the default GitHub Pages deployment and can incur AWS charges if applied. Terraform validation runs in GitHub Actions. Review costs, permissions, and the plan before applying; this repository does not automatically upload site files to S3.\n