const Booking = require("../models/Booking");
module.exports = {
  async store(req, res) {
    const { user_id } = req.headers;
    const { spot_id } = req.params;
    const { date } = req.body;

    const booking = await Booking.create({
      user: user_id,
      spot: spot_id,
      date
    });

    await booking
      .populate("spot")
      .populate("user")
      .execPopulate();

    //verifica se o dono do spot estah conectado tb
    const ownerSocket = req.connectedUsers[booking.spot.user];

    if (ownerSocket) {
      //recupera a conexao do socket
      //e envia a mensagem para o owner
      req.io.to(ownerSocket).emit("booking_request", booking);
    }

    return res.json(booking);
  }
};
