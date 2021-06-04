const express = require("express");
const authentication = require("../../middlewares/userRequestAuthentication");
const registrationServices = require("../../services/Registration/registrationServices");
// const JWT = require("../../utilities/authentication/JWT");
// const jwt = require("jsonwebtoken");

const router = express.Router();

router.post("/registration", registrationServices.register);
router.post("/regAndAuth", authentication.authenticate, registrationServices.userAuthAndRegister);
router.get("/generateNewAuthToken", registrationServices.createNewAuthToken);
// router.get("/test", (req, res) => {
//   const token = JWT.generateAuthToken();
//   console.log(token);
//   res.send({ token });
//   try {
//     jwt.verify(
//       "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2MjI2NTUxNzAsImRhdGEiOiI5dkloRXpJczhtbkozaVl0ZDlYOHpTTHdNRTBTZTgiLCJpYXQiOjE2MjI2NTE1NzB9.GAGp12icDO0EhB5VQwRTw17gQaxCnfat_hyBMAy-AUw",
//       process.env.JWT_SECRET_KEY
//     );
//     res.send("test");
//   } catch (error) {
//     res.status(403).send({ error: error.message });
//   }
// });

module.exports = router;
