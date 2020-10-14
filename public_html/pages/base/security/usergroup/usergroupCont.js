/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


(function () {
    var app = angular.module('app');

    app.controller('UserGroupCont', ["$scope", 'UserGroupServ', function ($scope, UserGroupServ) {

            var private = {};

            $scope.remove = function (id) {
                UserGroupServ.remove({
                    "id": id
                }).success(function (data) {
                    private.init();
                });
            };

            $scope.jconfFiltro = {
                op: 'NULL',
                field: 'deletedAt'
            };
            
            $scope.onAction = function (response,action) {
                response.success(function () {
                    $scope.init();
                });
            };
            
            $scope.disable = function (id) {
                if (angular.isUndefined(id)) {
                    return false;
                }
                UserGroupServ.disable(id).success(function (data) {
                    $scope.paginate();
                });
            };
            $scope.enable = function (id) {
                if (angular.isUndefined(id)) {
                    return false;
                }
                UserGroupServ.enable(id).success(function (data) {
                    $scope.paginate();
                });
            };
            $scope.paginate = function (tableState) {
                var pagination = {
                    pageNumber: $.unCascade(tableState, "pagination.start") ? 0 : tableState.pagination.start,
                    pageSize: $.unCascade(tableState, "pagination.number") ? 10 : tableState.pagination.number
                };
                var filter = $.unCascade($scope, "tableState.search.predicateObject.$") ? "" : $scope.tableState.search.predicateObject.$;
                UserGroupServ.load({
                    "jconf": JSON.stringify({
                        attrs: ['pages'],
                        list: $.jconf.cascadeFilterExtend(jconf.security.usergroup.list, $scope.jconfFiltro)
                    }),
                    "query": JSON.stringify({
                        filters: [{
                                field: "nombre",
                                options: ["PART_STRING"],
                                value: filter
                            }],
                        "options": ["OR_FILTERS"],
                        orders: ["nombre"],
                        pagination: pagination
                    })
                }).success(function (data) {
                    $scope.usergroups = data.list || [];
                    if (!$.un($scope.tableState)) {
                        $scope.tableState.pagination.numberOfPages = data.pages;
                    }
                });
            };

            $scope.init = function () {
                $scope.paginate();
            };

            $scope.init();
        }]);
}());