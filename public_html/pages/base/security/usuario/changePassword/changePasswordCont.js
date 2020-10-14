/**
 * CICHA Created: 15/12/2014
 */
(function () {
    var app = angular.module('app');

    app.controller('ChangePasswordCont', ["$scope", "$stateParams", 'SessionServ', 'UserServ', function ($scope, $stateParams, SessionServ, UserServ) {
            $scope.usuario = undefined;


            $scope.update = function () {
                UserServ.changePassword({
                    "id": $scope.usuario.id,
                    "newPass1": $scope.usuario.pass
                }).success(function (data) {

                    window.history.back();
                });
            };


            $scope.init = function () {
                if ($stateParams.id) {
                    UserServ.load({
                        id: $stateParams.id,
                        jconf: JSON.stringify({
                            attrs: ['id','name']
                        })
                    }).success(function (data) {

                        $scope.usuario = data;

                    });

                } else {
                    window.history.back();
                }


            };

            $scope.init();
        }]);
}());