const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/Grad-Proj-DB", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

//test connection
const connection = mongoose.connection;
connection.on("error", console.error.bind(console, "Connection Error!"));
connection.once("open", () => {
  console.log("Database Connection is opened");
});
