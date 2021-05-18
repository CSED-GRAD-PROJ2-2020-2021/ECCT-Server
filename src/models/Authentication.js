const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AuthenticationSchema = new Schema({
  authenticationToken: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  pinCode: {
    type: String,
    required: true,
  },
  hashedPhoneNumber: {
    type: String,
    required: true,
  },
});

const Authentication = mongoose.model("Authentication", AuthenticationSchema);
module.exports = Authentication;
