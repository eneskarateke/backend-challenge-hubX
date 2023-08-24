//Author middleware
const Authors = require("./author-model");

// Id check
async function isIdExist(req, res, next) {
  const id = req.params.author_id;

  const foundAuthor = await Authors.getById(id);

  if (!foundAuthor) {
    res.status(404).json({ message: "Author is not exist" });
  } else {
    next();
  }
}

//Request body check
async function PayloadCheck(req, res, next) {
  const { name, country, birthdate } = req.body;

  try {
    if (!name || !country || !birthdate) {
      res.status(400).json({
        message: "Check the request body, fields cannot be empty or null",
      });
    } else if (typeof name !== "string" || typeof country !== "string") {
      res
        .status(400)
        .json({ message: "Name and Country fields must be string" });
    } else if (name.length > 70 || country.length > 40) {
      res
        .status(400)
        .json({ message: "Name or Country fields length exceeded" });
    } else if (!/^(\d{4}-\d{2}-\d{2})$/.test(birthdate)) {
      res
        .status(400)
        .json({ message: "Invalid birthdate format. Use YYYY-MM-DD" });
    } else {
      req.checkedPayload = {
        name,
        country,
        birthdate,
      };
      next();
    }
  } catch (error) {
    next(error);
  }
}

module.exports = { PayloadCheck, isIdExist };
