(function () {
    var app = angular.module('app');

    app.controller('PassChangeCont', ["$scope", '$window', 'UserServ', function ($scope, $window, UserServ) {
            var private = {};

            $scope.passChange = function () {
                UserServ.passChange({
                    "actualPass": $scope.actualPass,
                    "newPass1": $scope.newPass1,
                    "newPass2": $scope.newPass2
                }).success(function (data, status, headers, config) {
                    $window.history.back();
                });
            };


            private.init = function () {
            };
            
            private.init();
        }]);
}());