
(function () {
    var app = angular.module('app');

    app.controller('MateriaCont', ["$scope", "$rootScope", 'MateriaServ',  function ($scope, $rootScope,MateriaServ) {
            $scope.materiaSel = undefined;
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
                if ((!angular.isUndefined($scope.materiaSel) && $scope.materiaSel.id === d.id)) {
                    $scope.materiaSel = undefined;
                } else {
                    $scope.materiaSel = $.extend({}, d, true);
                }
            };


            $scope.onClear = function () {
                $scope.materiaSel = undefined;
                if (!angular.isUndefined($scope.materiaSel)) {
                    $scope.materiaSel.nombre = undefined;
                    $scope.materiaSel.codigo = undefined;
                }
            };

            $scope.create = function () {
                if (angular.isUndefined($scope.materiaSel.nombre) || $scope.materiaSel.nombre.length > $scope.validations.nombre.maxlength) {
                    $.m_sms({
                        error: {
                            sms: "El campo nombre no debe superar los 50 caracteres."
                        }
                    });
                    $scope.saving = false;
                } else {
                    MateriaServ.create($scope.materiaSel).success(function (data) {
                        $scope.init();
                    });
                }
            };

            $scope.update = function () {
                if (angular.isUndefined($scope.materiaSel.nombre) || $scope.materiaSel.nombre.length > $scope.validations.nombre.maxlength) {
                    $.m_sms({
                        error: {
                            sms: "El campo codigo no debe superar los 50 caracteres."
                        }
                    });
                    $scope.saving = false;
                } else {
                    MateriaServ.update($scope.materiaSel).success(function (data) {
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
                    id = $scope.materiaSel.id;
                }
                MateriaServ.disable(id).success(function (data) {
                    $scope.onClear();
                    $scope.init();
                });
            };
            $scope.enable = function (id) {
                if (angular.isUndefined(id)) {
                    id = $scope.materiaSel.id;
                }
                MateriaServ.enable(id).success(function (data) {
                    $scope.onClear();
                    $scope.init();
                });
            };

            $scope.remove = function (id) {
                if (angular.isUndefined(id)) {
                    id = $scope.materiaSel.id;
                }
                MateriaServ.remove({
                    "id": id
                }).success(function (data) {
                    $scope.onClear();
                    $scope.init();
                });
            };

            $scope.init = function () {
                $scope.materias = [];
                $scope.materiasTbl = [];

                MateriaServ.load({

                    "jconf": JSON.stringify({
                        'attrs': ['id', 'nombre', 'codigo', 'deletedAt'],
                        '@filters': $scope.jconfFiltro
                    }),
                    "query": JSON.stringify({
                        orders: ["nombre"]
                    })
                }).success(function (data) {
                    $scope.materias = data;
                    $scope.materiasTbl = [].concat(data);
                });

//                ProfesorServ.load({
//                    "jconf": JSON.stringify({
//                        'attrs': ['id', 'nombre', 'codigo', 'deletedAt'],
//                        '@filters': $scope.jconfFiltro
//                    }),
//                    "query": JSON.stringify({
//                        orders: ["nombre"]
//                    })
//                }).success(function (data) {
//                    $scope.profesores = data;
//                });
            };

            $scope.init();



        }]);
}());