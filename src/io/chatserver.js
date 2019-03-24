let io = require("socket.io");

let messageId = 0;

function RegisterSocket(socket, server) {
  socket.on("disconnect", function() {
    console.log("Connection terminated");
  });

  socket.on("connectUser", function(username) {
    console.log(`User connected: ${username}`);
    server.emit("receiveMessage", { id: messageId++, message: { content: `${username} has connected` } });
  });

  socket.on("disconnectUser", function(username) {
    console.log(`User disconnected: ${username}`);
    server.emit("receiveMessage", { id: messageId++, message: { content: `${username} has disconnected` } });
  });

  socket.on("sendMessage", function(message) {
    console.log(`New message from ${message.username}: ${message.content}`);
    server.emit("receiveMessage", { id: messageId++, message });
  });
}

function ConfigureServer(server) {
  server.on("connection", function(socket) {
    console.log("New connection detected");

    RegisterSocket(socket, server);
  });
}

function CreateServer(httpServer) {
  let chatServer = io(httpServer);

  ConfigureServer(chatServer);
}

module.exports = CreateServer;
