const mongoose = require("mongoose");

const SpotSchema = new mongoose.Schema({
  thumbnail: String,
  company: String,
  price: Number,
  /*array de strings*/
  techs: [String],
  /*usuario que criou o spot*/
  user: {
    type: mongoose.Schema.Types.ObjectId,
    /*referencia ao model User */
    ref: "User"
  }
});
//exporta o usuario com o seu schema (estrutura)
module.exports = mongoose.model("Spot", SpotSchema);
