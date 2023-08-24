/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .createTable("author", (table) => {
      table.increments("author_id").primary();
      table.string("name", 70).notNullable();
      table.string("country", 40).notNullable();
      table.date("birthdate").notNullable;
    })

    .createTable("book", (table) => {
      table.increments("book_id").primary();
      table.string("title", 100).notNullable();
      table.decimal("price", 10, 2).notNullable();
      table.string("isbn").notNullable();
      table.string("language").notNullable();
      table.integer("num_pages").notNullable();
      table.string("publisher").notNullable();
      table
        .integer("author_id")
        .unsigned()
        .notNullable()
        .references("author_id")
        .inTable("author")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("book").dropTableIfExists("author");
};
