(function () {
    var app = angular.module('app');
    app.config(['$stateProvider', function ($stateProvider) {
            $stateProvider
                    .state('calendario', {
                        url: '/calendario',
                        templateUrl: 'pages/base/calendario/calendario.html',
                        controller: 'CalendarioCont'
                    })
                    .state('calendarioevento', {
                        url: '/calendarioevento/:id',
                        templateUrl: 'pages/base/calendario/calendarioEvento/calendarioEvento.html',
                        controller: 'CalendarioEventoCont'
                    })
                   
        }]);
}());