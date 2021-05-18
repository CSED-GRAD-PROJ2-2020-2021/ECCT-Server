const ElistModel = require("../../models/Elist");

const exp = async (req, res) => {
  console.log(req.body);
  UserID = req.body.id;
  //UserPrivteKey = req.body.key;
  UserPETsMetadata = req.body.pets;
  //console.log(UserID, UserPETsMetadata);
  let infectedPets = [];

  // get his id row and check the UN {not done yet}

  await Promise.all(
    UserPETsMetadata.map(async (PETMetaData) => {
      // findOne and deleting {delete not handled yet}
      let result = await ElistModel.findOne({ PET: PETMetaData.PET });
      if (!result) {
        console.log("not found");
      } else {
        infectedPets.push({
          PET: result.PET,
          uploadDate: result.uploadDate,
          rss: PETMetaData.rss,
          meetingDate: PETMetaData.meetingDate,
          duration: PETMetaData.duration,
        });
      }
    })
  );

  //put the result at the LEPM and redirect to another url to calculate the risk score

  console.log(infectedPets);
  return res.status(200).send("PETS received");
};

module.exports = { exp };
