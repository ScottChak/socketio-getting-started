var app = angular.module("socketioApp", []);

app.controller("HomeController", function($scope) {
  $scope.connected = false;

  $scope.messages = [];

  $scope.username = "";
  $scope.messageContent = "";

  var ctrl = this;

  var isConnected = function() {
    //  EBU: this was more complex earlier on
    return $scope.connected;
  };

  ctrl.connect = function() {
    if ($scope.username.length > 0) {
      socket.emit("connectUser", $scope.username);
      $scope.connected = true;
    }
  };

  ctrl.disconnect = function() {
    if (isConnected()) {
      socket.emit("disconnectUser", $scope.username);
      $scope.connected = false;
      $scope.messageContent = "";
    }
  };

  ctrl.toggleConnect = function() {
    if ($scope.connected) {
      ctrl.disconnect();
    } else {
      ctrl.connect();
    }
  };

  ctrl.sendMessage = function() {
    if (isConnected()) {
      socket.emit("sendMessage", { username: $scope.username, content: $scope.messageContent });
      $scope.messageContent = "";
    }
  };

  ctrl.addMessage = function(message) {
    $scope.messages.push(message);

    //  EBU: Why isn't this automatic ?
    $scope.$apply();
  };

  var socket = io("http://localhost:8082");

  socket.on("receiveMessage", function(message) {
    ctrl.addMessage(message);
  });
});
