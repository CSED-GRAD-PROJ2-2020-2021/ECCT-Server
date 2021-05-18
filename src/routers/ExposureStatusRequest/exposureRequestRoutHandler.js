const express = require("express");
const exposureRequestServices = require("../../services/ExposureStatusRequest/exposureRequestServices");

const router = express.Router();

router.post("/exposureRequest", exposureRequestServices.exp);

module.exports = router;
