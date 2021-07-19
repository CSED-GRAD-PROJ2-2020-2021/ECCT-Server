const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EListSchema = new Schema({
  PET: {
    type: String,
    required: true,
  },
  uploadDate: {
    type: Date,
    required: true,
  },
  meetingDate: {
    type: Date,
    required: true,
  },
  RSSI: {
    type: String,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
});
EListSchema.statics.PetValidation = (pet) => {
  if (pet.length != 64) {
    throw new Error("invalid pet");
  }
  return true;
};

const EList = mongoose.model("EList", EListSchema);
module.exports = EList;
