/**
 * CICHA Created: 16/12/2014
 * 
 */
(function () {
    var app = angular.module('app');

    app.service('ProvinciaServ', ['genF', function (genF) {
            //heredo de genF
            var s = new genF({
                urlS: services.direccion.provincia,
                sendType: {create: 'json', update: 'json'}
            });
            //implementacion de metodos propios

            return s;
        }]);
}());