(function () {
    var app = angular.module('app');

    app.service('UserServ', ['genF', function (genF) {
            //heredo de genF
            var s = new genF({
                urlS: services.security.user.loadAdmin,
                sendType: {create: 'json', update: 'json'}
            });

            s.passChange = function (data) {
                return s.genericResponse({
                    "method": 'POST',
                    "url": services.security.user.user,
                    "data": data,
                    "sendType": "json"
                });
            };

            s.passRemember = function (data) {
                throw new Error("Metodo ya no soportado");
            };

            s.passReset = function (data) {
                return s.genericResponse({
                    "method": 'POST',
                    "url": services.security.user.passReset,
                    "data": data
                });
            };
            
            s.passResetCUIT = function (data) {
                return s.genericResponse({
                    "method": 'POST',
                    "url": services.security.user.passResetCUIT,
                    "data": data
                });
            };

            s.passResetConfirm = function (data) {
                return s.genericResponse({
                    "method": 'PUT',
                    "url": services.security.user.passReset,
                    "data": data,
                    "sendType": "json"
                });
            };

            s.loadAdmin = function (data) {
                return s.genericResponse({
                    "method": 'GET',
                    "url": services.security.user.loadAdmin,
                    "data": data
                });
            };

            s.filtro = function (data) {
                return s.genericResponse({
                    "method": 'GET',
                    "url": services.security.user.filtro,
                    "data": data
                });
            };

            s.loadRoles = function (data) {
                return s.genericResponse({
                    "method": 'GET',
                    "url": services.security.user.loadRoles,
                    "data": data
                });
            };

            s.getPassword = function (data) {
                return s.genericResponse({
                    "method": 'GET',
                    "data": data,
                    "sendType": 'query',
                    "url": services.security.user.password
                });
            };

            s.changePassword = function (data) {
                return s.genericResponse({
                    "method": 'POST',
                    "data": data,
                    "sendType": 'json',
                    "url": services.security.user.changepassword
                });
            };

            s.changeProfile = function (data) {
                return s.genericResponse({
                    "method": 'POST',
                    "data": data,
                    "sendType": 'json',
                    "url": services.security.user.changeprofile
                });
            };

            s.profileimg = function (data) {
                return s.genericResponse({
                    "method": 'POST',
                    "data": data,
                    "sendType": 'json',
                    "url": services.security.user.profileimg
                });
            };

            s.profileimgContenido = function (data) {
                //parametros a modo ejemplo
                return s.genericResponseContent({
                    "method": 'POST',
                    "data": data,
                    "url": services.security.user.profileimgContenido
                });
            };

            s.confirmationEmail = function (data) {
                return s.genericResponse({
                    "method": 'POST',
                    "url": services.security.user.confirmationEmail,
                    "data": data,
                    "sendType": "json"
                });
            };

            s.getMe = function () {
                return s.genericResponse({
                    "method": 'GET',
                    "data": {
                        jconf: JSON.stringify({
                            attrs: ['id', 'name'], roles: {attrs: ['name', 'permissions']}
                        })
                    },
                    "url": services.security.user.me
                });
            };

            s.getEspacioUsados = function (data) {
                return s.genericResponse({
                    "method": 'GET',
                    "data": data,
                    "url": services.security.user.espaciosusados
                });
            };

            s.search = function (data, config) {
                return s.genericResponse({
                    "method": 'GET',
                    "data": data,
                    "url": services.security.user.user + "/search",
                    config: config
                });
            };
            s.createCm = function (data) {
                return s.genericResponse({
                    "method": 'POST',
                    "url": services.security.user.user + "/ciudadano",
                    "data": data,
                    "sendType": "json"
                });
            };
            s.updateCm = function (data) {
                return s.genericResponse({
                    "method": 'PUT',
                    "url": services.security.user.user + "/ciudadano",
                    "data": data,
                    "sendType": "json"
                });
            };

            return s;
        }]);
}());

