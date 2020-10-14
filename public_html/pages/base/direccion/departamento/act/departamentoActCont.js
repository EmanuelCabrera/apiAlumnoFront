/**
 * CICHA Created: 15/12/2014
 */
(function () {
    var app = angular.module('app');

    app.controller('DepartamentoActCont', ["$scope", "$rootScope", 'DepartamentoServ', '$stateParams', function ($scope, $rootScope, DepartamentoServ, $stateParams) {
            $scope.departamentoSel = undefined;
            $scope.jconfFiltro = {
                op: 'NULL',
                field: 'deletedAt'
            };
            $scope.validations = {
                nombre: {
                    maxlength: 50
                }
            };

            $scope.onAction = function (response, action) {
                response.success(function () {
                    $scope.init();
                });
            };

            $scope.onSelect = function (d) {
                if ((!angular.isUndefined($scope.departamentoSel) && $scope.departamentoSel.id === d.id)) {
                    $scope.departamentoSel = undefined;
                } else {
                    $scope.departamentoSel = $.extend({}, d, true);
                }
            };


            $scope.onClear = function () {
                $scope.departamentoSel = undefined;
                if (!angular.isUndefined($scope.departamentoSel)){
                     $scope.departamentoSel.nombre= undefined;

                }

            };

            $scope.create = function () {
                console.log($scope.departamentoSel);
                
                if (angular.isUndefined($scope.departamentoSel.nombre) || $scope.departamentoSel.nombre.length > $scope.validations.nombre.maxlength ) {
                    $.m_sms({
                        error: {
                            sms: "El campo nombre no debe superar los 50 caracteres."
                        }
                    });
                    $scope.departamentoSel.nombre= undefined;

                    $scope.saving = false;
                } else {
                    $scope.departamentoSel.provinciaId = $stateParams.provinciaId;
                    DepartamentoServ.create($scope.departamentoSel).success(function (data) {
                        $scope.init();
                    });
                }
            };

            $scope.update = function () {
                if (angular.isUndefined($scope.departamentoSel.nombre) || $scope.departamentoSel.nombre.length > $scope.validations.nombre.maxlength ) {
                    $.m_sms({
                        error: {
                            sms: "El campo nombre no debe superar los 50 caracteres."
                        }
                    });
                    $scope.saving = false;
                } else {
                    DepartamentoServ.update($scope.departamentoSel).success(function (data) {
                        $scope.init();
                    });
                }
            };

            $scope.remove = function (id) {
                if (angular.isUndefined(id)) {
                    id = $scope.departamentoSel.id;
                }
                DepartamentoServ.remove({
                    "id": id
                }).success(function (data) {
                    $scope.onClear();
                    $scope.init();
                });
            };

            $scope.disable = function (id) {
                if (angular.isUndefined(id)) {
                    id = $scope.departamentoSel.id;
                }
                DepartamentoServ.disable(id).success(function (data) {
                    $scope.onClear();
                    $scope.init();
                });
            };
            $scope.enable = function (id) {
                if (angular.isUndefined(id)) {
                    id = $scope.departamentoSel.id;
                }
                DepartamentoServ.enable(id).success(function (data) {
                    $scope.onClear();
                    $scope.init();
                });
            };

            $scope.init = function () {

                $scope.onClear();

                $rootScope.$broadcast("reload-departamento", $stateParams.provinciaId);

                $scope.departamentos = [];
                $scope.departamentosTbl = [];

                DepartamentoServ.load({
                    provinciaId: $stateParams.provinciaId,
                    "jconf": JSON.stringify($.jconf.cascadeFilter(jconf.direccion.departamento.act, $scope.jconfFiltro)),
                    "query": JSON.stringify({
                        orders: ["nombre"]
                    })
                }).success(function (data) {
                    $scope.departamentos = data;
                    $scope.departamentosTbl = [].concat(data);
                });
            };

            $scope.init();
        }]);
}());