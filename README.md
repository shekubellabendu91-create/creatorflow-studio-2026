# CreatorFlow Studio

CreatorFlow Studio is a lightweight, browser-based tool that turns a topic into a short-form social content pack: a hook, script, caption, call to action, and hashtags.

## Live demo

https://shekubellabendu91-create.github.io/creatorflow-studio-2026/

## Features

- Supports TikTok, Instagram Reels, YouTube Shorts, and Facebook Reels.
- Offers bold, friendly, educational, and motivational tones.
- Copies each output section to the clipboard, with a fallback for browsers that do not support the Clipboard API.
- Runs entirely in the browser; the current version does not send topics or generated content to a server.
- Includes input validation and accessible inline error messages.

## Run locally

No build step or third-party runtime dependency is required.

1. Clone or download this repository.
2. Open `index.html` in a modern browser, or serve the folder with any static HTTP server.
3. Enter a topic, choose a platform and tone, and select **Generate content pack**.

## Development and tests

Requires Node.js 18 or newer.

Run the dependency-free behavior tests from the repository root:

```sh
npm test
```

Content generation lives in `content.js` as a reusable module. The browser UI and clipboard behavior are wired in `app.js`. The tests exercise real output values, fallback behavior, validation, and the main UI flow rather than only searching source code for strings.

## Technology

- HTML
- CSS
- Vanilla JavaScript
- Node.js built-in test assertions and VM for smoke/behavior tests

## Project status

This is a pre-revenue project with no paying customers. It is offered for acquisition at a proposed asking price of **$5,000 USD**, negotiable. The asking price is not a valuation or a guarantee of sale.

## Acquisition package

The package can include the current source code, project files, and existing branding/design assets. Any exclusive ownership, commercial licensing, support, and transfer terms must be agreed in writing before a transaction.

## License

Review the repository's `LICENSE` file and agree on the applicable rights before redistributing or transferring the project.
