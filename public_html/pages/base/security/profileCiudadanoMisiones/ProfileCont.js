/* 
 * CICHA Created: 09/12/2014  
 */
(function () {
    var app = angular.module('app');

    app.controller('ProfileCiudadanoMisionesCont', ["$scope", "$rootScope", '$state', 'SessionServ', 'UserServ', 'PersonaServ',
        function ($scope, $rootScope, $state, SessionServ, UserServ, PersonaServ) {

            $scope.init = function () {


                PersonaServ.getMe({
                    "jconf": JSON.stringify({
                        attrs: ['nombreCompleto']
                    })
                }).success(function (data) {
                    $scope.persona = data;
                });
            };


            $scope.init();

            setTimeout(function () {
                $scope.extraParamsCiudadano = {
                    backUrl: window.location.href
                };

            }, 340);


        }]);
}());