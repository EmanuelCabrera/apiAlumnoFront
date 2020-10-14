/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
(function () {
    var app = angular.module('app');
    app.directive('permissionHide', ['$rootScope', function ($rootScope) {
            return{
                restrict: 'A',
                replace: false,
                scope: {
                    permissionHide: '='
                },
                link: function ($scope, elm, attrs) {
                    $scope.$watch('permissionHide', function (o, n) {
                        testear();
                    });
                    $rootScope.$watch('user', function (o, n) {
                        testear();
                    });

                    function testear() {
                        if ($.un($rootScope.user)) {
                            $(elm).addClass("hide");
                        } else {

                            if ($rootScope.user.root) {
                                $(elm).removeClass("hide");
                                return;
                            }
                            var permissions;
                            if ($.isArray($scope.permissionHide)) {
                                permissions = $scope.permissionHide;
                            } else {

                                permissions = [];
                                //Agrepador de permisos
                                if ($scope.permissionHide.startsWith("@")) {

                                    if ($.isArray(security[$scope.permissionHide])) {
                                        for (let statePerms of security[$scope.permissionHide]) {
                                            permissions = permissions.concat(statePerms.perms);
                                        }
                                    }


                                } else {

                                    permissions.push($scope.permissionHide);
                                }

                            }
                            var hide = true;
                            for (var i = 0; i < $rootScope.user.roles.length; i++) {
                                var rol = $rootScope.user.roles[i];
                                for (var j = 0; j < permissions.length; j++) {
                                    var permissionDeclared = permissions[j];
                                    if (permissionDeclared.indexOf("^") === 0) {
                                        //es una expresion regular
                                        for (var k = 0; k < rol.permissions.length; k++) {
                                            if (rol.permissions[k].match(permissionDeclared)) {
                                                $(elm).removeClass("hide");
                                                hide = false;
                                                break;
                                            }
                                        }
                                        if (!hide) {
                                            break;
                                        }
                                    } else {
                                        if (!$.un(rol.permissions) && rol.permissions.indexOf(permissionDeclared) != -1) {
                                            $(elm).removeClass("hide");
                                            hide = false;
                                            break;
                                        }
                                    }


                                }
                                if (!hide) {
                                    break;
                                }
                            }
                            if (hide) {
                                $(elm).addClass("hide");
                            }
                        }
                    }
                }
            };
        }
    ]);
}());