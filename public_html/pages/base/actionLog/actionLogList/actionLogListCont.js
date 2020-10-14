    (function () {
    var app = angular.module('app');
    app.controller('ActionLogListCont', ["$scope", 'ActionLogServ', 'Pagination', 'ContenidoServ', 'UserServ', function ($scope, ActionLogServ, Pagination, ContenidoServ, UserServ) {

            var private = {};
            $scope.userSelected = {"id": ""};
            $scope.ipp = 10;
            $scope.objId = 0;
            $scope.accion = "";
            $scope.desde = 0;
            $scope.hasta = 0;
            $scope.clazz = "";
            $scope.value = null;
            $scope.actionLogs = [];


            $scope.filtrar = function () {

                $scope.paginate();

            };

            $scope.thumbnail = function (obj, id) {
                     
                    ActionLogServ.notThumbnail(id).success(function (data) {
                        console.log(data);
                        if ( data === 1) {
                            obj['image'] = rootService + "security/user/profilethumbnail" + "?id=" + id;
                        }             
                        else if( data === 0 ){
                          
                           obj['image'] = "img/user.png";                            
                        }
                        
                        else  {
                            obj['image'] = data.img;
                        }
                    }); 
            };



            $scope.paginate = function (tableState) {

                if ($.un($scope.tableState)) {
                    $scope.tableState = tableState;
                }
                var filter = Pagination.getFilter(tableState);
                let parameters = undefined;
                if ($scope.userSelected.id > 0) {
                    parameters = {
                        filters: [{
                                field: "userId",
                                options: ["EQ"],
                                value: $scope.userSelected.id ? $scope.userSelected.id : 0
                            }

                        ],
                        "options": ["OR_FILTERS"],
                        orders: [">time"],
                        pagination: Pagination.getPagination(tableState)
                    }
                } else {
//                    
                    parameters =
                            {
                                filters: [{field: "sms",
                                        options: ["PART_STRING"],
                                        value: filter

                                    }],
                                "options": ["OR_FILTERS"],
                                orders: [">time"],
                                pagination: Pagination.getPagination(tableState)
                            };
                }

                ActionLogServ.getDat({
                    "jconf": JSON.stringify({
                        attrs: ['pages', 'count'],
                        list: {attrs: ['id', 'objId', 'userId', 'sms', 'time', 'clazz']}
                    }),
                    "query": JSON.stringify(parameters)
                }).success(function (data) {

                    $scope.actionLogs = data.list || [];


                    for (let a of $scope.actionLogs) {
                         $scope.thumbnail(a, a.userId);
                    }


                    $scope.count = data.count;

                    if (!$.un($scope.tableState)) {
                        $scope.tableState.pagination.numberOfPages = data.pages;
                    }

                });

            };

            $scope.init = function () {
                $scope.pagination = Pagination.getSessionPage();
                $scope.paginate();
            };
            
            
            $scope.userHashNext = true;
            $scope.fetch = function ($select, $event) {
                // no event means first load!
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
                            pageNumber: $scope.pageUsers * 10,//se multiplica el numero de pagina * pageSize
                            pageSize: 10
                        }
                    }
                };

                UserServ.load(request).then(function (resp) {
                    $scope.users = $scope.users.concat(resp.data.list || []);
                    $scope.userHashNext = $scope.pageUsers< resp.data.pages-1;

                })['finally'](function () {
                    $scope.loading = false;
                });
            };

            $scope.init();

        }]);
}());
