const crypto = require("crypto");
const UserModel = require("../../models/UserModel");
const AuthenticationModel = require("../../models/Authentication");
const authentication = require("./../Authentication");

const register = async (req, res) => {
  try {
    phoneNumber = req.body.phoneNumber;
    UserModel.PhoneNumberValidation(phoneNumber);
    const hashedPhoneNumber = await UserModel.phoneNumberUniqueness(phoneNumber);
    const authenticationToken = authentication.generateAuthToken(hashedPhoneNumber);
    //pincode generation
    const pinCode = 123;
    const newAuth = new AuthenticationModel({ authenticationToken, pinCode, hashedPhoneNumber });
    await newAuth.save();
  } catch (error) {
    res.status(403).send(error.body);
  }
  res.status(200).send({ authenticationToken });
};

const userAuthAndRegister = async (req, res) => {
  try {
    const authenticationToken = req.body.authenticationToken;
    const pinCode = req.pinCode;
    const UserAuth = await AuthenticationModel.find({ authenticationToken, pinCode });
    if (!UserAuth) {
      throw new Error("Not Authenticated request");
    }
    const hashedPhoneNumber = UserAuth.hashedPhoneNumber;
    await UserAuth.remove();

    //user creation
    const newUser = new UserModel({
      ID: hashedPhoneNumber,
      UN: false,
      SRE: 0,
      ERSA: 0,
    });
    await newUser.save();
  } catch (error) {
    res.status(401).send(error.body);
  }
  res.status(201).send("User registered successfully");
};

module.exports = { register };
