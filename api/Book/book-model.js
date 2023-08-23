const db = require("../../data/dbConfig");

function getAll() {
  return db("book");
}

function getByAuthorId(author_id) {
  return db("book")
    .select("book.book_id", "author.name", "book.title")
    .from("book")
    .join("author", "book.author_id", "author.author_id")
    .where("book.author_id", author_id);
}

function getByBookId(book_id) {
  return db("book")
    .select("book_id", "title")
    .where("book_id", book_id)
    .first();
}

const updateById = async (book_id, book) => {
  const payload = {
    title: book.title,
    price: book.price,
    isbn: book.isbn,
    language: book.language,
    num_pages: book.num_pages,
    publisher: book.publisher,
    author_id: book.author_id,
  };
  await db("book").where("book_id", book_id).update(payload);
  return getByBookId(book_id);
};

async function deleteBook(book_id) {
  const deletedBook = await db("book")
    .where("book_id", book_id)
    .del()
    .then(() => {
      return db("book")
        .select("book_id", "title")
        .where("book_id", book_id)
        .first();
    });

  return deletedBook;
}

async function addBook(book) {
  const { title, price, isbn, language, num_pages, publisher, author_id } =
    book;

  const payload = {
    title,
    price,
    isbn,
    language,
    num_pages,
    publisher,
    author_id,
  };
  const [book_id] = await db("book").insert(payload);
  const addedBook = await getByBookId(book_id);

  return addedBook;
}
module.exports = {
  getAll,
  getByAuthorId,
  getByBookId,
  addBook,
  deleteBook,
  updateById,
};
