//
//Cicha Created: 2016/03/24 
//
(function () {
    var app = angular.module('app');

    app.service('ScheduleServ', ['genF', function (genF) {
            //heredo de genF
            var s = new genF({
                urlS: services.root.schedule,
                sendType: {create: 'json', update: 'json'}
            });
            //implementacion de metodos propios

            s.start = function (data) {
                return s.genericResponse({
                    "method": 'PUT',
                    "data": data,
                    "sendType":"query",
                    "url": services.root.schedule + '/start'
                });
            };
            
            
            s.stop = function (data) {
                return s.genericResponse({
                    "method": 'PUT',
                    "data": data,
                    "sendType":"query",
                    "url": services.root.schedule + '/stop'
                });
            };
            
            s.force = function (data) {
                return s.genericResponse({
                    "method": 'PUT',
                    "data": data,
                    "sendType":"query",
                    "url": services.root.schedule + '/force'
                });
            };
            
             s.findByName = function (jconf, name) {
                return s.genericResponse({
                    "method": 'GET',
                    "data": jconf,
                    "url": services.root.schedule + '?name='+name
                });
            };

            return s;
        }]);
}());

