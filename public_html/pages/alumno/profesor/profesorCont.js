
(function () {
    var app = angular.module('app');

    app.controller('ProfesorCont', ["$scope", "$rootScope", 'ProfesorServ', function ($scope, $rootScope, ProfesorServ) {
            $scope.profesorSel = undefined;
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
                if ((!angular.isUndefined($scope.profesorSel) && $scope.profesorSel.id === d.id)) {
                    $scope.profesorSel = undefined;
                } else {
                    $scope.profesorSel = $.extend({}, d, true);
                }
            };


            $scope.onClear = function () {
                $scope.profesorSel = undefined;
                if (!angular.isUndefined($scope.profesorSel)) {
                    $scope.profesorSel.nombre = undefined;
                    $scope.profesorSel.apellido = undefined;
                    $scope.profesorSel.contacto = undefined;
                }
            };

            $scope.create = function () {
                if (angular.isUndefined($scope.profesorSel.nombre) || $scope.profesorSel.nombre.length > $scope.validations.nombre.maxlength) {
                    $.m_sms({
                        error: {
                            sms: "El campo nombre no debe superar los 50 caracteres."
                        }
                    });
                    $scope.saving = false;
                } else {
                    ProfesorServ.create($scope.profesorSel).success(function (data) {
                        $scope.onClear();
                        $scope.init();
                    });
                }
            };

            $scope.update = function () {
                if (angular.isUndefined($scope.profesorSel.nombre) || $scope.profesorSel.nombre.length > $scope.validations.nombre.maxlength) {
                    $.m_sms({
                        error: {
                            sms: "El campo codigo no debe superar los 50 caracteres."
                        }
                    });
                    $scope.saving = false;
                } else {
                    ProfesorServ.update($scope.profesorSel).success(function (data) {
                        $scope.onClear();
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
                    id = $scope.profesorSel.id;
                }
                ProfesorServ.disable(id).success(function (data) {
                    $scope.onClear();
                    $scope.init();
                });
            };
            $scope.enable = function (id) {
                if (angular.isUndefined(id)) {
                    id = $scope.profesorSel.id;
                }
                ProfesorServ.enable(id).success(function (data) {
                    $scope.onClear();
                    $scope.init();
                });
            };

            $scope.remove = function (id) {
                if (angular.isUndefined(id)) {
                    id = $scope.profesorSel.id;
                }
                ProfesorServ.remove({
                    "id": id
                }).success(function (data) {
                    $scope.onClear();
                    $scope.init();
                });
            };

            $scope.init = function () {
                $scope.profesores = [];
                $scope.profesoresTbl = [];

                ProfesorServ.load({

                    "jconf": JSON.stringify($.jconf.cascadeFilter(jconf.profesor.form, $scope.jconfFiltro)),
                    "query": JSON.stringify({
                        orders: ["nombre"]
                    })
                }).success(function (data) {
                    $scope.profesores = data;
                    $scope.profesoresTbl = [].concat(data);
                });


            };

            $scope.init();



        }]);
}());