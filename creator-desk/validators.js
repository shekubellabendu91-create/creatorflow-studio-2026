'use strict';

const PROJECT_STATUSES = Object.freeze(['Lead', 'Quoted', 'In progress', 'Completed', 'On hold']);

function requiredText(value, field, maxLength) {
  if (typeof value !== 'string' || !value.trim()) {
    throw new TypeError(`${field} is required.`);
  }
  const normalized = value.trim();
  if (normalized.length > maxLength) {
    throw new RangeError(`${field} must be ${maxLength} characters or fewer.`);
  }
  return normalized;
}

function validateProject(data) {
  if (!data || typeof data !== 'object' || Array.isArray(data)) {
    throw new TypeError('Project data must be an object.');
  }
  const client = requiredText(data.client, 'Client', 80);
  const project = requiredText(data.project, 'Project name', 100);
  const budget = typeof data.budget === 'number' ? data.budget : Number(data.budget);
  if (!Number.isFinite(budget) || budget < 0 || budget > 100000000) {
    throw new RangeError('Budget must be a finite number between 0 and 100,000,000.');
  }
  const due = data.due == null ? '' : String(data.due);
  if (due && !/^\d{4}-\d{2}-\d{2}$/.test(due)) {
    throw new TypeError('Due date must use YYYY-MM-DD format.');
  }
  const status = data.status == null || data.status === '' ? 'Lead' : String(data.status);
  if (!PROJECT_STATUSES.includes(status)) {
    throw new TypeError('Status must be one of the supported project statuses.');
  }
  const notes = data.notes == null ? '' : String(data.notes).trim();
  if (notes.length > 500) throw new RangeError('Notes must be 500 characters or fewer.');
  return { client, project, budget, due, status, notes };
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { PROJECT_STATUSES, validateProject };
}
if (typeof window !== 'undefined') {
  window.CreatorDeskValidators = { PROJECT_STATUSES, validateProject };
}
