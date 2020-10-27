/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


(function () {
    var app = angular.module('app');

    app.controller('MesaExamenCont', ["$scope", 'MesaExamenServ', 'Pagination', function ($scope, MesaExamenServ, Pagination) {

            var private = {};
            $scope.ipp = 10;
            $scope.tableState;


            $scope.jconfFiltro = {
                op: 'NULL',
                field: 'deletedAt'
            };

            $scope.onAction = function (response, action) {
                response.success(function () {
                    $scope.paginate();
                });
            };



            $scope.paginate = function (tableState) {
                var filter = Pagination.getFilter(tableState);

                MesaExamenServ.load({
                    "jconf": JSON.stringify({
                        attrs: ['pages', 'count'],
                        list: $.jconf.filter(jconf.mesaExamen.list, $scope.jconfFiltro)
                    }),
                    "query": JSON.stringify({
                        orders: ["fecha"],
                        pagination: Pagination.getPagination(tableState)
                    })
                }).success(function (data) {
                    $scope.mesaExamenes = data.list || [];
                    $scope.count = data.count;
                    if (!$.un($scope.tableState)) {
                        $scope.tableState.pagination.numberOfPages = data.pages;
                    }
                });
            };

            $scope.init = function () {
                $scope.pagination = Pagination.getSessionPage();
            };

            $scope.init();
        }]);
}());