const express = require("express");
const HAServices = require("../../services/HealthAuthority/HAServices");
const HAAuthentication = require("../../middlewares/healtAuthorityAuthentication");

const router = express.Router();

router.get("/getNewToken", HAAuthentication.authenticate, HAServices.getTokens);

module.exports = router;
