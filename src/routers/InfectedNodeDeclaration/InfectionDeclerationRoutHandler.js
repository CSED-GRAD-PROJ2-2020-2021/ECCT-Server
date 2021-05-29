const express = require("express");

const infectionDeclarationServices = require("../../services/InfectedNodeDeclaration/InfectionDeclerationServices");
const authentication = require("../../middlewares/requestAuthentication");

const router = express.Router();

router.post(
  "/infectionDeclaration",
  authentication.authenticate,
  infectionDeclarationServices.infectedNodeDeclarationReq
);
router.post("/healthAuthorityCode", infectionDeclarationServices.receiveHealthAuthorityTokens);

module.exports = router;
