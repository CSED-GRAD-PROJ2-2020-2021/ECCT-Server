const express = require("express");

const infectionDeclarationServices = require("../../services/InfectedNodeDeclaration/InfectionDeclerationServices");

const router = express.Router();

router.post("/infectionDeclaration", infectionDeclarationServices.infectedNodeDeclarationReq);

module.exports = router;
