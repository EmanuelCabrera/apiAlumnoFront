

(function() {
    var app = angular.module('app');

    app.service('ErrorLogNotificationCaseServ', ['genF', function(genF) {
            //heredo de genF
            var s = new genF({
                urlS: services.root.errorlogNotificationCase,
                sendType:{create:'json',update:'json'}
            });
            //implementacion de metodos propios
            
            return s;
    }]);
}());