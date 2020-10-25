
(function () {
    var app = angular.module('app');

    app.controller('AlumnoCont', ["$scope", "$rootScope", 'AlumnoServ', function ($scope, $rootScope, AlumnoServ) {
            $scope.alumnoSel = undefined;
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
                if ((!angular.isUndefined($scope.alumnoSel) && $scope.alumnoSel.id === d.id)) {
                    $scope.alumnoSel = undefined;
                } else {
                    $scope.alumnoSel = $.extend({}, d, true);
                }
            };


            $scope.onClear = function () {
                $scope.alumnoSel = undefined;
                if (!angular.isUndefined($scope.alumnoSel)) {
                    $scope.alumnoSel.nombre = undefined;
                    $scope.alumnoSel.apellido = undefined;
                    $scope.alumnoSel.contacto = undefined;
                }
            };

            $scope.create = function () {
                if (angular.isUndefined($scope.alumnoSel.nombre) || $scope.alumnoSel.nombre.length > $scope.validations.nombre.maxlength) {
                    $.m_sms({
                        error: {
                            sms: "El campo nombre no debe superar los 50 caracteres."
                        }
                    });
                    $scope.saving = false;
                } else {
                    AlumnoServ.create($scope.alumnoSel).success(function (data) {
                        $scope.onClear();
                        $scope.init();
                    });
                }
            };

            $scope.update = function () {
                if (angular.isUndefined($scope.alumnoSel.nombre) || $scope.alumnoSel.nombre.length > $scope.validations.nombre.maxlength) {
                    $.m_sms({
                        error: {
                            sms: "El campo codigo no debe superar los 50 caracteres."
                        }
                    });
                    $scope.saving = false;
                } else {
                    AlumnoServ.update($scope.alumnoSel).success(function (data) {
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
                    id = $scope.alumnoSel.id;
                }
                AlumnoServ.disable(id).success(function (data) {
                    $scope.onClear();
                    $scope.init();
                });
            };
            $scope.enable = function (id) {
                if (angular.isUndefined(id)) {
                    id = $scope.alumnoSel.id;
                }
                AlumnoServ.enable(id).success(function (data) {
                    $scope.onClear();
                    $scope.init();
                });
            };

            $scope.remove = function (id) {
                if (angular.isUndefined(id)) {
                    id = $scope.alumnoSel.id;
                }
                AlumnoServ.remove({
                    "id": id
                }).success(function (data) {
                    $scope.onClear();
                    $scope.init();
                });
            };

            $scope.init = function () {
                $scope.alumnos = [];
                $scope.alumnosTbl = [];

                AlumnoServ.load({

                    "jconf": JSON.stringify($.jconf.cascadeFilter(jconf.alumnos.form, $scope.jconfFiltro)),
                    "query": JSON.stringify({
                        orders: ["nombre"]
                    })
                }).success(function (data) {
                    $scope.alumnos = data;
                    $scope.alumnosTbl = [].concat(data);
                });


            };

            $scope.init();



        }]);
}());