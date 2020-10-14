/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


(function () {
    var app = angular.module('app');

    app.service('EspacioUsadoServ', ['genF', function (genF) {
            //heredo de genF
            var s = new genF({
                urlS: services.security.user.espaciosusados,
                sendType: {create: 'json', update: 'json'}
            });
            
            s.loadEspacioUsado = function (data) {
                return s.genericResponse({
                    "url": services.security.user.espaciosusados,
                    "method": 'GET',
                    "data": data
                });
            };

            
            return s;
        }]);
}());