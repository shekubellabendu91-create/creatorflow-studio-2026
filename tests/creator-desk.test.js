const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');

function element(id, extra = {}) {
  return Object.assign({
    id, value: '', textContent: '', innerHTML: '', hidden: false, style: {},
    listeners: {}, dataset: {},
    addEventListener(type, handler) { this.listeners[type] = handler; },
    reset() { this.wasReset = true; },
    appendChild(child) { this.children = this.children || []; this.children.push(child); },
    remove() { this.removed = true; },
    click() { this.wasClicked = true; }
  }, extra);
}

function makeHarness({ initialStorage = '[]', storageThrows = false } = {}) {
  const ids = [
    'project-form','project-list','empty-state','search','filter','form-message',
    'stat-total','stat-progress','stat-value','project-count','export','clear-all'
  ];
  const els = Object.fromEntries(ids.map(id => [id, element(id)]));
  els['filter'].value = 'All';
  const fieldValues = { client: 'Acme Studio', project: 'Short video package', budget: '125', due: '2026-12-01', status: 'Lead', notes: 'First draft' };
  const store = new Map([['creatordesk.projects.v1', initialStorage]]);
  const context = {
    document: {
      getElementById: id => els[id] || null,
      createElement: tag => element(tag),
      body: { appendChild() {} }
    },
    localStorage: {
      getItem: key => store.has(key) ? store.get(key) : null,
      setItem(key, value) {
        if (storageThrows) throw new Error('storage unavailable');
        store.set(key, String(value));
      }
    },
    FormData: class {
      get(key) { return fieldValues[key] ?? ''; }
    },
    Intl, Date, Math, JSON, String, Number, Array, Object, RegExp,
    globalThis: { crypto: { randomUUID: () => 'test-id-1' } },
    crypto: { randomUUID: () => 'test-id-1' },
    confirm: () => true,
    prompt: (_message, current) => current,
    alert: message => { context.alertMessage = message; },
    Blob: class { constructor(parts, options) { this.parts = parts; this.options = options; } },
    URL: { createObjectURL: () => 'blob:test', revokeObjectURL() {} },
    console
  };
  vm.runInNewContext(fs.readFileSync(require.resolve('../creator-desk/app.js'), 'utf8'), context);
  return { els, context, store, fieldValues };
}

{
  const { els, store, fieldValues } = makeHarness();
  assert.equal(els['stat-total'].textContent, '0');
  els['project-form'].listeners.submit({ preventDefault() {} });
  assert.equal(els['form-message'].textContent, 'Project saved in this browser.');
  assert.equal(els['stat-total'].textContent, '1');
  assert.match(els['project-list'].innerHTML, /Acme Studio/);
  assert.match(els['project-list'].innerHTML, /Short video package/);
  assert.equal(JSON.parse(store.get('creatordesk.projects.v1'))[0].budget, 125);
  assert.equal(els['project-form'].wasReset, true);
}

{
  const { els, context } = makeHarness();
  els['project-form'].listeners.submit({ preventDefault() {} });
  // Rendered user input must be escaped before it is inserted into HTML.
  const original = context.FormData;
  context.FormData = class { get(key) { return key === 'project' ? '<img src=x onerror=alert(1)>' : key === 'client' ? 'Client & Co' : key === 'budget' ? '10' : ''; } };
  els['project-form'].listeners.submit({ preventDefault() {} });
  assert.doesNotMatch(els['project-list'].innerHTML, /<img src=x onerror=/);
  assert.match(els['project-list'].innerHTML, /&lt;img src=x onerror=alert\(1\)&gt;/);
  assert.match(els['project-list'].innerHTML, /Client &amp; Co/);
}

{
  const { els, store } = makeHarness({ initialStorage: '{not-json' });
  assert.equal(els['stat-total'].textContent, '0');
  assert.equal(els['empty-state'].hidden, false);
  assert.equal(store.get('creatordesk.projects.v1'), '{not-json');
}

{
  const { els } = makeHarness({ storageThrows: true });
  els['project-form'].listeners.submit({ preventDefault() {} });
  assert.match(els['form-message'].textContent, /Could not save/);
  assert.equal(els['stat-total'].textContent, '0');
}

{
  const { els, store } = makeHarness({ initialStorage: JSON.stringify([
    { id: 'a', client: 'Client A', project: 'Alpha', budget: 20, due: '2026-12-02', status: 'In progress', notes: '' },
    { id: 'b', client: 'Client B', project: 'Beta', budget: 30, due: '2026-12-01', status: 'Completed', notes: '' }
  ]) });
  assert.equal(els['stat-total'].textContent, '2');
  assert.equal(els['stat-progress'].textContent, '1');
  assert.match(els['project-list'].innerHTML, /Beta[\s\S]*Alpha/);
  els['filter'].value = 'Completed';
  els['filter'].listeners.change();
  assert.equal(els['project-count'].textContent, '1 of 2 projects');
  assert.match(els['project-list'].innerHTML, /Beta/);
  assert.doesNotMatch(els['project-list'].innerHTML, /Alpha/);
  els['clear-all'].listeners.click();
  assert.equal(els['stat-total'].textContent, '0');
  assert.equal(JSON.parse(store.get('creatordesk.projects.v1')).length, 0);
}

console.log('CreatorDesk behavior tests passed.');
