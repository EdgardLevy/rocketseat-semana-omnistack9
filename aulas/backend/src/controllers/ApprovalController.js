const Booking = require("../models/Booking");

module.exports = {
  async store(req, res) {
    const { booking_id } = req.params;
    //localiza o booking e carrega os dados do spot
    const booking = await Booking.findById(booking_id).populate("spot");
    //altera o booking como aprovada
    booking.approved = true;
    await booking.save();

    //verifica se o dono do spot estah conectado tb
    const bookingUserSocket = req.connectedUsers[booking.user];

    if (bookingUserSocket) {
      //recupera a conexao do socket
      //e envia a mensagem para o socket do usuario
      req.io.to(bookingUserSocket).emit("booking_response", booking);
    }

    return res.json(booking);
  }
};
