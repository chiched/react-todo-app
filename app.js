const createError = require("http-errors");
const express = require("express");
const path = require("path");
const favicon = require("serve-favicon");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const auth = require("./auth");
var sslRedirect = require("heroku-ssl-redirect");

const app = express();

const todo = require("./api/todo");

require("dotenv").config();

// view engine setup

app.use(sslRedirect());

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));

app.use(express.static(path.join(__dirname + "/client/build")));

app.use("/auth", auth);
app.use("/api", todo);
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/"));
});
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // render the error page
  res.status(err.status || res.statusCode || 500);
  res.json({
    message: err.message,
    error: req.app.get("env") === "development" ? err : {},
  });
});

module.exports = app;
