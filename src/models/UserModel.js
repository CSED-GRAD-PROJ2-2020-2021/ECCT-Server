const mongoose = require("mongoose");
const crypto = require("crypto");
const Schema = mongoose.Schema;

// {not done yet this database must change to be all strings for encryption}
const IDTableSchema = new Schema({
  ID: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  UN: {
    type: Boolean,
    required: true,
  },
  SRE: {
    type: Number,
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
    type: Number,
    required: true,
  },
});

//method to check whether the phone number is valid or not
IDTableSchema.statics.PhoneNumberValidation = (phoneNumber) => {
  if (phoneNumber.match(/^(01\d{9})$/g) === null) {
    throw new Error("Invalid phone number");
  }
  return true;
};

//check if phone number exists
IDTableSchema.statics.phoneNumberUniqueness = async (phoneNumber) => {
  hashedPhoneNumber = crypto.createHash("sha256").update(phoneNumber).digest("hex");

  const user = await IDTable.findOne({ ID: hashedPhoneNumber });
  if (user) {
    throw new Error("A user with the same phone number exists !!");
  }
  return hashedPhoneNumber;
};

const IDTable = mongoose.model("Users", IDTableSchema);
module.exports = IDTable;
