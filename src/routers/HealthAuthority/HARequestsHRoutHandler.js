const express = require("express");
const HAServices = require("../../services/HealthAuthority/HAServices");
const HAAuthentication = require("../../middlewares/healtAuthorityAuthentication");

const router = express.Router();

router.post("/addNewHATokens", HAServices.addNewTokens);

module.exports = router;
