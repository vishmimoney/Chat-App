(function(){
    angular.module('chatApp').controller('chatWindowController', ['$scope', '$rootScope', 'uuid', '$cookies', '$location', function ($scope, $rootScope, uuid, $cookies, $location){
        $scope.chatMessage = '';
        $scope.chatMessageQueue = [];
        let date = new Date();
        $scope.userName = $cookies.get('userName');

        if (!$scope.userName) {
            $location.path('/login');
        }

        const socket = io.connect();

        $scope.submitChatMessage = () => {
            socket.emit('chat message', {
                msg: $scope.chatMessage,
                id: uuid.v4(),
                userName: $scope.userName,
                timestamp: date.getTime()
            });
            $scope.chatMessage = '';
        };

        $scope.deleteChatMessage = (messageObj) => {
            if (messageObj.userName !== $scope.userName) {
                M.toast({html: 'You can only delete the messages you sent!'});
            }
            else {
                socket.emit('delete message', messageObj.id);
            }
        };

        socket.on('chat message', (messageObj) => {
            $scope.$apply(() => {
                $scope.chatMessageQueue.push(messageObj);
            });
        });

        socket.on('delete message', (id) => {
            $scope.$apply(() => {
                $scope.chatMessageQueue = $scope.chatMessageQueue.filter((e) => {
                    return e.id !== id;
                });
            });
        });
    }]);
}());
