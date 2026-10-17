# CreatorFlow Studio

CreatorFlow Studio is a lightweight browser-based short-form content toolkit. Enter a topic and choose a platform and tone to generate a content pack containing a hook, script, caption, call to action, and hashtags.

## Live demos

- **CreatorFlow Studio:** https://shekubellabendu91-create.github.io/creatorflow-studio-2026/
- **CreatorDesk:** https://shekubellabendu91-create.github.io/creatorflow-studio-2026/creator-desk/

These are GitHub Pages static demos. If a link is unavailable, run the app locally using the steps below.

## Product features

### CreatorFlow Studio
- Supports TikTok, Instagram Reels, YouTube Shorts, and Facebook Reels.
- Four writing tones: bold, friendly, educational, and motivational.
- Generates five content elements: hook, script, caption, call to action, and hashtags.
- Copy buttons with a fallback for browsers without the Clipboard API.
- Input validation, inline error messages, responsive layout, and no account/API key required.

### CreatorDesk
- Browser-only client/project tracker with budgets, due dates, notes, and statuses.
- Search, status filtering, summary statistics, and CSV export.
- Stores data in local storage on the current browser/device; no cloud sync or account recovery.

## Important product disclosure

**CreatorFlow is template-based, not an AI API product.** The current generator uses deterministic JavaScript templates and does not call an AI model, external AI API, backend, or cloud service. Output quality depends on the input and built-in templates. No AI API access is included.

Neither app currently provides user accounts, cloud synchronization, payment processing, or a hosted backend. CreatorDesk is a separate prototype and is included in a commercial package only if the signed license expressly lists it.

## Run locally

No build step or third-party runtime dependency is required.

1. Install Node.js 18 or newer if you want to run the tests.
2. Download or clone this repository.
3. Open the root `index.html` in a modern browser to run CreatorFlow Studio.
4. Open `creator-desk/index.html` to run CreatorDesk.

You can also serve the repository root with any static HTTP server and visit `/` or `/creator-desk/`.

## Development and tests

Run the dependency-free behavior tests from the repository root:

```sh
npm test
```

Tests cover topic normalization, hashtag generation, platform/tone output, invalid input, and core browser interactions for CreatorFlow; they also cover CreatorDesk project creation, storage failure handling, malformed stored data, HTML escaping, filtering, sorting, and clearing.

GitHub Actions runs JavaScript syntax checks, installs from the lockfile, runs tests, and performs an npm audit. See [ARCHITECTURE.md](ARCHITECTURE.md) and [SECURITY.md](SECURITY.md).

## Technology

- HTML, CSS, vanilla JavaScript
- Node.js built-in assertions and VM for behavior tests
- No third-party runtime dependencies or build process

## Commercial / white-label licensing

The proposed one-time asking price is **USD $5,000, negotiable**. This is an asking price, not a verified valuation, completed sale, or guarantee of buyer interest.

The proposed license is perpetual, worldwide, non-exclusive commercial/white-label use of the agreed included source code. It does not transfer intellectual-property ownership or provide exclusivity. The final price, exact files/commit, support, delivery, and license rights must be confirmed in a signed agreement before payment and delivery. CreatorDesk is included only if explicitly named in that agreement.

Read [LICENSE.md](LICENSE.md) for the proposed terms. This is a discussion template, not a signed agreement or legal advice.

**Licensing contact:** [shekubellabendu91@gmail.com](mailto:shekubellabendu91@gmail.com)

## Project status

This is a pre-revenue project. No paying customers, revenue, cloud backend, AI API integration, or payment processing are claimed.
