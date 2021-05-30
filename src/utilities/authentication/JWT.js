const jwt = require("jsonwebtoken");
const randomString = require("randomstring");
//payload is object
const generateAuthToken = () => {
  const randomPayload = randomString.generate({ length: 30, charset: "alphanumeric" });
  const authenticationToken = jwt.sign(
    { randomPayload, exp: 3 * (24 * 60 * 60) },
    process.env.JWT_SECRET_KEY,
    {
      algorithm: process.env.AUTHENTICATION_ALGORITHM,
    }
  );
  return authenticationToken;
};

const isExpired = (token) => {
  try {
    jwt.verify(token, process.env.JWT_SECRET_KEY);
  } catch (error) {
    return true;
  }
  return false;
};
module.exports = { generateAuthToken, isExpired };
