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
    const authorized = await AuthTokensModel.findOneAndDelete({ HAToken: healthAuthorityToken });
    if (!authorized) {
      throw new Error("Unauthorized request, invalid health authority token");
    }

    // need to validate PET objects

    // saving PETs to EList
    await EList.create(req.body.infectionPets);
    console.log("infection declaration succeeded");
    res.status(201).send("Pets have been received successfully");
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: error.message });
  }
};

module.exports = { infectedNodeDeclarationReq };
