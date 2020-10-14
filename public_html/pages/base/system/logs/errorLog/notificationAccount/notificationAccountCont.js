/**
 * CICHA Created: 15/12/2014
 */
(function () {
    var app = angular.module('app');
    app.controller('NotificationAccountCont', ["$scope", 'ErrorLogNotificationAccountServ', 'ErrorLogNotificationCaseServ',
        function ($scope, ErrorLogNotificationAccountServ, ErrorLogNotificationCaseServ) {
            $scope.accountSel = undefined;

            $scope.jconfFiltro = {
                op: 'NULL',
                field: 'deletedAt'
            };

            $scope.onSelect = function (est) {
                if ((!angular.isUndefined($scope.accountSel) && $scope.accountSel.id === est.id)) {
                    $scope.accountSel = undefined;
                } else {
                    $scope.accountSel = $.extend({}, est, true);
                    $scope.accountSel.errorJavaLogNotificationCaseIds = [];
                    console.log($scope.accountSel);
                    if ($scope.accountSel.cases.length) {
                        for (let noti of $scope.accountSel.cases) {
                            $scope.accountSel.errorJavaLogNotificationCaseIds.push(noti.id);
                        }
                    }
                }
            };
            $scope.onClear = function () {
                $scope.accountSel = undefined;
            };

            $scope.create = function () {
                if (!$.validateEmail($scope.accountSel.account)) {

                    new PNotify({styling: 'fontawesome',
                        title: 'Atención',
                        text: "El account no es un e-mail válido.",
                        type: 'warning',
                        delay: 5000
                    });
                }
                ErrorLogNotificationAccountServ.create($scope.accountSel).success(function (data) {
                    $scope.init();
                    $scope.accountSel = undefined;
                });
            };

            $scope.update = function () {
                if (!$.validateEmail($scope.accountSel.account)) {

                    new PNotify({styling: 'fontawesome',
                        title: 'Atención',
                        text: "El account no es un e-mail válido.",
                        type: 'warning',
                        delay: 5000
                    });
                }
                ErrorLogNotificationAccountServ.update($scope.accountSel).success(function (data) {
                    $scope.init();
                    $scope.accountSel = undefined;
                });
            };

            $scope.remove = function (id) {
                if (angular.isUndefined(id)) {
                    id = $scope.accountSel.id;
                }
                ErrorLogNotificationAccountServ.remove({
                    "id": id
                }).success(function (data) {
                    $scope.onClear();
                    $scope.init();
                });
            };

            $scope.enable = function (id) {
                if (angular.isUndefined(id)) {
                    id = $scope.accountSel.id;
                }
                ErrorLogNotificationAccountServ.enable(id).success(function (data) {
                    $scope.onClear();
                    $scope.init();
                });
            };


            $scope.disable = function (id) {
                if (angular.isUndefined(id)) {
                    id = $scope.accountSel.id;
                }
                ErrorLogNotificationAccountServ.disable(id).success(function (data) {
                    $scope.onClear();
                    $scope.init();
                });
            };


            $scope.init = function () {

                $scope.accountSel = {};
                ErrorLogNotificationCaseServ.load({
                    jconf: JSON.stringify({
                        attrs: ['id', 'name', 'regexp', 'deletedAt'],
                        '@filters': $scope.jconfFiltro
                    })
                }).success(function (data) {
                    $scope.notifications = data;

                });

                ErrorLogNotificationAccountServ.load({
                    jconf: JSON.stringify({
                        attrs: ['id', 'account','onLocalRequest', 'deletedAt'],
                        cases: {
                            attrs: ['id', 'name', 'regexp']
                        },
                        '@filters': $scope.jconfFiltro
                    })
                }).success(function (data) {
                    $scope.accounts = data;
                    console.log($scope.accounts);
                    $scope.accountsTbl = [].concat(data);
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