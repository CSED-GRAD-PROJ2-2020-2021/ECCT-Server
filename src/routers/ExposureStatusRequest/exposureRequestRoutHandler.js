const express = require("express");
const exposureRequestServices = require("../../services/ExposureStatusRequest/exposureRequestServices");
const authentication = require("../../middlewares/userRequestAuthentication");

const router = express.Router();

router.post(
  "/exposureRequest",
  // authentication.authenticate,
  exposureRequestServices.exposureCheckRequest
);

module.exports = router;
