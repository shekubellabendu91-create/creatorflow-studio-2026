const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const content = require('../content.js');

assert.equal(content.cleanTopic('  make   better\ncontent  '), 'make better content');
assert.equal(content.cleanTopic(null), '');
assert.equal(content.topicHashtag('Make Money Online'), '#makemoneyonline');
assert.equal(content.topicHashtag('   '), '#content');

const bold = content.buildContent('study tips', 'tiktok', 'bold');
assert.equal(bold.hook, "Stop scrolling: here's what you need to know about study tips.");
assert.match(bold.script, /For TikTok/);
assert.match(bold.hashtags, /#tiktok/);
assert.match(bold.hashtags, /#studytips/);
assert.ok(bold.caption.length > 0);
assert.ok(bold.cta.includes('study tips'));

const educational = content.buildContent('café habits', 'instagram', 'educational');
assert.equal(educational.hook, "Here's a simple breakdown of café habits.");
assert.match(educational.hashtags, /#instagramreels/);
assert.match(educational.hashtags, /#cafehabits/);

const fallback = content.buildContent('gardening', 'unknown-platform', 'unknown-tone');
assert.match(fallback.script, /short-form video/);
assert.match(fallback.hook, /Let's talk about gardening/);
assert.match(fallback.hashtags, /#content/);

assert.throws(() => content.buildContent('   ', 'tiktok', 'friendly'), /topic is required/i);
assert.throws(() => content.buildContent('x'.repeat(201), 'tiktok', 'friendly'), RangeError);

// Exercise the browser UI with a tiny DOM mock so tests verify behavior, not source strings.
function makeElement(id, initial = {}) {
  return Object.assign({
    id, value: '', textContent: '', hidden: false, dataset: {}, style: {},
    listeners: {}, addEventListener(type, fn) { this.listeners[type] = fn; },
    focus() { this.focused = true; },
    scrollIntoView() { this.scrolled = true; },
    setAttribute() {}, select() {}, remove() {}
  }, initial);
}

const elements = {
  topic: makeElement('topic', { value: '' }),
  platform: makeElement('platform', { value: 'youtube' }),
  tone: makeElement('tone', { value: 'friendly' }),
  generate: makeElement('generate'),
  error: makeElement('error'),
  results: makeElement('results', { hidden: true }),
  hook: makeElement('hook'),
  script: makeElement('script'),
  caption: makeElement('caption'),
  cta: makeElement('cta'),
  hashtags: makeElement('hashtags')
};
const copyButton = makeElement('copy-hook', { dataset: { copy: 'hook' }, textContent: 'Copy' });
const context = {
  window: { CreatorFlowContent: content, isSecureContext: false },
  document: {
    getElementById(id) { return elements[id] || null; },
    querySelectorAll() { return [copyButton]; },
    createElement() { return makeElement('textarea'); },
    body: { appendChild() {} },
    execCommand() { return true; }
  },
  navigator: {},
  setTimeout() {}
};
vm.runInNewContext(fs.readFileSync(require.resolve('../app.js'), 'utf8'), context);

elements.generate.listeners.click();
assert.equal(elements.error.textContent, 'Please enter a topic first.');
assert.equal(elements.results.hidden, true);
assert.equal(elements.topic.focused, true);

elements.topic.value = 'exam preparation';
elements.generate.listeners.click();
assert.equal(elements.error.textContent, '');
assert.equal(elements.results.hidden, false);
assert.match(elements.hook.textContent, /exam preparation/);
assert.match(elements.hashtags.textContent, /#youtubeshorts/);
assert.equal(elements.results.scrolled, true);

console.log('CreatorFlow behavior tests passed.');
