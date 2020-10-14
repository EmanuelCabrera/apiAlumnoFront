(function () {
    var app = angular.module('app');

    app.controller('EspacioUsadoCont', ["$scope", 'Pagination', 'UserServ', 'EspacioUsadoServ', function ($scope, Pagination, UserServ, EspacioUsadoServ) {
            $scope.userSelected = {name: ""};
            $scope.tableState;
            $scope.paginate = function (tableState) {

                if ($.un($scope.tableState)) {
                    $scope.tableState = tableState;
                }

                var filter = Pagination.getFilter(tableState);


                let parameters = undefined;
                let request = undefined;
                if ($scope.userSelected.id > 0) {

                    request = {
                        pageNumber: Pagination.getPagination($scope.tableState).pageNumber,
                        pageSize: Number(Pagination.getPagination($scope.tableState).pageSize),
                        "jconf": JSON.stringify({
                            attrs: ['pages', 'count'],
                            list: jconf.security.espacioUsado.list
                        }),
                        "user": $scope.userSelected.id
                    };

                } else {

                    parameters = {
                        filters: [{
                                field: "capacidadUsada",
                                options: ["GE"],
                                value: filter ? filter : 0
                            }],
                        "options": ["OR_FILTERS"],
                        orders: ["capacidadUsada"],
                        pagination: Pagination.getPagination(tableState)
                    };

                    request = {
                        pageNumber: Pagination.getPagination($scope.tableState).pageNumber,
                        pageSize: Number(Pagination.getPagination($scope.tableState).pageSize),
                        "jconf": JSON.stringify({
                            attrs: ['pages', 'count'],
                            list: jconf.security.espacioUsado.list
                        }),
                        "query": parameters,
                    };

                    request.query.orders = ["capacidadUsada"]
                    if (!$.un($scope.tableState.sort.predicate) && $scope.tableState.sort.reverse === false) {
                        request.query.orders = [">capacidadUsada"];
                    } else if (!$.un($scope.tableState.sort.predicate) && $scope.tableState.sort.reverse === true) {

                        request.query.orders = ["<capacidadUsada"];
                    }

                }

                EspacioUsadoServ.loadEspacioUsado(request).success(function (data) {
                    $scope.espaciosTbl = data.list || [];
                    $scope.espacios = data.list || [];
                    $scope.count = data.count;

                    if (!$.un($scope.tableState)) {
                        $scope.tableState.pagination.numberOfPages = data.pages;
                        $scope.tableState.pagination.totalItemCount = data.count;
                    }
                });

            };

            $scope.onChangeUser = function (user) {
                let arrayReturn = [];
                if (user !== null) {
                    angular.forEach($scope.espaciosSource, function (value, key) {
                        if (!$.un(value.userId)) {
                            if (value.userId === user) {
                                arrayReturn.push(value);
                            }
                        }
                    });

                    $scope.espacios = arrayReturn;
                    $scope.espaciosTbl = arrayReturn;

                } else {
                    $scope.espacios = $scope.espaciosSource;
                    $scope.espaciosTbl = $scope.espaciosSource;
                    ;
                }
            };

            $scope.userHashNext = true;
            $scope.fetch = function ($select, $event) {
                if (!$event) {
                    $scope.pageUsers = 0;
                    $scope.users = [];
                } else {
                    $event.stopPropagation();
                    $event.preventDefault();
                    $scope.pageUsers++;
                }

                $scope.loading = true;
                var request = {
                    "jconf": JSON.stringify({
                        attrs: ['pages', 'count'],
                        list: $.jconf.onlyEnabled({attrs: ['id', 'name']})
                    }),
                    "query": {
                        filters: [{
                                field: "name",
                                options: ["PART_STRING"],
                                value: $select.search
                            }],
                        orders: ['name'],
                        pagination: {
                            pageNumber: $scope.pageUsers * 10, //se multiplica el numero de pagina * pageSize
                            pageSize: 10
                        }
                    }
                };

                UserServ.load(request).then(function (resp) {
                    $scope.users = $scope.users.concat(resp.data.list || []);
                    $scope.userHashNext = $scope.pageUsers < resp.data.pages - 1;

                })['finally'](function () {
                    $scope.loading = false;
                });
            };

            $scope.filtrar = function () {

                $scope.paginate();

            };


        }]);
}());