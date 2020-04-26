const knex = require("./knex");

module.exports = {
  getOne(id) {
    return knex("users").where("id", id).first();
  },
  getOneByEmail(email) {
    return knex("users").where("email", email).first();
  },
};
