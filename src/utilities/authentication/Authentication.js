const jwt = require("jsonwebtoken");
const generateAuthToken = (phoneNumber) => {
  const authenticationToken = jwt.sign({ phoneNumber }, process.env.JWT_SECRET_KEY, {
    algorithm: process.env.AUTHENTICATION_ALGORITHM,
  });
  return authenticationToken;
};

module.exports = { generateAuthToken };
