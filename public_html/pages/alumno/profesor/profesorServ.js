/**
 * CICHA Created: 16/12/2014
 * 
 */
(function() {
    var app = angular.module('app');

    app.service('MateriaServ', ['genF', function(genF) {
            //heredo de genF
            var s = new genF({
                urlS: services.materia,
                sendType:{create:'json',update:'json'}
            });
            //implementacion de metodos propios
            
            return s;
        }]);
}());