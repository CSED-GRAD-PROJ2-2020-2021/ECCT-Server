const express = require("express");
const HAServices = require("../../services/HealthAuthority/HAServices");
const HAAuthentication = require("../../middlewares/healtAuthorityAuthentication");

const router = express.Router();

router.get("/getNewTokens", HAAuthentication.authenticate, HAServices.addNewTokens);

module.exports = router;
