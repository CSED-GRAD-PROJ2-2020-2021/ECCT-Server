const jwt = require("jsonwebtoken");
const authenticationModel = require("../models/Authentication");

const authenticate = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const authObject = await authenticationModel.findOne({
      hashedPhoneNumber: decoded.hashedPhoneNumber,
      authenticationToken: token,
    });
    if (!authObject) {
      throw new Error();
    }
    req.authObject = authObject;
    next();
  } catch (error) {
    res.status(401).send({ error: "Please authenticate." });
  }
};

module.exports = { authenticate };
