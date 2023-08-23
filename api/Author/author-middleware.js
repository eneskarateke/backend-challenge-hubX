const Authors = require("./author-model");

async function isIdExist(req, res, next) {
  const id = req.params.author_id;

  const foundAuthor = await Authors.getById(id);

  if (!foundAuthor) {
    res.status(404).json({ message: "Yazar bulunamadı." });
  } else {
    next();
  }
}

async function isIdNonExist(req, res, next) {
  const id = req.params.author_id;

  const foundAuthor = await Authors.getById(id);

  if (foundAuthor) {
    res.status(404).json({ message: "Bu id ile yazar halihazırda var." });
  } else {
    next();
  }
}

async function PayloadCheck(req, res, next) {
  const { name, country, birthdate } = req.body;

  if (!name || !country || !birthdate) {
    res.status(400).json({ message: "Check the request body." });
  } else {
    req.checkedPayload = {
      name,
      country,
      birthdate,
    };
    next();
  }
}

module.exports = { PayloadCheck, isIdExist, isIdNonExist };
