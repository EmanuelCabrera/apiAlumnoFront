(function () {
    var app = angular.module('app');

    app.service('UserGroupServ', ['genF', function (genF) {
            //heredo de genF
            var s = new genF({
                urlS: services.security.usergroup.usergroup,
                sendType: {create: 'json', update: 'json'}
            });

            return s;
        }]);
}());

