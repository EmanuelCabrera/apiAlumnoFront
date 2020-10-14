(function () {
    var app = angular.module('app');
    app.controller('ErrorLogCont', ["$scope", 'ErrorLogServ', 'RequestLogServ', 'Pagination', '$sce', function ($scope, ErrorLogServ, RequestLogServ, Pagination, $sce) {
            $scope.logSel = undefined;
            $scope.selTodos = false;
            $scope.deleted = false;
            $scope.errorlogs = [];
            $scope.requestDetail = false;

            $scope.onCheck = function () {
                if ($scope.errorlogs.length == 0) {
                    return;
                }

                if ($scope.selTodos) {
                    for (let err of $scope.errorlogs) {
                        err.selected = true;
                    }
                } else {
                    for (let err of $scope.errorlogs) {
                        err.selected = false;
                    }
                }
            };

            $scope.stringToHtml = function (htmlCode) {
                return $sce.trustAsHtml(htmlCode);
            };


            $scope.$watch('errorlogs', function (val) {
                for (let err of $scope.errorlogs) {
                    if (!err.selected) {
                        $scope.selTodos = false;
                        return;
                    }
                }

                $scope.selTodos = true;
            }, true);


            $scope.checkeSel = function () {

                for (let err of $scope.errorlogs) {
                    if (err.selected) {
                        return true;
                    }
                }

                return false;
            };

            $scope.cantSel = function () {
                var cant = 0;

                for (let err of $scope.errorlogs) {
                    if (err.selected) {
                        cant++;
                    }
                }

                return cant;
            };

            $scope.removeSelected = function () {
                var selected = [];
                for (let err of $scope.errorlogs) {
                    if (err.selected) {
                        selected.push(err.id);
                    }
                }

                ErrorLogServ.remove({
                    "ids": selected
                }).success(function (data) {
                    $scope.paginate();
                    $scope.statusDetail = false;
                    $scope.logSel = undefined;
                    $scope.log = undefined;
                });
            };

            $scope.remove = function (id) {
                ErrorLogServ.remove({
                    "id": id
                }).success(function (data) {
                    $scope.paginate();
                    $scope.statusDetail = false;
                    $scope.logSel = undefined;
                    $scope.log = undefined;
                });
            };

            $scope.changePage = function (tableState) {
                $scope.pagination.currentPage = Pagination.getCurrentPageByTableState(tableState);
            };

            $scope.paginate = function (tableState) {

                var filter = Pagination.getFilter(tableState);

                ErrorLogServ.load({
                    "jconf": JSON.stringify({
                        attrs: ['pages', 'count'],
                        list: jconf.root.logs.errorLog
                    }),
                    "query": JSON.stringify({
                        filters: [{
                                field: "user",
                                options: ["PART_STRING"],
                                value: filter
                            }, {
                                field: "sms",
                                options: ["PART_STRING"],
                                value: filter
                            }
                        ],
                        "options": ["OR_FILTERS"],
                        orders: [">fechaHora"],
                        pagination: Pagination.getPagination(tableState)
                    })
                }).success(function (data) {
                    $scope.errorlogs = data.list || [];
                    $scope.count = data.count;
                    if (!$.un($scope.tableState)) {
                        $scope.tableState.pagination.numberOfPages = data.pages;
                    }

                });
            };

            $scope.statusDetail = false;
            $scope.log = {"id": "", "user": "", "sms": "", "resumen": "", "detalle": "", "fechaHora": "", "code": "", "requestLogId": ""};
            $scope.showDetail = function (errorLog, code) {
                if ((!angular.isUndefined($scope.logSel) && $scope.logSel.id === errorLog.id)) {
                    $scope.logSel = undefined;
                } else {
                    $scope.logSel = $.extend({}, errorLog, true);
                }
                $scope.statusDetail = true;
                $scope.requestDetail = false;
                $scope.log.id = errorLog.id;
                $scope.log.user = errorLog.user;
                $scope.log.sms = errorLog.sms;
                $scope.log.resumen = errorLog.resumen;
                $scope.log.detalle = errorLog.detalle;
                $scope.log.fechaHora = errorLog.fechaHora
                $scope.log.code = code;
                $scope.log.requestLogId = errorLog.requestLogId;

            };

            $scope.genError = function () {
                ErrorLogServ.genError();

            };

            $scope.verSolicitud = function (requestLogId) {
                RequestLogServ.load({
                    "id": requestLogId,
                    "jconf": JSON.stringify(jconf.root.logs.requestLog)
                }).success(function (data) {
                    $scope.request = data;
                    $scope.requestDetail = true;
                });
            };

            $scope.ocultarSolicitud = function () {
                $scope.requestDetail = false;
            };


        }]);
}());