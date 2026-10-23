# Contributing

Thank you for helping improve CreatorFlow Studio.

## Requirements
- Node.js 18 or newer
- npm

## Local checks
Run these commands before submitting a change:

```sh
npm ci
npm run validate
```

The project uses Node.js's built-in test runner and has no third-party runtime dependencies. Add regression tests for bug fixes and tests for new behavior. Keep the two static applications independent unless a change explicitly needs to affect both.

## Pull requests
- Explain the user-facing change and why it is needed.
- Include steps to reproduce or verify the change.
- Do not commit credentials, personal data, generated coverage output, or `node_modules`.
- Preserve the documented product limitations: CreatorFlow uses local templates, not a remote AI model or API; CreatorDesk stores data in the current browser only.
