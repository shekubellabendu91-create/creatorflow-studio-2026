const assert = require('node:assert/strict');
const { validateProject } = require('../creator-desk/validators.js');

const valid = { client: ' Acme ', project: ' Video pack ', budget: '12.50', due: '2026-12-01', status: 'Quoted', notes: ' draft ' };

assert.deepEqual(validateProject(valid), {
  client: 'Acme', project: 'Video pack', budget: 12.5,
  due: '2026-12-01', status: 'Quoted', notes: 'draft'
});
assert.throws(() => validateProject(null), TypeError);
assert.throws(() => validateProject({ ...valid, client: ' ' }), TypeError);
assert.throws(() => validateProject({ ...valid, project: '' }), TypeError);
assert.throws(() => validateProject({ ...valid, budget: '-1' }), RangeError);
assert.throws(() => validateProject({ ...valid, budget: 'NaN' }), RangeError);
assert.throws(() => validateProject({ ...valid, budget: '100000001' }), RangeError);
assert.throws(() => validateProject({ ...valid, status: 'Unknown' }), TypeError);
assert.throws(() => validateProject({ ...valid, due: 'tomorrow' }), TypeError);
assert.throws(() => validateProject({ ...valid, notes: 'x'.repeat(501) }), RangeError);

console.log('Shared CreatorDesk validation tests passed.');
