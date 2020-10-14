//
//Miguel Created: 2016/03/30 
//
(function () {
    var app = angular.module('app');

    app.controller('PersonaActCont', ["$scope", "$rootScope", 'PersonaServ', '$state', '$stateParams', "$window", function ($scope, $rootScope, PersonaServ, $state, $stateParams, $window) {
            var private = {};
            $scope.date = new Date();
            $scope.persona = {};
            $scope.saving = false;

            $scope.submited = false;

            $scope.rf = {};
            $scope.rf.direccion = [];
            $scope.rf.contacto = [];
            $scope.rf.persona = ['apellido', 'nombres', 'tipoDoc', 'documento', ];

            $scope.create = function () {
                $scope.saving = true;
                if ($.un($scope.persona.direccion.localidadId)) {
                    $scope.persona.direccion = {};
                }
                if (!$scope.personForm.$valid) {

                    $.m_sms({
                        error: {
                            sms: "El campo no debe superar los 255 caracteres."
                        }
                    });
                    $scope.saving = false;

                } else {

                    PersonaServ.create($scope.persona)
                            .success(function (data) {
                                $window.history.back();
                            }).error(function () {
                        $scope.saving = false;
                    });
                }
            };

            $scope.update = function () {
                $scope.saving = true;
//                $scope.persona.direccion.id = 9999998;
                if ($.un($scope.persona.direccion.localidadId)) {
                    $scope.persona.direccion = {};
                }
                var config = {
                    queryParam: {
                        jconf: jconf.rrhh.persona.personaDireccionForm
                    }
                };

                PersonaServ.update($scope.persona, config)
                        .success(function (data) {
                            $window.history.back();
                        }).error(function () {
                    $scope.saving = false;
                });
            };

            private.init = function () {
                if ($.empty($stateParams.id)) {
                    $scope.persona = {
                        "fechaNac": undefined
                    };
                } else {
                    PersonaServ.load({
                        "id": $stateParams.id,
                        "jconf": JSON.stringify(jconf.rrhh.persona.personaDireccionForm)
                    }).success(function (data) {
                        if (!$.un(data.fechaNac)) {
                            data.fechaNac = new Date(data.fechaNac);
                        }
                        $scope.persona = data;
                    });
                }
            };

            private.init();
        }]);
}());