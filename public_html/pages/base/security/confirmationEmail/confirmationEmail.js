(function () {
    var app = angular.module('app');

    app.controller('ConfirmationEmail', ["$scope", '$window', 'UserServ','$stateParams','$state', function ($scope, $window, UserServ, $stateParams,$state) {
            $scope.confirmation = false;
            $scope.init = function () {
                UserServ.confirmationEmail({
                    "email": $stateParams.email,
                    "code": $stateParams.code
                }).success(function (data, status, headers, config) {
                    $scope.confirmation = true;
                    $state.go('login');
                });
            };
            
            $scope.init();
        }]);
}());