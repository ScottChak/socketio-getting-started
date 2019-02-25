app.factory("ChatService", [
  "$rootScope",
  function($rootScope) {
    let svc = {};

    svc.socket = undefined;
    svc.username = "";

    svc.isConnected = function() {
      //  EBU: this was more complex earlier on
      return svc.socket;
    };

    svc.connect = function(username) {
      if (!svc.isConnected()) {
        svc.username = username;

        svc.socket = io("http://localhost:8082");

        svc.socket.on("receiveMessage", function(message) {
          $rootScope.$broadcast("receive-message", { message });
        });

        svc.socket.emit("connectUser", svc.username);
      }
    };

    svc.disconnect = function() {
      if (svc.isConnected()) {
        svc.socket.emit("disconnectUser", svc.username);

        svc.socket.disconnect();
        svc.socket = undefined;

        svc.username = "";
      }
    };

    svc.send = function(messageContent) {
      svc.socket.emit("sendMessage", { username: svc.username, content: messageContent });
    };

    svc.register = function(targetScope, messageCallback) {
      targetScope.$on("receive-message", function(event, args) {
        messageCallback(args.message);
        targetScope.$apply();
      });
    };

    return svc;
  }
]);
