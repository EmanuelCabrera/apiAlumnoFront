//
//Cicha Created: 2016/03/07
//
(function () {
    var app = angular.module('app');
    app.controller('PrivateCont', ["$scope", "$rootScope", 'SessionServ', '$state', function ($scope, $rootScope, SessionServ, $state) {
            var private = {};

            $scope.logout = function () {
                SessionServ.logout();
                $state.go($rootScope.initState);
            };

            $rootScope.$watch('user', function (user) {

                if (!$.un(user)) {

                    for (let permiso of $rootScope.user.permissions) {
                        if (permiso == 'USER_CIUDADANOMISIONES') {
                            $rootScope.userCM = true;
                            return
                        }
                    }

                    $rootScope.userCM = false;

                } else {
                    $rootScope.userCM = false;
                }
            });


            $scope.toPerfil = function (stateCiudadano, state) {
                if (config.ciudadanoMisiones) {
                    $state.go(stateCiudadano);
                } else {
                    $state.go(state);
                }

            };

            /**
             * Ver que layout poner, en uno el menu aparece aparece arriba y el otro al costado.
             * Hay que comentar o mejor, eliminar el que no vamos a usar. 
             * La idea es que se elija el side.html o el top.html y copiarla a private.html el layout que vamos a usar en el proyecto
             */


//Codigo para ver el menu side
            $rootScope.layout = 'sections/Private/menu/side.html';

//           Codigo para ver el  menú TOP
//            $rootScope.bodylayout = "hold-transition skin-blue layout-top-nav";
//            $rootScope.layout = "sections/Private/menu/top.html";

        }]);
}());
