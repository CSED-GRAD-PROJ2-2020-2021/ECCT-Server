const EList = require("../../models/Elist");
const dateFormat = require("dateformat");

const infectedNodeDeclarationReq = (req, res) => {
  console.log(req.body);
  // 1- validation of healthauthourity token {not done yet}

  // 2- validation of the shape of joson requset {not done yet}

  healthAuthorityToken = req.body.healthAuthorityToken;
  infectedNodePets = req.body.infectedNodePets;
  uploadDate = dateFormat(new Date(), "isoDate");
  //console.log(infectedNodePets);
  try {
    EListOfPets = infectedNodePets.map((PET) => {
      EList.PetValidation(PET);
      return { PET, uploadDate };
    });
  } catch (error) {
    return res.status(400).send("invalid pet");
  }

  //console.log(EListOfPets);
  EList.insertMany(EListOfPets, { ordered: false }).catch((err) =>
    console.log("error infected node declaration database")
  );

  // 3- catching the error is wrong {need to enhance}

  res.status(200).send();
};

module.exports = { infectedNodeDeclarationReq };
