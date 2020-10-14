/**
 * CICHA Created: 15/12/2014
 */
(function () {
    var app = angular.module('app');

    app.controller('LocalidadActCont', ["$scope", "$rootScope", 'LocalidadServ', '$stateParams', function ($scope, $rootScope, LocalidadServ, $stateParams) {
            $scope.localidadSel = undefined;
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
                if ((!angular.isUndefined($scope.localidadSel) && $scope.localidadSel.id === d.id)) {
                    $scope.localidadSel = undefined;
                } else {
                    $scope.localidadSel = $.extend({}, d, true);
                }
            };


            $scope.onClear = function () {
                $scope.localidadSel = undefined;
                
            };

            $scope.create = function () {

                if (angular.isUndefined($scope.localidadSel.nombre) || $scope.localidadSel.nombre.length > $scope.validations.nombre.maxlength ) {

                    $.m_sms({
                        error: {
                            sms: "El campo codigo postal no debe superar los 50 caracteres."
                        }
                    });
                    $scope.saving = false;
                } else if (angular.isUndefined($scope.localidadSel.codigo) || $scope.localidadSel.codigo.length > $scope.validations.nombre.maxlength )  {

                    $.m_sms({
                        error: {
                            sms: "El campo nombre postal no debe superar los 50 caracteres."
                        }
                    });
                    $scope.saving = false;
                } else {
                    $scope.localidadSel.departamentoId = $stateParams.departamentoId;
                    LocalidadServ.create($scope.localidadSel).success(function (data) {
                        $scope.init();
                        $scope.onClear();
                    });
                }
            };

            $scope.update = function () {
                if (angular.isUndefined($scope.localidadSel.nombre) || $scope.localidadSel.nombre.length > $scope.validations.nombre.maxlength ) {

                    $.m_sms({
                        error: {
                            sms: "El campo codigo postal no debe superar los 50 caracteres."
                        }
                    });
                    $scope.saving = false;
                } else if (angular.isUndefined($scope.localidadSel.codigo) || $scope.localidadSel.codigo.length > $scope.validations.nombre.maxlength )  {

                    $.m_sms({
                        error: {
                            sms: "El campo nombre postal no debe superar los 50 caracteres."
                        }
                    });
                    $scope.saving = false;
                } else {
                    LocalidadServ.update($scope.localidadSel).success(function (data) {
                        $scope.init();
                        $scope.onClear();
                    });
                }
            };

            $scope.remove = function (id) {
                if (angular.isUndefined(id)) {
                    id = $scope.localidadSel.id;
                }
                LocalidadServ.remove({
                    "id": id
                }).success(function (data) {
                    $scope.onClear();
                    $scope.init();
                });
            };

            $scope.disable = function (id) {
                if (angular.isUndefined(id)) {
                    id = $scope.localidadSel.id;
                }
                LocalidadServ.disable(id).success(function (data) {
                    $scope.onClear();
                    $scope.init();
                });
            };

            $scope.onAction = function (response, action) {
                response.success(function () {
                    $scope.init();
                });
            };

            $scope.enable = function (id) {
                if (angular.isUndefined(id)) {
                    id = $scope.localidadSel.id;
                }
                LocalidadServ.enable(id).success(function (data) {
                    $scope.onClear();
                    $scope.init();
                });
            };

            $scope.init = function () {

                $scope.onClear();

                $rootScope.$broadcast("reload-localidad", $stateParams.departamentoId);

                $scope.localidades = [];
                $scope.localidadesTbl = [];

                LocalidadServ.load({
                    departamentoId: $stateParams.departamentoId,
                    "jconf": JSON.stringify($.jconf.cascadeFilter(jconf.direccion.localidad.act, $scope.jconfFiltro)),
                    "query": JSON.stringify({
                        orders: ["nombre"]
                    })
                }).success(function (data) {
                    $scope.localidades = data;
                    $scope.localidadesTbl = [].concat(data);
                });
            };

            $scope.init();
        }]);
}());