const express = require("express");
require("./DBConnection/DBConnection");

const ERRouter = require("./routers/ExposureStatusRequest/exposureRequestRoutHandler");
const InfectionDecRouter = require("./routers/InfectedNodeDeclaration/InfectionDeclerationRoutHandler");
const RegistrationRouter = require("./routers/Registration/registerationRoutHandler");

const app = express();

app.use(express.json());

app.use(ERRouter);
app.use(InfectionDecRouter);
app.use(RegistrationRouter);

app.get("/test", (req, res) => {
  res.status(200).send("welcome");
});

module.exports = app;
