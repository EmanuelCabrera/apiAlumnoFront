//
//Miguel Created: 2016/03/30 
//
(function () {
    var app = angular.module('app');

    app.controller('MapViewTestCont', ["$scope", "$rootScope", "$window", function ($scope, $rootScope, $window) {

            $scope.points = [];
            
            $scope.direccion = {
                altura: 1457,
                calle: "Rivadavia",
                direccion: "Calle: Rivadavia 1457,  Posadas - Capital",
                id: 306960693,
                latitud: -27.3639716,
                localidadDepartamentoId: 305650562,
                localidadDepartamentoNombre: "Capital",
                localidadDepartamentoProvinciaId: 305640561,
                localidadDepartamentoProvinciaNombre: "Misiones",
                localidadDepartamentoProvinciaPaisId: 305380535,
                localidadDepartamentoProvinciaPaisNombre: "Argentina",
                localidadId: 306030600,
                localidadNombre: "Posadas",
                longitud: -55.8909325
            };

            $scope.plazas = [{
                    name: 'Plazas céntricas',
                    ico: 'plaza.JPG',
                    color: 'yellow',
                    points: [{
                            lng: -55.89758015,
                            lat: -27.3689513,
                            size: 8,
                            body: "La <b>Plaza San Martín</b> se encuentra en el área céntrica de Posadas, provincia de Misiones, Argentina.​ <a href='https://es.wikipedia.org/wiki/Plaza_San_Mart%C3%ADn_(Posadas)' target='_blank'>Wikipedia</a> <br/><u>Dirección:</u> FWA, Ayacucho 2005, N3301 Posadas"
                        }, {
                            lng: -55.8940579381993,
                            lat: -27.366496,
                            color: "green",
                            title: "Plaza 9 de Julio"
                        }]
                }];

            $scope.casadeGobierno = [{
                    name: 'Casa de Gobierno',
                    ico: 'government-buildings.png',
                    color: 'pink',
                    size: 32,
                    points: [{
                            lng: -55.8932058372064,
                            lat: -27.3664712,
                            body: "La Casa de Gobierno de Misiones, también conocida como La Rosadita, es la sede del Poder Ejecutivo de la Provincia de Misiones, en Argentina. <a href='https://es.wikipedia.org/wiki/Casa_de_Gobierno_de_Misiones' target='_blank'>Wikipedia</a> <br/><u>Dirección:</u> Felix de Azara 1749, N3301KLC Posadas, Misiones"
                        }]
                }];

            $scope.points = $scope.plazas;
            $scope.puntos = 'plazas';

            $scope.cambiarMarcadores = function () {
                if($scope.puntos == 'plazas'){
                    $scope.points = $scope.casadeGobierno;
                    $scope.puntos = 'casa';
                } else {
                    $scope.points = $scope.plazas;
                    $scope.puntos = 'plazas';
                }
            };
        }
    ]);
}());