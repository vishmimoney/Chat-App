(function(){
    angular.module('chatApp').controller('chatWindowController', ['$scope', function ($scope){
        $scope.chatMessage = "Hello";
        $scope.chatMessageQueue = [];

        $scope.submitChatMessage = function () {
            $scope.chatMessageQueue.push($scope.chatMessage);
        };
    }])
}());
