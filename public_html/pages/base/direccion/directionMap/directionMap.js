/* Forma de Uso
 * Copiar e inyectar los archivos de la directiva en el index.html
 * Copiar los archivos de mapbox-gl-0.42.0 en la carpeta libs e inyectarlos en el index.html si no esta hecho previamente
 * agregar el token del mapbox en el archivo app.js si no esta hecho previamente
 <direction-map direccion="direccion"(opcional) required-fields="requiredFields"(opcional)></direction-map>
 */
(function () {
    var app = angular.module('app');
    app.directive("directionMap", ['LocalidadServ', '$http', '$compile', '$parse', function (LocalidadServ, $http, $compile, $parse) {
            return {
                restrict: 'E',
                replace: true,
                templateUrl: 'pages/base/direccion/directionMap/directionMap.html',
                scope: {
                    direccion: "=?",
                    requiredFields: "=?",
                    zoom: "=?",
                    centerlong: "=?",
                    centerlat: "=?",
                    autoLocation: "=?",
                    paisId: "=?",
                    provinciaId: "=?",
                    departamentoId: "=?",
                    localidadId: "=?"
                },
                controller: function ($scope) {
                    $scope.popups = [];
                    $scope.layers = [];
                    $scope.direccion = $.un($scope.direccion) ? {} : $scope.direccion;
                    $scope.zoom = $.un($scope.zoom) ? 7 : $scope.zoom;
                    $scope.centerlong = $.un($scope.centerlong) ? -54.6 : $scope.centerlong;
                    $scope.centerlat = $.un($scope.centerlat) ? -26.8 : $scope.centerlong;
                    $scope.requiredFields = $.un($scope.requiredFields) ? [] : $scope.requiredFields;
                    $scope.autoLocation = $.un($scope.autoLocation) ? false : $scope.autoLocation;
                    $scope.loading = true;
                    $scope.auto = true;
                    $scope.nominatimUrl = $.un(config.nominatimUrl) ? 'https://map.marandu.com.ar/nominatim/' : config.nominatimUrl;
                    $scope.localidades = [];
                    $scope.paisId = $.un($scope.paisId) ? undefined : $scope.paisId;
                    $scope.provinciaId = $.un($scope.provinciaId) ? undefined : $scope.provinciaId;
                    $scope.departamentoId = $.un($scope.departamentoId) ? undefined : $scope.departamentoId;
                    $scope.localidadId = $.un($scope.localidadId) ? undefined : $scope.localidadId;

                    $scope.init = function () {
                        LocalidadServ.load({
                            jconf: JSON.stringify(jconf.direccion.localidad.lst),
                            departamentoId: $scope.direccion.localidadDepartamentoId
                        }).success(function (data) {
                            $scope.localidades = data;
                            $scope.loading = false;
                            if (!$.un($scope.direccion) && !$.un($scope.direccion.localidadId)
                                    && !$.un($scope.direccion.calle) && $scope.direccion.calle.length > 2
                                    && $scope.auto)
                            {
                                $scope.geoDecode();
                            }
                            if ($scope.autoLocation)
                                $scope.lc.start();
                        });
                    };
                    
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

                    var map = L.map('map', {
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

                    L.control.layers(baseMaps).addTo(map);

                    $scope.lc = L.control.locate({
                        drawCircle: false,
                        drawMarker: false,
                        onLocationError: function (err) {
                            console.log(err);
//                            $.m_sms({
//                                error: {
//                                    sms: "No se pudo geolocalizar al usuario."
//                                }
//                            });
                        },
                        position: 'topright',
                        showPopup: false,
                        strings: {
                            title: "Mi ubicación"
                        },
                        locateOptions: {
                            enableHighAccuracy: true
                        }
                    }).addTo(map);



                    function onLocationFound(e) {
                        $scope.direccion.latitud = e.latlng.lat;
                        $scope.direccion.longitud = e.latlng.lng;
                        $scope.centrarMapa();
                        $scope.lc.stop();
                    }

                    map.on('locationfound', onLocationFound);

                    map.on('click', function (e) {
                        $scope.direccion.latitud = e.latlng.lat;
                        $scope.direccion.longitud = e.latlng.lng;
                        $scope.agregarMarcador();
                        map.panTo(e.latlng);
                    });

                    $scope.agregarMarcador = function (marcador) {
                        if ($scope.marker)
                            map.removeLayer($scope.marker);
                        $scope.marker = L.marker([$scope.direccion.latitud, $scope.direccion.longitud], {draggable: 'true'}).addTo(map);
                        $scope.marker.on('dragend', function (event) {
                            var position = event.target.getLatLng();
                            $scope.direccion.latitud = position.lat;
                            $scope.direccion.longitud = position.lng;
                            map.panTo(new L.LatLng(position.lat, position.lng));
                        });
                        if (marcador)
                            $scope.marker.bindPopup(marcador).openPopup();
                    };

                    $scope.$watchGroup(['direccion.calle', 'direccion.altura', 'direccion.localidadId'], function () {
                        if (!$scope.loading) {
                            if (!$.un($scope.direccion) && !$.un($scope.direccion.localidadId)
                                    && !$.un($scope.direccion.calle) && $scope.direccion.calle.length > 2
                                    && $scope.auto)
                            {
                                $scope.geoDecode();
                            }
                            if (!$.un($scope.direccion) && $.un($scope.direccion.localidadId)
                                    && $.un($scope.direccion.calle) && $.un($scope.direccion.altura)) {
                                $scope.eliminarCoordenadas();
                            }
                        }
                    });

                    $scope.geoDecode = function () {
                        if (!$.un($scope.direccion) && !$.un($scope.direccion.localidadId) && !$.un($scope.direccion.calle) && $scope.direccion.calle.length > 2)
                        {
                            $scope.loading = true;
                            LocalidadServ.load({
                                jconf: JSON.stringify(jconf.direccion.localidad.lst),
                                departamentoId: $scope.direccion.localidadDepartamentoId
                            }).success(function (data) {
                                $scope.localidades = data;
                                $scope.loading = false;
                                var address = "";
                                if ($scope.direccion.calle != undefined)
                                    address += $scope.direccion.calle + "+";
                                if ($scope.direccion.altura != undefined)
                                    address += $scope.direccion.altura + "+";
                                address += $scope.localidades.find(o => o.id === $scope.direccion.localidadId).nombre;
                                $http.get($scope.nominatimUrl + "search.php?q=" + address + "&format=json&addressdetails=1")
                                        .then(function (response) {
                                            if (response.data.length != 0) {
                                                $scope.direccion.longitud = parseFloat(response.data[0].lon);
                                                $scope.direccion.latitud = parseFloat(response.data[0].lat);
                                                var marcador = "";
                                                if (response.data[0].address.address29 != undefined)
                                                    marcador = response.data[0].address.address29 + ", ";
                                                if (response.data[0].address.road != undefined)
                                                    marcador += response.data[0].address.road + " ";
                                                if (response.data[0].address.house_number != undefined)
                                                    marcador += response.data[0].address.house_number + ", ";
                                                if (response.data[0].address.city != undefined)
                                                    marcador += response.data[0].address.city;
                                                if (marcador == "")
                                                    marcador += response.data[0].display_name;
                                                $scope.centrarMapa(marcador);
                                            } else {

                                            }
                                        }, function (response) {
                                            console.log(response);
                                        });
                            });
                        }
                    };

                    $scope.geoDecodeMaps = function () {
                        if (!$.un($scope.direccion) && !$.un($scope.direccion.localidadId) && !$.un($scope.direccion.calle) && $scope.direccion.calle.length > 2)
                        {
                            $scope.loading = true;
                            LocalidadServ.load({
                                jconf: JSON.stringify(jconf.direccion.localidad.lst),
                                departamentoId: $scope.direccion.localidadDepartamentoId
                            }).success(function (data) {
                                $scope.localidades = data;
                                $scope.loading = false;
                                var geocoder = new google.maps.Geocoder();
                                var address = $scope.direccion.calle + " " + $scope.direccion.altura + ", ";
//                            if ($scope.direccion.calle != undefined)
//                                address += $scope.direccion.calle + " ";
//                            if ($scope.direccion.altura != undefined)
//                                address += $scope.direccion.altura + ", ";
                                address += $scope.localidades.find(o => o.id === $scope.direccion.localidadId).nombre + ", ";
                                address += "Misiones";

                                geocoder.geocode({'address': address}, function (results, status) {
                                    if (status === 'OK') {
                                        $scope.direccion.longitud = results[0].geometry.location.lng();
                                        $scope.direccion.latitud = results[0].geometry.location.lat();
                                        var marcador = results[0].formatted_address;
                                        $scope.centrarMapa(marcador);
                                    } else {
                                        $.m_sms({
                                            error: {
                                                sms: "No se encontró la dirección en el mapa."
                                            }
                                        });
                                    }
                                });
                            });
                        }
                    };

                    $scope.centrarMapa = function (marcador) {
                        if (!$.un($scope.direccion) && !$.un($scope.direccion.longitud) && !$.un($scope.direccion.latitud)) {
                            map.flyTo([$scope.direccion.latitud, $scope.direccion.longitud], 15, {animate: true, duration: 1});
                            $scope.agregarMarcador(marcador);
                        }
                    };

                    $scope.eliminarCoordenadas = function () {
                        $scope.direccion.latitud = null;
                        $scope.direccion.longitud = null;
                        if ($scope.marker)
                            map.removeLayer($scope.marker);
                        map.flyTo([$scope.centerlat, $scope.centerlong], $scope.zoom, {animate: true, duration: 1});
                    };
//
//
//                    // Holds mousedown state for events. if this
//                    // flag is active, we move the point on `mousemove`.
//                    var isDragging;
//
//                    // Is the cursor over a point? if this
//                    // flag is active, we listen for a mousedown event.
//                    var isCursorOverPoint;
//                    var map = new mapboxgl.Map({
//                        container: 'map',
//                        style: 'mapbox://styles/mapbox/streets-v10',
//                        center: [$scope.centerlong, $scope.centerlat], // starting position
//                        zoom: $scope.zoom // starting zoom
//                    });
//
//                    map.addControl(new mapboxgl.FullscreenControl());
//
//                    var geolocate = new mapboxgl.GeolocateControl({
//                        positionOptions: {
//                            enableHighAccuracy: true
//                        },
//                        trackUserLocation: false,
//                        showUserLocation: false
//                    });
//
//                    map.addControl(geolocate);
//                    
//                    geolocate.on('geolocate', function (e) {
//                        $scope.direccion.latitud = e.coords.latitude;
//                        $scope.direccion.longitud = e.coords.longitude;
//                        geojson.features[0].geometry.coordinates = [$scope.direccion.longitud, $scope.direccion.latitud];
//                        $scope.agregarMarcador();
//                        $scope.popups.forEach(function (popup) {
//                            popup.setLngLat([$scope.direccion.longitud, $scope.direccion.latitud]);
//                        });
//                        map.flyTo({center: geojson.features[0].geometry.coordinates, zoom: 15, speed: 1, curve: 1});
//                    });
//
//                    var canvas = map.getCanvasContainer();
//
//                    var geojson = {
//                        "type": "FeatureCollection",
//                        "features": [{
//                                "type": "Feature",
//                                "geometry": {
//                                    "type": "Point",
//                                    "coordinates": [$scope.centerlong, $scope.centerlat]
//                                }
//                            }]
//                    };
//
//                    function mouseDown() {
//                        if (!isCursorOverPoint)
//                            return;
//
//                        isDragging = true;
//
//                        // Set a cursor indicator
//                        canvas.style.cursor = 'grab';
//
//                        // Mouse events
//                        map.on('mousemove', onMove);
//                        map.once('mouseup', onUp);
//
//
//                    }
//
//                    function onMove(e) {
//                        if (!isDragging)
//                            return;
//                        var coords = e.lngLat;
//
//                        // Set a UI indicator for dragging.
//                        canvas.style.cursor = 'grabbing';
//
//                        // Update the Point feature in `geojson` coordinates
//                        // and call setData to the source layer `point` on it.
//                        geojson.features[0].geometry.coordinates = [coords.lng, coords.lat];
//                        $scope.direccion.latitud = coords.lat;
//                        $scope.direccion.longitud = coords.lng;
//                        map.getSource('point').setData(geojson);
//                        $scope.popups.forEach(function (popup) {
//                            popup.setLngLat([$scope.direccion.longitud, $scope.direccion.latitud]);
//                        });
//                        //map.flyTo({center: geojson.features[0].geometry.coordinates});
//                    }
//
//                    function onUp(e) {
//                        if (!isDragging)
//                            return;
//                        var coords = e.lngLat;
//
//                        canvas.style.cursor = '';
//                        isDragging = false;
//
//                        // Unbind mouse events
//                        map.off('mousemove', onMove);
//
//                        map.flyTo({center: coords});
//                    }
//
//                    map.on('load', function () {
//
//                        // Add a single point to the map
//                        map.addSource('point', {
//                            "type": "geojson",
//                            "data": geojson
//                        });
//
//                        // When the cursor enters a feature in the point layer, prepare for dragging.
//                        map.on('mouseenter', 'point', function () {
//                            map.setPaintProperty('point', 'circle-color', '#3bb2d0');
//                            canvas.style.cursor = 'move';
//                            isCursorOverPoint = true;
//                            map.dragPan.disable();
//                        });
//
//                        map.on('mouseleave', 'point', function () {
//                            map.setPaintProperty('point', 'circle-color', '#3887be');
//                            canvas.style.cursor = '';
//                            isCursorOverPoint = false;
//                            map.dragPan.enable();
//                        });
//
//                        map.on('mousedown', mouseDown);
//                        
//                        if ($scope.autoLocation) geolocate._geolocateButton.click();
//
//                        $scope.centrarMapa();
//                        $scope.loading = false;
//                    });
//
//                    map.on('click', function (e) {
//                        $scope.direccion.latitud = e.lngLat.lat;
//                        $scope.direccion.longitud = e.lngLat.lng;
//                        geojson.features[0].geometry.coordinates = [$scope.direccion.longitud, $scope.direccion.latitud];
//                        $scope.agregarMarcador();
//                        $scope.popups.forEach(function (popup) {
//                            popup.setLngLat([$scope.direccion.longitud, $scope.direccion.latitud]);
//                        });
//                        map.flyTo({center: geojson.features[0].geometry.coordinates});
//                    });
//
//                    $scope.agregarMarcador = function () {
//                        geojson.features[0].geometry.coordinates = [$scope.direccion.longitud, $scope.direccion.latitud];
//                        map.getSource('point').setData(geojson);
//
//                        map.addLayer({
//                            "id": "point",
//                            "type": "circle",
//                            "source": "point",
//                            "paint": {
//                                "circle-radius": 10,
//                                "circle-color": "#3887be"
//                            }
//                        });
//
//
//                    };
//
//                    $scope.agregarPopup = function (marcador) {
//                        if (!$.un(marcador)) {
//                            htmlPopup = marcador;
//                        } else {
//                            htmlPopup = $scope.direccion.direccion;
//                        }
//                        var marker = new mapboxgl.Marker()
//                                .setLngLat([$scope.direccion.longitud, $scope.direccion.latitud])
//                                .addTo(map);
//                        var popupOffsets = {
//                            'bottom': [0, -10]
//                        };
//                        $scope.popups.forEach(function (popup) {
//                            popup.remove();
//                        });
//                        $scope.popups = [];
//                        var popup = new mapboxgl.Popup({offset: [0, -10], closeOnClick: false})
//                                .setLngLat([$scope.direccion.longitud, $scope.direccion.latitud])
//                                .setHTML(htmlPopup)
//                                .addTo(map);
//                        $scope.popups.push(popup);
//                    };
//
//                    $scope.eliminarCoordenadas = function () {
//                        $scope.direccion.latitud = undefined;
//                        $scope.direccion.longitud = undefined;
//                        if (map.getLayer("point")) {
//                            map.setLayoutProperty("point", 'visibility', 'none');
//                        }
//                        $scope.popups.forEach(function (popup) {
//                            popup.remove();
//                        });
//                        $scope.popups = [];
//                        map.flyTo({center: [$scope.centerlong, $scope.centerlat], zoom: $scope.zoom, speed: 1, curve: 1});
//                    };
//
//                    // Cambio de tipo de mapa
//                    $("[name='tipo']").bootstrapSwitch('onText', 'Callejero');
//                    $("[name='tipo']").bootstrapSwitch('onColor', 'primary');
//                    $("[name='tipo']").bootstrapSwitch('offText', 'Satelital');
//                    $("[name='tipo']").bootstrapSwitch('offColor', 'success');
//
//                    $('input[name="tipo"]').on('switchChange.bootstrapSwitch', function (event, state) {
//                        if (state) {
//                            map.setStyle('mapbox://styles/mapbox/satellite-streets-v10');
//                        } else {
//                            map.setStyle('mapbox://styles/mapbox/streets-v10');
//                        }
//
//                        map.on('style.load', function () {
//                            // Add a single point to the map
//                            if ($.un(map.getSource('point'))) {
//                                map.addSource('point', {
//                                    "type": "geojson",
//                                    "data": geojson
//                                });
//                            }
//
//                            var popupText;
//                            $scope.popups.forEach(function (popup) {
//                                popupText = popup._content.lastChild.data;
//                            });
//
//                            $scope.centrarMapa(popupText);
//                        });
//                    });

                    //****FIN MAPA****//

                    $scope.init();

                }
            };
        }]);
}());