(function () {
    var app = angular.module('app');
    app.config(['$stateProvider', function ($stateProvider) {
            $stateProvider
                    .state('actionLog/class', {
                        url: '/actionLog/class/:clazz',
                        templateUrl: 'pages/base/actionLog/actionLogClass/actionLogClass.html',
                        controller: 'ActionLogClassCont'
                    })
                    .state('actionLog/list', {
                        url: '/actionLog/list',
                        templateUrl: 'pages/base/actionLog/actionLogList/actionLogList.html',
                        controller: 'ActionLogListCont'
                    })

                    ;

            $.each(ruteoGlobal, function (k, v) {
                $stateProvider
                        .state(k, v)
            });
        }]);
}());