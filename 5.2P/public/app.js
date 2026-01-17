// public/js/app.js
let allBooks = [];        // full dataset from API
let filtered = [];        // filtered + sorted view
const perPage = 4;
let currentPage = 1;

async function fetchBooks() {
  try {
    const res = await fetch('/api/books');
    if (!res.ok) throw new Error('Network response was not ok: ' + res.status);
    allBooks = await res.json();
    // if API returns object {status,data} handle that:
    if (Array.isArray(allBooks.data)) allBooks = allBooks.data;
    filtered = [...allBooks];
    renderBooks();
    renderPagination();
  } catch (err) {
    console.error('Fetch error', err);
    document.getElementById('books-list').innerText = 'Error loading books. See console.';
  }
}

function renderBooks() {
  const container = document.getElementById('books-list');
  container.innerHTML = '';
  if (!filtered || filtered.length === 0) {
    container.innerHTML = '<p>No books available</p>';
    return;
  }

  const grid = document.createElement('div');
  grid.className = 'grid';

  const start = (currentPage - 1) * perPage;
  const pageItems = filtered.slice(start, start + perPage);

  pageItems.forEach(b => {
    const card = document.createElement('article');
    card.className = 'card';
    card.innerHTML = `
      <div class="cover"><img src="${escapeHtml(b.image || '/images/placeholder.jpg')}" alt="${escapeHtml(b.title)}"></div>
      <h2>${escapeHtml(b.title)}</h2>
      <p class="muted">by ${escapeHtml(b.author)} — ${b.year}${b.genre ? ' — ' + escapeHtml(b.genre) : ''}</p>
      <p class="summary">${escapeHtml(truncate(b.summary || '', 160))}</p>
    `;
    card.addEventListener('click', () => openModal(b));
    grid.appendChild(card);
  });

  container.appendChild(grid);
}

function renderPagination(){
  const totalPages = Math.ceil(filtered.length / perPage) || 1;
  const nav = document.getElementById('pagination');
  nav.innerHTML = '';

  const prev = document.createElement('button');
  prev.className = 'page-btn';
  prev.textContent = '« Prev';
  prev.disabled = currentPage === 1;
  prev.addEventListener('click', () => { currentPage = Math.max(1, currentPage - 1); renderBooks(); renderPagination(); });
  nav.appendChild(prev);

  for(let i=1;i<=totalPages;i++){
    const btn = document.createElement('button');
    btn.className = 'page-btn' + (i===currentPage ? ' active' : '');
    btn.textContent = i;
    btn.addEventListener('click', ()=>{ currentPage=i; renderBooks(); renderPagination(); });
    nav.appendChild(btn);
  }

  const next = document.createElement('button');
  next.className = 'page-btn';
  next.textContent = 'Next »';
  next.disabled = currentPage === totalPages;
  next.addEventListener('click', ()=>{ currentPage = Math.min(totalPages, currentPage+1); renderBooks(); renderPagination(); });
  nav.appendChild(next);
}

/* --- search + sort handlers --- */
function attachControls(){
  const search = document.getElementById('search');
  const sort = document.getElementById('sort');

  search.addEventListener('input', () => {
    const q = search.value.trim().toLowerCase();
    filtered = allBooks.filter(b => {
      return [b.title,b.author,b.summary,b.genre].join(' ').toLowerCase().includes(q);
    });
    currentPage = 1;
    applySort(sort.value);
    renderBooks();
    renderPagination();
  });

  sort.addEventListener('change', () => {
    applySort(sort.value);
    currentPage = 1;
    renderBooks();
    renderPagination();
  });
}

function applySort(mode){
  if(mode === 'year-asc'){
    filtered.sort((a,b)=>a.year - b.year);
  } else if(mode === 'year-desc'){
    filtered.sort((a,b)=>b.year - a.year);
  } else if(mode === 'genre'){
    filtered.sort((a,b)=> (a.genre||'').localeCompare(b.genre||''));
  } else {
    // default: preserve original order (or fallback to title)
    filtered.sort((a,b)=> (a.title||'').localeCompare(b.title||''));
  }
}

/* --- modal --- */
function openModal(book){
  const m = document.getElementById('modal');
  m.classList.add('open');
  m.setAttribute('aria-hidden','false');
  m.innerHTML = `
    <div class="box" role="dialog" aria-modal="true">
      <h2>${escapeHtml(book.title)}</h2>
      <p class="muted">by ${escapeHtml(book.author)} — ${book.year} ${book.genre ? ' — ' + escapeHtml(book.genre) : ''}</p>
      <img src="${escapeHtml(book.image || '/images/placeholder.jpg')}" alt="${escapeHtml(book.title)}" />
      <p>${escapeHtml(book.summary)}</p>
      <div style="text-align:right;margin-top:14px;">
        <button id="close-modal" class="page-btn">Close</button>
      </div>
    </div>
  `;
  document.getElementById('close-modal').addEventListener('click', closeModal);
  m.addEventListener('click', (ev)=>{ if(ev.target === m) closeModal(); });
}

function closeModal(){
  const m = document.getElementById('modal');
  m.classList.remove('open');
  m.setAttribute('aria-hidden','true');
  m.innerHTML = '';
}

/* --- dark mode toggle --- */
function setupDarkMode(){
  const toggle = document.getElementById('dark-toggle');
  // restore saved preference
  const saved = localStorage.getItem('books.dark');
  if(saved === '1') document.body.classList.add('dark');

  function applyIcon(){
    toggle.textContent = document.body.classList.contains('dark') ? '🌙' : '☀️';
  }
  applyIcon();

  toggle.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    localStorage.setItem('books.dark', document.body.classList.contains('dark') ? '1' : '0');
    applyIcon();
  });
}

/* small helpers */
function escapeHtml(s) {
  return String(s||'').replace(/[&<>"']/g, function (m) {
    return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m]);
  });
}
function truncate(s,len=140){ return s.length>len ? s.slice(0,len-1)+'...' : s; }

/* start */
window.addEventListener('DOMContentLoaded', () => {
  fetchBooks();
  attachControls();
  setupDarkMode();
});
