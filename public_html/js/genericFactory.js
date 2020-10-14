/* 
 * CICHA Updated: 07/01/2014
 *       Soporte para distintos formatos de envio de datos 
 * CICHA Created: 19/11/2014
 * factoria generica de la cual van a heredar los servicios individuales
 * para reutilizar codigo ya que la mayoria de los services de CRUD tienen las mismas operaciones
 * IDEADO Y DESARROLLADO POR CICHANOWSKI MIGUEL ALEJANDRO
 * 
 * Conceptos de javascript herencia:
 * http://www.2ality.com/2012/01/js-inheritance-by-example.html
 * Herencia en angular:
 * http://blog.revolunet.com/blog/2014/02/14/angularjs-services-inheritance/
 */
(function () {
    var app = angular.module('app');

    app.factory('genF', ['$http', "$httpParamSerializer", 'genS', "$contenido", function ($http, $httpParamSerializer, genS, $contenido) {
            var genF = function (params) {
                this.urlS = params.urlS;
                this.rParams = params;
                this.sendType = {
                    "default": 1,
                    "remove": 1,
                    "get": 1,
                    "create": 1, //json, utilice un entero para eficiencia en la comparacion
                    "update": 1//json
                };
                if (!$.un(params.sendType)) {
                    if (params.sendType === "json") {
                        this.sendType = {
                            "default": 0,
                            "remove": 0,
                            "get": 0,
                            "create": 0,
                            "update": 0
                        };
                    } else if (typeof params.sendType === "object") {
                        if (!$.un(params.sendType.default)) {
                            if (params.sendType.create === 'json') {
                                this.sendType.default = 0;
                            }
                        }
                        if (!$.un(params.sendType.get)) {
                            if (params.sendType.get === 'json') {
                                this.sendType.get = 0;
                            }
                        }
                        if (!$.un(params.sendType.remove)) {
                            if (params.sendType.remove === 'json') {
                                this.sendType.remove = 0;
                            }
                        }
                        if (!$.un(params.sendType.create)) {
                            if (params.sendType.create === 'json') {
                                this.sendType.create = 0;
                            }
                        }
                        if (!$.un(params.sendType.update)) {
                            if (params.sendType.update === 'json') {
                                this.sendType.update = 0;
                            }
                        }
                    }
                }
            };

            genF.prototype.getUrlS = function () {
                return this.urlS;
            };

            genF.prototype.genericResponse = function (param, config) {
                return genS.genericResponse(this.request(param), config);
            };
            genF.prototype.genericResponseContent = function (param, config) {
                return genS.genericResponse(this.requestContent(param), config);
            };

            genF.prototype.request = function (param) {
                if (angular.isUndefined(param.url)) {
                    param.url = this.urlS;
                }
                if (angular.isUndefined(param.data)) {
                    param.data = {};
                }
                if ($.un(param.method)) {
                    param.method = 'GET';
                }

                if (param.method === 'UPDATE' || param.method === 'update') {
                    param.method = 'PUT';
                }
                if (param.method === 'CREATE' || param.method === 'create') {
                    param.method = 'POST';
                }
//                if (param.method === 'DELETE' || param.method === 'REMOVE') {
//                    param.method = 'DELETE';
//                }
                var url = param.url;
                if (!$.un(param.config) && !$.un(param.config.queryParam)) {
                    url = url + "?" + $httpParamSerializer(param.config.queryParam);
                }

                var datahttp = {
                    "url": url,
                    "method": param.method,
                    "headers": {
                        "Content-Type": "application/json; charset=utf-8"
                    }
                };
                datahttp = $.extend(true,param, datahttp);

                if (param.sendType === 0 || param.sendType === 'json') {
                    datahttp.data = param.data;
                    datahttp.headers.Accept = "application/json";
                } else {
                    datahttp.params = param.data;
                    delete datahttp.data;
                }
                if (!$.un(param["Content-Type"])) {
                    datahttp.headers["Content-Type"] = param["Content-Type"];
                }

                var req = $http(datahttp);
                return req;


            };

            genF.prototype.requestContent = function (param) {
                if (angular.isUndefined(param.url)) {
                    param.url = this.urlS;
                }
                if (angular.isUndefined(param.data)) {
                    param.data = {};
                }
                if ($.un(param.method)) {
                    throw new Error("No se especificó el method (GET|POST|...) en la request");
                }

                if (param.method === 'UPDATE' || param.method === 'update') {
                    param.method = 'PUT';
                }
                if (param.method === 'CREATE' || param.method === 'create') {
                    param.method = 'POST';
                }
                var url = param.url;
                if (!$.un(param.config) && !$.un(param.config.queryParam)) {
                    url = url + "?" + $httpParamSerializer(param.config.queryParam);
                }

                var datahttp = {
                    "url": url,
                    "method": param.method,
                    "data": param.data
                };

                var files = [];
                var data = $.extend(true,{}, param.data);
                $contenido.separateFiles(data, files, "");
                var req = $contenido.uploadWithFiles(datahttp, data, files);

                //version original
//                var req =  $contenido.upload(datahttp);

                return req;
            };


            genF.prototype.load = function (params, config) {
                var req;
                if (angular.isUndefined(params)) {
                    req = $http.get(this.urlS);
                } else {
                    req = $http.get(this.urlS, {params: params});
                }
                return genS.genericResponse(req, config);
            };

            genF.prototype.find = function (params, config) {
                if (!(typeof params === "object")) {
                    params = {"id": params};
                }
                var req = $http.get(this.urlS, {params: params});
                return genS.genericResponse(req, config);
            };


            genF.prototype.create = function (obj, config) {
                var req = this.request({
                    method: 'POST',
                    data: obj,
                    sendType: this.sendType.create,
                    config: config
                });
                return genS.genericResponse(req, config);
            };

            genF.prototype.createContent = function (obj, config) {
                var req = this.requestContent({
                    method: 'POST',
                    data: obj,
                    config: config
                });
                return genS.genericResponse(req, config);
            };


            genF.prototype.update = function (obj, config) {
                var req = this.request({
                    method: 'PUT',
                    data: obj,
                    sendType: this.sendType.update,
                    config: config
                });
                return genS.genericResponse(req, config);
            };

            genF.prototype.updateContent = function (obj, config) {
                var req = this.requestContent({
                    method: 'PUT',
                    data: obj,
                    config: config
                });
                return genS.genericResponse(req, config);
            };

            genF.prototype.remove = function (obj, config) {
                var req = this.request({
                    method: 'DELETE',
                    data: obj,
                    sendType: this.sendType.remove,
                    config: config
                });
                return genS.genericResponse(req, config);
            };

            genF.prototype.disable = function (id, config) {
                if ($.unCascade(services, "sistem.disable")) {
                    throw new Error("No se especificó la variable 'services.sistem.disable' en services.js");
                }
                var req = this.request({
                    method: 'DELETE',
                    url: services.sistem.disable,
                    data: {id: id},
                    sendType: 'query',
                    config: config
                });
                return genS.genericResponse(req, config);
            };

            genF.prototype.enable = function (id, config) {
                if ($.unCascade(services, "sistem.disable")) {
                    throw new Error("No se especificó la variable 'services.sistem.disable' en services.js");
                }
                var req = this.request({
                    method: 'POST',
                    url: services.sistem.disable,
                    data: {id: id},
                    sendType: 'query',
                    config: config
                });
                return genS.genericResponse(req, config);
            };

            return genF;
        }]);
}());