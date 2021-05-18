const express = require("express");

const registrationServices = require("../../services/Registration/registrationServices");

const router = express.Router();

router.post("/registration", registrationServices.register);
router.post("/regAndAuth", registrationServices.userAuthAndRegister);

module.exports = router;
