
(function () {
    var app = angular.module('app');
    app.directive('toCiudadano', ['$rootScope', 'SessionServ', function ($rootScope, SessionServ) {
            return {
                restrict: 'A',
                scope: {
                    nextState: '=?', // Pasar como variable, ejemplo: <a to-ciudadano next-state=" 'perfil' "></a>
                    extraParams: '=?'
                },
                controller: function ($scope, $element, $attrs) {

                    function toCiudadano() {
                        SessionServ.accessCiudadano($scope.nextState, $scope.extraParams, false);
                    }

                    $element.on('click', toCiudadano);
                }
            };
        }
    ]);
}());