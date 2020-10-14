/**
 * CICHA Created: 15/12/2014
 */
(function () {
    var app = angular.module('app');

    app.controller('LocalidadCont', ["$scope", "$rootScope", 'PaisServ', 'DepartamentoServ', '$state', '$stateParams', function ($scope, $rootScope, PaisServ, DepartamentoServ, $state, $stateParams) {
        $scope.paisSel = {
            provincias: []
        };
        $scope.provinciaSel = {
            departamentos: []
        };

        $scope.onChangeDepartamento = function (departamentoSel) {
            if (!$.un(departamentoSel)) {
                $state.go('direccion/localidad/act', { "departamentoId": departamentoSel });
            }
        };

        $scope.changeProvinces = function (paisSel) {
            $scope.provincias = paisSel.provincias;
        };

        $scope.changeDepartmentos = function (provinciaSel) {
            $scope.departamentos = provinciaSel.departamentos;
        };
        
        $scope.init = function () {
            PaisServ.load({
                jconf: JSON.stringify($.jconf.onlyEnabled({
                    attrs: ['id', 'nombre'],
                    provincias: {
                        attrs: ['id', 'nombre'],
                        departamentos: {
                            attrs: ['id', 'nombre']
                        }
                    }
                }))
            }).success(function (data) {
                $scope.paises = data;
            });
        };

        $rootScope.$on("reload-localidad", function (event, dptoId) {
            console.log(dptoId,$scope.departamentoSel);
            if (!$.un($scope.departamentoSel)) {
                return;
            }

            DepartamentoServ.load({
                id: dptoId,
                jconf: JSON.stringify($.jconf.onlyEnabled({
                    attrs: ['id', 'nombre'],
                    provincia: {
                        attrs: ['id', 'nombre'],
                        pais: {
                            attrs: ['id', 'nombre'],
                            provincias: {
                                attrs: ['id', 'nombre']
                            }
                        },
                        departamentos: {
                            attrs: ['id', 'nombre']
                        }
                    }
                }))
            }).success(function (data) {

                var departamento = data;

                PaisServ.load({
                    jconf: JSON.stringify($.jconf.onlyEnabled({
                        attrs: ['id', 'nombre'],
                        provincias: {
                            attrs: ['id', 'nombre'],
                            departamentos: {
                                attrs: ['id', 'nombre']
                            }
                        }
                    }))
                }).success(function (data) {
                    $scope.paises = data;

                    $scope.paisSel = {
                        id: departamento.provincia.pais.id,
                        nombre: departamento.provincia.pais.nombre,
                        provincias: departamento.provincia.pais.provincias
                    };
                    $scope.provinciaSel = {
                        id: departamento.provincia.id,
                        nombre: departamento.provincia.nombre,
                        departamentos: departamento.provincia.departamentos
                    };
                    $scope.departamentoSel = {
                        id: departamento.id,
                        nombre: departamento.nombre
                    };
                });

            });
        });

        $scope.init();
    }]);
}());