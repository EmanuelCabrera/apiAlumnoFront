/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


(function () {
    var app = angular.module('app');

    app.controller('RolCont', ["$scope", 'RolServ', function ($scope, RolServ) {

            var private = {};

            $scope.onAction = function (http) {
                http.success(function () {
                    $scope.paginate();
                });
            };

            $scope.paginate = function (tableState) {
                var pagination = {
                    pageNumber: $.unCascade(tableState, "pagination.start") ? 0 : tableState.pagination.start,
                    pageSize: $.unCascade(tableState, "pagination.number") ? 10 : tableState.pagination.number
                };
                var filter = $.unCascade($scope, "tableState.search.predicateObject.$") ? "" : $scope.tableState.search.predicateObject.$;
                RolServ.load({
                    "jconf": JSON.stringify({
                        attrs: ['pages'],
                        list: jconf.security.rol.list
                    }),
                    "query": JSON.stringify({
                        filters: [{
                                field: "name",
                                options: ["PART_STRING"],
                                value: filter
                            }],
                        "options": ["OR_FILTERS"],
                        orders: ["name"],
                        pagination: pagination
                    })
                }).success(function (data) {
                    $scope.roles = data.list || [];
                    if (!$.un($scope.tableState)) {
                        $scope.tableState.pagination.numberOfPages = data.pages;
                    }
                });
            };

            private.init = function () {
                $scope.paginate();
            };

            private.init();
        }]);
}());