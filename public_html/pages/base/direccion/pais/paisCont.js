/**
 * CICHA Created: 15/12/2014
 */
(function () {
    var app = angular.module('app');

    app.controller('PaisCont', ["$scope", "$rootScope", 'PaisServ', function ($scope, $rootScope, PaisServ) {
            $scope.paisSel = undefined;
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
                if ((!angular.isUndefined($scope.paisSel) && $scope.paisSel.id === d.id)) {
                    $scope.paisSel = undefined;
                } else {
                    $scope.paisSel = $.extend({}, d, true);
                }
            };


            $scope.onClear = function () {
                $scope.paisSel = undefined;
                if (!angular.isUndefined($scope.paisSel)){
                     $scope.paisSel.nombre = undefined;
                }            
            };

            $scope.create = function () {
                if (angular.isUndefined($scope.paisSel.nombre) || $scope.paisSel.nombre.length > $scope.validations.nombre.maxlength ) {
                    $.m_sms({
                        error: {
                            sms: "El campo nombre no debe superar los 50 caracteres."
                        }
                    });
                    $scope.saving = false;
                } else {
                    PaisServ.create($scope.paisSel).success(function (data) {
                        $scope.init();
                    });
                }
            };

            $scope.update = function () {
                if (angular.isUndefined($scope.paisSel.nombre) || $scope.paisSel.nombre.length > $scope.validations.nombre.maxlength ) {
                    $.m_sms({
                        error: {
                            sms: "El campo codigo no debe superar los 50 caracteres."
                        }
                    });
                    $scope.saving = false;
                } else {
                    PaisServ.update($scope.paisSel).success(function (data) {
                        $scope.init();
                    });
                }
            };


            $scope.onAction = function (response, action) {
                response.success(function () {
                    $scope.init();
                });
            };
            $scope.disable = function (id) {
                if (angular.isUndefined(id)) {
                    id = $scope.paisSel.id;
                }
                PaisServ.disable(id).success(function (data) {
                    $scope.onClear();
                    $scope.init();
                });
            };
            $scope.enable = function (id) {
                if (angular.isUndefined(id)) {
                    id = $scope.paisSel.id;
                }
                PaisServ.enable(id).success(function (data) {
                    $scope.onClear();
                    $scope.init();
                });
            };

            $scope.remove = function (id) {
                if (angular.isUndefined(id)) {
                    id = $scope.paisSel.id;
                }
                PaisServ.remove({
                    "id": id
                }).success(function (data) {
                    $scope.onClear();
                    $scope.init();
                });
            };

            $scope.init = function () {
                $scope.paises = [];
                $scope.paisesTbl = [];

                PaisServ.load({

                    "jconf": JSON.stringify({
                        'attrs': ['id', 'nombre', 'deletedAt'],
                        '@filters': $scope.jconfFiltro
                    }),
                    "query": JSON.stringify({
                        orders: ["nombre"]
                    })
                }).success(function (data) {
                    $scope.paises = data;
                    $scope.paisesTbl = [].concat(data);
                });
            };

            $scope.init();
        }]);
}());