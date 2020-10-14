/**
 * CICHA Created: 15/12/2014
 */
(function () {
    var app = angular.module('app');

    app.controller('DepartamentoCont', ["$scope", "$rootScope", 'PaisServ', 'ProvinciaServ', '$state', '$stateParams', function ($scope, $rootScope, PaisServ, ProvinciaServ, $state, $stateParams) {
        $scope.paisSel = {
            provincias: []
        };

        $scope.onChangeProvincia = function (provinciaSel) {
            if (!$.un(provinciaSel)) {
                $state.go('direccion/departamento/act', { "provinciaId": provinciaSel });
            }
        };


        $scope.init = function () {

            PaisServ.load({
                jconf: JSON.stringify($.jconf.onlyEnabled({
                    attrs: ['id', 'nombre'],
                    provincias: {
                        attrs: ['id', 'nombre']
                    }
                }))
            }).success(function (data) {
                $scope.paises = data;
            });
        };
        
        $scope.changeProvinces = function (paisSel) {
            $scope.provincias = paisSel.provincias;
        };

        $rootScope.$on("reload-departamento", function (event, provinciaId) {
            if (!$.un($scope.provinciaSel)) {
                return;
            }
            ProvinciaServ.load({
                id: provinciaId,
                jconf: JSON.stringify($.jconf.onlyEnabled({
                    attrs: ['id', 'nombre'],
                    pais: {
                        attrs: ['id', 'nombre'],
                        provincias: {
                            attrs: ['id', 'nombre']
                        }
                    }
                }))
            }).success(function (data) {
                var provincia = data;

                PaisServ.load({
                    jconf: JSON.stringify($.jconf.onlyEnabled({
                        attrs: ['id', 'nombre'],
                        provincias: {
                            attrs: ['id', 'nombre']
                        }
                    }))
                }).success(function (data) {
                    $scope.paises = data;

                    $scope.paisSel = {
                        id: provincia.pais.id,
                        nombre: provincia.pais.nombre,
                        provincias: provincia.pais.provincias
                    };
                    $scope.provinciaSel = {
                        id: provincia.id,
                        nombre: provincia.nombre
                    };
                });

            });
        
        });

        $scope.init();
    }]);
}());