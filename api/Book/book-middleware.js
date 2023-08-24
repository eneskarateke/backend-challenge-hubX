//Book middleware
const Books = require("./book-model");

//Author middleware for check if author with given id exist.
const Authors = require("../Author/author-model");

// Id check

async function isIdExist(req, res, next) {
  const id = req.params.book_id;

  const foundBook = await Books.getByBookId(id);

  if (!foundBook) {
    res.status(404).json({ message: "Book is not exist." });
  } else {
    next();
  }
}

//Request body check
async function PayloadCheck(req, res, next) {
  const { title, price, num_pages, publisher, author_id, isbn, language } =
    req.body;
  try {
    if (!title || !price || !publisher || !author_id || !num_pages) {
      res.status(400).json({
        message: "Check the request body, fields cannot be null or empty.",
      });
    } else if (
      typeof price !== "number" ||
      typeof num_pages !== "number" ||
      typeof author_id !== "number"
    ) {
      res
        .status(400)
        .json({ message: "Invalid data types in the request body." });
    } else if (
      typeof title !== "string" ||
      typeof publisher !== "string" ||
      typeof isbn !== "string" ||
      typeof language !== "string"
    ) {
      res.status(400).json({
        message:
          "Title, publisher, isbn and language fields must be string type",
      });
    } else if (title.length > 100 || publisher.length > 100) {
      res.status(400).json({ message: "Field length exceeded." });
    } else if (price < 0 || num_pages <= 0) {
      res.status(400).json({ message: "Invalid price or number of pages" });
    } else {
      const authorExists = await Authors.getById(author_id);
      if (!authorExists) {
        res.status(400).json({ message: "Invalid author ID" });
      } else {
        req.checkedPayload = {
          title,
          price,
          num_pages,
          publisher,
          author_id,
          isbn,
          language,
        };
        next();
      }
    }
  } catch (error) {
    next(error);
  }
}

module.exports = { PayloadCheck, isIdExist };
