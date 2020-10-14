
(function () {
    var app = angular.module('app');

    app.controller('InConstructionCont', ["$scope", "$rootScope", '$state', function ($scope, $rootScope, $state) {
            var private = {};
            $rootScope.bodylayout = "skin-blue  sidebar-collapse";

        }]);
}());
