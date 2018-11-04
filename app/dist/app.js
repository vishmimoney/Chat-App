(function () {
    angular.module('chatApp', ['angular-uuid', 'ngCookies', 'ngRoute']);
} ());

/* eslint-disable no-undef, func-names */

(function () {
    angular.module('chatApp').config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            .when('/login', {
                templateUrl: 'src/views/login.html'
            })
            .when('/chat', {
                templateUrl: 'src/views/chat-window.html'
            })
            .when('/', {
                templateUrl: 'src/views/login.html'
            });
    }]);
}());

(function () {
    angular.module('chatApp').directive('chatBox', () => {
        return {
            restrict: 'E',
            templateUrl: '/src/views/chat-box.html'
        };
    });
}());

(function () {
    angular.module('chatApp').directive('ngEnter', () => {
        return function (scope, element, attrs) {
            element.bind('keydown keypress', (event) => {
                if (event.which === 13) {
                    scope.$apply(() => {
                        scope.$eval(attrs.ngEnter);
                    });

                    event.preventDefault();
                }
            });
        };
    });
}());

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

(function(){
    angular.module('chatApp').controller('userLoginController', ['$scope', '$cookies', '$location', function ($scope, $cookies, $location){
        $scope.user = { name: ''};

        $scope.loginUser = () => {
            $cookies.put('userName', $scope.user.name);
            $location.path('/chat');
        };

    }]);
}());
