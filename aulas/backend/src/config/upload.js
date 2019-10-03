const multer = require("multer");
const path = require("path");
module.exports = {
  storage: multer.diskStorage({
    //indica o nivel da pasta
    //ao colocar o .. entre aspas, o modulo multer, se encarrega
    //de usar o caminho correto de acordo com o sistema operacional
    //e resolver o diretorio de destino, nesse caso, o dir uploads
    destination: path.resolve(__dirname, "..", "..", "uploads"),
    filename: (req, file, cb) => {
      //pega a extensao do arquivo
      const ext = path.extname(file.originalname);
      const name = path.basename(file.originalname, ext);
      cb(null, `${name}-${Date.now()}${ext}`);
    }
  })
};
