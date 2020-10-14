/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


(function () {
    var app = angular.module('app');
    app.directive('contacto', [  function ( ) {
            return{
                restrict: 'E',
                replace: true,
                templateUrl: templates.contacto.form,
                scope: {
                    contacto: "=?",
                    requiredFields: "=?"
                },
                link: function ($scope, $element, $attrs) {

                },
                controller: function ($scope, $element, $attrs) {
                    var private = {};
                    $scope.emailFormat = /^([a-zA-Z0-9])+([a-zA-Z0-9._%+-])+@([a-zA-Z0-9_.-])+\.(([com]){3})$/;
                    $scope.contacto = $.un($scope.contacto) ? {} : $scope.contacto;
                    $scope.requiredFields = $.un($scope.requiredFields) ? ['correo', 'tel1','tel2'] : $scope.requiredFields;
                    $scope.rf = {
                        correo: $scope.requiredFields.indexOf('correo') > -1,
                        tel1: $scope.requiredFields.indexOf('tel1') > -1,
                        tel2: $scope.requiredFields.indexOf('tel2') > -1
                    };
                    
                    private.init = function () {

                    };

                    private.init();
                }
            };
        }]);
}());
