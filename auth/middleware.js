function ensureLoggedIn(req, res, next) {
  if (req.signedCookies.user_id) {
    next();
  } else {
    res.status(401);
    next(new Error("Un-authorized"));
  }
}
function allowAccess(req, res, next) {
  console.log(req.signedCookies.user_id);
  console.log(req.params.id);
  if (req.signedCookies.user_id == req.params.id) {
    next();
  } else {
    res.status(401);
    next(new Error("Un-authorized"));
  }
}

module.exports = {
  ensureLoggedIn,
  allowAccess,
};
