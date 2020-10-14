/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


(function () {
    var app = angular.module('app');

    app.controller('DetailRolCont', ["$scope", "$rootScope", 'UserServ', 'PermissionServ','PermissionMeServ', '$state', '$stateParams', "$window", function ($scope, $rootScope, UserServ, PermissionServ,PermissionMeServ, $state, $stateParams, $window) {
            var private = {};
            $scope.rolshow = [];
            $scope.p = {'name': "", 'permissions': []};
            $scope.permissions = null;
            private.init = function () {
                UserServ.getMe().success(function (data) {
                    $scope.roles = data.roles;
                    var permsUser = [];
                    angular.forEach($scope.roles, function (rol, key) {
                        PermissionMeServ.getMyPermissions(rol.name).success(function (data){
                            $scope.p.permissions = data;
                            $scope.p.name = rol.name;
                            $scope.rolshow.push($scope.p);
                            $scope.p = {'name': "", 'permissions': []};
                        });
                    });
                });
            };
            private.init();
        }]);
}());