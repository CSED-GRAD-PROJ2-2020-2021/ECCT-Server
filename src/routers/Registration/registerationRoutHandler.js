const express = require("express");
const authentication = require("../../middlewares/requestAuthentication");
const JWT = require("../../utilities/authentication/JWT");
const jwt = require("jsonwebtoken");

const registrationServices = require("../../services/Registration/registrationServices");

const router = express.Router();

router.post("/registration", registrationServices.register);
router.post("/regAndAuth", authentication.authenticate, registrationServices.userAuthAndRegister);
router.post("/test", authentication.authenticate, (req, res) => {
  res.send("Test");
});

module.exports = router;
