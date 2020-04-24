const db = require("../database/dbConfig");

module.exports = {
  get,
  add,
  getById,
  getBy,
};

function get() {
  return db("users");
}

async function add(user) {
  return db("users")
    .insert(user)
    .then((id) => getById(id[0]));
}

function getById(id) {
  return db("users").where({ id });
}

function getBy(username) {
  return db("users").where({ username });
}
