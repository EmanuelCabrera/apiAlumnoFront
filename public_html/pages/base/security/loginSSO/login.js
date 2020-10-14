(function () {
    var app = angular.module('app');

    app.controller('LoginSSOCont', ["$scope", "$state", "$stateParams", 'SessionServ', '$rootScope',
        function ($scope, $state, $stateParams, SessionServ, $rootScope) {


            $scope.registerMD = config.registerMD;

            $scope.init = function () {


                if ($stateParams.fromOtherSystem) {
                    SessionServ.loginCiudadano($stateParams.nextState, false);
                }

                if ($stateParams.md) {
                    $scope.fromRegister = true;
                } else {
                    $scope.fromRegister = false;
                }


                if ($stateParams.noUser) {
                    $scope.noUser = JSON.parse(decodeURIComponent($stateParams.noUser));
                } else {
                    $scope.noUser = false;
                }

            };


            $scope.loginCiudadano = function () {
                SessionServ.loginCiudadano(config.ciudadanoOptions.redirectLoginSuccess);
            };

            $scope.init();


        }]);
}());