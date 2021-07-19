const UserModel = require("../../src/models/UserModel");
const ElistModel = require("../../src/models/Elist");
const AuthenticationModel = require("../../src/models/AuthenticationModel");
const HealthAuthTokens = require("../../src/models/HealthAuthTokens");

const setupDatabase = async () => {
  await UserModel.deleteMany();
  await ElistModel.deleteMany();
  await AuthenticationModel.deleteMany();
  await HealthAuthTokens.deleteMany();
};

const reg1Object1 = {
  phoneNumber: "01019213692",
};
const reg1Object2 = {
  phoneNumber: "01019213693",
};

const reg2Object1 = {
  pinCode: "1234",
};

const reg2Object2 = {
  pinCode: "1235",
};

const infecDecObj1 = {
  healthAuthorityToken: "",
  infectionPets: [
    {
      PET: "mostafa farragg",
      duration: "15",
      RSSI: "-60",
      meetingDate: "2021-04-26T00:00:00.000Z",
      uploadDate: "2021-04-26T00:00:00.000Z",
    },
    {
      PET: "youssif fathy",
      duration: "15",
      RSSI: "-60",
      meetingDate: "2021-04-26T00:00:00.000Z",
      uploadDate: "2021-04-26T00:00:00.000Z",
    },
    {
      PET: "karim",
      duration: "15",
      RSSI: "-60",
      meetingDate: "2021-04-26T00:00:00.000Z",
      uploadDate: "2021-04-26T00:00:00.000Z",
    },
  ],
};

module.exports = {
  setupDatabase,
  reg1Object1,
  reg1Object2,
  reg2Object1,
  reg2Object2,
  infecDecObj1,
};
