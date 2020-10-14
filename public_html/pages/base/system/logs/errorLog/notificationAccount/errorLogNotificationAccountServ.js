

(function() {
    var app = angular.module('app');

    app.service('ErrorLogNotificationAccountServ', ['genF', function(genF) {
            //heredo de genF
            var s = new genF({
                urlS: services.root.errorlogNotificationAccount,
                sendType:{create:'json',update:'json'}
            });
            //implementacion de metodos propios
            
            return s;
    }]);
}());