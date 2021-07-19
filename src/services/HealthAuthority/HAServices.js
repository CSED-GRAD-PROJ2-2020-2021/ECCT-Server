const HATokensModel = require("../../models/HealthAuthTokens");
const tokensGenerator = require("../../utilities/HealthAuthorityTokens/tokenGenerator");

const getTokens = async (req, res) => {
  try {
    // if (!req.client.authorized) {
    //   throw new Error("Unauthorized request!");
    // }
    var HATokens = null;
    const numOfDocs = await HATokensModel.countDocuments({ used: false });

    if (numOfDocs < 10) {
      HATokens = tokensGenerator.generateTokens(100);
      // create tokens and add them to HATokens
      await HATokensModel.create(HATokens); // save them
    } else {
      HATokens = await HATokensModel.find({ used: false });
    }
    await HATokensModel.updateOne({ HAToken: HATokens[0].HAToken }, { used: true }, (err, docs) => {
      if (err) {
        throw new Error(err);
      }
    });
    console.log("Health authority token delivered");
    res.status(200).send({ HAToken: HATokens[0].HAToken });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

module.exports = { getTokens };
