//
//Cicha Created: 2016/03/24 
//
(function () {
    var app = angular.module('app');

    app.service('ScheduleEntityServ', ['genF', function (genF) {
            //heredo de genF
            var s = new genF({
                urlS: services.root.scheduleEntity,
                sendType: {create: 'json', update: 'json'}
            });
            //implementacion de metodos propios


            return s;
        }]);
}());

