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

test('buildContent returns all five content fields for every supported tone', () => {
  const expected = {
    bold: /Stop scrolling/,
    friendly: /Let's talk about/,
    educational: /simple breakdown/,
    motivational: /real progress/
  };
  for (const [tone, hookPattern] of Object.entries(expected)) {
    const result = buildContent('planning a small business', 'instagram', tone);
    assert.deepEqual(Object.keys(result).sort(), ['caption', 'cta', 'hashtags', 'hook', 'script'].sort());
    assert.match(result.hook, hookPattern);
    assert.match(result.script, /Instagram Reels/);
    assert.match(result.hashtags, /#instagramreels/);
    assert.ok(result.caption.length > 0);
    assert.ok(result.cta.length > 0);
  }
});

test('buildContent safely falls back for unknown platform and tone values', () => {
  const result = buildContent('gardening', 'unknown', 'unknown');
  assert.match(result.hook, /Let's talk about gardening/);
  assert.match(result.script, /short-form video/);
  assert.match(result.hashtags, /#content/);
});

test('topicHashtag handles punctuation, accents, and empty values predictably', () => {
  const { topicHashtag } = require('../content.js');
  assert.equal(topicHashtag('Café & Study Tips!'), '#cafestudytips');
  assert.equal(topicHashtag('!!!'), '#content');
  assert.equal(topicHashtag('a topic with many words'), '#atopicwithmany');
});

test('validateTopic replaces control characters and normalizes repeated whitespace', () => {
  assert.equal(validateTopic('first\\tsecond\\nthird'), 'first second third');
});
