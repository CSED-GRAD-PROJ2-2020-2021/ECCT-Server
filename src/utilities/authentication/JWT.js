const jwt = require("jsonwebtoken");
const randomString = require("randomstring");
//payload is object
const generateAuthToken = () => {
  const randomPayload = randomString.generate({ length: 30, charset: "alphanumeric" });
  const authenticationToken = jwt.sign(
    {
      exp: Math.floor(Date.now() / 1000) + 60 * 60,
      data: randomPayload,
    },
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
