(function () {
    var app = angular.module('app');
    app.directive("actionLogView", ['ActionLogServ', function (ActionLogServ) {
            return {
                templateUrl: 'pages/base/actionLog/actionLogDir/actionLogView/actionLogView.html',
                scope: {
                    id: "=?"
                },
                controller: function ($scope, $element, $attrs) {
                    $scope.actionLogs =[] ;
                    $scope.actionLogsTbl =[] ;

                    $scope.$watch('id', function (id) {
                        if (!$.un(id)){
                            $scope.paginate();
                        }
                    });
                    
                    $scope.paginate = function () {
                      
                        
                        if (!$.un($scope.id)) {
                            ActionLogServ.getData({
                                objId: $scope.id,
                                jconf: {
                                    attrs: ['id', 'sms', 'time']
                                }
                            }).success(function (data) {
                                $scope.actionLogs = data;
                                $scope.actionLogsTbl = [].concat(data);

                            });
                        }
                    };


                }

            };
        }]);
}());