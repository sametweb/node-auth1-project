module.exports = function authenticator(req, res, next) {
  if (req.session.userId) {
    next();
  } else {
    res.status(401).json({ message: "you are not logged in" });
  }
};
