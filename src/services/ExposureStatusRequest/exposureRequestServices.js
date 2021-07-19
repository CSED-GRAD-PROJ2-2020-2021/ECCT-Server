const ElistModel = require("../../models/Elist");
const UserModel = require("../../models/UserModel");
const RiskScore = require("../../utilities/riskScore/compinedRiskScore");
const encryption = require("../../utilities/cryptography/Encryption");
const decryption = require("../../utilities/cryptography/Decryption");

const exposureCheckRequest = async (req, res) => {
  try {
    // validation of request
    if (!req.body.id) {
      throw new Error("Missing user ID");
    }
    if (!req.body.key || !req.body.iv) {
      throw new Error("Missing pair of key");
    }
    if (!req.body.exposureTestPets) {
      throw new Error("exposureTestPets missing");
    }

    // user ID
    const UserID = req.body.id;

    // user encryption key pair: (key, iv)
    const key = req.body.key;
    const iv = req.body.iv;

    // user's exposure test pets
    const exposureTestPets = req.body.exposureTestPets;
    console.log("-----------------------");
    console.log(exposureTestPets);
    console.log("-----------------------");

    // check user id
    const User = await UserModel.findOne({ ID: UserID });

    if (!User) {
      throw new Error("ID is Wrong");
    }

    /*      danger do not try :(      */

    // decrypt User
    const decryptedUser = decryption.decryptUser(User, key, iv);

    // current time in second
    const nowInSecond = new Date().getTime() / 1000;

    if (nowInSecond - decryptedUser.SRE < 1 /** 3500 which be as an hour */) {
      throw new Error("Too much requests");
    }

    // check if user is positive
    if (decryptedUser.UN === true) {
      return res.status(200).send({ isAtRisk: decryptedUser.ERSA });

      // return or i can throw errors
    }

    // the result of matching user pets with Elist's pets
    var matchedPets = [];
    // get his id row and check the UN {not done yet}
    for (const pet of exposureTestPets) {
      let matched = await ElistModel.findOne({ PET: pet });
      if (matched) {
        matchedPets.push({
          PET: pet,
          uploadDate: matched.uploadDate.toISOString(),
          meetingDate: matched.meetingDate.toISOString(),
          exposureDate: new Date().toISOString(),
          RSSI: Math.abs(matched.RSSI),
          duration: matched.duration,
        });
      }
    }

    decryptedUser.LEPM = [/*...decryptedUser.LEPM,*/ ...matchedPets];

    //console.log(decryptedUser.LEPM);
    const combinedRiskScore = RiskScore.combinedRiskScore(decryptedUser.LEPM);

    //console.log(combinedRiskScore);

    const isAtRisk = RiskScore.classificationOfCombinedRiskScore(combinedRiskScore);
    // update entries {SRE time of last exposure, ERSA for riskScore, UN if user is in danger} in the user
    decryptedUser.SRE = nowInSecond;
    decryptedUser.ERSA = isAtRisk;
    decryptedUser.UN = isAtRisk == 1 ? true : false;
    const encryptedUser = encryption.encryptUser(decryptedUser, key, iv);
    await UserModel.findOneAndReplace({ ID: UserID }, encryptedUser);
    console.log("exposure request succeeded");
    res.status(200).send({ isAtRisk });
  } catch (error) {
    console.log(error.message);
    res.status(400).send({ error: error.message });
  }
};

module.exports = { exposureCheckRequest };
