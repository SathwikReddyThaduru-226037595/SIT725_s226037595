// public/js/app.js
document.addEventListener('DOMContentLoaded', () => {
  const row = document.getElementById('cards-row');
  const detail = document.getElementById('detail');
  const search = document.getElementById('search');

  function escapeHtml(s){ if (!s) return ''; return String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;'); }

  async function loadEvents() {
    row.innerHTML = '<p>Loading…</p>';
    try {
      const res = await fetch('/api/events');
      const events = await res.json();
      renderList(events);
    } catch (err) {
      row.innerHTML = `<p style="color:red">Failed to load events</p>`;
      console.error(err);
    }
  }

  function renderList(items) {
    detail.style.display = 'none';
    row.innerHTML = '';
    const filtered = items.filter(it => {
      const q = search.value.trim().toLowerCase();
      if (!q) return true;
      return (it.title + ' ' + it.description + ' ' + it.location).toLowerCase().includes(q);
    });
    if (filtered.length === 0) {
      row.innerHTML = '<p>No events found</p>';
      return;
    }
    filtered.forEach(it => {
      const card = document.createElement('div');
      card.className = 'card';
      card.innerHTML = `
        <img src="${escapeHtml(it.image || '/images/marketday.jpg')}" alt="${escapeHtml(it.title)}">
        <div class="card-body">
          <h3>${escapeHtml(it.title)}</h3>
          <p>${escapeHtml(it.description)}</p>
          <div class="meta">Date: ${escapeHtml(it.date)}<br>location: ${escapeHtml(it.location)}</div>
        </div>
      `;
      card.style.cursor = 'pointer';
      card.addEventListener('click', () => showDetail(it.slug));
      row.appendChild(card);
    });
  }

  async function showDetail(slug) {
    try {
      const res = await fetch(`/api/events/slug/${encodeURIComponent(slug)}`);
      if (!res.ok) { alert('Event not found'); return; }
      const ev = await res.json();
      renderDetail(ev);
      // update URL hash so user can bookmark
      location.hash = `#${slug}`;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) { console.error(err); }
  }

  function renderDetail(ev) {
    row.innerHTML = '';
    detail.style.display = 'block';
    detail.innerHTML = `
      <img src="${escapeHtml(ev.image || '/images/marketday.jpg')}" alt="${escapeHtml(ev.title)}">
      <h1>${escapeHtml(ev.title)}</h1>
      <p>${escapeHtml(ev.description)}</p>
      <p><strong>Date:</strong> ${escapeHtml(ev.date)}<br><strong>Location:</strong> ${escapeHtml(ev.location)}</p>
      <a class="back" href="#" id="back">← Back to events</a>
    `;
    document.getElementById('back').addEventListener('click', (e) => {
      e.preventDefault();
      history.pushState(null,'', window.location.pathname);
      loadEvents();
    });
  }

  // search handler
  let t;
  search.addEventListener('input', () => {
    clearTimeout(t);
    t = setTimeout(loadEvents, 250);
  });

  // if URL has a hash (slug) load detail directly
  if (location.hash && location.hash.length > 1) {
    const slug = location.hash.slice(1);
    showDetail(slug);
  } else {
    loadEvents();
  }
});
