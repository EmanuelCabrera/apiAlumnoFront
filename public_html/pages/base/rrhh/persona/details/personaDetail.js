/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


(function () {
    var app = angular.module('app');
    app.directive('personaDetail', ['PersonaServ', function (PersonaServ) {
            return{
                restrict: 'E',
                replace: true,
                templateUrl: 'pages/base/rrhh/persona/details/personaDetail.html',
                scope: {
                    persona: "=?",
                    personaId: "=?"
                },
                controller: function ($scope, $element, $attrs) {


                    $scope.$watch('personaId', function (personaId) {

                        if (!$.un(personaId)) {
                            $scope.personaId = personaId;
                            PersonaServ.load({
                                "id": $scope.personaId,
                                "jconf": JSON.stringify(jconf.rrhh.persona.personaDireccionForm)
                            }).success(function (data) {
                                if (!$.un(data.fechaNac)) {
                                    data.fechaNac = new Date(data.fechaNac);
                                }

                                $scope.persona = data;
                            });
                        }
                    });

                }
            };
        }]);
}());