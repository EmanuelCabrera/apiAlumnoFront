//
//CICHA Created: 2016/08/24 
//
(function () {
    var app = angular.module('app');

    /**
     *  personaId = Para el caso que se pase solamente el ID de la persona,
     
     *  persona = Para el caso que se pase el objeto entero de persona 
     *  
     *   buscarEnModal= Sí es TRUE hace una llamada al back-end en el modal, pasando el ID de la variable personaId o persona.id
     *                  Sí es FALSE no hace una llamada al back-end en el modal, y utliza la variable persona, para el renderizado del persona-detalil
     */
    app.controller('ModalPersonaCont', ["$scope", "$stateParams", '$uibModalInstance', 'PersonaServ', 'personaId', 'persona', 'buscarEnModal', function ($scope, $stateParams, $uibModalInstance, PersonaServ, personaId, persona, buscarEnModal) {
            var private = {};

            $scope.buscarEnModal = !$.un(buscarEnModal) ? buscarEnModal : false;
            $scope.persona = $.un(persona) ? undefined : persona;

            $scope.close = function () {
                $uibModalInstance.close();
            };


            private.buscarEnModal = function () {
                PersonaServ.load({
                    "id": $scope.personaId,
                    "jconf": JSON.stringify(jconf.rrhh.persona.personaDireccionForm)
                }).success(function (data) {
                    data.fechaNac = new Date(data.fechaNac);
                    $scope.persona = data;
                });
            };

            private.init = function () {

                if (!$.un(personaId)) {
                    $scope.personaId = personaId;
                }

                if (!$.un(persona)) {
                    $scope.persona = persona;
                    $scope.personaId = persona.id;
                }
                if ($scope.buscarEnModal) {
                    private.buscarEnModal();
                }


            };
            private.init();
        }]);
}());