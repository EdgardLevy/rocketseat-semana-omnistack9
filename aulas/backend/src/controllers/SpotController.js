//index, show, store, update, destroy
const Spot = require("../models/Spot");
const User = require("../models/User");
module.exports = {
  async index(req, res) {
    const { tech } = req.query;
    const spots = await Spot.find({ techs: tech });
    return res.json(spots);
  },

  async store(req, res) {
    const { filename } = req.file;
    const { company, techs, price } = req.body;
    const { user_id } = req.headers;

    //checa pra ver se o usuario existe
    const user = await User.findById(user_id);

    if (!user) {
      return res.status(400).json({ error: "User does not exists" });
    }

    const spot = await Spot.create({
      user: user_id,
      thumbnail: filename,
      company,
      /* como o array pode conter espacos entre os elementos separados por virgula
      entao executa um map para criar um array com elementos sem virgulas*/
      techs: techs.split(",").map(tech => tech.trim()),
      price
    });

    return res.json(spot);
  }
};
