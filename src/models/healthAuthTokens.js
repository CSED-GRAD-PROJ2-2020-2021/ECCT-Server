const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const healthAuthTokensSchema = new Schema({
  HAToken: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
});

const healthAuthTokensModel = mongoose.model("healthAuthTokens", healthAuthTokensSchema);
module.exports = healthAuthTokensModel;
