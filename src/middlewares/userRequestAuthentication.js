const jwt = require("jsonwebtoken");
const authenticationModel = require("../models/AuthenticationModel");

const authenticate = async (req, res, next) => {
  try {
    if (!req.header("Authorization")) {
      throw new Error("Missing Authentication token");
    }
    const token = req.header("Authorization").replace("Bearer ", "");
    //check whether  signature is valid
    const payload = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const authObject = await authenticationModel.findOne({
      authenticationToken: token,
    });
    if (!authObject) {
      throw new Error("Please authenticate.");
    }
    req.authObject = authObject;
    next();
  } catch (error) {
    res.status(401).send({ error: error.message });
  }
};

module.exports = { authenticate };
