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
      throw new Error("unauthorized request, invalid health authority token");
    }

    // adding upload date
    // infectedNodePets = req.body.infectedNodePets;
    // const uploadDate = dateFormat(new Date(), "isoDate");
    // EListOfPets = infectedNodePets.map((PET) => {
    //   EList.PetValidation(PET);
    //   return { PET, uploadDate };
    // });

    // adding infection pets in Elist table
    for (const pet of req.body.infectionPets) {
      const newInfectionPet = new EList(pet);
      await newInfectionPet.save();
    }
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
