/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


(function () {
    var app = angular.module('app');
    app.directive('contactoDetail', [  function ( ) {
            return{
                restrict: 'E',
                replace: true,
                templateUrl: templates.contacto.contactoDetail,
                scope: {
                    contacto: "=?",
                    requiredFields: "=?"
                },
                link: function ($scope, $element, $attrs) {

                },
                controller: function ($scope, $element, $attrs) {
                    var private = {};
                    $scope.contacto = $.un($scope.contacto) ? {} : $scope.contacto;
                    
                    private.init = function () {

                    };

                    private.init();
                }
            };
        }]);
}());
