const test = require('node:test');
const assert = require('node:assert/strict');
const { validateTopic, buildContent } = require('../content.js');

test('validateTopic trims and normalizes valid input', () => {
  assert.equal(validateTopic('  short   video\nideas  '), 'short video ideas');
});

test('validateTopic rejects empty and whitespace-only input with TypeError', () => {
  assert.throws(() => validateTopic(''), TypeError);
  assert.throws(() => validateTopic('   \n  '), TypeError);
  assert.throws(() => validateTopic(null), TypeError);
});

test('validateTopic rejects topics longer than 200 characters with RangeError', () => {
  assert.throws(() => validateTopic('x'.repeat(201)), RangeError);
});

test('validateTopic accepts a topic of exactly 200 characters', () => {
  const topic = 'x'.repeat(200);
  assert.equal(validateTopic(topic), topic);
});

test('buildContent continues to reject invalid topics', () => {
  assert.throws(() => buildContent('  ', 'tiktok', 'friendly'), TypeError);
  assert.throws(() => buildContent('x'.repeat(201), 'tiktok', 'friendly'), RangeError);
});
