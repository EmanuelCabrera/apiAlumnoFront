(function () {
    var app = angular.module('app');
    app.directive("openModalActionLog", ['$uibModal', function ($uibModal) {
            return {
                templateUrl: 'pages/base/actionLog/actionLogDir/actionLogModal/openModalActionLogDir/openModalActionLog.html',
                scope: {
                    id: "=?",
                    size: "@?",
                    textButton: "@?",
                    classButton: "@?",
                    onlyIcon: "@?",
                    icon: "@?"

                },
                controller: function ($scope, $element, $attrs) {
                    $scope.classButton = $scope.classButton ? $scope.classButton : "btn-default";
                    $scope.textButton = $scope.textButton ? $scope.textButton : "Ver acciones";
                    $scope.size = $scope.size ? $scope.size : "";
                    $scope.onlyIcon = $scope.onlyIcon ? $scope.onlyIcon : false;
                    $scope.icon = $scope.icon ? $scope.icon : "fa fa-list-ol";

                    $scope.verModal = function () {
                        $uibModal.open({
                            animation: true,
                            size: $scope.size,
                            templateUrl: 'pages/base/actionLog/actionLogDir/actionLogModal/actionLogModal.html',
                            controller: 'ActionLogModalCont',
                            controllerAs: '$scope',
                            resolve: {
                                id: $scope.id
                            }
                        });

                    };

                }

            };
        }]);
}());