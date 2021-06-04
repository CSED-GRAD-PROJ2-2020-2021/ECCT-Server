const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  try {
    if (!req.header("Authorization")) {
      throw new Error("Missing Authentication token");
    }
    const token = req.header("Authorization").replace("Bearer ", "");
    const HASecret = jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (HASecret != process.env.HEALTH_AUTHORITY_SECRET) {
      throw new Error("Please Authenticate !");
    }
    next();
  } catch (error) {
    res.status(401).send({ error: error.message });
  }
};

module.exports = { authenticate };
