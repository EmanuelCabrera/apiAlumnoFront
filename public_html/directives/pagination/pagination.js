
(function () {
    var app = angular.module('app');
    app.service('Pagination', ['$sessionStorage', '$state', function ($sessionStorage, $state) {

            $sessionStorage.prefix(config.pagination.prefix);

            var s = {
                key: $state.current.name + '_' + 'pagination',
                ipp: config.pagination.ipp
            };

            s.setSessionPage = function (pagination) {
                
                if (!$.un($sessionStorage.get($state.current.name + '_' + 'pagination'))) {
                    $sessionStorage.remove(s.key);
                }

                $sessionStorage.put(s.key, pagination);
            };

            s.getSessionPage = function () {

//                var pag = $sessionStorage.get($state.current.name + '_' + 'pagination');
                var pag = undefined;
                return $.un(pag) ? {
                    ipp: s.ipp,
                    currentPage: 1
                } : pag;
            };

            s.getCurrentPageByTableState = function (tableState) {

                if (!$.unCascade(tableState, "pagination.start") && !$.unCascade(tableState, "pagination.number")) {
                    return (tableState.pagination.start + parseInt(tableState.pagination.number)) / parseInt(tableState.pagination.number);
                }

                return 1;
            };

            s.getPagination = function (tableState) {
                var pagination = {
                    pageNumber: $.unCascade(tableState, "pagination.start") ? 0 : tableState.pagination.start,
                    pageSize: $.unCascade(tableState, "pagination.number") ? s.ipp : tableState.pagination.number
                };

                return pagination;
            };


            s.getFilter = function (tableState) {
                var filter = $.unCascade(tableState, "search.predicateObject.$") ? "" : tableState.search.predicateObject.$;

                return filter;

            };

            return s;
        }]);
}());