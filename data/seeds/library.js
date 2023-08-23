/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 *
 */

const defaultBooks = [
  {
    title: "Book 1",
    price: 25.99,
    isbn: "978-1234567890",
    language: "English",
    num_pages: 300,
    publisher: "Publisher A",
    author_id: 1,
  },
  {
    title: "Book 2",
    price: 19.99,
    isbn: "978-9876543210",
    language: "Spanish",
    num_pages: 250,
    publisher: "Publisher B",
    author_id: 2,
  },
  {
    title: "Book 3",
    price: 20.99,
    isbn: "978-1286767890",
    language: "English",
    num_pages: 100,
    publisher: "Publisher C",
    author_id: 3,
  },
  {
    title: "Book 4",
    price: 10.99,
    isbn: "978-8475543210",
    language: "Spanish",
    num_pages: 150,
    publisher: "Publisher D",
    author_id: 4,
  },
];

const defaultAuthors = [
  { name: "Author 1", country: "Country 1", birthdate: "1990-01-01" },
  { name: "Author 2", country: "Country 2", birthdate: "1985-05-15" },
  { name: "Author 3", country: "Country 3", birthdate: "1982-10-20" },
  { name: "Author 4", country: "Country 4", birthdate: "1986-12-10" },
];

exports.seed = async function (knex) {
  // Deletes ALL existing entries

  await knex("book").truncate();
  await knex("author").truncate();

  await knex("author").insert(defaultAuthors);
  await knex("book").insert(defaultBooks);
};
