//
//Miguel Created: 2016/03/30 
//
(function () {
    var app = angular.module('app');

    app.controller('MesaExamenActCont', ["$scope", "$rootScope", 'MesaExamenServ', '$state', '$stateParams', "$window", 'ProfesorServ', 'MateriaServ', function ($scope, $rootScope, MesaExamenServ, $state, $stateParams, $window, ProfesorServ, MateriaServ) {
            var private = {};
            $scope.mesaExamen = {
                presidenteId: "",
                primerVocalId: "",
                materiaId: ""
            };
            /**
             * 
             */
            $scope.saving = false;
            vm = this;
            vm.selected;

            $scope.create = function () {
                $scope.saving = true;
                MesaExamenServ.create($scope.mesaExamen)
                        .success(function (data) {

                            $window.history.back();
                        }).error(function () {
                    $scope.saving = false;
                });
            };

            $scope.update = function () {
                $scope.saving = true;
                MesaExamenServ.update($scope.mesaExamen)
                        .success(function (data) {
                            $window.history.back();
                        }).error(function () {
                    $scope.saving = false;
                });
            };



            $scope.init = function () {
                if ($stateParams.id) {
                    MesaExamenServ.load({
                        id: $stateParams.id,
                        jconf: jconf.mesaExamen.form
                    }).success(function (data) {
                        $scope.mesaExamen = data;
                        $scope.mesaExamen = new Date(data.fecha);
                    });
                }

            };

            $scope.init();
////DATE PICKER
            $scope.openDatepicker = function () {
                $scope.datepicker.opened = true;
            };
            $scope.datepickerDesde = {
                opened: false
            };

            $scope.openDatepickerDesde = function () {
                $scope.datepickerDesde.opened = true;
            };

            $scope.dateOptionsDesde = {
                formatYear: 'yyyy',
                startingDay: 1
            };


////SELECTS 
            $scope.selectPresidente = {
                service: "ProfesorServ",
                serviceSearch: function (data, config) {
                    console.log(data);
                    var request = $.extend({}, data);
                    request.jconf = {
                        attrs: ['pages', 'count'],
                        list: config.jconf
                    };
                    console.log(request);
                    return ProfesorServ.load(request);
                },
                textName: "Presidente",
                jconf: {attrs: ['id', 'nombre', 'apellido', 'contacto.correo', 'deletedAt']},
                parser: function (item) {
                    return item.nombre + " " + item.apellido;
                }
            };

            $scope.selectVocal = {
                service: "ProfesorServ",
                serviceSearch: function (data, config) {
                    console.log(data);
                    var request = $.extend({}, data);
                    request.jconf = {
                        attrs: ['pages', 'count'],
                        list: config.jconf
                    };
                    console.log(request);
                    return ProfesorServ.load(request);
                },
                textName: "Primer Vocal",
                jconf: {attrs: ['id', 'nombre', 'apellido', 'contacto.correo', 'deletedAt']},
                parser: function (item) {
                    return item.nombre + " " + item.apellido;
                }
            };

            $scope.selectMateria = {
                service: "MateriaServ",
                serviceSearch: function (data, config) {
                    console.log(data);
                    var request = $.extend({}, data);
                    request.jconf = {
                        attrs: ['pages', 'count'],
                        list: config.jconf
                    };
                    console.log(request);
                    return MateriaServ.load(request);
                },
                textName: "Materia",
                jconf: {attrs: ['id', 'nombre', 'codigo', 'deletedAt']},
                parser: function (item) {
                    return item.nombre + " " + item.codigo;
                }
            };
        }]);
}());