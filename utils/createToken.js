const jwt = require("jsonwebtoken");

module.exports = (user) => {
  const payload = {
    id: user.id,
  };

  const secret = process.env.JWT_SECRET || "ultra secure";

  const options = {
    expiresIn: "1h",
  };

  return jwt.sign(payload, secret, options);
};
