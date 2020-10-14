(function () {
    var app = angular.module('app');

    app.controller('IndexCont', ["$scope", "$rootScope", function ($scope, $rootScope) {
            $scope.date = new Date();
            $rootScope.toogleSideBar = function () {
                console.log($rootScope.bodylayout);
                if ($rootScope.bodylayout === "skin-blue sidebar-mini") {
                    $rootScope.bodylayout = "skin-blue sidebar-mini sidebar-collapse sidebar-open";
                } else if ($rootScope.bodylayout === "skin-blue sidebar-mini sidebar-collapse sidebar-open") {
                    $rootScope.bodylayout = "skin-blue sidebar-mini";
                }
            };

            $rootScope.$watch('user', function (o, n) {
                if ($.un($rootScope.user)) {
                    $rootScope.bodylayout = "hold-transition skin-blue layout-top-nav";
//                    $("#style-default").attr('disabled', false);
                } else {
                    $rootScope.bodylayout = "skin-blue sidebar-mini";
//                    $("#style-default").attr('disabled', 'disabled');
                }
            });
        }]);
}());