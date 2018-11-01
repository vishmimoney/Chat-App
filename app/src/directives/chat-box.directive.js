(function () {
    angular.module('chatApp').directive('chatBox', () => {
        return {
            restrict: 'E',
            // controller: 'chatWindowController',
            templateUrl: '/src/views/chat-box.html'
        };
    });
}());
