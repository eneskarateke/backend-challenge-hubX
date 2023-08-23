const router = require("express").Router();
const Books = require("./book-model.js");

router.get("/", async (req, res, next) => {
  try {
    const books = await Books.getAll();
    res.json(books);
  } catch (error) {
    next(error);
  }
});

router.get("/:book_id", async (req, res, next) => {
  const book_id = req.params.book_id;
  try {
    const books = await Books.getByBookId(book_id);
    res.json(books);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { title, price, isbn, language, num_pages, publisher, author_id } =
      req.body;
    const payload = {
      title,
      price,
      isbn,
      language,
      num_pages,
      publisher,
      author_id,
    };

    const addedBook = await Books.addBook(payload);
    res.status(201).json(addedBook);
  } catch (error) {
    next(error);
  }
});

router.put("/:id", async (req, res) => {
  const bookId = req.params.id;
  const updates = req.body;

  try {
    const updatedBook = await Books.updateById(bookId, updates);
    res.json(updatedBook);
  } catch (error) {
    res.status(500).json({ error: "Kitap bilgileri güncellenemedi." });
  }
});

router.delete("/:book_id", async (req, res, next) => {
  const book_id = req.params.book_id;

  try {
    const toBeDeleted = await Books.getByBookId(book_id);
    if (toBeDeleted) {
      await Books.deleteBook(book_id);
      res.json(toBeDeleted);
    } else {
      res.status(404).json({ message: "Book not found" });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
