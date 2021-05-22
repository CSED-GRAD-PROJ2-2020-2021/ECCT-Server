const mongoose = require("mongoose");
const crypto = require("crypto");
const Schema = mongoose.Schema;

// {not done yet this database must change to be all strings for encryption}
const userSchema = new Schema({
  ID: {
    type: String,
    required: true,
    unique: true,
  },
  UN: {
    type: String,
    required: true,
  },
  SRE: {
    type: String,
    required: true,
  },
  LEPM: {
    type: [
      {
        PET: String,
        duration: Number,
        rss: Number,
        meetingDate: Date,
        uploadDate: Date,
      },
    ],
  },
  ERSA: {
    type: String,
    required: true,
  },
});

//method to check whether the phone number is valid or not
userSchema.statics.PhoneNumberValidation = (phoneNumber) => {
  if (phoneNumber.match(/^(01\d{9})$/g) === null) {
    throw new Error("Invalid phone number");
  }
  return true;
};

//check if phone number exists
userSchema.statics.phoneNumberUniqueness = async (phoneNumber) => {
  hashedPhoneNumber = crypto.createHash("sha256").update(phoneNumber).digest("hex");
  const user = await userModel.findOne({ ID: hashedPhoneNumber });
  if (user) {
    throw new Error("A user with the same phone number exists !!");
  }
  return hashedPhoneNumber;
};

const userModel = mongoose.model("Users", userSchema);
module.exports = userModel;
