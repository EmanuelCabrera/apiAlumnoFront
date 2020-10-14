//
//Miguel Created: 2016/03/30 
//
(function () {
    var app = angular.module('app');

    app.controller('UserCMAct', ["$scope", "$rootScope", 'UserServ', 'PersonaServ', '$state', '$stateParams', "$window", "RolServ", function ($scope, $rootScope, UserServ, PersonaServ, $state, $stateParams, $window, RolServ) {
            var private = {};
            $scope.user = {
                notificar: true,
                roles: []
            };
            /**
             * 
             */
            $scope.saving = false;
            $scope.personas = [];
            $scope.rf = {};
            $scope.rf.user = ['name', 'correo', 'password'];
            vm = this;
            vm.selected;

            $scope.create = function () {
                $scope.saving = true;
                UserServ.createCm($scope.user)
                        .success(function (data) {

                            $window.history.back();
                        }).error(function () {
                    $scope.saving = false;
                });
            };

            $scope.update = function () {
                $scope.saving = true;
                UserServ.updateCm($scope.user)
                        .success(function (data) {
                            $window.history.back();
                        }).error(function () {
                    $scope.saving = false;
                });
            };

            $scope.isCheck = function (rol) {
                return $scope.user.roles.indexOf(rol) != -1;
            };

            $scope.onCheck = function (rol) {
                var index = $scope.user.roles.indexOf(rol);
                if (index > -1) {
                    $scope.user.roles.splice(index, 1);
                } else {
                    $scope.user.roles.push(rol);
                }
            };

        

            $scope.init = function () {
                if ($stateParams.id) {
                    UserServ.load({
                        "id": $stateParams.id,
                        "jconf": JSON.stringify(jconf.security.user.userForm)
                    }).success(function (data) {
                        $scope.user = data;
                    });
                }
                RolServ.load({
                    jconf: JSON.stringify({
                        attrs: ['id', 'name']
                    })
                }).success(function (data) {
                    $scope.roles = data;
                });
            };




            $scope.init();
        }]);
}());