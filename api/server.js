const express = require("express");
const server = express();
require("dotenv").config();

const authorRouter = require("./Author/author-router");
const bookRouter = require("./Book/book-router");

server.use(express.json());

server.use("/api/author", authorRouter);
server.use("/api/book", bookRouter);
server.get("/", (req, res) => {
  res.json({ message: "Server up and running..." });
});

server.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message,
    stack: err.stack,
  });
});

module.exports = server;
