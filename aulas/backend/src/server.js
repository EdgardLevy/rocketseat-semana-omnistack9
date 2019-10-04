const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");
const cors = require("cors");
const path = require("path");
const socketio = require("socket.io");
const http = require("http");
require("dotenv").config();

const app = express();
const server = http.Server(app);
const io = socketio(server);
console.log(process.env.MONGO_URL);

mongoose.connect(`${process.env.MONGO_URL}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const connectedUsers = {};

io.on("connection", socket => {
  //id unico do socket
  console.log(socket.handshake.query);
  console.log("Usuário conectado", socket.id);

  const { user_id } = socket.handshake.query;
  //vinculo do usuario conectado com a conexao do socket
  connectedUsers[user_id] = socket.id;
});
//middleware
app.use((req, res, next) => {
  //passa a conexao do socket do io para todas as rotas/modules
  req.io = io;
  req.connectedUsers = connectedUsers;
  return next();
});

app.use(cors());
app.use(express.json());
//possibilita o servidor servir arquivos estaticos
app.use("/files", express.static(path.resolve(__dirname, "..", "uploads")));
app.use(routes);

//app.listen(3333);
server.listen(3333);
