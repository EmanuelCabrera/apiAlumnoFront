(function () {
    var app = angular.module('app');

    app.controller('ApiRestCont', ["$scope", "$contenido", '$http', function ($scope, $contenido, $http) {
            var private = {};
            $scope.modes= {options2: {mode: 'tree'}, options1: {mode: 'code'}};
            $scope.resttabs = [
                {
                    name: "NEW",
                    url: "",
                    rest: {
                        method: "GET",
                        params: {},
                        data: {}
                    },
                    file: {
                        multiple: true,
                        contenidos: []
                    },
                    files: []
                }
            ];
            $scope.rests = [
                {
                    name: "GET Actividad",
                    url: "http://localhost:8080/guacurari-web/services/actividad",
                    rest: {
                        method: "GET",
                        params: {},
                        data: {}
                    },
                    file: {
                        multiple: true,
                        contenidos: []
                    },
                    files: []
                },
                {
                    name: "POST Actividad",
                    url: "http://localhost:8080/guacurari-web/services/actividad",
                    rest: {
                        method: "POST",
                        params: {},
                        data: {}
                    },
                    file: {
                        multiple: true,
                        contenidos: []
                    },
                    files: []
                }
            ];

            $scope.newRest = function () {
                if ($scope.newname) {
                    var tab = {
                        name: $scope.newname,
                        url: "",
                        rest: {
                            method: "GET",
                            params: {},
                            data: {}
                        },
                        file: {
                            multiple: true,
                            contenidos: []
                        },
                        files: []
                    };
                    $scope.rests.push(tab);
                    $scope.resttabs.push(tab);
                    $scope.newname = "";
                }
            };

            $scope.onSelectRest = function (selected) {
                if (!$scope.resttabs.includes(selected)) {
                    $scope.resttabs.push(selected);
                }
            };

            $scope.removeFile = function (file, rest) {
                rest.files.splice(rest.files.indexOf(file), 1);
            };

            $scope.addFile = function (rest) {
                rest.files.push(rest.file);
                rest.file = {
                    contenidos: []
                };
            };

            $scope.send = function (rest) {
                var http = $.extend(true, {}, rest.rest);
                http.url = rest.url;
                $.each(rest.rest.params, function (k, v) {
                    if (Object.prototype.toString.call(v) === '[object Object]' || Object.prototype.toString.call(v) === '[object Array]') {
                        http.params[k] = JSON.stringify(v);
                    }
                });
                $http(http).then(function (data) {
                    rest.response = data;
                }, function (data) {
                    rest.response = data;
                });
            };

            $scope.sendContent = function (rest) {
                var http = $.extend(true, {}, rest.rest);
                http.url = rest.url;
                if (rest.rest.method === "GET") {
                    throw new Error("No se puede hacer un send content en modo GET");
                    return;
                }
                var files = [];

                private.transformDataFiles(http.data, files);

                $contenido.separateFiles(http.data, files, "");
                var req = $contenido.uploadWithFiles(http, http.data, files);

                req.success(function (data, status, headers, config) {
                    var response = {
                        data: data,
                        status: status,
                        headers: headers,
                        config: config,
                    };
                    //se pasa a string y luego a json para limpiar las funciones
                    //$contenido retorna en config una funcion de tranformacion de datos que genera error
                    //si los datos retornados en data son modificados.
                    rest.response = JSON.parse(JSON.stringify(response));

                }).error(function (data, status, headers, config) {
                    var response = {
                        data: data,
                        status: status,
                        headers: headers,
                        config: config,
                    };
                    //se pasa a string y luego a json para limpiar las funciones
                    //$contenido retorna en config una funcion de tranformacion de datos que genera error
                    //si los datos retornados en data son modificados.
                    rest.response = JSON.parse(JSON.stringify(response));
                });
            };


            private.transformDataFiles = function (data, files) {
                console.log(data);
                $.each(data, function (k, v) {
                    if ((typeof v === 'string') && v.indexOf("#") == 0) {
                        for (var i = 0; i < files.length; i++) {
                            if (files[i].key == v) {
                                if (files[i].multiple) {
                                    data[k] = files[i].contenidos;
                                } else {
                                    data[k] = files[i].contenidos[0];
                                }
                                break;
                            }
                        }
                    } else if (Object.prototype.toString.call(v) === '[object Object]') {
                        private.transformDataFiles(v, files);
                    } else if (Object.prototype.toString.call(v) === '[object Array]') {
                        for (var i = 0; i < v.length; i++) {
                            private.transformDataFiles(v[i], files);
                        }
                    }
                });
            };

            private.init = function () {
                var aux = [];
                private.transformServ(services, aux);
                $scope.servicesUrl = aux;
            };

            private.transformServ = function (obj, servicesList) {
                $.each(obj, function (key, value) {
                    if (typeof value === 'string') {
                        servicesList.push(value);
                    } else {
                        private.transformServ(value, servicesList);
                    }
                });
            };


            private.init();
        }]);
}());
