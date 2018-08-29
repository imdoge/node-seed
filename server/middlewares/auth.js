exports.isLoggedIn = function(req, res, next) {
  if (req.isAuthenticated()) return next();
  if (req.method == "GET") req.session.returnTo = req.originalUrl;
  var fullUrl = req.protocol + "://" + req.get("host") + req.originalUrl;
  return res.redirect("/login?redirect=" + encodeURIComponent(fullUrl));
};

exports.isAdmin = function(req, res, next) {
  if (req.user.role == "admin") return next();
  res.redirect("/login");
};
