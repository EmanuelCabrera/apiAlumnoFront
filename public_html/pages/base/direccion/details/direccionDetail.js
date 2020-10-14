/* 
 * CICHA Created: 26/03/2015
 */
(function () {
    var app = angular.module('app');
    app.directive('direccionDetail', ['PaisServ', 'ProvinciaServ', 'DepartamentoServ', 'LocalidadServ', function (PaisServ, ProvinciaServ, DepartamentoServ, LocalidadServ) {
            return{
                restrict: 'E',
                replace: true,
                templateUrl: templates.direccion.direccionDetail,
                scope: {
                    dir: "=?",
                    requiredFields: "=?"
                },
                controller: function ($scope, $element, $attrs) {
                    var private = {};
                    $scope.loadingDireccion = {
                        provincia: false,
                        departamento: false,
                        localidad: false
                    };
                    $scope.paises = [];
                    $scope.dir = $.un($scope.dir) ? {} : $scope.dir;


                    $scope.$watch('requiredFields', function () {
                        $scope.requiredFields = $.un($scope.requiredFields) ? ['localidadDepartamentoId', 'localidadId', 'calle', 'altura'] : $scope.requiredFields;
                        $scope.rf = {
                            localidadDepartamentoProvinciaPaisId: $scope.requiredFields.indexOf('localidadDepartamentoProvinciaPaisId') > -1,
                            localidadDepartamentoProvinciaId: $scope.requiredFields.indexOf('localidadDepartamentoProvinciaId') > -1,
                            localidadDepartamentoId: $scope.requiredFields.indexOf('localidadDepartamentoId') > -1,
                            localidadId: $scope.requiredFields.indexOf('localidadId') > -1,
                            barrio: $scope.requiredFields.indexOf('barrio') > -1,
                            calle: $scope.requiredFields.indexOf('calle') > -1,
                            altura: $scope.requiredFields.indexOf('altura') > -1,
                            piso: $scope.requiredFields.indexOf('piso') > -1,
                            depto: $scope.requiredFields.indexOf('depto') > -1
                        };
                    });


                    private.init = function () {
                        PaisServ.load({
                            jconf: JSON.stringify(jconf.direccion.pais.lst)
                        }).success(function (data) {
                            $scope.paises = data;
                            $scope.onChangePais();
                        });

                    };

                     private.selDeptoLoc = function () {
                        //seleccion de combos de depto y localidad
                        if (!$.un($scope.dir)) {
                            if (!$.un($scope.dir.localidadDepartamentoProvinciaPaisId)) {
                                if ($.un($scope.paisSel)) {
                                    $scope.onChangePais();
                                } else if ($scope.paisSel.id != $scope.dir.localidadDepartamentoProvinciaPaisId) {
                                    //se tenia seleccionado otro depto
                                    $scope.onChangePais();
                                }
                            }
                        }
                    };

                    $scope.$watch('dir', function (vOld, vNew) {
                        //cada vez que cambia la direccion
                        //se deben seleccionar los combos de depto y de localidad
                        private.selDeptoLoc();
                    }, true);

                    $scope.onChangeDepartamento = function () {
                        //En caso que no tenga asociada la direccion
                        if ($.un($scope.dir)) {
                            return;
                        }
                        //busco el depto por Id
                        $scope.departamentoSel = $.m_findCollection($scope.dir.localidadDepartamentoId, $scope.provinciaSel.departamentos);
                        //si se encontro el departamento
                        if (!$.un($scope.departamentoSel)) {
                            //si todavia no se cargaron por AJAX las localidades
                            if ($.un($scope.departamentoSel.localidades)) {
                                $scope.loadingDireccion.localidad = true;
                                //llamada ajax para trar localidades del depto seleccionado
                                LocalidadServ.find({
                                    departamentoId: $scope.departamentoSel.id,
                                    jconf: JSON.stringify({attrs: ['id', 'nombre']})
                                }).success(function (data) {
                                    $scope.departamentoSel.localidades = data;
                                    $scope.loadingDireccion.localidad = false;
                                }).error(function () {
                                    $scope.loadingDireccion.localidad = false;
                                });
                            }
                        }
                    };

                    $scope.onChangePais = function () {
                        //En caso que no tenga asociada la direccion
                        if ($.un($scope.dir)) {
                            return;
                        }
                        //busco el pais por Id
                        $scope.paisSel = $.m_findCollection($scope.dir.localidadDepartamentoProvinciaPaisId, $scope.paises);
                        //si se encontro el departamento
                        if (!$.un($scope.paisSel)) {
                            //si todavia no se cargaron por AJAX las provincias
                            if ($.un($scope.paisSel.provincias)) {
                                $scope.loadingDireccion.provincia = true;
                                //llamada ajax para trar localidades del depto seleccionado
                                ProvinciaServ.find({
                                    paisId: $scope.paisSel.id,
                                    jconf: JSON.stringify({
                                        attrs: ['id', 'nombre']
                                    })
                                }).success(function (data) {
                                    $scope.paisSel.provincias = data;
                                    $scope.loadingDireccion.provincia = false;
                                    if (!$.un($scope.dir.localidadDepartamentoProvinciaId)) {
                                        $scope.onChangeProvincia();
                                    }
                                }).error(function () {
                                    $scope.loadingDireccion.provincia = false;
                                });
                            } else {
                                if (!$.un($scope.dir.localidadDepartamentoProvinciaId)) {
                                    $scope.onChangeProvincia();
                                }
                            }
                        }
                    };

                    $scope.onChangeProvincia = function () {
                        //En caso que no tenga asociada la direccion
                        if ($.un($scope.dir)) {
                            return;
                        }
                        //busco el provincia por Id
                        $scope.provinciaSel = $.m_findCollection($scope.dir.localidadDepartamentoProvinciaId, $scope.paisSel.provincias);
                        //si se encontro el departamento
                        if (!$.un($scope.provinciaSel)) {
                            //si todavia no se cargaron por AJAX las provincias
                            if ($.un($scope.provinciaSel.departamentos)) {
                                $scope.loadingDireccion.departamento = true;
                                //llamada ajax para trar localidades del depto seleccionado
                                DepartamentoServ.find({
                                    provinciaId: $scope.provinciaSel.id,
                                    jconf: JSON.stringify({
                                        attrs: ['id', 'nombre']
                                    })
                                }).success(function (data) {
                                    $scope.provinciaSel.departamentos = data;
                                    $scope.loadingDireccion.departamento = false;
                                    if (!$.un($scope.dir.localidadDepartamentoId)) {
                                        $scope.onChangeDepartamento();
                                    }
                                }).error(function () {
                                    $scope.loadingDireccion.departamento = false;
                                });
                            } else {
                                if (!$.un($scope.dir.localidadDepartamentoId)) {
                                    $scope.onChangeDepartamento();
                                }
                            }
                        }
                    };
                    private.init();
                }
            };
        }]);
}());/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


