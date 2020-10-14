
(function () {
    var app = angular.module('app');

    app.controller('ShowDetailRol', ["$scope", 'RolServ', 'GroupPermissionServ', '$stateParams',
        function ($scope, RolServ, GroupPermissionServ,$stateParams) {
            var private = {};
            $scope.misGruposyPermisos = [];
            var misPermisos = [];
            var hayPermisos = false;


            private.init = function () {
                if ($stateParams.id) {
                    RolServ.load({
                        "id": $stateParams.id,
                        "jconf": JSON.stringify(jconf.security.rol.rolForm)
                    }).success(function (data) {
                        $scope.rol = data;
                        GroupPermissionServ.load({
                            jconf: JSON.stringify({
                                attrs: ['id', 'name', 'code'], permisos: {attrs: ['id', 'name', 'code']}
                            })
                        }).success(function (data) {
                            $scope.group_permissions = data;

                            $scope.group_permissions.forEach(function (grupo) {
                                grupo.permisos.forEach(function (permiso) {
                                    $scope.rol.permissions.forEach(function (permission) {
                                        if (permiso.code == permission) {
                                            misPermisos.push(permiso);
                                            hayPermisos = true;
                                        }
                                    });
                                });
                                if (hayPermisos) {
                                    grupo.permisos = misPermisos;
                                    $scope.misGruposyPermisos.push(grupo);
                                    hayPermisos = false;
                                    misPermisos = [];
                                }
                            });
                        });
                    });
                }
            };


            private.init();
        }]);
}());