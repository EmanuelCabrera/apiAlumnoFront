
(function (type) {
    var app = angular.module('app');
    app.service('ContenidoServ', ['genF', '$http', 'genS', function (genF, $http, genS) {
            var private = {};
            //heredo de genF
            var s = new genF({
                urlS: rootService + 'contenido'
            });
            s.getBlobURL = function (url) {

                return new Promise((resolve) => {

                    return genS.genericResponse($http({
                        "method": 'GET',
                        "url": url,
                        ignoreLoadingBar: true,
                        "responseType": 'blob',
                        "cache": true
                    })).success(function (blob) {

                        resolve(URL.createObjectURL(blob));
                    });
                });
            };

            s.getBlob = function (url) {
                return genS.genericResponse($http({
                    "method": 'GET',
                    "url": url,
                    ignoreLoadingBar: true,
                    "responseType": 'blob',
//                    "cache": true
                }));
            };

            s.getFileDataFromUrl = function (url) {
                return new Promise(function (resolve, reject) {
                    s.getBlob(url).then(function (data) {
                        var myReader = new FileReader();
                        myReader.addEventListener("loadend", function (e) {
                            resolve(e.srcElement.result);
                        });

                        myReader.readAsText(data.data);

                    }).catch(function (err) {
                        reject(err);
                    });
                });
            };

            s.isImg = function (type) {
                type = private.formatIs(type);
                if ($.un(type)) {
                    return false;
                }

                if (type.indexOf('image') > -1) {
                    return true;
                } else {
                    return false;
                }
            };
            s.isText = function (type) {
                type = private.formatIs(type);
                if ($.un(type)) {
                    return false;
                }

                if ((type.indexOf('text') > -1) || (type.indexOf('json') > -1)) {
                    return true;
                } else {
                    return false;
                }
            };
            s.isAudio = function (type) {
                type = private.formatIs(type);
                if ($.un(type)) {
                    return false;
                }
                if (type.indexOf('audio') > -1) {
                    return true;
                } else {
                    return false;
                }
            };
            s.isVideo = function (type) {
                type = private.formatIs(type);
                if ($.un(type)) {
                    return false;
                }
                if (type.indexOf('video') > -1) {
                    return true;
                } else {
                    return false;
                }
            };
            s.isPDF = function (type) {
                type = private.formatIs(type);
                if ($.un(type)) {
                    return false;
                }
                if (type.indexOf('pdf') > -1) {
                    return true;
                } else {
                    return false;
                }
            };
            s.isWord = function (type) {
                type = private.formatIs(type);
                if ($.un(type)) {
                    return false;
                }

                return (type === 'application/vnd.ms-word' || type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.template' || type === 'application/vnd.ms-word.document.macroEnabled.12');
            };
            s.isPPT = function (type) {
                type = private.formatIs(type);
                if ($.un(type)) {
                    return false;
                }

                return (type === 'application/vnd.ms-powerpoint' || type === 'application/vnd.openxmlformats-officedocument.presentationml.template' || type === 'application/vnd.openxmlformats-officedocument.presentationml.slideshow' || type === 'application/vnd.openxmlformats-officedocument.presentationml.presentation');
            };
            s.isExcel = function (type) {
                type = private.formatIs(type);
                if ($.un(type)) {
                    return false;
                }

                return (type === 'application/vnd.ms-excel' || type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.template' || type === 'application/vnd.ms-excel.sheet.macroEnabled.12' || type === 'application/vnd.ms-excel.sheet.binary.macroEnabled.12');
            };
            s.isZip = function (type) {
                type = private.formatIs(type);
                if ($.un(type)) {
                    return false;
                }

                return (type === 'application/zip' || type === 'application/x-rar');
            };
            s.other = function (type) {
                type = private.formatIs(type);
                return !(s.isImg(type) || s.isAudio(type) || s.isVideo(type) || s.isPDF(type) || s.isZip(type) || s.isWord(type) || s.isExcel(type) || s.isPPT(type) || s.isText(type));
            };

            private.formatIs = function (data) {
                if (Object.prototype.toString.call(data) === '[object Object]' || Object.prototype.toString.call(data) === "[object File]") {
                    return data.type ? data.type : data.contentType;
                } else {
                    return data;//ya se recibe el type
                }
            };
            s.search = function (data, config) {
                return s.genericResponse({
                    "method": 'GET',
                    "data": data,
                    "url": services.contenido + "/search",
                    config: config
                });
            };
            return s;
        }]);
}());
