const jwt = require("jsonwebtoken");
const randomString = require("randomstring");
//payload is object
const generateAuthToken = (ifRandomPayload, requestPayload, expirationInterval) => {
  var payload = "";
  if ((ifRandomPayload = true)) {
    payload = randomString.generate({ length: 30, charset: "alphanumeric" });
  } else {
    payload = requestPayload;
  }

  const authenticationToken = jwt.sign(
    {
      exp: expirationInterval,
      data: payload,
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
