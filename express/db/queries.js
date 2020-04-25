const knex = require("./knex");

module.exports = {
  getAll() {
    return knex("todo_list");
  },
  create(todo) {
    return knex("todo_list").insert(todo, "*");
  },
  update(id, todo) {
    return knex("todo_list").where("id", id).update(todo, "*");
  },
  delete(id) {
    return knex("todo_list").where("id", id).del();
  },
};
