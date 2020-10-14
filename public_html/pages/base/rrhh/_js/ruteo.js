(function () {
    var app = angular.module('app');
    app.config(['$stateProvider', function ($stateProvider) {
            $stateProvider
                    .state('rrhh/persona', {
                        url: '/rrhh/persona',
                        templateUrl: 'pages/base/rrhh/persona/persona.html',
                        controller: 'PersonaCont'
                    })
                    .state('rrhh/persona/add', {
                        url: '/rrhh/persona/add',
                        templateUrl: 'pages/base/rrhh/persona/act/personaAct.html',
                        controller: 'PersonaActCont'
                    })
                    .state('rrhh/persona/edit', {
                        url: '/rrhh/persona/edit/:id',
                        templateUrl: 'pages/base/rrhh/persona/act/personaAct.html',
                        controller: 'PersonaActCont'
                    })
                    .state('rrhh/persona/me', {
                        url: '/rrhh/persona/me',
                        templateUrl: 'pages/base/rrhh/persona/me/personaMe.html',
                        controller: 'PersonaMeCont'
                    })
                    .state('rrhh/persona/show', {
                        url: '/rrhh/persona/show/:id',
                        templateUrl: 'pages/base/rrhh/persona/act/personaShow.html',
                        controller: 'PersonaActCont'
                    })
                    .state('rrhh/persona/importar', {
                        url: '/rrhh/persona/importar',
                        templateUrl: 'pages/base/rrhh/persona/importar/importar.html',
                        controller: 'PersonaImportarCont'
                    })
                    ;
        }]);
}());