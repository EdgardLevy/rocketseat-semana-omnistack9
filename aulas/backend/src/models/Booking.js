const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema({
  date: String,
  approved: Boolean,

  user: {
    type: mongoose.Schema.Types.ObjectId,
    /*referencia ao model User */
    ref: "User"
  },
  spot: {
    type: mongoose.Schema.Types.ObjectId,
    /*referencia ao model Spot */
    ref: "Spot"
  }
});
//exporta o model com o seu schema (estrutura)
module.exports = mongoose.model("Booking", BookingSchema);
