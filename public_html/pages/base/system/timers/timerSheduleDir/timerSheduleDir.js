(function () {
    var app = angular.module('app');
    app.directive("timerShedule", ['ScheduleEntityServ', 'ScheduleServ', function (ScheduleEntityServ, ScheduleServ) {
            return {
                templateUrl: 'pages/base/system/timers/timerSheduleDir/timerSheduleDir.html',
                scope: {
                    timerId: "=?",
                    timerName: "=?",
                    details: "=?",

                },
                controller: function ($scope, $element, $attrs) {
                    var private = {};
                    $scope.timer = undefined;

                    $scope.$watch('timerId', function (n) {
                        if (!$.un(n)) {
                            private.getTimer(n, 'id');
                        }
                    });

                    $scope.$watch('timerName', function (n) {
                        if (!$.un(n)) {
                            private.getTimer(n, 'name');
                        }
                    });
                    
                    $scope.stop = function () {
                        ScheduleServ.stop({
                            id: $scope.timer.id
                        }).success(function (data) {

                            private.getTimer($scope.timer.id, 'id');
                        });

                    };

                    $scope.start = function () {

                        ScheduleServ.start({
                            id: $scope.timer.id
                        }).success(function (data) {

                            private.getTimer($scope.timer.id, 'id');
                        });

                    };


                    private.init = function () {


                    };

                    private.getTimer = function (n, attr) {
                        ScheduleEntityServ.load({
                            "jconf": JSON.stringify(jconf.root.scheduleEntity.list),
                            "query": JSON.stringify({
                                filters: [{
                                        field: attr,
                                        options: ["EQ"],
                                        value: n
                                    }]
                            })
                        }).success(function (data) {
                            console.log(data);

                            if (data.length > 0) {
                                $scope.timer = data[0];
                            } else {
                                $scope.timer = null;
                            }

                        });

                    };

                    private.init();

                }

            };
        }]);
}());