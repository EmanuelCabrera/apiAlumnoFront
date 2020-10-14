/**
 * CICHA Created: 15/12/2014
 */
(function () {
    var app = angular.module('app');

    app.controller('CalendarioCont', ["$scope", "$rootScope", 'CalendarioServ', function ($scope, $rootScope, CalendarioServ) {
            $scope.calendario = undefined;
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
                if ((!angular.isUndefined($scope.calendario) && $scope.calendario.id === d.id)) {
                    $scope.calendario = undefined;
                } else {
                    $scope.calendario = $.extend({}, d, true);
                }
            };


            $scope.onClear = function () {
                $scope.calendario.nombre = "";
                $scope.calendario.descripcion = "";
                $scope.calendario = undefined;

            };

            $scope.create = function () {
                if (angular.isUndefined($scope.calendario.nombre) || $scope.calendario.nombre.length > $scope.validations.nombre.maxlength) {
                    $.m_sms({
                        error: {
                            sms: "El campo nombre no debe superar los 50 caracteres."
                        }
                    });
                    $scope.saving = false;
                } else {
                    CalendarioServ.create($scope.calendario).success(function (data) {
                        $scope.init();
                        $scope.onClear();
                    });
                }
            };

            $scope.update = function () {
                if (angular.isUndefined($scope.calendario.nombre) || $scope.calendario.nombre.length > $scope.validations.nombre.maxlength) {
                    $.m_sms({
                        error: {
                            sms: "El campo codigo no debe superar los 50 caracteres."
                        }
                    });
                    $scope.saving = false;
                } else {
                    CalendarioServ.update($scope.calendario).success(function (data) {
                        $scope.init();
                        $scope.onClear();
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
                    id = $scope.calendario.id;
                }
                CalendarioServ.disable(id).success(function (data) {
                    $scope.onClear();
                    $scope.init();
                });
            };
            $scope.enable = function (id) {
                if (angular.isUndefined(id)) {
                    id = $scope.calendario.id;
                }
                CalendarioServ.enable(id).success(function (data) {
                    $scope.onClear();
                    $scope.init();
                });
            };

            $scope.remove = function (id) {
                if (angular.isUndefined(id)) {
                    id = $scope.calendario.id;
                }
                CalendarioServ.remove({
                    "id": id
                }).success(function (data) {
                    $scope.onClear();
                    $scope.init();
                });
            };

            $scope.init = function () {
                $scope.calendarios = [];
                $scope.calendariosTbl = [];

                CalendarioServ.load({

                    "jconf": JSON.stringify({
                        'attrs': ['id', 'nombre', 'descripcion', 'deletedAt'],
                        '@filters': $scope.jconfFiltro
                    }),
                    "query": JSON.stringify({
                        orders: ["nombre"]
                    })
                }).success(function (data) {
                    $scope.calendarios = data;
                    $scope.calendariosTbl = [].concat(data);
                });
            };

            $scope.init();
        }]);
}());