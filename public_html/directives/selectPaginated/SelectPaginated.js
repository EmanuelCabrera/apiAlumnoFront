(function () {
    var app = angular.module('app');
    app.directive('selectPaginated', ['$injector', function ($injector) {
            return{
                restrict: 'E',
                replace: true,
                templateUrl: 'directives/selectPaginated/SelectPaginated.html',
                scope: {
                    config: "=",
                    selectedId: "=?",
                    selectedItem: "=?",
                    referencedData: "=?",
                    watch: "=?",
                },
                controller: function ($scope, $element, $attrs) {
                    var pageSize = $.un($scope.config.pageSize) ? 5 : parseInt($scope.config.pageSize);
                    $scope.config.parserSelect = $.un($scope.config.parserSelect) ? $scope.config.parser : $scope.config.parserSelect;
                    $scope.config.parserChoice = $.un($scope.config.parserChoice) ? $scope.config.parser : $scope.config.parserChoice;
                    $scope.config.allowClear = $.un($scope.config.allowClear) ? true : $scope.config.allowClear;
                    $scope.config.disabled = $.un($scope.config.disabled) ? false : $scope.config.disabled;
                    console.log($scope.config);

                    var genData = function () {
                        return {config: $scope.config, referencedData: $scope.referencedData};
                    }
                    
                    $scope.config.action = {
                        clearSelected: function () {
                            $scope.select.selected = undefined;
                            $scope.selectedItem = undefined;
                            $scope.selectedId = undefined;
                        },
                        search: function () {
                            $scope.fetch($scope.select);
                        }
                    };

                    $scope.onSelect = function (item, model) {
                        $scope.selectedItem = model;
                        $scope.selectedId = $.un(model) ? undefined : model.id;
                        if (!$.un($scope.config.onSelect)) {
                            $scope.config.onSelect($scope.selectedItem, $scope.selectedId, genData());
                        }
                        ;
                    };


                    $scope.isDisableChoice = function (item) {
                        if (!$.un($scope.config.disableChoice)) {
                            return $scope.config.disableChoice(item, genData());
                        } else {
                            return false;
                        }
                    }
                    $scope.parserSelect = function (item) {
                        if ($.un(item)) {
                            return "";
                        } else {
                            return $scope.config.parserSelect(item, genData());
                        }
                    }
                    $scope.parserChoice = function (item) {
                        if ($.un(item)) {
                            return "";
                        } else {
                            return $scope.config.parserChoice(item, genData());
                        }
                    }
                    if (!$.un($scope.watch)) {
                        $scope.$watch('watch', function (v) {
                             $scope.fetch($scope.select);
                        });
                    }

                    $scope.fetch = function ($select, $event) {
                        $scope.select = $select;
                        // no event means first load!
                        if (!$event) {
                            $scope.page = 0;
                            $scope.items = [];
                        } else {
                            $event.stopPropagation();
                            $event.preventDefault();
                            $scope.page++;
                        }
                        $scope.loading = true;
                        var fn;
                        if (!$.un($scope.config.serviceSearch)) {
                            var fn = $scope.config.serviceSearch(
                                    {
                                        search: $.un($scope.select)?"":$scope.select.search,
                                        pageNumber: $scope.page * pageSize,
                                        pageSize: pageSize
                                    }
                            , $scope.config);
                        } else {
                            var query = $.extend({}, $scope.config.query($.un($scope.select)?"":$scope.select.search));
                            query.pagination = {
                                pageNumber: $scope.page * pageSize,
                                pageSize: pageSize
                            };
                            var request = {
                                "jconf": JSON.stringify({
                                    attrs: ['pages', 'count'],
                                    list: $.jconf.onlyEnabled($scope.config.jconf)
                                }),
                                "query": query
                            };
                            var Service = $injector.get($scope.config.service);
                            fn = Service.find(request);
                        }

                        fn.then(function (resp) {
                            $scope.itemsHashNext = $scope.page < resp.data.pages - 1;
                            if (!$event) {
                                $scope.items = resp.data.list || [];
                            } else {
                                $scope.items = $scope.items.concat(resp.data.list || []);
                            }
                            if (!$.un($scope.selectedId)) {
                                var exist = $.m_inCollectionId($scope.selectedId, $scope.items);
                                if (!exist) {
                                    if (!$.un($scope.config.serviceFind)) {
                                        var fnf = $scope.config.serviceFind({
                                            id: $scope.selectedId,
                                            jconf: JSON.stringify($scope.config.jconf)
                                        });
                                    } else {
                                        var Service = $injector.get($scope.config.service);
                                        fnf = Service.find({
                                            id: $scope.selectedId,
                                            jconf: JSON.stringify($scope.config.jconf)
                                        });
                                    }
                                    fnf.success(function (data) {
                                        $scope.items = $scope.items.concat(data);
                                        $scope.selectedItem = $.m_findCollection($scope.selectedId, $scope.items);
                                    });
                                } else {
                                    $scope.selectedItem = $.m_findCollection($scope.selectedId, $scope.items);
                                }
                            }
                        })['finally'](function () {
                            $scope.loading = false;
                        });
                    };
                }
            };
        }]);

}());