const request = require("supertest");
const server = require("../api/server");
const db = require("../data/dbConfig");

beforeAll(async () => {
  await db.migrate.rollback();
  await db.migrate.latest();

  //Jane Smith
  const authorPayload1 = {
    name: "John Doe",
    country: "United States",
    birthdate: "1990-01-15",
  };

  const authorPayload2 = {
    name: "Mark Twain",
    country: "Türkiye",
    birthdate: "1990-08-15",
  };

  const authorResponse1 = await request(server)
    .post("/api/author")
    .send(authorPayload1);

  const authorResponse2 = await request(server)
    .post("/api/author")
    .send(authorPayload2);

  // Create a book
  const bookPayload1 = {
    title: "Sample Book",
    price: 19.99,
    num_pages: 130,
    publisher: "Sample Publisher",
    author_id: authorResponse1.body.author_id,
    isbn: "9999-999-9998",
    language: "English",
  };

  const bookPayload2 = {
    title: "Teknolsssoji Lideri",
    price: 9.99,
    num_pages: 100,
    publisher: "Sample Publisher",
    author_id: authorResponse2.body.author_id,
    isbn: "9999-999-9998",
    language: "English",
  };

  const bookPayload3 = {
    title: "Konuşmada Uzman",
    price: 19.99,
    num_pages: 130,
    publisher: "Sample Publisher",
    author_id: authorResponse1.body.author_id,
    isbn: "9999-999-9998",
    language: "English",
  };

  const bookPayload4 = {
    title: "hehehe Uzman",
    price: 19.99,
    num_pages: 130,
    publisher: "Sample Publisher",
    author_id: authorResponse2.body.author_id,
    isbn: "9999-999-9998",
    language: "English",
  };

  await request(server).post("/api/book").send(bookPayload1);

  await request(server).post("/api/book").send(bookPayload2);
  await request(server).post("/api/book").send(bookPayload3);
  await request(server).post("/api/book").send(bookPayload4);
});

afterAll(async () => {
  await db.destroy();
});

test("[0] sanity check", () => {
  expect(process.env.NODE_ENV).toBe("testing");
});

describe("Author and book CRUD Operations", () => {
  it("should get an author list", async () => {
    const response = await request(server).get(`/api/author/`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(1);
  });

  it("should get an author by ID", async () => {
    const response = await request(server).get(`/api/author/1`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("author_id", 1);
  });

  it("should update an author", async () => {
    const updatedAuthorPayload = {
      name: "Jane Smith",
      country: "Canada",
      birthdate: "1985-03-20",
    };

    const response = await request(server)
      .put(`/api/author/1`)
      .send(updatedAuthorPayload);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("name", "Jane Smith");
  });

  it("should delete an author", async () => {
    const response = await request(server).delete(`/api/author/1`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("name", "Jane Smith");
  });

  it("should get a book by ID", async () => {
    const response = await request(server).get(`/api/book/1`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("title", "Sample Book");
    expect(response.body).toHaveProperty("book_id", 1);
  });

  it("should update a book", async () => {
    const updatedBookPayload = {
      title: "Updated Book",
      price: 12.99,
      num_pages: 200,
      publisher: "Updated Publisher",
      author_id: 1,
      isbn: "9999-999-9999",
      language: "English",
    };

    const response = await request(server)
      .put(`/api/book/1`)
      .send(updatedBookPayload);

    expect(response.status).toBe(200);
  });

  it("should delete a book", async () => {
    const response = await request(server).delete(`/api/book/1`);
    expect(response.status).toBe(200);
  });
});
