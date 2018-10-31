(function(){
    angular.module('chatApp').controller('chatWindowController', ['$scope', function ($scope){
        $scope.chatMessage = "";
        $scope.chatMessageQueue = [];

        const socket = io.connect();

        $scope.submitChatMessage = function(){
            socket.emit('chat message', $scope.chatMessage);
            $scope.chatMessage="";
        };

        socket.on('chat message', function(msg){
            $scope.$apply(function () {
                $scope.chatMessageQueue.push(msg);
            });
        });
    }])
}());
