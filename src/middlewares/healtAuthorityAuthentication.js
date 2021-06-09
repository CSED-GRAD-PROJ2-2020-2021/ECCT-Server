const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  try {
    if (!req.header("Authorization")) {
      throw new Error("Missing Authentication token");
    }
    const HASecret = req.header("Authorization").replace("Bearer ", "");
    if (HASecret != process.env.HEALTH_AUTHORITY_SECRET) {
      throw new Error("Please authenticate.");
    }
    next();
  } catch (error) {
    res.status(401).send({ error: error.message });
  }
};

module.exports = { authenticate };
