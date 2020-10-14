/* 
 * CICHA Created: 26/03/2015
 */
(function () {
    var app = angular.module('app');
    app.directive('direccion', ['PaisServ', 'ProvinciaServ', 'DepartamentoServ', 'LocalidadServ', function (PaisServ, ProvinciaServ, DepartamentoServ, LocalidadServ) {
            return{
                restrict: 'E',
                replace: true,
                templateUrl: templates.direccion.form,
                scope: {
                    dir: "=?",
                    paisId: "=?",
                    provinciaId: "=?",
                    departamentoId: "=?",
                    localidadId: "=?",
                    requiredFields: "=?"
                },
                controller: function ($scope) {

                    var private = {};
                    $scope.loadingDireccion = {
                        provincia: false,
                        departamento: false,
                        localidad: false
                    };
                    $scope.paises = [];
                    $scope.dir = $.un($scope.dir) ? {} : $scope.dir;
                    $scope.dir.localidadDepartamentoProvinciaPaisId = $scope.paisId;
                    $scope.dir.localidadDepartamentoProvinciaId = $scope.provinciaId;
                    $scope.dir.localidadDepartamentoId = $scope.departamentoId;
                    $scope.dir.localidadId = $scope.localidadId;


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
                            jconf: JSON.stringify($.jconf.onlyEnabled(jconf.direccion.pais.lst))
                        }).success(function (data) {
                            $scope.paises = data;
                            $scope.onChangePais();
                        });
                    };

                    $scope.$watch('dir', function (dir, oldDir) {
                        //cada vez que cambia la direccion
                        //se deben seleccionar los combos de depto y de localidad
                        if (dir !== oldDir && $scope.paises.length !== 0) {
                            $scope.onChangePais();
                        }
                        if ($.un(dir)) {
                            $scope.dir = {};
                            $scope.dir.localidadDepartamentoProvinciaPaisId = $scope.paisId;
                            $scope.dir.localidadDepartamentoProvinciaId = $scope.provinciaId;
                            $scope.dir.localidadDepartamentoId = $scope.departamentoId;
                            $scope.dir.localidadId = $scope.localidadId;
                        }
                    }, true);
                    
                    $scope.$watch('paisId', function () {
                        if (!$.un($scope.dir) && $.un($scope.dir.localidadDepartamentoProvinciaPaisId)) {
                            $scope.dir.localidadDepartamentoProvinciaPaisId = $scope.paisId;
                        }
                    }, true);
                    
                    $scope.$watch('provinciaId', function () {
                        if (!$.un($scope.dir) && $.un($scope.dir.localidadDepartamentoProvinciaId)) {
                            $scope.dir.localidadDepartamentoProvinciaId = $scope.provinciaId;
                        }
                    }, true);
                    
                    $scope.$watch('departamentoId', function () {
                        if (!$.un($scope.dir) && $.un($scope.dir.localidadDepartamentoId)) {
                            $scope.dir.localidadDepartamentoId = $scope.departamentoId;
                        }
                    }, true);
                    
                    $scope.$watch('localidadId', function () {
                        if (!$.un($scope.dir) && $.un($scope.dir.localidadId)) {
                            $scope.dir.localidadId = $scope.localidadId;
                        }
                    }, true);

                    $scope.onChangeDepartamento = function () {
                        //En caso que no tenga asociada la direccion
                        if ($.un($scope.dir)) {
                            return;
                        }

                        if ($.un($scope.dir.localidadDepartamentoId)) {
                            //si se deselecciona la provincia deseleccionar el departamento
                            $scope.departamentoSel = undefined;
                            $scope.dir.localidadId = undefined;
                        } else {
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
                                        jconf: JSON.stringify({attrs: ['id', 'nombre', 'deletedAt']})
                                    }).success(function (data) {
                                        $scope.departamentoSel.localidades = data;
                                        $scope.localidadSel = $.m_findCollection($scope.dir.localidadId, $scope.departamentoSel.localidades);
                                        if ($.un($scope.localidadSel)) {
                                            $scope.dir.localidadId = undefined;
                                        }
                                        $scope.loadingDireccion.localidad = false;
                                    }).error(function () {
                                        $scope.loadingDireccion.localidad = false;
                                    });
                                }
                            } else {
                                //si no econtro el departamento (esta eliminado logicamente)
                                DepartamentoServ.load({
                                    jconf: JSON.stringify({
                                        attrs: ['id', 'nombre', 'deletedAt']
                                    }),
                                    id: $scope.dir.localidadDepartamentoId
                                }).success(function (data) {
                                    //se agrega el departamento que esta eliminada logicamente a la lista de departamentos
                                    $scope.provinciaSel.departamentos.push(data);
                                    //se vuelve a llamar al onChangeDepartamento, para que esta vez encuentre el departamento seleccionado
                                    //y cargue tambien sus localidades
                                    $scope.onChangeDepartamento();
                                });
                            }
                        }
                    };

                    $scope.onChangeProvincia = function () {
                        //En caso que no tenga asociada la direccion
                        if ($.un($scope.dir)) {
                            return;
                        }
                        if ($.un($scope.dir.localidadDepartamentoProvinciaId)) {
                            //si se deselecciona la provincia deseleccionar el departamento
                            $scope.provinciaSel = undefined;
                            $scope.dir.localidadDepartamentoId = undefined;
                            $scope.onChangeDepartamento();
                        } else {
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
                                        jconf: JSON.stringify($.jconf.onlyEnabled({
                                            attrs: ['id', 'nombre']
                                        }))
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
                            } else {
                                //si no econtro la provincia (esta eliminada logicamente)
                                ProvinciaServ.load({
                                    jconf: JSON.stringify({
                                        attrs: ['id', 'nombre', 'deletedAt']
                                    }),
                                    id: $scope.dir.localidadDepartamentoProvinciaId
                                }).success(function (data) {
                                    //se agrega la provincia que esta eliminada logicamente a la lista de provincias
                                    $scope.paisSel.provincias.push(data);
                                    //se vuelve a llamar al onChangeProvincia, para que esta vez encuentre la provincia seleccionada
                                    //y cargue tambien sus departamentos
                                    $scope.onChangeProvincia();
                                });
                            }
                        }
                    };

                    $scope.onChangePais = function () {
                        //En caso que no tenga asociada la direccion
                        if ($.un($scope.dir)) {
                            return;
                        }

                        if ($.un($scope.dir.localidadDepartamentoProvinciaPaisId)) {
                            //si se deselecciona el pais deseleccionar la provincia
                            $scope.dir.localidadDepartamentoProvinciaId = undefined;
                            $scope.onChangeProvincia();
                        } else {
                            //si selecciono un pais, busco el pais por Id
                            $scope.paisSel = $.m_findCollection($scope.dir.localidadDepartamentoProvinciaPaisId, $scope.paises);
                            if (!$.un($scope.paisSel)) {
                                //si se encontro el pais
                                //si todavia no se cargaron por AJAX las provincias
                                if ($.un($scope.paisSel.provincias)) {
                                    $scope.loadingDireccion.provincia = true;
                                    //llamada ajax para trar localidades del depto seleccionado
                                    ProvinciaServ.find({
                                        paisId: $scope.paisSel.id,
                                        jconf: JSON.stringify($.jconf.onlyEnabled({
                                            attrs: ['id', 'nombre']
                                        }))
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
                            } else {//si no econtro el pais (esta eliminado logicamente)
                                PaisServ.load({
                                    jconf: JSON.stringify({
                                        attrs: ['id', 'nombre', 'deletedAt']
                                    }),
                                    id: $scope.dir.localidadDepartamentoProvinciaPaisId
                                }).success(function (data) {
                                    //se agrega el pais que esta eliminado logicamente a la lista de paises
                                    $scope.paises.push(data);
                                    //se vuelve a llamar al onChangePais, para que esta ves encuentre el pais seleccionado
                                    //y carge tambien sus provincias
                                    $scope.onChangePais();
                                });
                            }
                        }


                    };

                    $scope.resetFieldsDir = function (dir) {
                        $scope.dir = {};
                        $scope.provinciaSel = undefined;
                        $scope.departamentoSel = undefined;
                        $scope.departamentoSel = undefined;
                    };

                    private.init();
                }
            };
        }]);
}());