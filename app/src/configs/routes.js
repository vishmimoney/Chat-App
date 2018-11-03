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
