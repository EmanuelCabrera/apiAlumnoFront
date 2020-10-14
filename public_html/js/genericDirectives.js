/**
 * CICHA Updated:  26/10/2015
 * CICHA Updated: 26/01/2015
 * CICHA Updated: 23/01/2015
 * CICHA Created: 06/01/2015
 */
(function () {
    var app = angular.module('app');

    app.directive('exposeState', function () {
        //Toma el controlador del st-table y asigna el tableState al $scope del controller
        //llamando al atributo del scope segun el valor del atributo "exposeState" del elemento
        return {
            require: 'stTable',
            link: function (scope, element, attr, ctrl) {
                scope[attr.exposeState] = ctrl.tableState();
            }
        };
    });


    app.directive('currentPage', function ($timeout) {
        return {
            require: '^stTable',
            restrict: 'A',
            transclude: true,
            link: function (scope, element, attrs, controller) {
                var page = parseInt(attrs.currentPage);

                if (page > 0) {

                    controller.slice((page - 1) * controller.tableState().pagination.number, controller.tableState().pagination.number);
                }
            }
        };
    });

    app.directive('cRequired', [function () {
            return{
                restrict: 'A',
                replace: false,
                scope: {
                    cRequired: '='
                },
                link: function ($scope, elm, attrs) {
                    $scope.$watch('cRequired', function (o, n) {
                        if ($scope.cRequired) {
                            $(elm).attr("required", "true");
                        } else {
                            $(elm).removeAttr("required");
                        }
                    });
                }
            };
        }
    ]);


    app.directive('cPopover', [function ( ) {
            return{
                restrict: 'A',
                replace: false,
                link: function ($scope, elm, attrs) {
                    var conf = JSON.parse(attrs.cPopover);
                    $(elm).popover(conf);
                }
            };
        }
    ]);

    app.directive('cTooltip', [function ( ) {
            return{
                restrict: 'A',
                replace: false,
                link: function ($scope, elm, attrs) {
                    var c = attrs['cTooltip'];
                    var conf = $.parseJSON(c);

                    $(elm).tooltip(conf);
                }
            };
        }
    ]);

    app.directive('cr', function () {
        return{
            restrict: 'E',
            replace: true,
            template: "<span uib-tooltip='Campo obligatorio'>* </span>",
            scope: {
                visible: '=?'
            },
            link: function ($scope, elm, attrs) {
                $scope.$watch('visible', function (o, n) {
                    if ($.un($scope.visible) || $scope.visible) {
                        $(elm).removeClass("hide");
                    } else {
                        $(elm).addClass("hide");
                    }
                });
            }
        };
    });



    //CICHA 12/01/2015
    app.directive('backButton', ['$window', function ($window) {
            return {
                restrict: 'A',
                link: function (scope, elem, attrs) {
                    elem.bind('click', function () {
                        $window.history.back();
                    });
                }
            };
        }]);

//cicha 23/01/2015
    app.directive('cClassHover', function () {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                element.on('mouseenter', function () {
                    element.addClass(attrs['cClassHover']);
                });
                element.on('mouseleave', function () {
                    element.removeClass(attrs['cClassHover']);
                });
            }
        };
    });

    app.directive('iconLoading', function () {
        return {
            restrict: 'E',
            template: '<i class=""></i>',
            scope: {
                visible: '=visible'
            },
            controller: function ($scope, $element, $attrs) {
                $scope.$watch('visible', function (newValue, oldValue) {
                    if (newValue) {
                        $($element).removeClass($attrs.icon).addClass('glyphicon glyphicon-refresh spinning');
                    } else {
                        $($element).addClass($attrs.icon).removeClass('glyphicon glyphicon-refresh spinning');
                    }

                }, true);
            }
        };
    });

    /* Recupera del servicio un thumbnail, si existe muestra en el div donde se llama a la directiva,
     * si no devuelve un thumbnail, muestra un icono por defecto
     * en el thumbnal recibe el id del archivo y en contenttype recibe el tipo de contenido
     */
    app.directive('m-thumbnail', function (MsgThreadServ) {
        return {
            restrict: 'A',
            replace: false,
            scope: {
                thumbnail: '=',
                contenttype: '='
            },
            controller: function ($scope, $element, $attrs) {
                console.log($scope.contenttype);
                $scope.callService = function () {
                    MsgThreadServ.getThumbnail($scope.thumbnail).success(function (data) {
                        if (data.length > 0) {
                            $scope.url = services.contenido.thumbnail + '?' + 'id=' + $scope.thumbnail;
                            $($element).attr("src", $scope.url);
                            var html = '<img src=' + $scope.url + ' width=150>';
                            $($element).html(html);
                        } else {
                            var val = $scope.contenttype;
                            console.log(val.includes("image/"));
                            if ($scope.contenttype === 'application/pdf')
                                $($element).html('<i class="fa fa-file-pdf-o fa-5x">');
                            else if ($scope.contenttype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document')
                                $($element).html('<i class="fa fa-file-word-o fa-5x">');
                            else if ($scope.contenttype === 'application/vnd.ms-powerpoint')
                                $($element).html('<i class="fa fa-file-powerpoint-o fa-5x">');
                            else if ($scope.contenttype === 'application/vnd.ms-excel')
                                $($element).html('<i class="fa fa-file-excel-o fa-5x">');
                            else if (val.includes("video/"))
                                $($element).html('<i class="fa fa-video-camera fa-5x">');
                            else if (val.includes("image/"))
                                $($element).html('<i class="fa fa-picture-o fa-5x">');
                        }
                    }).error(function (data) {
                        console.log(data);
                    });



                };
                $scope.callService();
            }
        };
    });

    app.directive('btnDownload', function () {
        return {
            restrict: 'E',
            template: '<a href="" class="btn {{btnClass}}" ng-click="download()"><span class="hidden-xs"></span> <i class="fa fa-download"></i><icon-loading visible="downloading"></icon-loading></a>',
            scope: true,
            link: function (scope, element, attr) {


            },
            controller: ['$scope', '$element', '$attrs', '$http', 'genS', function ($scope, $element, $attrs, $http, genS) {
                    $scope.downloading = false;
                    var anchor = $element.children()[0];
                    $scope.btnClass = $attrs.btnClass ? $attrs.btnClass : 'btn-default';


                    $scope.download = function () {
                        $(anchor).attr('disabled', 'disabled');
                        $scope.downloading = true;

                        genS.genericResponse($http({
                            "method": 'GET',
                            "url": $attrs.url,
                            ignoreLoadingBar: true,
                            "responseType": 'blob',
                            "cache": true
                        })).success(function (blob) {

                            var url = window.URL.createObjectURL(blob);
                            var a = document.createElement("a");
                            document.body.appendChild(a);
                            a.style = "display: none";
                            a.href = url;
                            a.download = $attrs.filename;
                            a.click();
                            window.URL.revokeObjectURL(url);
                            $scope.downloading = false;
                            $(anchor).removeAttr('disabled')
                                    .removeClass($scope.btnClass)
                                    .addClass('btn-success')
                                    ;

                        });
                    };
                }]
        };
    });

app.directive('restrictInput', function() {
  return {
    restrict: 'A',
    require: 'ngModel',
    link: function(scope, element, attr, ctrl) {
      ctrl.$parsers.unshift(function(viewValue) {
        var options = scope.$eval(attr.restrictInput);
        if (!options.regex && options.type) {

          switch (options.type) {
            case 'digitsOnly': options.regex = '^[0-9]*$'; break;
            case 'lettersOnly': options.regex = '^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]'; break;
            case 'lowercaseLettersOnly': options.regex = '^[a-z]*$'; break;
            case 'uppercaseLettersOnly': options.regex = '^[A-Z]*$'; break;
            case 'lettersAndDigitsOnly': options.regex = '^[a-zA-Z0-9]*$'; break;
            case 'validPhoneCharsOnly': options.regex = '^[0-9 ()/-]*$'; break;
            default: options.regex = '';
          }
        }
        var reg = new RegExp(options.regex);
        if (reg.test(viewValue)) { //if valid view value, return it
          return viewValue;
        } else { //if not valid view value, use the model value (or empty string if that's also invalid)
          var overrideValue = (reg.test(ctrl.$modelValue) ? ctrl.$modelValue : '');
          element.val(overrideValue);
          return overrideValue;
        }
      });
    }
  };
});
}());