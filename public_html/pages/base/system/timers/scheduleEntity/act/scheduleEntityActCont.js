/**
 * CICHA Created: 15/12/2014
 */
(function () {
    var app = angular.module('app');

    app.controller('ScheduleEntityActCont', ["$scope", '$stateParams', 'ScheduleEntityServ', function ($scope, $stateParams, ScheduleEntityServ) {
            $scope.generateArrayNumber = function (start, end) {
                var array = [];


                for (let i = start; i <= end; i++) {
                    array.push({
                        value: i.toString(),
                        label: i
                    });
                }

                return array;
            };
            
            $scope.schedule = undefined;
            
            $scope.seconds = $scope.generateArrayNumber(0, 59);
            $scope.minutes = $scope.generateArrayNumber(0, 59);
            $scope.hours = $scope.generateArrayNumber(0, 23);
            $scope.dayOfWeeks = $scope.generateArrayNumber(0, 6);
            $scope.dayOfMonths = $scope.generateArrayNumber(1, 31);
            $scope.months = $scope.generateArrayNumber(1, 12);
            $scope.years = $scope.generateArrayNumber((new Date()).getFullYear(), (new Date()).getFullYear() + 5);



            $scope.update = function () {
                ScheduleEntityServ.update($scope.schedule).success(function (data) {
                   window.history.back();
                });
            };

            $scope.init = function () {
                if (!$stateParams.id) {
                    window.history.back();
                    return;
                }
                ScheduleEntityServ.load({
                    jconf: JSON.stringify(jconf.root.scheduleEntity.list),
                    id: $stateParams.id
                }).success(function (data) {

                    $scope.schedule = data;
                });
            };

            $scope.init();
        }]);
}());