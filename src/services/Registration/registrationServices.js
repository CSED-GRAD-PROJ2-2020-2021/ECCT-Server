const crypto = require("crypto");
const UserModel = require("../../models/UserModel");
const AuthenticationModel = require("../../models/Authentication");
const jasonWebToken = require("../../utilities/authentication/JWT");
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
    // it throws error within the function if the number exists
    const hashedPhoneNumber = await UserModel.phoneNumberUniqueness(phoneNumber);
    //check if the user previously sent a request to sign up
    const prevAuth = await AuthenticationModel.findOne({ hashedPhoneNumber: hashedPhoneNumber });
    if (prevAuth) {
      throw new Error("A request has been already sent");
    }
    //creation of JWT using hashed phone number
    const jwtPayload = {
      hashedPhoneNumber: hashedPhoneNumber,
    };
    const authenticationToken = jasonWebToken.generateAuthToken(jwtPayload);
    const pinCode = "1234"; //pinCodeManipulation.generatePinCode();
    //pinCodeManipulation.sendPinCode(phoneNumber, pinCode);
    const newAuth = new AuthenticationModel({ authenticationToken, pinCode, hashedPhoneNumber });
    await newAuth.save();

    res.status(200).send({ authenticationToken, pinCode });
  } catch (error) {
    res.status(403).send({ error: error.message });
  }
};

const userAuthAndRegister = async (req, res) => {
  try {
    if (!req.body.pinCode) {
      throw new Error("Missing pin code");
    }
    // check if the user is trying to register again after successful registration
    if (req.authObject.isRegistered) {
      throw new Error("the user registered successfully previously");
    }
    const pinCode = req.authObject.pinCode;
    // validate pin code received from user to the code stored in user record
    if (pinCode != req.body.pinCode) {
      throw new Error("wrong pincode, please resend the correct pincode");
    }

    // creation of user data
    const newUser = {
      ID: req.authObject.hashedPhoneNumber,
      UN: false,
      SRE: 0,
      ERSA: 0,
      LEPM: [],
    };
    // generation of private key and encryption of user data
    const { key, iv } = encryption.generatePrivateKey();
    const hashedUser = encryption.encryptUser(newUser, key, iv);
    const newUserHashed = new UserModel(hashedUser);
    await newUserHashed.save();
    // assign the completion of user registration process
    req.authObject.isRegistered = true;
    await req.authObject.save();
    res.status(201).send({ authenticationToken: req.authObject.authenticationToken, key, iv });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};
module.exports = { register, userAuthAndRegister };
