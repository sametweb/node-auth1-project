const router = require("express").Router();
const Users = require("./users-model");

router.get("/", (req, res) => {
  //list all users
  Users.find()
    .then((users) => {
      res.json(users);
    })
    .catch((err) => {
      res.status(400).json({ error: "error retrieving", err });
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;

  Users.findById(id)
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((err) => {
      res.status(404).json({ error: "the user id does not exist" });
    });
});

module.exports = router;
