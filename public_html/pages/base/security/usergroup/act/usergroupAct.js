//
//Miguel Created: 2016/03/30 
//
(function () {
    var app = angular.module('app');

    app.controller('UserGroupAct', ["$scope", "$rootScope", 'UserServ', 'UserGroupServ', '$state', '$stateParams', "$window", function ($scope, $rootScope, UserServ, UserGroupServ, $state, $stateParams, $window) {
            var private = {};
            $scope.usergroup = {users: []};
            $scope.saving = false;
            $scope.rf = {};
            $scope.rf.usergroup = ['nombre'];
            vm = this;
            vm.selected;

            $scope.create = function () {
                $scope.saving = true;
                UserGroupServ.create($scope.usergroup)
                        .success(function (data) {

                            $window.history.back();
                        }).error(function () {
                    $scope.saving = false;
                });
            };

            $scope.update = function () {
                $scope.saving = true;
                UserGroupServ.update($scope.usergroup)
                        .success(function (data) {
                            $window.history.back();
                        }).error(function () {
                    $scope.saving = false;
                });
            };

            $scope.isCheck = function (user) {
                return $scope.usergroup.users.indexOf(user) !== -1;
            };

            $scope.onCheck = function (user) {
                var index = $scope.usergroup.users.indexOf(user);
                if (index > -1) {
                    $scope.usergroup.users.splice(index, 1);
                } else {
                    $scope.usergroup.users.push(user);
                }
            };

            $scope.init = function () {
                if ($stateParams.id) {
                    UserGroupServ.load({
                        "id": $stateParams.id,
                        "jconf": $.jconf.onlyEnabledExtend(jconf.security.usergroup.form)
                    }).success(function (data) {
                        $scope.usergroup = data;
//                        var usersId = [];
//                        angular.forEach(data.users, function (user, key) {
//                            usersId.push(user.id);
//                        });
//                        $scope.usergroup.usersId = usersId;
                    });
                }

                UserServ.load({
                    jconf: $.jconf.onlyEnabledExtend({
//                        jconf: JSON.stringify({
                        attrs: ['id', 'name']
                    })
                }).success(function (data) {

                    $scope.users = data;
                });
            };

            $scope.selectUsuario = {
                service: "UserServ",
                serviceSearch: function (data, config) {
                    console.log(data);
                    var request = $.extend({}, data);
                    request.jconf = {
                        attrs: ['pages', 'count'],
                        list: config.jconf
                    };
                    console.log(request);
                    return UserServ.search(request);
                },
                textName: "Usuario",
                jconf: {attrs: ['id', 'name', 'correo','deletedAt']},
                parser: function (item) {
                    return item.name + " " + item.correo;
                }
            };

            $scope.init();
        }]);
}());