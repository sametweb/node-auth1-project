const db = require("./db-config");

module.exports = {
  find,
  findById,
  findByUsername,
  add,
};

function find() {
  return db("users").select("id", "username");
}

function findById(id) {
  return db("users").where({ id }).select("id", "username").first();
}

function findByUsername(username) {
  return db("users").where({ username });
}

function add(user) {
  return db("users")
    .insert(user)
    .then(([id]) => {
      return db("users").where({ id }).first();
    });
}
