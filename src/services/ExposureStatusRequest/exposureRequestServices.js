const ElistModel = require("../../models/Elist");

const exposureCheckRequest = async (req, res) => {
  try {
    // validation of request
    if (!req.body.id) {
      throw new Error("Missing user ID");
    }
    if (!req.body.key || !req.body.iv) {
      throw new Error("Missing pair of key");
    }
    // user ID
    const UserID = req.body.id;
    // user encryption key pair: (key, iv)
    const key = req.body.key;
    const iv = req.body.iv;

    // user's exposure test pets
    const exposureTestPets = req.body.exposureTestPets;

    // the result of matching user pets with Elist's pets
    var matchedPets = [];
    // get his id row and check the UN {not done yet}
    for (const pet of exposureTestPets) {
      const matched = await ElistModel.findOne({ PET: pet });
      if (matched) {
        matchedPets.push(matched);
      }
    }

    console.log(matchedPets);
    //put the result at the LEPM and redirect to another url to calculate the risk score
    res.status(200).send("Risk score");
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

module.exports = { exposureCheckRequest };
