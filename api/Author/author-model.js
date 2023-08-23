const db = require("../../data/dbConfig");

function findAll() {
  return db("author");
}

function getById(id) {
  return db("author")
    .select("author_id", "name")
    .where("author_id", id)
    .first();
}

async function addAuthor(payload) {
  const [author_id] = await db("author").insert(payload);
  const author = await getById(author_id);
  return author;
}

const updateById = async (author_id, author) => {
  const payload = {
    name: author.name,
    country: author.country,
    birthdate: author.birthdate,
  };
  await db("author").where("author_id", author_id).update(payload);
  return getById(author_id);
};

async function deleteAuthor(author_id) {
  const bookWillBeDeleted = await db("author")
    .where("author_id", author_id)
    .first();

  await db("book").where("author_id", author_id).del();

  return bookWillBeDeleted;
}

module.exports = {
  findAll,
  getById,
  addAuthor,
  updateById,
  deleteAuthor,
};
