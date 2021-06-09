const EList = require("../../models/Elist");
const AuthTokensModel = require("../../models/HealthAuthTokens");
const dateFormat = require("dateformat");

const infectedNodeDeclarationReq = async (req, res) => {
  try {
    if (!req.body.healthAuthorityToken) {
      throw new Error("Missing health Authority token");
    } else if (!req.body.infectionPets) {
      throw new Error("Missing infection pets");
    }
    // validate health authority token
    const healthAuthorityToken = req.body.healthAuthorityToken;
    //const authorized = await AuthTokensModel.findOneAndDelete({ HAToken: healthAuthorityToken });
    const authorized = await AuthTokensModel.findOne({ HAToken: healthAuthorityToken });
    if (!authorized) {
      throw new Error("unauthorized request, invalid health authority token");
    }

    // need to validate PET objects

    // saving PETs to EList
    await EList.create(req.body.infectionPets);

    res.status(201).send("Pets have been received successfully");
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: error.message });
  }
};

const receiveHealthAuthorityTokens = async (req, res) => {
  try {
    if (!req.body.tokens) {
      throw new Error("Missing tokens");
    }
    const tokens = req.body.tokens;
    for (index in tokens) {
      const newToken = new AuthTokensModel({ HAToken: tokens[index] });
      await newToken.save();
    }
    res.status(201).send("Tokens received");
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

module.exports = { infectedNodeDeclarationReq, receiveHealthAuthorityTokens };
