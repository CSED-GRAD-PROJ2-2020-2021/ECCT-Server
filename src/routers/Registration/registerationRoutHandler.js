const express = require("express");
const authentication = require("../../middlewares/requestAuthentication");
const registrationServices = require("../../services/Registration/registrationServices");
// const JWT = require("../../utilities/authentication/JWT");
// const jwt = require("jsonwebtoken");

const router = express.Router();

router.post("/registration", registrationServices.register);
router.post("/regAndAuth", authentication.authenticate, registrationServices.userAuthAndRegister);
router.get("/generateNewAuthToken", registrationServices.createNewAuthToken);
// router.post("/test", (req, res) => {
//   const token = JWT.generateAuthToken();
//   console.log(token);
//   res.send("Test");
// });

module.exports = router;
