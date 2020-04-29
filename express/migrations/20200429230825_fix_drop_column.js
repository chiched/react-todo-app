exports.up = function (knex, promise) {
  return knex.schema.table("users", (table) => {
    table.dropColumn("date");
    table.datetime("created_at");
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.table("users", (table) => {
    table.dropColumn("created_at");
    table.datetime("date");
  });
};
