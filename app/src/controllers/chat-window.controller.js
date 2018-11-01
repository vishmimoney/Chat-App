(function(){
    angular.module('chatApp').controller('chatWindowController', ['$scope', function ($scope){
        $scope.chatMessage = '';
        $scope.chatMessageQueue = [];
        let date = new Date();

        const socket = io.connect();

        $scope.submitChatMessage = () => {
            socket.emit('chat message', { msg: $scope.chatMessage, id: `${Math.round(Math.random() * 100000)}_${date.getTime()}` });
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
