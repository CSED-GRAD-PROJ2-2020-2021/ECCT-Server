const app = require("./app");
const fs = require("fs");
var https = require("https");

const credentials = {
  key: fs.readFileSync("key.pem"),
  cert: fs.readFileSync("cert.pem"),
};

const httpsServer = https.createServer(credentials, app);

const port = process.env.PORT || 3000;

httpsServer.listen(port, () => {
  console.log("Server is up on port ", port);
});
