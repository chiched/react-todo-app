// Update with your config settings.

module.exports = {
  development: {
    client: "pg",
    connection: "postgres://localhost/todo_app",
  },
  test: {
    client: "pg",
    connection: "postgres://localhost/todo_app",
  },
  production: {
    client: "pg",
    connection: process.env.DATABASE_URL,
  },
};
