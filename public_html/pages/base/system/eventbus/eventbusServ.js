(function () {
    var app = angular.module('app');

    app.service('EventBusServ', ['genF', function (genF) {
            //heredo de genF
            var s = new genF({
                urlS: services.root.eventbus,
                sendType:{create:'json',update:'json'}
            });
            //implementacion de metodos propios 

            return s;
        }]);
}());


