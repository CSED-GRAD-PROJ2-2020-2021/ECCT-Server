const HATokensModel = require("../../models/HealthAuthTokens");
const tokensGenerator = require("../../utilities/HealthAuthorityTokens/tokenGenerator");

const getTokens = async (req, res) => {
  try {
    const HATokens = HATokensModel.find();
    if (HATokens.length() == 0) {
      HATokens = tokensGenerator.generateTokens(100); // create tokens and add them to HATokens
      await HATokensModel.create(HATokens); // save them
    }
    res.status(200).send({ token: HATokens[0] });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

module.exports = { getTokens };
