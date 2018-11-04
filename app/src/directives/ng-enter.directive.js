/* eslint-disable no-undef, arrow-body-style */

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
