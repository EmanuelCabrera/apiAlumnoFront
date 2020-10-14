(function () {
    var app = angular.module('app');

    app.controller('UserCMCont', ["$scope", 'UserServ', 'Pagination', function ($scope, UserServ, Pagination) {
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

            $scope.exportar = function (tableState) {
                if ($.un($scope.tableState)) {
                    $scope.tableState = tableState;
                }

                var jconfParam = angular.copy(jconf.security.user.exportar);

                jconfParam["@format"] = "CSV";
                $.jconf.filter(jconfParam, $scope.jconfFiltro);
                var filter = Pagination.getFilter(tableState);

                var request = {
                    "jconf": JSON.stringify(jconfParam),
                    "query": JSON.stringify({
                        filters: [{
                                field: "name",
                                options: ["PART_STRING"],
                                value: filter
                            }],
                        "options": ["OR_FILTERS"]
                    })
                };

                if (!$.un($scope.tableState.sort.predicate)) {
                    request.query.orders = [$scope.tableState.sort.predicate];
                }

                UserServ.load(request).success(function (data) {
                    var anchor = angular.element('<a/>');
                    anchor.attr({
                        href: 'data:attachment/csv;charset=utf-8,' + encodeURI(data),
                        target: '_blank',
                        download: 'users.csv'
                    })[0].click();
                });

            };

            $scope.paginate = function (tableState) {
                var filter = Pagination.getFilter(tableState);

                UserServ.filtro({
                    "jconf": JSON.stringify({
                        attrs: ['pages', 'count'],
                        list: $.jconf.filter({
                            attrs: ['id', 'name', 'cuit', 'correo', 'deletedAt', 'lastAccess'],
                            persona: {attrs: ['id', 'nombres', 'apellido']},
                            roles: {attrs: ['name',"id"]}
                        }, $scope.jconfFiltro)
                    }),
                    "texto": filter,
                    "query": JSON.stringify({
                        filters: [{
                                field: "name",
                                options: ["PART_STRING"],
                                value: filter
                            }, {
                                field: "correo",
                                options: ["PART_STRING"],
                                value: filter
                            }],
                        "options": ["OR_FILTERS"],
                        orders: ["name", "correo"],
                        pagination: Pagination.getPagination(tableState)
                    })
                }).success(function (data) {
                    $scope.users = data.list || [];
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