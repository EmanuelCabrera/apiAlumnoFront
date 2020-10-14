(function () {
    var app = angular.module('app');

    app.service('ClassInfoServ', ['genF', function (genF) {
            //heredo de genF
            var s = new genF({
                urlS: services.root.classinfo,
                sendType:{create:'json',update:'json'}
            });
            //implementacion de metodos propios 

            return s;
        }]);
}());


