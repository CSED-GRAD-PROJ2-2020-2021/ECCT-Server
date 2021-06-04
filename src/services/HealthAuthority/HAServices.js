const HATokensModel = require("../../models/HealthAuthTokens");

const addNewTokens = async (req, res) => {
  try {
    // validate request parameters
    if (!req.body.HATokens) {
      throw new error("Missing healt authority tokens");
    }
    const tokens = req.body.HATokens;
    await HATokensModel.insertMany(tokens);
  } catch (error) {
    res.status(400).status({ error: error.message });
  }
};

module.exports = { addNewTokens };
