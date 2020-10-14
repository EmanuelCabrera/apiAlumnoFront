(function () {
    var app = angular.module('app');

    app.service('ErrorReportServ', ['genF', function (genF) {
            //heredo de genF
            var s = new genF({
                urlS: services.errorReport,
                sendType: {create: 'json', update: 'json'}
            });
            //implementacion de metodos propios

            return s;
        }]);
}());