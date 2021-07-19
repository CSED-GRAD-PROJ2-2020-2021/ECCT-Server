const express = require("express");
const authentication = require("../../middlewares/userRequestAuthentication");
const registrationServices = require("../../services/Registration/registrationServices");

const router = express.Router();

router.post("/registration", registrationServices.register);
router.post("/regAndAuth", authentication.authenticate, registrationServices.userAuthAndRegister);
router.get("/test", (req, res) => {
  // if (req.client.authorized) res.send("accepted");
  // else res.send("denied");
  // res.send(Date.now().toString());
});

module.exports = router;
