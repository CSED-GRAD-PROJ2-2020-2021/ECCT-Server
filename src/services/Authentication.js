const jwt = require("jsonwebtoken");
const generateAuthToken = async (phoneNumber) => {
  const authenticationToken = jwt.sign({ phoneNumber }, process.env.JWT_SECRET_KEY, {
    algorithm: "RS256",
  });
  return authenticationToken;
};

module.exports = auth;
