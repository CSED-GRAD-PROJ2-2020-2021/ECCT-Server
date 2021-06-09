const randomString = require("randomstring");
const generateTokens = (numberOfTokens) => {
  let tokens = [];
  for (counter in numberOfTokens) {
    tokens.push(randomString.generate({ length: 50, charset: "numeric" }));
  }

  return tokens;
};

module.exports = { generateTokens };
