/* 
 * CICHA Created: 26/03/2015
 */
(function () {
    var app = angular.module('app');
    app.directive('commentPlain', ['CommentPlainServ', '$sce', '$rootScope', function (CommentPlainServ, $sce, $rootScope) {
            return{
                restrict: 'E',
                replace: true,
                templateUrl: templates.commentplain,
                scope: {
                    onCreate: "=?",
                    onRemove: "=?",
                    comments: "=?",
                    requiredFields: "=?",
                    user: "=?"
                },

                controller: function ($scope) {
                    var private = {};


                    $scope.comentar = false;
                    $scope.enableComment = function () {
                        $scope.comentar = !$scope.comentar;
                    };
                    $scope.btnCreateClick = function () {
                        if (!$.un($scope.onCreate)) {
                            $scope.onCreate($scope.commentPlain);
                            $scope.enableComment();
                        }
                    };
                    $scope.btnRemoveClick = function () {
                        if (!$.un($scope.onRemove)) {
                            $scope.onRemove($scope.commentPlain);
                        }
                    };
//                    Parse string to htlml
                    $scope.stringToHtml = function (htmlCode) {
                        console.log($scope.commets);
                        return $sce.trustAsHtml(htmlCode);
                    };


                    ///BORRAR COMENTARIO
                    $scope.borrar = function (commentId) {
                        bootbox.confirm({
                            message: "Esta seguro que desea eliminar el comentario?",
                            buttons: {
                                confirm: {
                                    label: 'Confirmar',
                                    className: 'btn-success'
                                },
                                cancel: {
                                    label: 'Cancelar',
                                    className: 'btn-danger'
                                }
                            },
                            callback: function (result) {
                                console.log('This was logged in the callback: ' + result);
                                if (result) {
                                    $scope.onRemove(commentId);
                                }
                            }
                        });
                    };
                }
            };
        }]);
}());