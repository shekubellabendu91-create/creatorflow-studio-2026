# CreatorFlow Studio

CreatorFlow Studio is a lightweight browser-based tool that turns a topic into a short-form social content pack: a hook, script, caption, call to action, and hashtags.

## Projects in this repository

- **CreatorFlow Studio** — the main short-form content generator.
- **CreatorDesk** — an independent browser-only client and project tracker in the [creator-desk folder](creator-desk/README.md).

## Demo links

- Main CreatorFlow demo: https://shekubellabendu91-create.github.io/creatorflow-studio-2026/
- CreatorDesk source folder: [creator-desk](creator-desk/)

If the main demo link does not open, use the local run instructions below. A GitHub Pages URL is not confirmed working until it has been checked in a browser.

## CreatorFlow features

- Supports TikTok, Instagram Reels, YouTube Shorts, and Facebook Reels.
- Offers bold, friendly, educational, and motivational tones.
- Copies each output section to the clipboard, with a fallback for browsers that do not support the Clipboard API.
- Runs in the browser; the current version does not send topics or generated content to a server.
- Includes input validation and accessible inline error messages.

## Run CreatorFlow locally

No build step or third-party runtime dependency is required.

1. Clone or download this repository.
2. Open `index.html` in a modern browser, or serve the folder with any static HTTP server.
3. Enter a topic, choose a platform and tone, and select **Generate content pack**.

## Development and tests

Requires Node.js 18 or newer. Run the dependency-free behavior tests from the repository root:

```sh
npm test
```

Content generation lives in `content.js` as a reusable module. The browser UI and clipboard behavior are wired in `app.js`. GitHub Actions runs the behavior tests on repository changes.

## Technology

- HTML, CSS, vanilla JavaScript
- Node.js built-in assertions and VM for behavior tests
- No third-party runtime dependencies

## Project status and commercial terms

CreatorFlow Studio is a pre-revenue project with no paying customers. The proposed asking price is **$5,000 USD**, negotiable. This is an asking price, not a verified valuation or guarantee of sale. Any commercial or exclusive license, support period, and ownership-transfer terms must be agreed in writing before a transaction.

The source code and project files are available for review. No revenue, customer list, cloud backend, or payment processing is claimed.

## License

Review the repository's `LICENSE` file and agree on applicable rights before redistributing or transferring the project.
