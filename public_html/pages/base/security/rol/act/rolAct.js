/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


//
//Miguel Created: 2016/03/30 
//
(function () {
    var app = angular.module('app');

    app.controller('RolAct', ["$scope", "$rootScope", 'SessionServ', 'RolServ', 'GroupPermissionServ', 'PermissionServ', '$state', '$stateParams', "$window",
        function ($scope, $rootScope, SessionServ, RolServ, GroupPermissionServ, PermissionServ, $state, $stateParams, $window) {
            var private = {};
            $scope.editable = true;
            $scope.groups = [];
            $scope.rol = { permissions: [] };
            $scope.saving = false;
            $scope.rf = {};
            $scope.rf.rol = ['name', 'permiso'];
            vm = this;
            vm.selected;

            $scope.create = function () {
                $scope.saving = true;
                RolServ.create($scope.rol)
                    .success(function (data) {

                        SessionServ.initData({ jconf: JSON.stringify(jconf.initData) }).success(function (data) {
                            $rootScope.user = data.user;
                            $window.history.back();
                        });
                    }).error(function () {
                        $scope.saving = false;
                    });
            };

            $scope.update = function () {
                $scope.saving = true;
                RolServ.update($scope.rol)
                    .success(function (data) {

                        SessionServ.initData({ jconf: JSON.stringify(jconf.initData) }).success(function (data) {
                            $rootScope.user = data.user;
                            $window.history.back();
                        });

                    }).error(function () {
                        $scope.saving = false;
                    });
            };

            $scope.isCheck = function (permission) {
                return $scope.rol.permissions.indexOf(permission.code) !== -1;
            };
            $scope.onCheck = function (permission) {
                var index = $scope.rol.permissions.indexOf(permission.code);
                if (index > -1) {
                    $scope.rol.permissions.splice(index, 1);
                } else {
                    $scope.rol.permissions.push(permission.code);
                }
            };

            $scope.groupContainSelected = function (group) {
                var res = false;
                angular.forEach(group.permisos, function (value, key) {
                    var index = $scope.rol.permissions.indexOf(value.code);
                    if (index !== -1) {
                        res = true;
                        return;
                    }
                });
                return res;
            };
            $scope.selectedGroup = function (group) {
                permisosGrupo = [];

                angular.forEach(group.permisos, function (value, key) {
                    var index = $scope.rol.permissions.indexOf(value.code);
                    if (index !== -1) {
                        permisosGrupo.push(value.code);
                    }
                });

                return permisosGrupo.length === group.permisos.length;
            };

            $scope.checkboxClick = function (group, $event, valor) {
                $event.stopPropagation();
                if (valor === true) {
                    angular.forEach(group.permisos, function (value, key) {
                        $scope.rol.permissions.push(value.code);
                    });

                } else {
                    angular.forEach(group.permisos, function (value, key) {
                        var index = $scope.rol.permissions.indexOf(value.code);
                        $scope.rol.permissions.splice(index, 1);
                    });
                }

            };

            $scope.init = function () {
                if ($stateParams.id) {
                    RolServ.load({
                        "id": $stateParams.id,
                        "jconf": JSON.stringify(jconf.security.rol.rolForm)
                    }).success(function (data) {
                        $scope.rol = data;
                    });
                }

                PermissionServ.load({
                    jconf: JSON.stringify({
                        attrs: ['id', 'name', 'code']
                    })
                }).success(function (data) {

                    $scope.permissions = data;
                    console.log(data);
                });

                GroupPermissionServ.load({
                    jconf: JSON.stringify({
                        attrs: ['id', 'name', 'code'], permisos: { attrs: ['id', 'name', 'code'] }
                    })
                }).success(function (data) {

                    $scope.group_permissions = data;
                });

            };


            $scope.init();
        }]);
}());