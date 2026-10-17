# Architecture overview

## CreatorFlow Studio
- `index.html` provides the semantic page structure and form.
- `style.css` contains responsive presentation.
- `content.js` is the pure content-generation module: input normalization, topic hashtag creation, and content-pack construction.
- `app.js` binds the DOM controls to the content module and implements copy-to-clipboard behavior.
- `tests/app.test.js` exercises content rules and core browser interactions using Node's built-in test primitives.

## CreatorDesk
- `creator-desk/index.html` provides the project form and workspace layout.
- `creator-desk/style.css` contains its responsive styling.
- `creator-desk/app.js` validates project input, renders the project list, stores records in browser local storage, and exports CSV.
- `tests/creator-desk.test.js` exercises project creation, storage failure handling, malformed stored JSON, HTML escaping, filtering, sorting, and clearing records.

## Runtime and build
Both apps are static browser applications with no build step and no third-party runtime dependencies. Node.js 18+ is used for automated tests. CreatorDesk data is local to one browser and should not be described as cloud-synced or suitable for sensitive records.
