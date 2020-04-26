const express = require("express");
const router = express.Router();
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
        res.json({
          message: "✅",
        });
      } else {
        next(new Error("Email in use"));
      }
    });
  } else {
    next(new Error("Invalid user"));
  }
});

module.exports = router;
