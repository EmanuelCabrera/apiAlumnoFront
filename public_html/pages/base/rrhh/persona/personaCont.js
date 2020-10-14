//
//Miguel Created: 2016/03/30 
//
(function () {
    var app = angular.module('app');

    app.controller('PersonaCont', ["$scope", 'PersonaServ', 'Pagination', "$http", function ($scope, PersonaServ, Pagination, $http) {

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

            $scope.exportar = function (tableState) {
                if ($.un($scope.tableState)) {
                    $scope.tableState = tableState;
                }

                var jconfParam = angular.copy(jconf.rrhh.persona.exportar);


                jconfParam["@format"] = "CSV";
                $.jconf.filter(jconfParam, $scope.jconfFiltro);
                var filter = Pagination.getFilter(tableState);

                var request = {
                    "jconf": JSON.stringify(jconfParam),
                    "query": JSON.stringify({
                        filters: [{
                                field: "nombres",
                                options: ["PART_STRING"],
                                value: filter
                            }, {
                                field: "apellido",
                                options: ["PART_STRING"],
                                value: filter
                            }, {
                                field: "documento",
                                options: ["PART_STRING"],
                                value: filter
                            }
                        ],
                        "options": ["OR_FILTERS"],
                    })
                };

                if (!$.un($scope.tableState.sort.predicate)) {
                    request.query.orders = [$scope.tableState.sort.predicate];
                }

                PersonaServ.load(request).success(function (data) {
                    var anchor = angular.element('<a/>');
                    anchor.attr({
                        href: 'data:attachment/csv;charset=utf-8,' + encodeURI(data),
                        target: '_blank',
                        download: 'personas.csv'
                    })[0].click();
                });

            };

            $scope.paginate = function (tableState) {

                if ($.un($scope.tableState)) {
                    $scope.tableState = tableState;
                }

                var filter = Pagination.getFilter(tableState);

                var request = {
                    "jconf": JSON.stringify({
                        attrs: ['pages', 'count'],
                        list: $.jconf.filter({
                            attrs: ['id', 'nombres', 'apellido', 'nombreCompleto', 'tipoDoc', 'documento', 'cuit', 'contacto.correo', 'deletedAt'],
                            user: {
                                attrs: ['id', 'cuit',"name"]
                            }
                        }, $scope.jconfFiltro)
                    }),
                    "query": {
                        filters: [{
                                field: "nombres",
                                options: ["PART_STRING"],
                                value: filter
                            }, {
                                field: "apellido",
                                options: ["PART_STRING"],
                                value: filter
                            }, {
                                field: "documento",
                                options: ["PART_STRING"],
                                value: filter
                            }],
                        "options": ["OR_FILTERS"],
                        pagination: Pagination.getPagination(tableState)
                    }
                };

                if (!$.un($scope.tableState.sort.predicate)) {
                    if (!$.un($scope.tableState.sort.predicate)) {
                        request.query.orders = [">" + $scope.tableState.sort.predicate];
                    } else {
                        request.query.orders = [$scope.tableState.sort.predicate];
                    }
                }//reverse

                request.query = JSON.stringify(request.query);

                PersonaServ.load(request).success(function (data) {
                    $scope.personas = data.list || [];
                    $scope.count = data.count;
                    if (!$.un($scope.tableState)) {
                        $scope.tableState.pagination.numberOfPages = data.pages;
                    }
                });
            };

        }]);
}());