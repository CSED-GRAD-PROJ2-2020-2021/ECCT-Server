const express = require("express");
require("dotenv").config({ path: "./.env" });
require("./DBConnection/DBConnection");

const ERRouter = require("./routers/ExposureStatusRequest/exposureRequestRoutHandler");
const InfectionDecRouter = require("./routers/InfectedNodeDeclaration/InfectionDeclerationRoutHandler");
const RegistrationRouter = require("./routers/Registration/registerationRoutHandler");
const HATokensRouter = require("./routers/HealthAuthority/HARequestsHRoutHandler");

const app = express();

app.use(express.json());

app.use(ERRouter);
app.use(InfectionDecRouter);
app.use(RegistrationRouter);
app.use(HATokensRouter);

module.exports = app;
