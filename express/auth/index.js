const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const Users = require("../db/users");

router.get("/", (req, res) => {
  res.json({
    message: "🔐",
  });
});

function validUser(user) {
  const validEmail = typeof user.email == "string" && user.email.trim() != "";
  const validPassword =
    typeof user.password == "string" &&
    user.password.trim() != "" &&
    user.password.trim().length >= 6;
  return validEmail && validPassword;
}

router.post("/signup", (req, res, next) => {
  if (validUser(req.body)) {
    Users.getOneByEmail(req.body.email).then((user) => {
      console.log("user", user);
      if (!user) {
        // this is a unique email
        // hash password
        bcrypt.hash(req.body.password, 10).then((hash) => {
          const user = {
            email: req.body.email,
            password: hash,
            created_at: new Date(),
          };
          Users.create(user).then((id) => {
            res.json({
              id,
              message: "✅",
            });
          });
        });
      } else {
        next(new Error("Email in use"));
      }
    });
  } else {
    next(new Error("Invalid user"));
  }
});

router.post("/login", (req, res, next) => {
  if (validUser(req.body)) {
    Users.getOneByEmail(req.body.email).then((user) => {
      console.log(user);
      if (user) {
        bcrypt.compare(req.body.password, user.password).then((result) => {
          if (result) {
            const isSecure = req.app.get("env") != "development";
            res.cookie("user_id", user.id, {
              httpOnly: true,
              signed: true,
              secured: isSecure,
            });
            res.json({
              id: user.id,
              message: "Logged in! 🔓",
            });
          } else {
            next(new Error("Invalid login - wrong pass"));
          }
        });
      } else {
        next(new Error("Invalid login - user not found"));
      }
    });
  } else {
    next(new Error("Invalid login"));
  }
});
module.exports = router;
