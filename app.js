'use strict';

(function initCreatorFlow() {
  const contentApi = window.CreatorFlowContent;
  if (!contentApi) {
    const error = document.getElementById('error');
    if (error) error.textContent = 'CreatorFlow could not load. Refresh the page and try again.';
    return;
  }

  const { cleanTopic, buildContent } = contentApi;
  const topicInput = document.getElementById('topic');
  const platformInput = document.getElementById('platform');
  const toneInput = document.getElementById('tone');
  const generateButton = document.getElementById('generate');
  const errorEl = document.getElementById('error');
  const resultsEl = document.getElementById('results');
  const outputIds = ['hook', 'script', 'caption', 'cta', 'hashtags'];

  if (!topicInput || !platformInput || !toneInput || !generateButton || !errorEl || !resultsEl) {
    return;
  }

  function generate() {
    errorEl.textContent = '';
    const topic = cleanTopic(topicInput.value);

    if (!topic) {
      resultsEl.hidden = true;
      errorEl.textContent = 'Please enter a topic first.';
      topicInput.focus();
      return;
    }

    try {
      const content = buildContent(topic, platformInput.value, toneInput.value);
      outputIds.forEach((id) => {
        const output = document.getElementById(id);
        if (output) output.textContent = content[id];
      });
      resultsEl.hidden = false;
      if (typeof resultsEl.scrollIntoView === 'function') {
        resultsEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } catch (error) {
      resultsEl.hidden = true;
      errorEl.textContent = error instanceof RangeError
        ? error.message
        : 'We could not generate this content. Please check your topic and try again.';
    }
  }

  function legacyCopy(text) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.setAttribute('readonly', '');
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    let copied = false;
    try {
      copied = document.execCommand('copy');
    } finally {
      textarea.remove();
    }
    return copied;
  }

  async function copyOutput(id, button) {
    const output = document.getElementById(id);
    const text = output ? output.textContent : '';
    if (!text) return;

    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
      } else if (!legacyCopy(text)) {
        throw new Error('Copy unavailable');
      }

      const original = button.textContent;
      button.textContent = 'Copied!';
      setTimeout(() => { button.textContent = original; }, 1200);
      errorEl.textContent = '';
    } catch {
      errorEl.textContent = 'Copy failed. Please select and copy the text manually.';
    }
  }

  generateButton.addEventListener('click', generate);
  topicInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' && (event.ctrlKey || event.metaKey)) generate();
  });

  document.querySelectorAll('[data-copy]').forEach((button) => {
    button.addEventListener('click', () => copyOutput(button.dataset.copy, button));
  });
})();
