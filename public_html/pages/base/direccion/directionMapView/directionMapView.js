/* Forma de Uso
 * Copiar e inyectar los archivos de la directiva en el index.html
 * Copiar los archivos de mapbox-gl-0.42.0 en la carpeta libs e inyectarlos en el index.html si no esta hecho previamente
 * agregar el token del mapbox en el archivo app.js si no esta hecho previamente
 <direction-map-view show-detail(opcional) direccion="direccion"(opcional) zoom="6"(opcional) centerlong=(opcional) centerlat=(opcional) points="points"></direction-map-view>
 */
(function () {
    var app = angular.module('app');
    app.directive("directionMapView", ['LocalidadServ', '$http', '$compile', '$parse', function (LocalidadServ, $http, $compile, $parse) {
            return {
                restrict: 'E',
                replace: true,
                templateUrl: 'pages/base/direccion/directionMapView/directionMapView.html',
                scope: {
                    direccion: "=?",
                    //zoom sobre el mapa por defecto en 6
                    zoom: "=?",
                    //centerlong y centerlat por defecto se ubica en la provincia de Misiones
                    centerlong: "=?",
                    centerlat: "=?",
                    showDetail: "&?",
                    points: "=?"
                },
                controller: function ($scope, $timeout) {
                    $scope.popups = [];
                    $scope.layers = [];
                    $scope.direccion = $.un($scope.direccion) ? undefined : $scope.direccion;
                    $scope.zoom = $.un($scope.zoom) ? 7 : $scope.zoom;
                    $scope.centerlong = $.un($scope.centerlong) ? -54.6 : $scope.centerlong;
                    $scope.centerlat = $.un($scope.centerlat) ? -26.8 : $scope.centerlong;
                    $scope.showDetail = $.un($scope.showDetail) ? false : true;
                    $scope.points = $.un($scope.points) ? [] : $scope.points;
                    $scope.grupoPuntos = {};
                    var map;
                    var canvas;
                    var geojson;

                    $scope.init = function () {
                        $scope.mapaClass = $scope.showDetail ? 'col-md-5' : 'col-md-12';
                    };

                    $scope.$watch('direccion', function () {
                        $timeout(function () {
                            if (!$.un($scope.direccion)) {
                                $scope.centrarMapa($scope.direccion.direccion);
                            }
                        }, 200);
                    });

                    $scope.$watch('points', function () {
                        var gruposPuntos = Object.keys($scope.grupoPuntos);
                        gruposPuntos.forEach(function (grupo) {
                            $scope.grupoPuntos[grupo].clearLayers();
                        });
                        $scope.grupoPuntos = {};
                        if ($scope.map) {
                            $scope.map.removeControl($scope.layerControl);
                            $scope.layerControl = L.control.layers(baseMaps).addTo($scope.map);
                        }
                        $timeout(function () {
                            $scope.points.forEach(function (pointGroup) {
                                $scope.agregarPuntos(pointGroup);
                            });
                            var gruposPuntos = Object.keys($scope.grupoPuntos);
                            gruposPuntos.forEach(function (grupo) {
                                $scope.layerControl.addOverlay($scope.grupoPuntos[grupo], grupo);
                            });
                        }, 200);
                    });

                    //****MAPA****//

                    var callejero = new L.tileLayer('https://streetmap.misiones.gob.ar/hot/{z}/{x}/{y}.png',
                            {attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, \n\
                                        <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'}
                    );

                    var satelital = new L.tileLayer('https://api.mapbox.com/v4/mapbox.streets-satellite/{z}/{x}/{y}.png?access_token=' + config.mapboxgl.accessToken,
                            {attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
                                        '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
                                        'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>'}
                    );

                    var baseMaps = {
                        "Callejero": callejero,
                        "Satelital": satelital
                    };

                    $timeout(function () {
                        $scope.map = L.map('map', {
                            center: [$scope.centerlat, $scope.centerlong], // starting position
                            zoom: $scope.zoom, // starting zoom
                            layers: [callejero],
                            fullscreenControl: {
                                pseudoFullscreen: false,
                                title: {
                                    'false': 'Ver en pantalla completa',
                                    'true': 'Salir de pantalla completa'
                                }
                            }
                        });

                        $scope.layerControl = L.control.layers(baseMaps).addTo($scope.map);

                    }, 200);

                    $scope.centrarMapa = function (marcador) {
                        if (!$.un($scope.direccion) && !$.un($scope.direccion.longitud) && !$.un($scope.direccion.latitud)) {
                            $scope.map.flyTo([$scope.direccion.latitud, $scope.direccion.longitud], 15, {animate: true, duration: 1});
                            $scope.agregarMarcador(marcador);
                        }
                    };

                    $scope.agregarMarcador = function (marcador) {
                        if ($scope.marker)
                            $scope.map.removeLayer($scope.marker);
                        $scope.marker = L.marker([$scope.direccion.latitud, $scope.direccion.longitud]).addTo($scope.map);
                        if (marcador)
                            $scope.marker.bindPopup(marcador).openPopup();
                    };

                    $scope.agregarPuntos = function (pointGroup) {
                        $scope[pointGroup.name + 'Group'] = undefined;
                        $scope[pointGroup.name + 'Markers'] = [];
                        pointGroup.points.forEach(function (punto) {
                            iconMarker = $.un(pointGroup.ico) ? null : L.icon({iconUrl: 'img/icons/' + pointGroup.ico, iconSize: [$.un(pointGroup.size) ? 16 : pointGroup.size]});
                            colorMarker = $.un(pointGroup.color) ? "blue" : pointGroup.color;
                            sizeMarker = $.un(pointGroup.size) ? 7.5 : pointGroup.size;
                            htmlpopup = '';
                            if (!$.un(punto.lng)) {
                                if (!$.un(punto.title))
                                    htmlpopup = '<div><b>' + punto.title + '</b></div>';
                                if (!$.un(punto.body)) {
                                    htmlpopup += '<div>' + punto.body + '</div>';
                                }
                                iconMarker = $.un(punto.ico) ? iconMarker : L.icon({iconUrl: 'img/icons/' + pointGroup.ico, iconSize: [$.un(punto.size) ? 16 : punto.size]});
                                sizeMarker = $.un(punto.size) ? sizeMarker : punto.size;
                                options = {
                                    radius: sizeMarker,
                                    fillColor: colorMarker,
                                    color: "black",
                                    weight: 0.5,
                                    opacity: 1,
                                    fillOpacity: 1
                                };
                                if (!$.un(punto.title) || !$.un(punto.body)) {
                                    if (iconMarker) {
                                        $scope[pointGroup.name + 'Markers'].push(L.marker([punto.lat, punto.lng], {icon: iconMarker}).bindPopup(htmlpopup));
                                    } else {
                                        $scope[pointGroup.name + 'Markers'].push(L.circleMarker([punto.lat, punto.lng], options).bindPopup(htmlpopup));
                                    }
                                } else {
                                    if (iconMarker) {
                                        $scope[pointGroup.name + 'Markers'].push(L.marker([punto.lat, punto.lng], {icon: iconMarker}));
                                    } else {
                                        $scope[pointGroup.name + 'Markers'].push(L.circleMarker([punto.lat, punto.lng], options));
                                    }
                                }
                            }
                            ;
                        });
                        $scope[pointGroup.name + 'Group'] = L.layerGroup($scope[pointGroup.name + 'Markers']);
                        $scope[pointGroup.name + 'Group'].addTo($scope.map);
                        nombreGrupo = pointGroup.name;
                        $scope.grupoPuntos[nombreGrupo] = $scope[pointGroup.name + 'Group'];
                    };

                    //****FIN MAPA****//

                    $scope.init();

                }
            };
        }]);
}());