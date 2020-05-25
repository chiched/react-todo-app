const express = require("express");
const router = express.Router();
const queries = require("../db/queries");
const authMiddleware = require("../auth/middleware");

function isValidId(req, res, next) {
  if (!isNaN(req.params.id)) return next();
  next(new Error("Invalid ID"));
}
function validTodo(todo) {
  const hasTitle = typeof todo.title == "string" && todo.title.trim() != "";
  const hasDone = typeof todo.done === "boolean";
  const hasImportant = typeof todo.important === "boolean";
  return hasTitle && hasDone && hasImportant;
}
router.get("/", (req, res) => {
  queries.getAll().then((todos) => {
    const filteredList = todos.filter((todo) => !todo.user_id);

    res.json(filteredList);
  });
});
router.get(
  "/user/:id",
  authMiddleware.ensureLoggedIn,
  authMiddleware.allowAccess,
  (req, res) => {
    queries.getAll().then((todos) => {
      console.log(todos);
      if (!req.params.id) {
        res.json(todos);
      } else {
        const filteredList = todos.filter(
          (todo) => todo.user_id == req.params.id
        );
        res.json(filteredList);
      }
    });
  }
);
router.post("/", (req, res, next) => {
  if (validTodo(req.body)) {
    const todo = { ...req.body, user_id: req.signedCookies.user_id };

    queries.create(todo).then((todos) => {
      // req.signedCookies.user_id
      console.log(todos[0]);
      res.json(todos[0]);
    });
  } else {
    next(new Error("Invalid todo"));
  }
});
router.put("/:id", isValidId, (req, res, next) => {
  if (validTodo(req.body)) {
    queries
      .update(req.params.id, req.body)
      .then(() => {
        console.log("updated");
        res.status(200);
      })
      .then(() =>
        queries.getAll().then((todos) => {
          let filteredList = [];
          if (req.signedCookies.user_id) {
            filteredList = todos.filter(
              (todo) => todo.user_id == req.signedCookies.user_id
            );
          } else {
            filteredList = todos.filter((todo) => todo.user_id == null);
          }
          res.json(filteredList);
        })
      );
  } else {
    next(new Error("Invalid todo"));
  }
});
router.delete("/:id", isValidId, (req, res) => {
  queries.delete(req.params.id).then(() => {
    res.status(200).end();
  });
});

module.exports = router;
