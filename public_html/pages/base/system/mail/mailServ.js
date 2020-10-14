(function () {
    var app = angular.module('app');

    app.service('MailServ', ['genF', function (genF) {
            //heredo de genF
            var s = new genF({
                urlS: services.root.mail,
                sendType: {create: 'json', update: 'json'}
            });
            //implementacion de metodos propios

            return s;
        }]);
}());