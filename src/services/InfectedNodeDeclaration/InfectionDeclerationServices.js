const EList = require("../../models/Elist");
const dateFormat = require("dateformat");

const infectedNodeDeclarationReq = async (req, res) => {
  try {
    //console.log(req.body);
    // 1- validation of healthauthourity token {not done yet}
    // 2- validation of the shape of joson requset {not done yet}
    if (!req.body.healthAuthorityToken) {
      throw new Error("Missing health Authority token");
    } else if (!req.body.req.body.infectedNodePets) {
      throw new Error("Missing infected node pets");
    }
    healthAuthorityToken = req.body.healthAuthorityToken;
    infectedNodePets = req.body.infectedNodePets;
    uploadDate = dateFormat(new Date(), "isoDate");
    //console.log(infectedNodePets);
    EListOfPets = infectedNodePets.map((PET) => {
      EList.PetValidation(PET);
      return { PET, uploadDate };
    });

    //console.log(EListOfPets);
    await EList.insertMany(EListOfPets, { ordered: false }).catch((err) => {
      throw new Error("error during inserting pets in database");
    });
  } catch (error) {
    res.status(400).send(error.body);
  }

  // 3- catching the error is wrong {need to enhance}

  res.status(200).send("request has been handled successfully");
};

module.exports = { infectedNodeDeclarationReq };
