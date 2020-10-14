/**
 * CICHA Created: 15/12/2014
 */
(function () {
    var app = angular.module('app');

    app.controller('NotificationCaseCont', ["$scope", 'ErrorLogNotificationCaseServ', function ($scope, ErrorLogNotificationCaseServ) {
            $scope.notificationSel = undefined;

            $scope.jconfFiltro = {
                op: 'NULL',
                field: 'deletedAt'
            };

            $scope.onSelect = function (est) {
                if ((!angular.isUndefined($scope.notificationSel) && $scope.notificationSel.id === est.id)) {
                    $scope.notificationSel = undefined;
                } else {
                    $scope.notificationSel = $.extend({}, est, true);
                }
            };


            $scope.onClear = function () {
                $scope.notificationSel = undefined;
            };

            $scope.create = function () {
                
                ErrorLogNotificationCaseServ.create($scope.notificationSel).success(function (data) {
                    $scope.init();
                    $scope.notificationSel = undefined;
                });
            };

            $scope.update = function () {
                ErrorLogNotificationCaseServ.update($scope.notificationSel).success(function (data) {
                    $scope.init();
                    $scope.notificationSel = undefined;
                });
            };

            $scope.remove = function (id) {
                if (angular.isUndefined(id)) {
                    id = $scope.notificationSel.id;
                }
                ErrorLogNotificationCaseServ.remove({
                    "id": id
                }).success(function (data) {
                    $scope.onClear();
                    $scope.init();
                });
            };

            $scope.enable = function (id) {
                if (angular.isUndefined(id)) {
                    id = $scope.notificationSel.id;
                }
                ErrorLogNotificationCaseServ.enable(id).success(function (data) {
                    $scope.onClear();
                    $scope.init();
                });
            };


            $scope.disable = function (id) {
                if (angular.isUndefined(id)) {
                    id = $scope.notificationSel.id;
                }
                ErrorLogNotificationCaseServ.disable(id).success(function (data) {
                    $scope.onClear();
                    $scope.init();
                });
            };


            $scope.init = function () {
                ErrorLogNotificationCaseServ.load({
                    jconf: JSON.stringify({
                        attrs: ['id', 'name', 'regexp', 'deletedAt'],
                        '@filters': $scope.jconfFiltro
                    })
                }).success(function (data) {
                    $scope.notifications = data;
                    $scope.notificationsTbl = [].concat(data);
                });
            };

            $scope.onAction = function (r) {
                r.success(function () {
                    $scope.init();
                });
            };

            $scope.init();
        }]);
}());