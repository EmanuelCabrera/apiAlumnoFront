
(function (type) {
    var app = angular.module('app');

    app.service('ContenidoTestServ', ['genF', 'genS', function (genF, genS) {
            var s = new genF({
                urlS: services.contenidotest,
                sendType: {create: 'json', update: 'json'}
            });
            
            return s;

        }]);
}());
