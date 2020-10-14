(function () {
    var app = angular.module('app');
    app.directive("countRows", function () {
        return {
            template: '<span>Mostrando de <b>{{from}}</b> a <b>{{to}}</b> elementos  de <b>{{total}}</b> </span>',
            scope: {
                items: "=?", // Cantidad de itemes por pagina (Se podria llegar a sacar)
                total: "=?", // Cantidad de total de items
                tableState: "=?", // tableState de la la paginacion (expose-state="tableState")
            },
            controller: function ($scope, $element, $attrs) {

                $scope.from = 0;
                $scope.to = 0;

                $scope.$watch('tableState', function (p) {

                    if ($.un(p) || $.un($scope.items) || $.un(p.pagination.number)) {
                        return;
                    }

                    $scope.from = p.pagination.start + 1;

                    $scope.to = $scope.from + parseInt(p.pagination.number) - 1;

                    if (parseInt($scope.to) >= parseInt($scope.total)) {
                        $scope.to = $scope.total;
                    }

                    if ($.un($scope.total) || parseInt($scope.total) <= 0) {
                        $scope.from = 0;
                    }

                }, true);

                $scope.$watch('total', function (total) {

                    if (total == 0) {
                        $scope.from = 0;
                        $scope.to = 0;

                    }

                });

                $scope.$watch('items', function (items) {

                    if ($.un($scope.tableState) || $.un($scope.tableState.pagination) ) {
                        return;
                    }

                    if (parseInt($scope.tableState.pagination.numberOfPages) <= 1) {
                        $scope.from = items > 0 ? 1 : 0;
                        $scope.to = items;

                    }

                });
            }
        };
    });
}());