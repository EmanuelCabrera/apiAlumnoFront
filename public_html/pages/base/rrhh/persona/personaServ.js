//
//Cicha Created: 2016/03/24 
//
(function () {
    var app = angular.module('app');

    app.service('PersonaServ', ['genF', function (genF) {
            //heredo de genF
            var s = new genF({
                urlS: services.rrhh.persona,
                sendType: {create: 'json', update: 'json'}
            });
            //implementacion de metodos propios

            s.fixData = function (data) {
                var dsend = $.extend({}, data);
                delete dsend.edad;
                if (!$.un(dsend.fechaNac)) {
                    if (dsend.fechaNac.toString() === "Invalid Date") {
                        delete dsend.fechaNac;
                    }
                } else {
                    if (dsend === null) {
                        delete dsend.fechaNac;
                    }
                }
                return dsend;
            };

            /**
             * 
             * @param {type} data
             * @returns {Persona} Devuelve los datos personales de la persona que se encuentra
             * asociada al usuario logueado, si es que existe dicha relacion
             */
            s.getPersonalInfo = function (data, config) {
                return s.genericResponse({
                    "method": 'GET',
                    "data": data,
                    "url": services.rrhh.persona,
                    "cache": true,
                    config: config
                });
            };
            
            s.search = function (data, config) {
                return s.genericResponse({
                    "method": 'GET',
                    "data": data,
                    "url": services.rrhh.persona+"/search",
                    config: config
                });
            };

            s.create = function (data, config) {
                data = s.fixData(data);
                return s.genericResponse({
                    "method": 'POST',
                    "data": data,
                    "sendType": 'json',
                    "url": services.rrhh.persona,
                    config: config
                });
            };

            s.update = function (data, config) {
                data = s.fixData(data);
                return s.genericResponse({
                    "method": 'PUT',
                    "data": data,
                    "sendType": 'json',
                    "url": services.rrhh.persona,
                    config: config
                });
            };

            s.updateMe = function (data, config) {
                data = s.fixData(data);
                return s.genericResponse({
                    "method": 'PUT',
                    "data": data,
                    "sendType": 'json',
                    "url": services.rrhh.persona + '/me',
                    config: config
                });
            };

            s.getMe = function (data, config) {
                data = s.fixData(data);
                return s.genericResponse({
                    "method": 'GET',
                    "data": data,
                    "url": services.rrhh.persona + '/me',
                    config: config
                });
            };

            s.importar = function (file) {
                return s.genericResponseContent({
                    url: services.rrhh.persona + '/importar',
                    method: 'POST',
                    data: {file: file}
                });
            };

            return s;
        }]);
}());

