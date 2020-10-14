(function () {
    var app = angular.module('app');
    app.config(['$stateProvider', function ($stateProvider) {
            $stateProvider
                    .state('test/contenido', {
                        url: '/test/contenido',
                        templateUrl: 'pages/base/test/contenido/contenido.html',
                        controller: 'ContenidoTestCont'
                    })
                    
                    .state('test/mapView', {
                        url: '/test/mapView',
                        templateUrl: 'pages/base/test/mapView/mapViewTest.html',
                        controller: 'MapViewTestCont'
                    })
                    .state('test/selectpaginated', {
                        url: '/test/selectpaginated',
                        templateUrl: 'pages/base/test/selectPaginated/selectPaginated.html',
                        controller: 'SelectPaginatedTestCont'
                    })
                    ;
        }]);
}());