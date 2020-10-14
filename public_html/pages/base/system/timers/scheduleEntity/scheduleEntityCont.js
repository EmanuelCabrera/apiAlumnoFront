
(function () {
    var app = angular.module('app');
    app.controller('ScheduleEntityCont', ["$scope", 'ScheduleEntityServ', 'ScheduleServ', function ($scope, ScheduleEntityServ, ScheduleServ) {

            var private = {};

            $scope.schedules = [];

            $scope.remove = function (id) {
                ScheduleEntityServ.remove({
                    "id": id
                }).success(function (data) {
                    private.init();
                });
            };

            $scope.jconfFiltro = {
                op: 'NULL',
                field: 'deletedAt'
            };

            $scope.estado = "todos";

            $scope.onAction = function (response, action) {
                response.success(function () {
                    $scope.init();
                });
            };

            $scope.disable = function (id) {
                if (angular.isUndefined(id)) {
                    return false;
                }
                ScheduleEntityServ.disable(id).success(function (data) {
                    $scope.paginate();
                });
            };
            $scope.enable = function (id) {
                if (angular.isUndefined(id)) {
                    return false;
                }
                ScheduleEntityServ.enable(id).success(function (data) {
                    $scope.paginate();
                });
            };


            $scope.stop = function (schedule) {
                ScheduleServ.stop({
                    id: schedule.id
                }).success(function (data) {

                    $scope.init();
                });

            };

            $scope.start = function (schedule) {

                ScheduleServ.start({
                    id: schedule.id
                }).success(function (data) {

                    $scope.init();
                });

            };

            $scope.force = function (schedule) {

                ScheduleServ.force({
                    id: schedule.id
                }).success(function (data) {

                    $scope.init();
                });

            };


            $scope.init = function () {
                ScheduleEntityServ.load({
                    jconf: JSON.stringify(jconf.root.scheduleEntity.list),
                    '@filters': $scope.jconfFiltro
                }).success(function (data) {

                    if ($scope.estado == 'todos') {
                        $scope.schedules = data;
                        $scope.schedulesTbl = [].concat(data);

                        return;
                    }

                    var schedules = [];

                    for (let s of data) {
                        if (($scope.estado == 'activos' && !$.un(s.info))) {
                            schedules.push(s);
                        }

                        if (($scope.estado == 'inactivos' && $.un(s.info))) {
                            schedules.push(s);
                        }
                    }
                    $scope.schedules = schedules;
                    $scope.schedulesTbl = [].concat(schedules);



                });
            };

            $scope.init();
        }]);
}());