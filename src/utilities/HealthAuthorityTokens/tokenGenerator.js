const randomString = require("randomstring");
const generateTokens = (numberOfTokens) => {
  let tokens = [];
  for (let i = 0; i < numberOfTokens; i++) {
    const token = {
      HAToken: randomString.generate({ length: 50, charset: "numeric" }),
    };
    tokens.push(token);
  }

  return tokens;
};

module.exports = { generateTokens };
