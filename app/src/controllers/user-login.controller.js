/* eslint-disable no-undef */

(function () {
    angular.module('chatApp').controller('userLoginController', ['$scope', '$cookies', '$location', function ($scope, $cookies, $location) {
        $scope.user = { name: '' };

        $scope.loginUser = () => {
            $cookies.put('userName', $scope.user.name);
            $location.path('/chat');
        };
    }]);
}());
