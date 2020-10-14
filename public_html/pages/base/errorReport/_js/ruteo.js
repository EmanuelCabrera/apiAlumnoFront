
(function () {
    var app = angular.module('app');
    app.config(['$stateProvider', function ($stateProvider) {
            $stateProvider
                    .state('errorReport', {
                        url: '/errorReport',
                        templateUrl: 'pages/base/errorReport/errorReport.html',
                        controller: 'ErrorReportCont'
                    })
                  
                    ;
        }]);
}());