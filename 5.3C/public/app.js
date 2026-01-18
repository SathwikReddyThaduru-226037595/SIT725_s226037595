document.getElementById("getBooks").addEventListener("click", async () => {
  const res = await fetch("/api/books");
  const books = await res.json();

  const list = document.getElementById("booksList");
  list.innerHTML = "";

  books.forEach(book => {
    const li = document.createElement("li");
    li.textContent =
      `${book.title} — ${book.price.$numberDecimal} AUD`;
    list.appendChild(li);
  });
  const price = book.price?.$numberDecimal || book.price;
<p><strong>Price:</strong> ${price} AUD</p>

});
