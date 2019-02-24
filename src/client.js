let liveServer = require("live-server");

function StartClient() {
  let port = 8081;

  let params = {
    port: port,
    root: "./static",
    wait: 1000,
    open: false
  };

  console.log(`Starting client on port ${port}...`);
  liveServer.start(params);
}

module.exports = { Start: StartClient };
