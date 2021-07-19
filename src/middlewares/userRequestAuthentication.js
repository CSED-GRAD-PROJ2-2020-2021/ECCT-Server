const jwt = require("jsonwebtoken");
const AuthenticationModel = require("../models/AuthenticationModel");
const jwtManipulator = require("../utilities/authentication/JWT");

const authenticate = async (req, res, next) => {
  var token = "";
  var authObject;
  try {
    if (!req.header("Authorization")) {
      throw new Error("Missing Authentication token");
    }

    token = req.header("Authorization").replace("Bearer ", "");
    //check whether signature is valid
    jwt.verify(token, process.env.JWT_SECRET_KEY);
    authObject = await AuthenticationModel.findOne({
      authenticationToken: token,
    });
    if (!authObject) {
      throw new Error("Please authenticate.");
    }
    req.authObject = authObject;
    next();
  } catch (error) {
    if (error.message == "jwt expired") {
      const auth = await AuthenticationModel.findOneAndDelete({
        authenticationToken: token,
      });
      if (!auth) {
        res.status(403).send({ error: "Please authenticate." });
      }
      const newAuthToken = jwtManipulator.generateAuthToken(
        true,
        undefined,
        Math.floor(Date.now() / 1000) + 60 * 60 // one hour for now
      );
      const newAuth = new AuthenticationModel({
        authenticationToken: newAuthToken,
        pinCode: auth.pinCode,
        hashedPhoneNumber: auth.hashedPhoneNumber,
        isRegistered: auth.isRegistered,
        expirationStartTime: auth.expirationStartTime,
      });
      await newAuth.save();
      req.authObject = newAuth;
      res.setHeader("Authorization", "Bearer " + newAuthToken);
      next();
    } else {
      res.status(403).send({ error: error.message });
    }
  }
};

module.exports = { authenticate };
