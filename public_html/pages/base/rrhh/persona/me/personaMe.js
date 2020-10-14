//
//Miguel Created: 2016/03/30 
//
(function () {
    var app = angular.module('app');

    app.controller('PersonaMeCont', ["$scope", "$rootScope", 'PersonaServ', 'PaisServ', 'ProvinciaServ', 'DepartamentoServ', 'LocalidadServ', "$window",
        function ($scope, $rootScope, PersonaServ, PaisServ, ProvinciaServ, DepartamentoServ, LocalidadServ, $window) {
            var private = {};
            $scope.date = new Date();
            $scope.persona = {};
            $scope.saving = false;
            $scope.submited = false;
            $scope.rf = {direccion: [], contacto: [], persona: ['apellido', 'nombres', 'tipoDoc', 'documento']};
            $scope.paisId = undefined;
            $scope.provinciaId = undefined;
            $scope.departamentoId = undefined;
            $scope.localidadId = undefined;

            $scope.points = [{
                    nombre: 'test',
                    color: 'yellow',
                    tamaño: 10,
                    puntos: [{
                            longitud: -55.9149793387755,
                            latitud: -27.4101095979592,
                            tamaño: 5,
                            titulo: "Mi casa",
                            texto: "Mi direción es Juan Maza 3254 y para llegar podes ver estas <a href='https://www.google.com.ar/maps/place/Maza+3254,+Posadas,+Misiones/@-27.4095128,-55.9164265,17.75z/data=!4m5!3m4!1s0x9457be92df9b953b:0x46f9eb66672344ad!8m2!3d-27.4099613!4d-55.914858' target='_blank'>indicaciones</a>."
                        }, {
                            longitud: -55.9152502,
                            latitud: -27.4100378,
                            color: "blue",
                            titulo: "La agencia"
                        }]
                }];

            $scope.update = function () {
                $scope.saving = true;
                var config = {
                    queryParam: {
                        jconf: jconf.rrhh.persona.personaDireccionForm
                    }
                };

                PersonaServ.updateMe($scope.persona, config)
                        .success(function (data) {
                            $window.history.back();
                        }).error(function () {
                    $scope.saving = false;
                });
            };

            $scope.cargarDatosDireccion = function () {
                PaisServ.load({
                    jconf: JSON.stringify($.jconf.onlyEnabled(jconf.direccion.pais.lst))
                }).success(function (data) {
                    $scope.paises = data;
                    $scope.paisId = $scope.paises.find(o => o.nombre === 'Argentina').id;
                    ProvinciaServ.find({
                        paisId: $scope.paisId,
                        jconf: JSON.stringify($.jconf.onlyEnabled({
                            attrs: ['id', 'nombre']
                        }))
                    }).success(function (data) {
                        $scope.provincias = data;
                        $scope.provinciaId = $scope.provincias.find(o => o.nombre === 'Misiones').id;
                        DepartamentoServ.find({
                            provinciaId: $scope.provinciaId,
                            jconf: JSON.stringify($.jconf.onlyEnabled({
                                attrs: ['id', 'nombre']
                            }))
                        }).success(function (data) {
                            $scope.departamentos = data;
                            $scope.departamentoId = $scope.departamentos.find(o => o.nombre === 'Capital').id;
                            LocalidadServ.find({
                                        departamentoId: $scope.departamentoId,
                                        jconf: JSON.stringify({attrs: ['id', 'nombre', 'deletedAt']})
                                    }).success(function (data) {
                                        $scope.localidades = data;
                                        $scope.localidadId = $scope.localidades.find(o => o.nombre === 'POSADAS').id;
                                    });
                        });
                    });
                });
            };

            private.init = function () {
                PersonaServ.getMe({
                    "jconf": JSON.stringify(jconf.rrhh.persona.personaDireccionForm)
                }).success(function (data) {
                    if (!$.un(data.fechaNac)) {
                        data.fechaNac = new Date(data.fechaNac);
                    }
                    $scope.persona = data;
                    $scope.cargarDatosDireccion();
                });
            };


            private.init();
        }]);
}());