const app = require("./app");
const fs = require("fs");
var https = require("https");

const options = {
  key: fs.readFileSync("key.pem"),
  cert: fs.readFileSync("cert.pem"),
  requestCert: true,
  rejectUnauthorized: false,
  ca: [fs.readFileSync("cert.pem")],
};

const httpsServer = https.createServer(options, app);

const port = process.env.PORT || 3000;

httpsServer.listen(port, () => {
  console.log("Server is up on port ", port);
});

// const port = process.env.PORT || 3000;

// app.listen(port, () => {
//   console.log("Server is up on port ", port);
// });
