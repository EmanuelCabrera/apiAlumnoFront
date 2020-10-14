(function () {
    var app = angular.module('app');
    app.controller('RequestLogCont', ["$scope", 'RequestLogServ', '$sessionStorage', 'Pagination', 'UserServ', function ($scope, RequestLogServ, $sessionStorage, Pagination, UserServ) {
            $scope.logSel = undefined;
            $scope.time = 0;
            $scope.userSelected = {name: ""};
            $scope.filterPeticion = "";
            $scope.absolutePath = "";
            $scope.remoteAddress = "";
            $scope.selTodos = false;
            $scope.deleted = false;
            $scope.requestlogs = [];
//            $scope.peticiones = [{"name": "GET"}, {"name": "POST"}, {"name": "PUT"}, {"name": "DELETE"}];
            $scope.ipp = 10;
            $scope.tableState;

            $scope.onCheck = function () {
                if ($scope.requestlogs.length == 0) {
                    return;
                }

                if ($scope.selTodos) {
                    for (let err of $scope.requestlogs) {
                        err.selected = true;
                    }
                } else {
                    for (let err of $scope.requestlogs) {
                        err.selected = false;
                    }
                }
            };

            $scope.$watch('requestlogs', function (val) {
                for (let err of $scope.requestlogs) {
                    if (!err.selected) {
                        $scope.selTodos = false;
                        return;
                    }
                }

                $scope.selTodos = true;
            }, true);

            $scope.filtrarPeticion = function () {
                $scope.paginate();
            };

            $scope.filtrarUser = function () {
                $scope.paginate();
            };

            $scope.filtrar = function () {
                $scope.paginate();
            };

            $scope.checkeSel = function () {

                for (let err of $scope.requestlogs) {
                    if (err.selected) {
                        return true;
                    }
                }

                return false;
            };

            $scope.cantSel = function () {
                var cant = 0;

                for (let err of $scope.requestlogs) {
                    if (err.selected) {
                        cant++;
                    }
                }

                return cant;
            };

            $scope.removeSelected = function () {
                var selected = [];
                for (let err of $scope.requestlogs) {
                    if (err.selected) {
                        selected.push(err.id);
                    }
                }

                RequestLogServ.remove({
                    "ids": selected
                }).success(function (data) {
                    $scope.paginate();
                    $scope.statusDetail = false;
                    $scope.logSel = undefined;
                    $scope.log = undefined;

                });
            };



            $scope.remove = function (id) {
                RequestLogServ.remove({
                    "id": id
                }).success(function (data) {
                    $scope.paginate();
                    $scope.statusDetail = false;
                    $scope.logSel = undefined;
                    $scope.log = undefined;
                });
            };

            $scope.paginate = function (tableState) {
                $scope.filters = [{
                        field: "method",
                        options: ["PART_STRING"],
                        value: $scope.filterPeticion ? $scope.filterPeticion : ""
                    },
                    {
                        field: "absolutePatch",
                        options: ["PART_STRING"],
                        value: $scope.absolutePath ? $scope.absolutePath : ""
                    },
                    {
                        field: "remoteAddr",
                        options: ["PART_STRING"],
                        value: $scope.remoteAddress ? $scope.remoteAddress : ""
                    },
                    {
                        field: "time",
                        options: ["GE"],
                        value: $scope.time ? $scope.time : 0
                    }
                ];
                if ($.un($scope.tableState)) {
                    $scope.tableState = tableState;
                }
                var filter = Pagination.getFilter(tableState);

                if (!$.un($scope.userSelected)) {
                    if ($scope.userSelected.name) {
                        $scope.filters = [{
                                field: "method",
                                options: ["PART_STRING"],
                                value: $scope.filterPeticion ? $scope.filterPeticion : ""
                            },
                            {
                                field: "absolutePatch",
                                options: ["PART_STRING"],
                                value: $scope.absolutePath ? $scope.absolutePath : ""
                            },
                            {
                                field: "remoteAddr",
                                options: ["PART_STRING"],
                                value: $scope.remoteAddress ? $scope.remoteAddress : ""
                            },
                            {
                                field: "time",
                                options: ["GE"],
                                value: $scope.time ? $scope.time : 0
                            },
                            {
                                field: "user",
                                options: ["PART_STRING"],
                                value: $scope.userSelected.name ? $scope.userSelected.name : ""
                            }];
                    }
                }

                RequestLogServ.load({
                    "jconf": JSON.stringify({
                        attrs: ['pages', 'count'],
                        list: jconf.root.logs.requestLog
                    }),
                    "query": JSON.stringify({
                        filters: $scope.filters,
                        "options": ["AND_FILTERS"],
                        orders: [">datetime", ">time"],
                        pagination: Pagination.getPagination(tableState)
                    })
                }).success(function (data) {
                    console.log(data);
                    $scope.requestlogs = data.list || [];
                    $scope.count = data.count;
                    if (!$.un($scope.tableState)) {
                        $scope.tableState.pagination.numberOfPages = data.pages;
                    }

                });
            };

            $scope.statusDetail = false;
            $scope.log = {"method": "",
                "queryParams": "",
                "patchParams": "",
                "jsonParams": "",
                "headersParams": "",
                "absolutePatch": "",
                "datetime": "",
                "time": "",
                "remoteAddr": "",
                "remoteHost": "",
                "remoteUser": "",
                "remotePort": "",
                "characterEncoding": "",
                "user": ""};
            $scope.showDetail = function (requestLog) {
                if ((!angular.isUndefined($scope.logSel) && $scope.logSel.id === requestLog.id)) {
                    $scope.logSel = undefined;
                } else {
                    $scope.logSel = $.extend({}, requestLog, true);
                }
                $scope.statusDetail = true;
                $scope.log.method = requestLog.method;
                $scope.log.queryParams = requestLog.queryParams;
                $scope.log.formParams = requestLog.formParams;
                $scope.log.patchParams = requestLog.patchParams;
                $scope.log.jsonParams = requestLog.jsonParams;
                $scope.log.headersParams = requestLog.headersParams;
                $scope.log.absolutePatch = requestLog.absolutePatch;
                $scope.log.datetime = requestLog.datetime;
                $scope.log.time = requestLog.time;
                $scope.log.remoteAddr = requestLog.remoteAddr;
                $scope.log.remoteHost = requestLog.remoteHost;
                $scope.log.remoteUser = requestLog.remoteUser;
                $scope.log.remotePort = requestLog.remotePort;
                $scope.log.characterEncoding = requestLog.characterEncoding;
                $scope.log.user = requestLog.user;
            }


            $scope.init = function () {
                $scope.pagination = Pagination.getSessionPage();
                UserServ.load({
                    "jconf": JSON.stringify({attrs: ['id', 'name', 'correo']})
                }).success(function (data) {
                    $scope.users = data;
                    console.log(data);
                });

            };
            $scope.selectUsuario = {
                service: "UserServ",
                serviceSearch: function (data, config) {
                    console.log(data);
                    var request = $.extend({}, data);
                    request.jconf = {
                        attrs: ['pages', 'count'],
                        list: config.jconf
                    };
                    console.log(request);
//                    UserServ.search(request).success(function (data) {
//                        console.log(data);
//                    });
                    return UserServ.search(request);
                },
                textName: "Usuario",
                jconf: {attrs: ['id', 'name', 'correo', 'deletedAt']},
                parser: function (item) {
                    return item.name + " " + item.correo;
                }
            };

            $scope.init();
        }]);
}());

