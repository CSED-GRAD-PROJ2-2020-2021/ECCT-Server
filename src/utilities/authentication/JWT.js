const jwt = require("jsonwebtoken");
//payload is object
const generateAuthToken = (payload) => {
  const authenticationToken = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
    algorithm: process.env.AUTHENTICATION_ALGORITHM,
  });
  return authenticationToken;
};

module.exports = { generateAuthToken };
