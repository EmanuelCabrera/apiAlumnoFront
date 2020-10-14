/**
 * CICHA Created: 16/12/2014
 * 
 */
(function() {
    var app = angular.module('app');

    app.service('CommentPlainServ', ['genF', function(genF) {
            //heredo de genF
            var s = new genF({
                urlS: services.commentplain,
                sendType:{create:'json',update:'json'}
            });
            //implementacion de metodos propios
            
            return s;
        }]);
}());