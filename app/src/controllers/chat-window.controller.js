(function(){
    angular.module('chatApp').controller('chatWindowController', ['$scope', 'uuid', function ($scope, uuid){
        $scope.chatMessage = '';
        $scope.chatMessageQueue = [];
        let date = new Date();

        const socket = io.connect();

        $scope.submitChatMessage = () => {
            socket.emit('chat message', { msg: $scope.chatMessage, id: uuid.v4() });
            $scope.chatMessage = '';
        };

        $scope.deleteChatMessage = (id) => {
            socket.emit('delete message', id);
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
