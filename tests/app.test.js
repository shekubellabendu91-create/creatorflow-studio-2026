// Lightweight regression tests for the template generator's core expectations.
// These tests are intentionally dependency-free so they can be reviewed without a build system.

const fs = require('fs');
const app = fs.readFileSync('app.js', 'utf8');

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

assert(app.includes('function cleanTopic'), 'cleanTopic should exist');
assert(app.includes('function buildContent'), 'buildContent should exist');
assert(app.includes('function generate'), 'generate should exist');
assert(app.includes('navigator.clipboard.writeText'), 'copy behavior should use the clipboard API');
assert(app.includes("Please enter a topic first."), 'empty-topic validation should exist');

console.log('CreatorFlow core regression checks passed.');
