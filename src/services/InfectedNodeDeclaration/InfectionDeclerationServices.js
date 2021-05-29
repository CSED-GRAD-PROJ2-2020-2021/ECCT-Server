const EList = require("../../models/Elist");
const AuthTokensModel = require("../../models/HealthAuthTokens");
const dateFormat = require("dateformat");

const infectedNodeDeclarationReq = async (req, res) => {
  try {
    if (!req.body.healthAuthorityToken) {
      throw new Error("Missing health Authority token");
    } else if (!req.body.infectedNodePets) {
      throw new Error("Missing infected node pets");
    }
    // validate health authority token
    const healthAuthorityToken = req.body.healthAuthorityToken;
    const authorized = await AuthTokensModel.findOneAndDelete({ HAToken: healthAuthorityToken });
    if (!authorized) {
      throw new Error("unauthorized request, invalid health authority token");
    }

    //creation of array of object where each object has two fields: PET and Upload Time
    infectedNodePets = req.body.infectedNodePets;
    const uploadDate = dateFormat(new Date(), "isoDate");
    EListOfPets = infectedNodePets.map((PET) => {
      EList.PetValidation(PET);
      return { PET, uploadDate };
    });

    await EList.insertMany(EListOfPets, { ordered: false }).catch((err) => {
      throw new Error("error during inserting pets in database");
    });
    res.status(200).send("request has been handled successfully");
  } catch (error) {
    console.log(error);
    res.status(400).send(error.message);
  }

  // 3- catching the error is wrong {need to enhance}
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
    res.status(400).send(error.message);
  }
};

module.exports = { infectedNodeDeclarationReq, receiveHealthAuthorityTokens };
