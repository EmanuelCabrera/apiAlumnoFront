/**
 * CICHA Created 05/12/2014
 */
(function () {
    var app = angular.module('app');

    app.controller('LoginTradicionalCont', ["$scope", "$stateParams", 'SessionServ', '$rootScope', '$uibModal', '$location', function ($scope, $stateParams, SessionServ, $rootScope, $uibModal, $location) {
            $scope.isRegister = config.isRegister;
            $scope.profileSocialNetworkShow = $.un(config.profileSocialNetworkShow) || config.profileSocialNetworkShow;

            
            $scope.user = $stateParams.user;
            if ($.un($stateParams.nextState) || $stateParams.nextState === '' || $stateParams.nextState === null || $stateParams.nextState === 'login') {
                $scope.nextState = $rootScope.initStateSigned;
            } else {
                $scope.nextState = $stateParams.nextState;
            }

//            $scope.loginGoogle = function () {
//                SessionServ.loginGoogle($scope.nextState);
//            };
//
//            $scope.loginFacebook = function () {
//                SessionServ.loginFacebook($scope.nextState);
//            };

            $scope.login = function () {
                var data = $.extend({}, $scope.userSistem);
                data.jconf = JSON.stringify(jconf.initData);
                SessionServ.loginSistem(data, $scope.nextState).success(function (data) {
                });
            };

            $scope.loginSso = function () {
                var data = $.extend({}, $scope.userSistem);
                data.jconf = JSON.stringify(jconf.initData);
                SessionServ.loginSso(data, $scope.nextState).success(function (data) {
                });
            };

            $scope.init = function () {
                if ($location.search().correo && $location.search().pass){
                    $scope.userSistem = $location.search();
                    $scope.login();
                }
            };
            
            $scope.init();

        }]);
}());