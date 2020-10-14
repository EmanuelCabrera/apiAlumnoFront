/**
 * CICHA Created: 15/12/2014
 */
(function () {
    var app = angular.module('app');

    app.controller('ProvinciaCont', ["$scope", 'ProvinciaServ', 'PaisServ', '$stateParams', function ($scope, ProvinciaServ, PaisServ, $stateParams) {

            $scope.jconfFiltro = {
                op: 'NULL',
                field: 'deletedAt'
            };
            $scope.validations = {
                nombre: {
                    maxlength: 50
                }
            };

            $scope.onSelect = function (d) {
                
                if ((!angular.isUndefined($scope.provinciaSel) && $scope.provinciaSel.id === d.id)) {
                    $scope.provinciaSel = undefined;
                } else {
                    $scope.provinciaSel = $.extend({}, d, true);
                }
            };


            $scope.onClear = function () {
                $scope.provinciaSel = undefined;
                if (!angular.isUndefined($scope.provinciaSel)){
                     $scope.provinciaSel.nombre= undefined;

                }
            };

            $scope.create = function () {
                if (angular.isUndefined($scope.provinciaSel.nombre) || $scope.provinciaSel.nombre.length > $scope.validations.nombre.maxlength ) {
                    $.m_sms({
                        error: {
                            sms: "El campo nombre no debe superar los 50 caracteres."
                        }
                    });
                    $scope.saving = false;
                } else {
                    ProvinciaServ.create($scope.provinciaSel).success(function (data) {
                        $scope.init();
                    });
                }
            };

            $scope.update = function () {
                if (angular.isUndefined($scope.provinciaSel.nombre) || $scope.provinciaSel.nombre.length > $scope.validations.nombre.maxlength ) {
                    $.m_sms({
                        error: {
                            sms: "El campo nombre no debe superar los 50 caracteres."
                        }
                    });
                    $scope.saving = false;
                } else {
                    ProvinciaServ.update($scope.provinciaSel).success(function (data) {
                        $scope.init();
                    });
                }
            };

            $scope.remove = function (id) {
                if (angular.isUndefined(id)) {
                    id = $scope.provinciaSel.id;
                }
                ProvinciaServ.remove({
                    "id": id
                }).success(function (data) {
                    $scope.onClear();
                    $scope.init();
                });
            };

            $scope.disable = function (id) {
                if (angular.isUndefined(id)) {
                    id = $scope.provinciaSel.id;
                }
                ProvinciaServ.disable(id).success(function (data) {
                    $scope.onClear();
                    $scope.init();
                });
            };
            $scope.enable = function (id) {
                if (angular.isUndefined(id)) {
                    id = $scope.provinciaSel.id;
                }
                ProvinciaServ.enable(id).success(function (data) {
                    $scope.onClear();
                    $scope.init();
                });
            };

            $scope.changeTableProvince = function (paisId) {
                $scope.provinciaSel = {paisId:undefined,nombre:undefined};
                $scope.provinciaSel.paisId = paisId;
                let arrayReturn = [];
                if (!$.un(paisId)) {
                    console.log($scope.provinciaSource);
                    angular.forEach($scope.provinciaSource, function (value, key) {
                        if (paisId === value.paisId) {
                            arrayReturn.push(value);
                        }
                    });

                    $scope.provincias = arrayReturn;
                    $scope.provinciasTbl = [].concat(arrayReturn);

                } else {
                    $scope.provincias = [].concat($scope.provinciaSource);
                    $scope.provinciasTbl = [].concat($scope.provinciaSource);
                }
            };

            $scope.init = function () {
                $scope.provincias = [];
                $scope.provinciasTbl = [];

                $scope.onClear();

                ProvinciaServ.load({
                    "jconf": JSON.stringify($.jconf.cascadeFilter(jconf.direccion.provincia.act, $scope.jconfFiltro)),
                    "query": JSON.stringify({
                        orders: ["nombre"]
                    })

                }).success(function (data) {
                    $scope.provincias = data;
                    $scope.provinciasTbl = [].concat(data);
                    $scope.provinciaSource = [].concat(data);
                    $scope.provinciaSel = undefined;
                });

                PaisServ.load({
                    jconf: JSON.stringify($.jconf.onlyEnabled(jconf.direccion.pais.lst))
                }).success(function (data) {
                    $scope.paises = data;
                });
            };

            $scope.onAction = function (response, action) {
                response.success(function () {
                    $scope.init();
                });
            };

            $scope.init();
        }]);
}());