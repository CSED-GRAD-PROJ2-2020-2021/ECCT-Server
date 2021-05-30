const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AuthenticationSchema = new Schema({
  authenticationToken: {
    type: String,
    required: true,
    unique: true,
  },
  pinCode: {
    type: String,
    required: true,
  },
  hashedPhoneNumber: {
    type: String,
  },
  isRegistered: {
    type: Boolean,
    default: false,
  },
});

const Authentication = mongoose.model("Authentication", AuthenticationSchema);
module.exports = Authentication;
