
(function () {
    var app = angular.module('app');
    app.controller('BackupCont', ["$scope", 'BackupServ', function ($scope, BackupServ) {

            var private = {};

            $scope.files = [];


            $scope.order = 'creationTime';

            $scope.sortColumn = function (tableState) {


                if (!$.un(tableState) && !$.un(tableState.sort)) {

                    if (tableState.sort.reverse) {
                        $scope.order = '-creationTime';
                    } else if ($.un(tableState.sort.reverse)) {
                        $scope.order = '-creationTime';
                    } else {

                        $scope.order = 'creationTime';
                    }
                }
            };

            $scope.init = function () {
                BackupServ.getFiles({
                    jconf: JSON.stringify({
                        attrs: ['name', 'size', 'creationTime', 'updateTime']
                    })
                }).success(function (data) {

                    $scope.files = data;
                    $scope.filesTbl = [].concat(data);

                });
            };

            $scope.init();
        }]);
}());