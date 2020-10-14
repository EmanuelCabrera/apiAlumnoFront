/* 
 * CICHA Created: 09/12/2014  
 */
(function () {
    var app = angular.module('app');

    app.controller('ProfileImgCont', ["$scope", "$rootScope", "UserServ", "SessionServ", "$sce", "$state", function ($scope, $rootScope, UserServ, SessionServ, $sce, $state) {
            var private = {};

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

            private.errorHandler = function () {
                $scope.uploadProgress = 0;
            };

            $scope.submit = function () {

                if ($scope.usuario.tipo == '1') {
                    $scope.profileimg();
                }

                if ($scope.usuario.tipo == '0') {
                    $scope.subirImg();
                }
            };

            $scope.profileimg = function () {

                if (!$.un($scope.usuario.profileimg) && $scope.usuario.profileimg) {
                    UserServ.profileimg({
                        profileImg: $scope.usuario.profileimg
                    }).success(function (data) {
                        SessionServ.initData({jconf: JSON.stringify(jconf.initData)}).success(function (data) {
                            $rootScope.user = data.user;
                            $state.go($rootScope.initStateSigned);
                        });
                    });
                } else {
                    new PNotify({styling: 'fontawesome',
                        title: 'Atención',
                        text: "Agregá la url de la imagén",
                        type: 'warning',
                        delay: 3000
                    });
                }

            };

            $scope.subirImg = function () {

                if (!$.un($scope.usuario.file) && $scope.usuario.file.length > 0) {

                    UserServ.profileimgContenido({profileImg: $scope.usuario.file[0]})
                            .progress(function (evt) {
                                var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                                $scope.uploadProgress = progressPercentage;

                            })
                            .then(function () {
                                SessionServ.initData({jconf: JSON.stringify(jconf.initData)}).success(function (data) {
                                    $rootScope.user = data.user;
                                    $state.go($rootScope.initStateSigned);
                                });


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

            private.init = function () {
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

            private.init();
        }]);
}());