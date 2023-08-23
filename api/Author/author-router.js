const router = require("express").Router();
const Authors = require("./author-model.js");

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

router.get("/:id", async (req, res, next) => {
  try {
    const author = await Authors.getById(req.params.id);

    if (author) {
      res.json(author);
    } else {
      res.status(404).json({ message: "Author not found" });
    }
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { name, country, birthdate } = req.body;
    const payload = {
      name,
      country,
      birthdate,
    };

    const addedAuthor = await Authors.addAuthor(payload);
    res.status(201).json(addedAuthor);
  } catch (error) {
    next(error);
  }
});

router.put("/:id", async (req, res) => {
  const author_id = req.params.id;
  const updates = req.body;

  try {
    const updatedAuthor = await Authors.updateById(author_id, updates);
    res.json(updatedAuthor);
  } catch (error) {
    res.status(500).json({ error: "Yazar bilgileri güncellenemedi." });
  }
});

router.delete("/:author_id", async (req, res, next) => {
  const author_id = req.params.author_id;

  try {
    const toBeDeleted = await Authors.getById(author_id);
    if (toBeDeleted) {
      await Authors.deleteAuthor(author_id);
      res.json(toBeDeleted);
    } else {
      res.status(404).json({ message: "Book not found" });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
