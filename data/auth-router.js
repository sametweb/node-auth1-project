const router = require("express").Router();
const bcrypt = require("bcryptjs");
const Users = require("./users-model");

router.post("/login", (req, res) => {
  //login operations, check if user exists, then check if password matches, then save loggedin info in sessions
  const { username, password } = req.body;
  Users.findByUsername(username)
    .then(([user]) => {
      // try matching password here
      if (password && bcrypt.compareSync(password, user.password)) {
        req.session.userId = user.id;
        res.status(200).json({ message: "logged in for 10 seconds" });
        // store a session so login persists
      } else {
        res.status(401).json({ message: "You shall not pass" });
      }
    })
    .catch((err) => {
      res.json({ message: "check credentials" });
    });
});

router.post("/register", (req, res) => {
  //register operations
  const user = req.body;

  const rounds = process.env.ROUNDS || 8;

  user.password = bcrypt.hashSync(user.password, rounds);

  Users.add(user)
    .then((added) => {
      res.status(201).json(added);
    })
    .catch((err) => {
      res.json({ error: "error registering", err });
    });
});

module.exports = router;
