(function () {
    var app = angular.module('app');
    app.config(['$stateProvider', function ($stateProvider) {
            $stateProvider
                    .state('home', {
                        url: '/home',
                        templateUrl: 'sections/Public/home.html'
                    })
                    .state('main', {
                        url: '/main',
                        templateUrl: 'sections/Private/home.html'
                    });
        }]);
}());