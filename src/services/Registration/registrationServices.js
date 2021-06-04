const crypto = require("crypto");
const UserModel = require("../../models/UserModel");
const AuthenticationModel = require("../../models/AuthenticationModel");
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

    const authenticationToken = jasonWebToken.generateAuthToken(
      true,
      undefined,
      Math.floor(Date.now() / 1000) + 60 * 60
    );
    const pinCode = "1234"; //pinCodeManipulation.generatePinCode();
    //pinCodeManipulation.sendPinCode(phoneNumber, pinCode);
    const newAuth = new AuthenticationModel({ authenticationToken, pinCode, hashedPhoneNumber });
    await newAuth.save();
    console.log("registration 1 success");
    res.status(200).send({ authenticationToken });
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
    // delete any relation between the authentication token and user phone number
    req.authObject.hashedPhoneNumber = "";
    await req.authObject.save();
    console.log("registration 2 success");
    res.status(201).send({ id: req.authObject.hashedPhoneNumber, key, iv });
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: error.message });
  }
};

const createNewAuthToken = async (req, res) => {
  try {
    if (!req.body.authenticationToken) {
      throw new Error("Missing expired authentication token");
    }
    // check if the authentication token is expired or not
    if (!jasonWebToken.isExpired(req.body.authenticationToken)) {
      throw new Error("Authentication token is not expired yet");
    }
    const expiredAuthToken = req.body.authenticationToken;
    // check if the the token is a valid user auth token
    const auth = await AuthenticationModel.findOneAndDelete({
      authenticationToken: expiredAuthToken,
    });
    if (!auth) {
      throw new Error("Please Authenticate");
    }

    const newAuthToken = jasonWebToken.generateAuthToken();
    const newAuth = new AuthenticationModel({
      authenticationToken: newAuthToken,
      pinCode: auth.pinCode,
      hashedPhoneNumber: auth.hashedPhoneNumber,
      isRegistered: auth.isRegistered,
    });
    await newAuth.save();
    res.status(201).send({ authenticationToken: newAuthToken });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};
module.exports = { register, userAuthAndRegister, createNewAuthToken };
