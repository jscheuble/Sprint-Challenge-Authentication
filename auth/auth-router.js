const router = require("express").Router();
const bcrypt = require("bcryptjs");
const createToken = require("../utils/createToken");

const User = require("./user-model");

router.post("/register", (req, res) => {
  let creds = req.body;
  const rounds = process.env.HASH_ROUNDS || 8;

  const hash = bcrypt.hashSync(creds.password, rounds);
  creds.password = hash;

  User.add(creds)
    .then((newUser) => {
      res.status(201).json(newUser);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});

router.post("/login", (req, res) => {
  User.getBy(req.body.username)
    .then((user) => {
      console.log(user[0]);
      if (user && bcrypt.compareSync(req.body.password, user[0].password)) {
        const token = createToken(user);
        res.status(200).json({ message: `welcome ${user[0].username}`, token });
      } else {
        res.status(401).json({ message: "failed to authenticate :( :( " });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

module.exports = router;
