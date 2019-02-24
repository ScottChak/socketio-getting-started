let app = require("http").createServer();
let io = require("socket.io")(app);

function StartServer() {
  let port = 8082;

  io.on("connection", function(socket) {
    console.log("New connection detected");

    socket.on("disconnect", function() {
      console.log("Connection terminated");
    });

    socket.on("connectUser", function(username) {
      console.log(`User connected: ${username}`);
      io.emit("receiveMessage", { content: `${username} has connected` });
    });

    socket.on("disconnectUser", function(username) {
      console.log(`User disconnected: ${username}`);
      io.emit("receiveMessage", { content: `${username} has disconnected` });
    });

    socket.on("sendMessage", function(message) {
      console.log(`New message from ${message.username}: ${message.content}`);
      io.emit("receiveMessage", message);
    });
  });

  console.log(`Starting server on port ${port}...`);
  app.listen(port);
}

module.exports = { Start: StartServer };
