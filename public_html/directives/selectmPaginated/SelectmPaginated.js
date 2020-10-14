(function () {
    var app = angular.module('app');
    app.directive('selectmPaginated', ['$injector', function ($injector) {
            return{
                restrict: 'E',
                replace: true,
                templateUrl: 'directives/selectmPaginated/SelectmPaginated.html',
                scope: {
                    config: "=",
                    selectedsId: "=?",
                    selectedsItem: "=?",
                    watch: "=?"//deprecated
                },
                controller: function ($scope, $element, $attrs) {
                    var private = {};
                    var pageSize = $.un($scope.config.pageSize) ? 5 : parseInt($scope.config.pageSize);
                    $scope.config.parserSelect = $.un($scope.config.parserSelect) ? $scope.config.parser : $scope.config.parserSelect;
                    $scope.config.parserChoice = $.un($scope.config.parserChoice) ? $scope.config.parser : $scope.config.parserChoice;
                    $scope.selectedsId = $.un($scope.selectedsId) ? [] : $scope.selectedsId;
                    $scope.selectedsItem = $.un($scope.selectedsItem) ? [] : $scope.selectedsItem;
                    $scope.items = [];

                    $scope.config.action = {
                        clearSelected: function () {
                            $scope.select.selected = undefined;
                            $scope.selectedsItem = [];
                            $scope.selectedsId = [];
                        },
                        search: function () {
                            $scope.fetch($scope.select);
                        }
                    };

                    $scope.config.getSelect = function () {
                        return $scope.select;
                    };


                    $scope.onSelect = function (item, model) {
                        $scope.selectedsItem.push(item);
                        if ($.un($scope.selectedsId)) {
                            $scope.selectedsId = [];
                        }
                        $scope.selectedsId.push(model);
                        private.onSelect();
                    };
                    $scope.onRemove = function (item, model) {
                        $scope.selectedsItem.splice($scope.selectedsItem.indexOf(item), 1);
                        $scope.selectedsId.splice($scope.selectedsId.indexOf(model), 1);
                        private.onSelect();
                    };
                    $scope.isDisableChoice = function (item) {
                        if (!$.un($scope.config.disableChoice)) {
                            return $scope.config.disableChoice(item);
                        } else {
                            return false;
                        }
                    }
                    private.onSelect = function () {
                        if (!$.un($scope.config.onSelect)) {
                            $scope.config.onSelect($scope.selectedsItem, $scope.selectedsId);
                        }
                    };

                    $scope.$watch('selectedsId', function (id) {
                        private.loadObjsSelecteds();
                    });


                    $scope.parserSelect = function (item) {
                        if ($.un(item)) {
                            return "";
                        } else {
                            return $scope.config.parserSelect(item);
                        }
                    }
                    $scope.parserChoice = function (item) {
                        if ($.un(item)) {
                            return "";
                        } else {
                            return $scope.config.parserChoice(item);
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
                                        search: $select.search,
                                        pageNumber: $scope.page * pageSize,
                                        pageSize: pageSize
                                    }
                            , $scope.config);
                        } else {
                            var query = $.extend({}, $scope.config.query($select.search));
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
                            private.loadObjsSelecteds();

                        })['finally'](function () {
                            $scope.loading = false;
                        });
                    };

                    private.loadObjsSelecteds = function () {
                        if (!$.un($scope.selectedsId)) {
                            var itemsFaltantesId = [];
                            for (var i = 0; i < $scope.selectedsId.length; i++) {
                                var exist = $.m_inCollectionId($scope.selectedsId[i], $scope.items);
                                if (!exist) {
                                    itemsFaltantesId.push($scope.selectedsId[i]);
                                }
                            }
                            if (itemsFaltantesId.length > 0) {
                                if (!$.un($scope.config.serviceFind)) {
                                    var fnf = $scope.config.serviceFind({
                                        ids: itemsFaltantesId,
                                        jconf: JSON.stringify($scope.config.jconf)
                                    });
                                } else {
                                    var Service = $injector.get($scope.config.service);
                                    fnf = Service.find({
                                        ids: itemsFaltantesId,
                                        jconf: JSON.stringify($scope.config.jconf)
                                    });
                                }
                                fnf.success(function (data) {
                                    $scope.items = $scope.items.concat(data);
                                    var itemsSel = [];
                                    $.each($scope.selectedsId, function (k, v) {
                                        itemsSel.push($.m_findCollection(parseInt(v), $scope.items))
                                    });
                                    $scope.selectedsItem = itemsSel;
                                });
                            } else {
                                var itemsSel = [];
                                $.each($scope.selectedsId, function (k, v) {
                                    itemsSel.push($.m_findCollection(parseInt(v), $scope.items))
                                });
                                $scope.selectedsItem = itemsSel;
                            }
                        }
                    };
                }
            };
        }]);

}());