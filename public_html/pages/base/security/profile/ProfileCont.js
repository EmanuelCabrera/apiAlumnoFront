/* 
 * CICHA Created: 09/12/2014  
 */
(function () {
    var app = angular.module('app');

    app.controller('ProfileCont', ["$scope", "$rootScope", '$state', '$stateParams', '$sce', 'SessionServ', 'UserServ', 'PersonaServ',
        function ($scope, $rootScope, $state, $stateParams, $sce, SessionServ, UserServ, PersonaServ) {
            $scope.pass = {};
            $scope.changePassword = {
            };
            $scope.changeProfile = {
            };

            $scope.usuario = {
                tipo: 0
            };

            var private = {};

            private.initImg = function () {
                if ($.un($rootScope.user)) {
                    return;
                }

                if ($rootScope.user.profileImg) {
                    if (isNaN($rootScope.user.profileImg)) {

                        $scope.usuario.tipo = 1;

                        $scope.usuario.profileimg = $rootScope.user.profileImg;
                    } else {
                        $scope.usuario.tipo = 0;

                        $scope.usuario.url = services.contenido.file + "?id=" + $rootScope.user.profileImg;
                    }
                }
            };

            $scope.backUrl = atob($stateParams.backUrl);

            $scope.profileSocialNetworkShow = $.un(config.profileSocialNetworkShow) || config.profileSocialNetworkShow;


            $scope.updateProfile = function () {

                UserServ.changeProfile($scope.changeProfile).success(function (data) {

                    $scope.doBackUrl();
                });
            };

            $scope.subirImg = function () {

                if (!$.un($scope.usuario.file) && $scope.usuario.file.length > 0) {

                    UserServ.profileimgContenido({profileImg: $scope.usuario.file[0]})
                            .progress(function (evt) {
                                var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                                $scope.uploadProgress = progressPercentage;

                            })
                            .then(function () {
                                $scope.doBackUrl();

                            })
                            .catch(private.errorHandler);
                } else {
                    new PNotify({styling: 'fontawesome',
                        title: 'Atención',
                        text: "Primero tenés que elegir un archivo",
                        type: 'warning',
                        delay: 3000
                    });
                }
            };

            $scope.passChange = function () {
                UserServ.passChange({
                    "actualPass": $scope.pass.actualPass,
                    "newPass1": $scope.pass.newPass1,
                    "newPass2": $scope.pass.newPass2
                }).success(function (data, status, headers, config) {
                    $scope.pass = {};
                    $scope.doBackUrl();
                });
            };


            $scope.init = function () {
                var data = {jconf: JSON.stringify({
                        attrs: ['token', 'rol'],
                        user: {
                            attrs: ['instagram', 'twitter', 'facebook', 'descripcion']
                        }
                    })};

                SessionServ.getUserData(data).success(function (data) {

                    if (JSON.stringify(data) != '{}') {
                        $scope.changeProfile.instagram = data.user.instagram;
                        $scope.changeProfile.twitter = data.user.twitter;
                        $scope.changeProfile.facebook = data.user.facebook;
                        $scope.changeProfile.descripcion = data.user.descripcion;
                    }
                     private.initImg();

                });

                PersonaServ.getMe({
                    "jconf": JSON.stringify({
                        attrs: ['nombreCompleto']
                    })
                }).success(function (data) {

                    $scope.persona = data;
                });

               
            };


            $scope.init();


            $scope.archivoLoading = false;

            $scope.usuario = {
                tipo: 0
            };

            $scope.uploadProgress = 0;

            $scope.onFileChange = function () {

                var reader = new FileReader();

                reader.onloadstart = function (e) {
                    $scope.usuario.url = false;
                    $scope.archivoLoading = true;
                    $scope.$apply();
                };

                reader.onloadend = function (e) {
                    $scope.archivoLoading = false;
                    $scope.$apply();

                };

                reader.onload = function (e) {
                    // handle onload

                    $scope.usuario.url = $sce.trustAsResourceUrl(e.target.result);

                    var tmppath = URL.createObjectURL($scope.usuario.file[0]);

                    $scope.usuario.url = $sce.trustAsResourceUrl(tmppath);

                };
                if ($scope.usuario.file[0]) {
                    reader.readAsDataURL($scope.usuario.file[0]);
                }

            };


            $scope.doBackUrl = function () {
                if ($scope.backUrl) {
                    window.location.replace($scope.backUrl);
                }
            };


        }]);
}());