(function () {
    var app = angular.module('app');
    app.config(['$stateProvider', function ($stateProvider) {
            $stateProvider
                    .state('direccion/pais', {
                        url: '/direccion/pais',
                        templateUrl: 'pages/base/direccion/pais/pais.html',
                        controller: 'PaisCont'
                    })
                    .state('direccion/provincia', {
                        url: '/direccion/provincia',
                        templateUrl: 'pages/base/direccion/provincia/provincia.html',
                        controller: 'ProvinciaCont'
                    })
                    .state('direccion/departamento', {
                        url: '/direccion/departamento',
                        templateUrl: 'pages/base/direccion/departamento/departamento.html',
                        controller: 'DepartamentoCont'
                    })
                    .state('direccion/departamento/act', {
                        url: '/direccion/departamento/:provinciaId',
                        parent: 'direccion/departamento',
                        views: {
                            'deptoact': {
                                templateUrl: 'pages/base/direccion/departamento/act/departamentoAct.html',
                                controller: 'DepartamentoActCont'
                            }
                        }
                    })
                    .state('direccion/localidad', {
                        url: '/direccion/localidad',
                        templateUrl: 'pages/base/direccion/localidad/localidad.html',
                        controller: 'LocalidadCont'
                    })
                    .state('direccion/localidad/act', {
                        url: '/direccion/localidad/:departamentoId',
                        parent: 'direccion/localidad',
                        views: {
                            'localidadact': {
                                templateUrl: 'pages/base/direccion/localidad/act/localidadAct.html',
                                controller: 'LocalidadActCont'
                            }
                        }
                    })
                    ;
        }]);
}());