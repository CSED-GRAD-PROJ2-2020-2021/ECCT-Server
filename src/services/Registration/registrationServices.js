const crypto = require("crypto");
const UserModel = require("../../models/UserModel");
const AuthenticationModel = require("../../models/Authentication");
const authentication = require("./../../utilities/authentication/Authentication");
const pinCodeManipulation = require("../../utilities/pinCode/pinCodeManipulation");
const encryption = require("./../../utilities/cryptography/Encryption");

const register = async (req, res) => {
  try {
    if (!req.body.phoneNumber) {
      throw new Error("missing phone number");
    }
    phoneNumber = req.body.phoneNumber;
    //phone number validation
    UserModel.PhoneNumberValidation(phoneNumber);
    //check if phone number is already exists and hashing it
    const hashedPhoneNumber = await UserModel.phoneNumberUniqueness(phoneNumber);
    //authentication and pin code generation and sending to UserAuth
    const authenticationToken = authentication.generateAuthToken(hashedPhoneNumber);
    const pinCode = pinCodeManipulation.generatePinCode();
    pinCodeManipulation.sendPinCode(phoneNumber, pinCode);
    const newAuth = new AuthenticationModel({ authenticationToken, pinCode, hashedPhoneNumber });
    await newAuth.save();
    res.status(200).send({ authenticationToken });
  } catch (error) {
    res.status(403).send(error);
  }
};

const userAuthAndRegister = async (req, res) => {
  try {
    if (!req.body.authenticationToken) {
      throw new Error("Missing authentication token ");
    } else if (!req.body.pinCode) {
      throw new Error("Missing pin code");
    }
    const authenticationToken = req.body.authenticationToken;
    const pinCode = req.body.pinCode;
    const UserAuth = await AuthenticationModel.find({ authenticationToken, pinCode });
    if (!UserAuth) {
      throw new Error("Not Authenticated request");
    }
    const hashedPhoneNumber = UserAuth.hashedPhoneNumber;
    await UserAuth.remove();
    //user creation and encryption of data
    const newUser = {
      ID: hashedPhoneNumber,
      UN: false,
      SRE: 0,
      ERSA: 0,
      LEPM: [],
    };
    // generation of private key
    const { key, iv } = encryption.generatePrivateKey();
    const hashedUser = encryption.encryptUser(newUser, key, iv);

    const newUserHashed = new UserModel(hashedUser);
    await newUserHashed.save();
    res.status(201).send({ hashedPhoneNumber, key, iv });
  } catch (error) {
    res.status(401).send(error.body);
  }
};
module.exports = { register, userAuthAndRegister };
