const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AuthSchema = new Schema({
  bearerToken: {},
  id: {}
});

module.exports = Auth = mongoose.model("authTokens", AuthSchema);
