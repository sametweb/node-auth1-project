exports.up = function (knex) {
  return knex.schema.createTable("users", (table) => {
    table.increments(); // id
    table.string("username", 40).notNullable().unique().index(); // max 40 char
    table.text("password").notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("users");
};
