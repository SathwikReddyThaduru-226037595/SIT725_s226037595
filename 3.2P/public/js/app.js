// public/js/app.js
document.addEventListener('DOMContentLoaded', () => {
  // init materialize dropdown (for desktop)
  if (window.M) {
    const el = document.querySelectorAll('.dropdown-trigger');
    M.Dropdown.init(el, { coverTrigger: false });
  }

  const listEl = document.getElementById('list-view');
  const detailEl = document.getElementById('detail-view');
  const searchInput = document.getElementById('search');

  let EVENTS = [];
  let currentCityFilter = '';

  // load events
  fetch('/api/events')
    .then(r => r.json())
    .then(data => {
      EVENTS = data;
      renderListView();
      handleRouting(); // in case URL already has hash
    })
    .catch(err => {
      listEl.innerHTML = `<p class="red-text">Failed to load events: ${escapeHtml(err.message)}</p>`;
      console.error(err);
    });

  // search
  searchInput?.addEventListener('input', (e) => {
    renderListView();
  });

  // capture dropdown city clicks (progressive enhancement)
  document.querySelectorAll('#cities-dropdown a[data-city]').forEach(a => {
    a.addEventListener('click', e => {
      currentCityFilter = a.dataset.city || '';
      renderListView();
    });
  });

  // hash routing
  window.addEventListener('hashchange', handleRouting);

  function handleRouting() {
    const hash = location.hash || '#/';
    if (hash.startsWith('#/event/')) {
      const id = Number(hash.split('/')[2]);
      showDetail(id);
    } else {
      showList();
    }
  }

  function showList() {
    detailEl.hidden = true;
    listEl.hidden = false;
  }

  function showDetail(id) {
    const ev = EVENTS.find(x => x.id === id);
    if (!ev) {
      detailEl.innerHTML = `<p>Event not found. <a href="#/">Back</a></p>`;
      detailEl.hidden = false;
      listEl.hidden = true;
      return;
    }
    renderDetail(ev);
    listEl.hidden = true;
    detailEl.hidden = false;
    // scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function renderListView() {
    const q = (searchInput?.value || '').toLowerCase().trim();
    const filtered = EVENTS.filter(e => {
      if (currentCityFilter && currentCityFilter.length>0 && e.location.toLowerCase() !== currentCityFilter.toLowerCase()) return false;
      if (!q) return true;
      return (e.title + ' ' + e.description + ' ' + e.location).toLowerCase().includes(q);
    });

    listEl.innerHTML = '';
    if (!filtered.length) {
      listEl.innerHTML = '<p class="center">No events found.</p>';
      return;
    }

    // build cards
    filtered.forEach(ev => {
      const col = document.createElement('div');
      col.className = 'card-col';
      col.innerHTML = createEventCardHtml(ev);
      // anchor click is plain link to hash, no extra handling needed
      listEl.appendChild(col);
    });
  }

  function createEventCardHtml(e) {
    // use hash link so browser doesn't request server
    return `
      <a class="card" href="#/event/${e.id}" aria-label="${escapeHtml(e.title)}">
        <div class="card-image"><img src="${escapeHtml(e.image)}" alt="${escapeHtml(e.title)}"></div>
        <div class="card-content">
          <div class="card-title">${escapeHtml(e.title)}</div>
          <div class="card-desc">${escapeHtml(e.description)}</div>
        </div>
        <div class="card-footer">
          <div>Date: ${escapeHtml(e.date)}</div>
          <div style="text-transform:lowercase;">Location: ${escapeHtml(e.location)}</div>
        </div>
      </a>
    `;
  }

  function renderDetail(e) {
    detailEl.innerHTML = `
      <div class="detail-card">
        <img class="detail-image" src="${escapeHtml(e.image)}" alt="${escapeHtml(e.title)}" />
        <div style="background:#fff;padding:18px;">
          <h3 style="margin-top:0;">${escapeHtml(e.title)}</h3>
          <p style="color:#444;">${escapeHtml(e.description)}</p>
          <p style="color:#333;font-weight:600;">Date: ${escapeHtml(e.date)}</p>
          <p style="color:#333;">Location: ${escapeHtml(e.location)}</p>
          <p><a class="btn-back" href="#/">← Back to events</a></p>
        </div>
      </div>
    `;
  }

  function escapeHtml(unsafe) {
    if (unsafe === null || unsafe === undefined) return '';
    return String(unsafe)
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;');
  }

});