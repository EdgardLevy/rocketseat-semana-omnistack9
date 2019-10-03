//index, show, store, update, destroy
const User = require("../models/User");
module.exports = {
  async store(req, res) {
    //return res.json({ message: "Hello World" });
    const { email } = req.body;
    //const user = await User.create({ email });

    let user = await User.findOne({ email });
    //soh cria o usuario se nao existir no banco
    if (!user) user = await User.create({ email });

    return res.json(user);
  }
};
