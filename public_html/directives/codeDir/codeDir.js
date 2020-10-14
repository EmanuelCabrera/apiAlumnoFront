(function () {
    var app = angular.module('app');
    app.directive("codeDir", ['$compile', "$parse", function ($compile, $parse) {
            return {
                templateUrl: 'directives/codeDir/codeDir.html',
                transclude: true,
                link: function ($scope, elm, attrs, $ctrl, $transclude) {
                    var editorJs = window.ace.edit($(elm[0]).find("#editorJs")[0]);
                    editorJs.setTheme("ace/theme/textmate");
                    editorJs.getSession().setMode("ace/mode/javascript");
                    editorJs.setAutoScrollEditorIntoView(true);
//                    editorJs.setOption("maxLines", 10);
                    if (!$.un(attrs['js'])) {
                        editorJs.setValue($scope[attrs['js']]);
                    }

                    var editorHtml = window.ace.edit($(elm[0]).find("#editorHtml")[0]);
                    editorHtml.setTheme("ace/theme/textmate");
                    editorHtml.getSession().setMode("ace/mode/html");
                    if (!$.un(attrs['html'])) {
                        editorHtml.setValue($scope[attrs['html']]);
                    }

                    $transclude(function (clone) {
                        for (var i = 0; i < clone.length; i++) {
                            if (clone[i].localName === "htmlcode") {
                                editorHtml.setValue(angular.element(clone[i]).html().trim());
                            }
                            if (clone[i].localName === "js") {
                                editorJs.setValue(angular.element(clone[i]).html().trim());
                            }
                        }
                    });

                    $(elm[0]).find("#run").click(function (e) {
                        try {
                            eval(editorJs.getValue());
                            var auxHtml = editorHtml.getValue();
                            var compiled = $compile(auxHtml)($scope);
                            $(elm).find("#runResult").html(compiled);
                        } catch (e) {
                            throw new Error(e);
                        }
                    });
                },
                controller: function ($scope, $element, $attrs) {


                }
            };
        }]);

}());