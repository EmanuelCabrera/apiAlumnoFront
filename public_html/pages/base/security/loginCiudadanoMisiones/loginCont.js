/**
 * CICHA Created 05/12/2014
 */
(function () {
    var app = angular.module('app');

    app.controller('LoginCiudadanoMisionesCont', ["$scope", "$stateParams", 'SessionServ', '$rootScope', '$uibModal', '$location', function ($scope, $stateParams, SessionServ, $rootScope, $uibModal, $location) {

            $scope.process = false;

            $scope.user = $stateParams.user;
            if ($.un($stateParams.nextState) || $stateParams.nextState === '' || $stateParams.nextState === null || $stateParams.nextState === 'login') {
                $scope.nextState = $rootScope.initStateSigned;
            } else {
                $scope.nextState = $stateParams.nextState;
            }


            $scope.login = function () {
                var data = $.extend({}, $scope.user);
                data.jconf = JSON.stringify(jconf.initData);

                $scope.process = true;

                SessionServ.loginSso(data, $scope.nextState).success(function (data) {
                    $scope.process = false;
                }).error(function () {
                    $scope.process = false;
                });
            };

            $scope.init = function () {
                if ($location.search().correo && $location.search().pass) {
                    $scope.userSistem = $location.search();
                    $scope.login();
                }
            };
            
            $scope.register = function () {
                let redirectUri = window.location.href;
                if (redirectUri.includes("index.html")){
                    redirectUri = redirectUri.substring(0,redirectUri.indexOf("index.html"));
                }else if (redirectUri.includes("#")){
                    redirectUri = redirectUri.substring(0,redirectUri.indexOf("#"));
                }
                redirectUri = redirectUri + "/login";
                window.location.href = "https://ciudadano.misiones.gob.ar/#/registro-misiones-digital?appId="+$rootScope.mdAppId;
            }
            $scope.init();

        }]);
}());