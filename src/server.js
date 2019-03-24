let httpServer = require("http").createServer();
let chatServer = require("./io/chatserver")(httpServer);

let port = 8082;

function Start() {
  console.log(`Starting server on port ${port}...`);
  httpServer.listen(port);
}

module.exports = { Start };
