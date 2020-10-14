/**
 * CICHA Created: 2017/10/06
 * 
 */
(function () {
    var app = angular.module('app');

    app.service('LogicalRemoveServ', ['genF', function (genF) {
            //heredo de genF
            var s = new genF({
                urlS: services.sistem.disable,
                sendType: {create: 'json', update: 'json'}
            });

            return s;
        }]);
}());