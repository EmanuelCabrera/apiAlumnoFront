//
//Miguel Created: 2016/03/30 
//
(function () {
    var app = angular.module('app');

    app.controller('ActionLogClassCont', ["$scope", '$stateParams', 'ActionLogServ', function ($scope, $stateParams, ActionLogServ) {

            var private = {};

            $scope.clazz = $stateParams.clazz;

            $scope.actionLogs = [];
            $scope.actionLogsTbl = [];


            $scope.find = function () {
                ActionLogServ.getData({
                    'clazz': $scope.clazz,
                    'jconf': {
                        attrs: ['id', 'sms', 'time', 'clazz']
                    }
                }).success(function (data) {
                    $scope.actionLogs = data;
                    $scope.actionLogsTbl = [].concat(data);

                });
            };

            $scope.find();

        }]);
}());