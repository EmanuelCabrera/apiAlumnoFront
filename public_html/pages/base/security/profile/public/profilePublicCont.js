/* 
 * CICHA Created: 09/12/2014  
 */
(function () {
    var app = angular.module('app');

    app.controller('ProfilePublicCont', ["$scope", "$rootScope", '$stateParams', 'UserServ',
        function ($scope, $rootScope, $stateParams, UserServ) {
            $scope.usuario = {};

            $scope.init = function () {

                if ($stateParams.id) {
                    UserServ.load({
                        id: $stateParams.id,
                        jconf: JSON.stringify({
                            attrs: ['id', 'name', 'correo', 'cuit', 'facebook', 'instagram', 'twitter', 'descripcion'],
                            persona: {attrs: ['nombreCompleto']}
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