const router = require("express").Router();
const Authors = require("./author-model.js");
const authorMW = require("./author-middleware.js");

router.get("/", async (req, res, next) => {
  try {
    const authors = await Authors.findAll();
    if (authors) {
      res.json(authors);
    } else {
      res.status(404).json({ message: "Authors not found" });
    }
  } catch (error) {
    next(error);
  }
});

router.get("/:author_id", authorMW.isIdExist, async (req, res, next) => {
  try {
    const author = await Authors.getById(req.params.author_id);
    res.json(author);
  } catch (error) {
    next(error);
  }
});

router.post("/", authorMW.PayloadCheck, async (req, res, next) => {
  try {
    const checkedPayload = req.checkedPayload;

    const addedAuthor = await Authors.addAuthor(checkedPayload);
    res.status(201).json(addedAuthor);
  } catch (error) {
    next(error);
  }
});

router.put(
  "/:author_id",
  authorMW.isIdExist,
  authorMW.PayloadCheck,
  async (req, res) => {
    const author_id = req.params.author_id;
    const checkedPayload = req.checkedPayload;

    try {
      const updatedAuthor = await Authors.updateById(author_id, checkedPayload);
      res.json(updatedAuthor);
    } catch (error) {
      next(error);
    }
  }
);

router.delete("/:author_id", authorMW.isIdExist, async (req, res, next) => {
  const author_id = req.params.author_id;

  try {
    const toBeDeleted = await Authors.getById(author_id);
    if (toBeDeleted) {
      await Authors.deleteAuthor(author_id);
      res.json(toBeDeleted);
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
