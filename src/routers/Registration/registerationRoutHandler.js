const express = require("express");
const authentication = require("../../middlewares/userRequestAuthentication");
const registrationServices = require("../../services/Registration/registrationServices");

const router = express.Router();

router.post("/registration", registrationServices.register);
router.post("/regAndAuth", authentication.authenticate, registrationServices.userAuthAndRegister);

module.exports = router;
