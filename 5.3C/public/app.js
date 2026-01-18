document.getElementById('loadBtn').addEventListener('click', async () => {
  const res = await fetch('/api/books');
  const books = await res.json();

  const list = document.getElementById('bookList');
  list.innerHTML = '';

  books.forEach(b => {
    const li = document.createElement('li');
    li.textContent = `${b.title} ${b.price} AUD`;
    li.onclick = async () => {
      const r = await fetch(`/api/books/${b._id}`);
      const book = await r.json();
      alert(
        `Title: ${book.title}\nAuthor: ${book.author}\nYear: ${book.year}\nGenre: ${book.genre}\nPrice: ${book.price} AUD`
      );
    };
    list.appendChild(li);
  });
});
