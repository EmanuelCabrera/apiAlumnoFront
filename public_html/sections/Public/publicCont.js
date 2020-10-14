//
//Cicha Created: 2016/03/07
//
(function () {
    var app = angular.module('app');

    app.controller('PublicCont', ["$scope", "$rootScope", "SessionServ", function ($scope, $rootScope, SessionServ) {
            var private = {};
            $scope.isRegister = config.isRegister;
            $scope.redirectUri = window.location.href;

            $scope.init = function () {
                if ($scope.redirectUri.includes("index.html")) {
                    $scope.redirectUri = $scope.redirectUri.substring(0, $scope.redirectUri.indexOf("index.html"));
                } else if ($scope.redirectUri.includes("#")) {
                    $scope.redirectUri = $scope.redirectUri.substring(0, $scope.redirectUri.indexOf("#"));
                }
                let url = $scope.redirectUri + "#/login";
                $scope.redirectUri = encodeURI("https://ciudadano.misiones.gob.ar/#/registro-misiones-digital?redirect_uri=" + btoa(url));
            }

            $scope.init();

            $scope.loginCiudadano = function () {
                SessionServ.loginCiudadano(config.ciudadanoOptions.redirectLoginSuccess);
            };

        }]);
}());
