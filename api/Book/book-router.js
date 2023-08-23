const router = require("express").Router();
const Books = require("./book-model.js");
const bookMW = require("./book-middleware");

router.get("/", async (req, res, next) => {
  try {
    const books = await Books.getAll();
    res.json(books);
  } catch (error) {
    next(error);
  }
});

router.get("/:book_id", bookMW.isIdExist, async (req, res, next) => {
  const book_id = req.params.book_id;
  try {
    const books = await Books.getByBookId(book_id);
    res.json(books);
  } catch (error) {
    next(error);
  }
});

router.post("/", bookMW.PayloadCheck, async (req, res, next) => {
  try {
    const payload = req.checkedPayload;

    const addedBook = await Books.addBook(payload);
    res.status(201).json(addedBook);
  } catch (error) {
    next(error);
  }
});

router.put(
  "/:book_id",
  bookMW.isIdExist,
  bookMW.PayloadCheck,
  async (req, res) => {
    const bookId = req.params.book_id;
    const updates = req.checkedPayload;

    try {
      const updatedBook = await Books.updateById(bookId, updates);
      res.json(updatedBook);
    } catch (error) {
      next(error);
    }
  }
);

router.delete("/:book_id", bookMW.isIdExist, async (req, res, next) => {
  const book_id = req.params.book_id;

  try {
    const toBeDeleted = await Books.getByBookId(book_id);
    if (toBeDeleted) {
      await Books.deleteBook(book_id);
      res.json(toBeDeleted);
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
