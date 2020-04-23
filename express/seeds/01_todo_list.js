const todoList = require("../todolist");

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("todo_list")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("todo_list").insert(todoList);
    });
};
