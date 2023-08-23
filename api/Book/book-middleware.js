const Books = require("./book-model");

async function isIdExist(req, res, next) {
  const id = req.params.book_id;

  const foundBook = await Books.getByBookId(id);

  if (!foundBook) {
    res.status(404).json({ message: "Kitap bulunamadı." });
  } else {
    next();
  }
}

async function isIdNonExist(req, res, next) {
  const id = req.params.book_id;

  const foundBook = await Books.getByBookId(id);

  if (foundBook) {
    res.status(404).json({ message: "Bu id ile kitap halihazırda var." });
  } else {
    next();
  }
}

async function PayloadCheck(req, res, next) {
  const { title, price, isbn, language, num_pages, publisher, author_id } =
    req.body;
  try {
    if (
      !title ||
      !price ||
      !isbn ||
      !language ||
      !publisher ||
      !author_id ||
      !num_pages
    ) {
      res.status(400).json({ message: "Check the request body." });
    } else {
      req.checkedPayload = {
        title,
        price,
        isbn,
        language,
        num_pages,
        publisher,
        author_id,
      };
      next();
    }
  } catch (error) {
    next(error);
  }
}

module.exports = { PayloadCheck, isIdExist, isIdNonExist };
