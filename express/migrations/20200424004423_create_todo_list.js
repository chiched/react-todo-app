exports.up = function (knex) {
  return knex.schema.createTable("todo_list", (table) => {
    table.increments("id");
    table.text("title");
    table.boolean("done");
    table.boolean("important");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("todo_list");
};
