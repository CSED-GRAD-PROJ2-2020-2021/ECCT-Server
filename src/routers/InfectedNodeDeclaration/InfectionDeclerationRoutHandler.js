const express = require("express");

const infectionDeclarationServices = require("../../services/InfectedNodeDeclaration/InfectionDeclerationServices");
const authentication = require("../../middlewares/userRequestAuthentication");

const router = express.Router();

router.post(
  "/infectionDeclaration",
  authentication.authenticate,
  infectionDeclarationServices.infectedNodeDeclarationReq
);

module.exports = router;
