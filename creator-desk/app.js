(() => {
  'use strict';
  const STORAGE_KEY = 'creatordesk.projects.v1';
  const form = document.getElementById('project-form');
  const list = document.getElementById('project-list');
  const empty = document.getElementById('empty-state');
  const search = document.getElementById('search');
  const filter = document.getElementById('filter');
  const message = document.getElementById('form-message');
  const fields = ['client', 'project', 'budget', 'due', 'status', 'notes'];
  let projects = loadProjects();

  function loadProjects() {
    try {
      const value = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
      return Array.isArray(value) ? value.filter(item => item && typeof item.id === 'string') : [];
    } catch {
      return [];
    }
  }
  function persist() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
      return true;
    } catch {
      message.textContent = 'Could not save. Your browser storage may be full or disabled.';
      message.style.color = '#b42318';
      return false;
    }
  }
  function escapeHtml(value) {
    return String(value ?? '').replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  }
  function money(value) {
    return new Intl.NumberFormat('en-US', {style:'currency',currency:'USD',maximumFractionDigits:2}).format(Number(value) || 0);
  }
  function statusClass(value) {
    return String(value).toLowerCase().replace(/\s+/g, '-');
  }
  function updateStats() {
    document.getElementById('stat-total').textContent = String(projects.length);
    document.getElementById('stat-progress').textContent = String(projects.filter(p => p.status === 'In progress').length);
    document.getElementById('stat-value').textContent = money(projects.reduce((sum,p) => sum + (Number(p.budget) || 0), 0));
  }
  function visibleProjects() {
    const query = search.value.trim().toLowerCase();
    const selectedStatus = filter.value;
    return projects.filter(p => (selectedStatus === 'All' || p.status === selectedStatus) &&
      [p.client,p.project,p.notes].some(value => String(value || '').toLowerCase().includes(query)))
      .sort((a,b) => (a.due || '9999-12-31').localeCompare(b.due || '9999-12-31'));
  }
  function render() {
    const visible = visibleProjects();
    empty.hidden = visible.length > 0;
    list.innerHTML = visible.map(p => `<article class="project">
      <div class="project-top"><div><h3>${escapeHtml(p.project)}</h3><div class="client">${escapeHtml(p.client)}</div></div><span class="status ${statusClass(p.status)}">${escapeHtml(p.status)}</span></div>
      <div class="project-meta"><span><strong>${money(p.budget)}</strong></span><span>Due: ${p.due ? escapeHtml(p.due) : 'Not set'}</span></div>
      ${p.notes ? `<p class="project-notes">${escapeHtml(p.notes)}</p>` : ''}
      <div class="project-actions"><button type="button" data-action="edit" data-id="${escapeHtml(p.id)}">Edit status</button><button type="button" class="delete" data-action="delete" data-id="${escapeHtml(p.id)}">Delete</button></div>
    </article>`).join('');
    document.getElementById('project-count').textContent = `${visible.length} of ${projects.length} project${projects.length === 1 ? '' : 's'}`;
    updateStats();
  }
  function clearFormMessage() {
    message.textContent = '';
    message.style.color = '';
  }
  form.addEventListener('submit', event => {
    event.preventDefault();
    clearFormMessage();
    const data = new FormData(form);
    const project = {
      id: (globalThis.crypto && typeof crypto.randomUUID === 'function') ? crypto.randomUUID() : String(Date.now()) + Math.random().toString(16).slice(2),
      client: String(data.get('client') || '').trim(),
      project: String(data.get('project') || '').trim(),
      budget: Number(data.get('budget')),
      due: String(data.get('due') || ''),
      status: String(data.get('status') || 'Lead'),
      notes: String(data.get('notes') || '').trim()
    };
    if (!project.client || !project.project || !Number.isFinite(project.budget) || project.budget < 0) {
      message.textContent = 'Enter a client, project name and valid non-negative budget.';
      message.style.color = '#b42318';
      return;
    }
    projects.unshift(project);
    if (!persist()) { projects.shift(); return; }
    form.reset();
    message.textContent = 'Project saved in this browser.';
    render();
  });
  list.addEventListener('click', event => {
    const button = event.target.closest('button[data-action]');
    if (!button) return;
    const index = projects.findIndex(p => p.id === button.dataset.id);
    if (index < 0) return;
    if (button.dataset.action === 'delete') {
      if (!confirm('Delete this project? This cannot be undone.')) return;
      const removed = projects.splice(index, 1)[0];
      if (!persist()) projects.splice(index, 0, removed);
      render();
    } else if (button.dataset.action === 'edit') {
      const current = projects[index].status;
      const statuses = ['Lead','Quoted','In progress','Completed','On hold'];
      const next = prompt('Enter status: Lead, Quoted, In progress, Completed, or On hold', current);
      if (next === null) return;
      const normalized = statuses.find(s => s.toLowerCase() === next.trim().toLowerCase());
      if (!normalized) { alert('Please enter one of the listed status values.'); return; }
      const previous = projects[index].status;
      projects[index].status = normalized;
      if (!persist()) projects[index].status = previous;
      render();
    }
  });
  search.addEventListener('input', render);
  filter.addEventListener('change', render);
  document.getElementById('export').addEventListener('click', () => {
    if (!projects.length) { message.textContent = 'Add a project before exporting.'; message.style.color = '#b42318'; return; }
    const columns = ['client','project','budget','due','status','notes'];
    const csvCell = value => '"' + String(value ?? '').replace(/"/g, '""') + '"';
    const csv = [columns.join(','), ...projects.map(p => columns.map(key => csvCell(p[key])).join(','))].join('\r\n');
    const blob = new Blob(['\uFEFF', csv], {type:'text/csv;charset=utf-8;'});
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url; link.download = 'creatordesk-projects.csv';
    document.body.appendChild(link); link.click(); link.remove(); URL.revokeObjectURL(url);
    clearFormMessage();
  });
  document.getElementById('clear-all').addEventListener('click', () => {
    if (!projects.length || !confirm('Delete all saved projects from this browser? Export first if you need a backup.')) return;
    const previous = projects;
    projects = [];
    if (!persist()) projects = previous;
    render();
  });
  render();
})();