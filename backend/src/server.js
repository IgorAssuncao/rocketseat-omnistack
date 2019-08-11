const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const routes = require("./routes");

const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);

const connectedUsers = {};

io.on("connection", socket => {
  const { userId } = socket.handshake.query;
  connectedUsers[userId] = socket.id;
});

mongoose.connect(
  "mongodb+srv://tindev:tindev@rocketseat-omnistack-1gw81.mongodb.net/tindev?retryWrites=true&w=majority",
  { useNewUrlParser: true }
);

app.use((request, response, next) => {
  request.io = io;
  request.connectedUsers = connectedUsers;

  return next();
});

app.use(cors());
app.use(express.json());
app.use(routes);

server.listen(3001);
