app.controller("HomeController", [
  "$scope",
  "ChatService",
  function($scope, chatService) {
    $scope.messages = [];

    $scope.connected = false;
    $scope.username = "";
    $scope.messageContent = "";

    let ctrl = this;

    ctrl.toggleConnect = function() {
      if (chatService.isConnected()) {
        chatService.disconnect();
        $scope.connected = false;
      } else {
        chatService.connect($scope.username);
        chatService.register($scope, function(newMessage) {
          ctrl.addMessage(newMessage);
        });
        $scope.connected = true;
      }
    };

    ctrl.sendMessage = function() {
      if (chatService.isConnected()) {
        chatService.send($scope.messageContent);
        $scope.messageContent = "";
      }
    };

    ctrl.addMessage = function(message) {
      $scope.messages.push(message);
    };
  }
]);
