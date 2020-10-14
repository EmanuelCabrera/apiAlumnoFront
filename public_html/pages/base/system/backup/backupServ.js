

(function () {
    var app = angular.module('app');

    app.service('BackupServ', ['genF', function (genF) {
            //heredo de genF
            var s = new genF({
                urlS: services.root.backup,
                sendType: {create: 'json', update: 'json'}
            });
            //implementacion de metodos propios

            s.getFiles = function (data) {
                return s.genericResponse({
                    "method": 'GET',
                    "url": services.root.backup + "/files",
                    "data": data
                });
            };
            return s;
        }]);
}());