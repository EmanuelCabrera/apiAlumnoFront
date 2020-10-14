/* 
 <persona-item persona="persona"></persona-item>
 */
(function () {
    var app = angular.module('app');
    app.directive('personaItem', ['$compile', '$parse', function ($compile, $parse) {
            return{
                restrict: 'E',
                replace: true,
                templateUrl: 'pages/base/rrhh/persona/personaItemDir/personaItem.html',
                scope: {
                    person: "=",
                    hideData: "=?"
                },
                controller: function ($scope, $element, $attrs) {
                    var private = {};

                    $scope.person = $.un($scope.person) ? {} : $scope.person;

                    $scope.hideData = $.un($scope.hideData) ? [] : $scope.hideData;

                    $scope.hide = {
                        nombres: $scope.hideData.indexOf('nombres') > -1,
                        foto: $scope.hideData.indexOf('foto') > -1,
                        direccion: $scope.hideData.indexOf('direccion') > -1,
                        correo: $scope.hideData.indexOf('correo') > -1,
                        tel: $scope.hideData.indexOf('tel') > -1

                    };
                }
            };
        }]);
}());/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


