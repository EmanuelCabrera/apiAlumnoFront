(function () {
    var app = angular.module('app');
    app.directive("booleanShow", function () {
        return {
            templateUrl: 'directives/booleanShowDir/booleanShowDir.html',
            scope: {
                model: "=?",
                trueText: "=?",
                falseText: "=?",

            },
            controller: function ($scope, $element, $attrs) {
                

            }

        };
    });
}());