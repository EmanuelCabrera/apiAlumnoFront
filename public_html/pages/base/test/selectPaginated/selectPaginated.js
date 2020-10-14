//
//Miguel Created: 2016/03/30 
//
(function () {
    var app = angular.module('app');

    app.controller('SelectPaginatedTestCont', ["$scope", function ($scope, ) {
            var private = {};
            $scope.inputwatch = "";

            //http://www.htmlescape.net/stringescape_tool.html

            $scope.selectPaginatedHtml = "\x3Cselect-paginated config=\"selectUser\" selected-id=\"userId\"\x3E  \n\x3C\x2Fselect-paginated\x3E";
            $scope.selectPaginatedJs = "$scope.selectUser = {\n watch:$scope.inputwatch,\n service: \"UserServ\",\n textName: \"Responsable\",\n jconf: {attrs: [\'id\', \'cuit\', \'name\', \'correo\', \'deletedAt\']},\n query: function (filter) {\n return {filters: [{\n field: \"name\",\n options: [\"PART_STRING\"],\n value: filter\n }, {\n field: \"correo\",\n options: [\"PART_STRING\"],\n value: filter\n }],\n options: [\"OR_FILTERS\"],\n orders: [\'name\']};\n },\n disableChoise:function(item){\n return false;\n },\n parserSelect: function (item) {\n return item.name;\n },\n parserChoice: function (item) {\n var res = \"\";\n if (!$.un(item.cuit)) {\n res = \"\x3Cimg width=\'30px\' class=\'img-circle\' height=\'30px\' src=\'https:\x2F\x2Fciudadano.misiones.gob.ar\x2Fmisionesdigital-web\x2Fservices\x2Fsecurity\x2Fuser\x2Fprofilethumbnail?cuit=\" + item.cuit + \"\'\x3E\";\n }\n res += item.name;\n if (!$.un(item.correo)) {\n res += \"\&nbsp;\x3Csmall\x3E\" + item.correo + \"\x3C\x2Fsmall\x3E\";\n }\n return res;\n }\n };";

            $scope.selectmPaginatedHtml = "\x3Cselectm-paginated config=\"selectmUser\" selecteds-id=\"userId\"\x3E  \n\x3C\x2Fselect-paginated\x3E";
            $scope.selectmPaginatedJs = "$scope.selectmUser = {\n service: \"UserServ\",\n textName: \"Responsable\",\n jconf: {attrs: [\'id\', \'cuit\', \'name\', \'correo\', \'deletedAt\']},\n query: function (filter) {\n return {filters: [{\n field: \"name\",\n options: [\"PART_STRING\"],\n value: filter\n }, {\n field: \"correo\",\n options: [\"PART_STRING\"],\n value: filter\n }],\n options: [\"OR_FILTERS\"],\n orders: [\'name\']};\n },\n parserSelect: function (item) {\n return $.un(item) ? \"\" : item.name;\n },\n parserChoice: function (item) {\n if ($.un(item)) {\n return \" \";\n }\n var res = \"\";\n if (!$.un(item.cuit)) {\n res = \"\x3Cimg width=\'30px\' class=\'img-circle\' height=\'30px\' src=\'https:\x2F\x2Fciudadano.misiones.gob.ar\x2Fmisionesdigital-web\x2Fservices\x2Fsecurity\x2Fuser\x2Fprofilethumbnail?cuit=\" + item.cuit + \"\'\x3E\";\n }\n res += item.name;\n if (!$.un(item.correo)) {\n res += \"\&nbsp;\x3Csmall\x3E\" + item.correo + \"\x3C\x2Fsmall\x3E\";\n }\n return res;\n }\n };";



            $scope.selectTest = { 
                service: "UserServ",
                textName: "Responsable",
                jconf: {attrs: ['id', 'cuit', 'name', 'correo', 'deletedAt']},
                query: function (filter) {
                    return {filters: [{
                                field: "name",
                                options: ["PART_STRING"],
                                value: filter
                            }, {
                                field: "correo",
                                options: ["PART_STRING"],
                                value: filter
                            }],
                        options: ["OR_FILTERS"],
                        orders: ['name']};
                },
                disableChoise: function (item) {
                    return false;
                },
                parserSelect: function (item) {
                    return item.name;
                },
                parserChoice: function (item) {
                    var res = "";
                    if (!$.un(item.cuit)) {
                        res = "<img width='30px' class='img-circle' height='30px' src='https://ciudadano.misiones.gob.ar/misionesdigital-web/services/security/user/profilethumbnail?cuit=" + item.cuit + "'>";
                    }
                    res += item.name;
                    if (!$.un(item.correo)) {
                        res += "&nbsp;<small>" + item.correo + "</small>";
                    }
                    return res;
                }
            };

        }]);
}());