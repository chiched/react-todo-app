const knex = require("./knex");

module.exports = {
  getAll() {
    return knex("todo_list");
  },
  create(todo) {
    console.log("queries started");
    return knex("todo_list").insert(todo, "*");
  },
  update(id, todo) {
    return knex("todo_list").where("id", id).update(todo, "*");
  },
};
