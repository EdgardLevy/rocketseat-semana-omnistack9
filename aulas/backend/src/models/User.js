const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: String
});
//exporta o usuario com o seu schema (estrutura)
module.exports = mongoose.model("User", UserSchema);
