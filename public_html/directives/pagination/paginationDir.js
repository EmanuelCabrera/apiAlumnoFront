(function () {
    var app = angular.module('app');
    app.directive("customPagination", ['Pagination', "$rootScope", function (Pagination, $rootScope) {
            return {
               
                templateUrl: 'directives/pagination/paginationDir.html',
                scope: {
                    displayPages: "=?"

                },
                controller: function ($scope, $element, $attrs) {
                    
                    $rootScope.$on("customPagination.ipp", function (ev, data) {
                        $scope.pagination.ipp = data;

                    });
                    
                    $scope.pagination = Pagination.getSessionPage();

                    $scope.changePage = function (tableState) {
                        
                        $scope.pagination.currentPage = Pagination.getCurrentPageByTableState(tableState);
                        //Pagination.setSessionPage(angular.copy($scope.pagination));
                    };

                }

            };
        }]);

        app.directive('ippTable', ['Pagination', '$rootScope', function (Pagination, $rootScope) {
            return {
                restrict: 'E',
                template: '<span class="hidden-xs">{{textIpp}}</span> <select style="width: 85px;" class="form-control input-sm hidden-xs" ng-model="ipp">\n\
                            <option ng-repeat="i in items" value="{{i.count}}">{{i.text}}</option>\n\
                        </select>',
                scope: {
//                ipp: '=',
                    items: '=?',
                    textIpp: '=?'

                },
                controller: function ($scope, $element, $attrs) {

                    if ($.un($scope.items)) {
                        $scope.textIpp = "Items por página";
                    }

                    $scope.ipp = Pagination.getSessionPage().ipp.toString();

                    $scope.$watch('ipp', function (ipp) {
                        let pagination = Pagination.getSessionPage();
                        pagination.ipp = ipp;
                        Pagination.setSessionPage(pagination);
                        $rootScope.$broadcast("customPagination.ipp", ipp);
                    });

                    if ($.un($scope.items)) {
                        $scope.items = [
                             {
                                 count: 5,
                                 text: "5"
                             },
                            {
                                count: 10,
                                text: "10"
                            },
                            {
                                count: 20,
                                text: "20"
                            },
                            {
                                count: 50,
                                text: "50"
                            },
                            {
                                count: 10000,
                                text: "Todos"
                            }

                        ];

                    }

                }
            };
        }]);
}());