const db = require("../database/dbConfig");

module.exports = {
  add,
  getById,
  getBy,
};

async function add(user) {
  return db("users").insert(user);
}

function getById(id) {
  return db("users").where({ id });
}

function getBy(username) {
  return db("users").where({ username });
}
