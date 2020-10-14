
(function () {
    var app = angular.module('app');
    app.directive('profileImg', ['$rootScope', function ($rootScope) {
            return {
                restrict: 'A',
                scope: {
                    user: '=',
                    cuidadano: '=?'
                },
                controller: function ($scope, $element, $attrs) {

//                    $element[0].src = $rootScope.userProfileImg();

                    $element[0].onerror = function () {
                        $element[0].src = "img/user.png";
                    };

                    $scope.$watch('user', function (user, oldValue) {

                        $element[0].onerror = function () {
                            $element[0].src = "img/user.png";
                        };


                        if (!$.un(user) || $attrs.user) {

                            $element[0].src = $rootScope.getProfileImg(user, $scope.cuidadano);


                        } else {
                            $element[0].src = $rootScope.userProfileImg();

                        }

                    }, true);
                }
            };
        }
    ]);
}());