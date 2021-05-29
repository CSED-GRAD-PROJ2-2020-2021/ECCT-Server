const express = require("express");
const exposureRequestServices = require("../../services/ExposureStatusRequest/exposureRequestServices");
const authentication = require("../../middlewares/requestAuthentication");

const router = express.Router();

router.post("/exposureRequest", authentication.authenticate, exposureRequestServices.exp);

module.exports = router;
