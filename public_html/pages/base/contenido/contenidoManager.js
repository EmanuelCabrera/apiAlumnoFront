(function () {
    var app = angular.module('app');


//////////////////////////////////////////////////////////////////////////////////////////////////////
////configura el setRequestHeader para el XHR, para determinar el progress
//////////////////////////////////////////////////////////////////////////////////////////////////////
    function patchXHR(fnName, newFn) {
        window.XMLHttpRequest.prototype[fnName] = newFn(window.XMLHttpRequest.prototype[fnName]);
    }

    if (window.XMLHttpRequest && !window.XMLHttpRequest.__isFileAPIShim) {
        patchXHR('setRequestHeader', function (orig) {
            return function (header, value) {
                if (header === '__setXHR_') {
                    var val = value(this);
                    // fix for angular < 1.2.0
                    if (val instanceof Function) {
                        val(this);
                    }
                } else {
                    orig.apply(this, arguments);
                }
            }
        });
    }
    //////////////////////////////////////////////////////////////////////////////////////////////////////
////END
//////////////////////////////////////////////////////////////////////////////////////////////////////

    app.service('$contenido', ['$http', '$q', '$timeout', function ($http, $q, $timeout) {
            var s = this;

            function sendHttp(config) {
                config.method = config.method || 'POST';
                config.headers = config.headers || {};
                config.transformRequest = config.transformRequest || function (data, headersGetter) {
                    if (window.ArrayBuffer && data instanceof window.ArrayBuffer) {
                        return data;
                    }
                    return $http.defaults.transformRequest[0](data, headersGetter);
                };
                var deferred = $q.defer();
                var promise = deferred.promise;

                config.headers['__setXHR_'] = function () {
                    return function (xhr) {
                        if (!xhr)
                            return;
                        config.__XHR = xhr;
                        config.xhrFn && config.xhrFn(xhr);
                        xhr.upload.addEventListener('progress', function (e) {
                            e.config = config;
                            deferred.notify ? deferred.notify(e) : promise.progress_fn && $timeout(function () {
                                promise.progress_fn(e)
                            });
                        }, false);
                        //fix for firefox not firing upload progress end, also IE8-9
                        xhr.upload.addEventListener('load', function (e) {
                            if (e.lengthComputable) {
                                e.config = config;
                                deferred.notify ? deferred.notify(e) : promise.progress_fn && $timeout(function () {
                                    promise.progress_fn(e)
                                });
                            }
                        }, false);
                    };
                };

                $http(config).then(function (r) {
                    deferred.resolve(r);
                }, function (e) {
                    deferred.reject(e);
                }, function (n) {
                    deferred.notify(n);
                });

                promise.success = function (fn) {
                    promise.then(function (response) {
                        fn(response.data, response.status, response.headers, config);
                    });
                    return promise;
                };

                promise.error = function (fn) {
                    promise.then(null, function (response) {
                        fn(response.data, response.status, response.headers, config);
                    });
                    return promise;
                };

                promise.progress = function (fn) {
                    promise.progress_fn = fn;
                    promise.then(null, null, function (update) {
                        fn(update);
                    });
                    return promise;
                };
                promise.abort = function () {
                    if (config.__XHR) {
                        $timeout(function () {
                            config.__XHR.abort();
                        });
                    }
                    return promise;
                };
                promise.xhr = function (fn) {
                    config.xhrFn = (function (origXhrFn) {
                        return function () {
                            origXhrFn && origXhrFn.apply(promise, arguments);
                            fn.apply(promise, arguments);
                        }
                    })(config.xhrFn);
                    return promise;
                };

                return promise;
            }




            this.uploadWithFiles = function (config, data, files) {
                config.headers = config.headers || {};
                config.headers['Content-Type'] = undefined;
                config.transformRequest = config.transformRequest || $http.defaults.transformRequest;
                var formData = new FormData();

                config.transformRequest = function (formData, headerGetter) {

                    //agregando los datos JSON a ser enviados
                    formData.append("data", JSON.stringify(data));

                    //Agregando los archivos
                    for (var i = 0; i < files.length; i++) {
                        var f = files[i];
                        if ($.un(f.files)) {
                            //es un archivo simple
                            formData.append("FILE" + f.id, f.file, f.file.name);
                        } else {
                            //es un array de archivos
                            for (var j = 0; j < f.files.length; j++) {
                                formData.append("FILE" + f.id, f.files[j], f.files[j].name);
                            }
                        }

                    }
                    return formData;
                };

                config.data = formData;

                return sendHttp(config);
            };


            this.separateFiles = function (obj, files, anidatedKey) {
                $.each(obj, function (key, value) {
                    if (Object.prototype.toString.call(obj) === '[object Object]') {
                        var newAnidatedKey = anidatedKey + "." + key;
                    } else {
                        //si es un array no se agrega la nueva key, porque esta se corresponde al indice del array.
                        var newAnidatedKey = anidatedKey;
                    }
                    if (Object.prototype.toString.call(value) === '[object Object]') {
                        s.separateFiles(value, files, newAnidatedKey);

                    } else if (Object.prototype.toString.call(value) === '[object Array]' &&
                            value.length > 0) {
                        s.separateFiles(value, files, newAnidatedKey);

                    } else if (Object.prototype.toString.call(value) === '[object File]') {
                        //si el valor es un archivo y este se encuentra dentro de un array
                        if (Object.prototype.toString.call(obj) === '[object Array]') {
                            //recupero el arhivo que lo representa
                            var auxFile = $.m_findCollection(newAnidatedKey, files);
                            if (!$.un(auxFile)) {
                                auxFile.files.splice(key, 0, value);
                            } else {
                                files.push({
                                    id: newAnidatedKey,
                                    files: [value]
                                });
                            }
                        } else {
                            //si es un atributo de un objeto, no un array
                            files.push({
                                id: newAnidatedKey,
                                file: value
                            });
                            //quito el archivo del objeto original
                            //para limpiar el JSON a ser enviado como DATA
                            obj[key] = {};
                        }
                    }
                });
            };


//original upload code angular-file-upload.js
            this.upload = function (config) {
                
                
                config.headers = config.headers || {};
                config.headers['Content-Type'] = undefined;
                config.transformRequest = config.transformRequest || $http.defaults.transformRequest;
                var formData = new FormData();
                var origTransformRequest = config.transformRequest;
                var origData = config.data;
                config.transformRequest = function (formData, headerGetter) {
                    if (origData) {
                        if (config.formDataAppender) {
                            for (var key in origData) {
                                var val = origData[key];
                                config.formDataAppender(formData, key, val);
                            }
                        } else {
                            for (var key in origData) {
                                var val = origData[key];
                                if (typeof origTransformRequest == 'function') {
                                    val = origTransformRequest(val, headerGetter);
                                } else {
                                    for (var i = 0; i < origTransformRequest.length; i++) {
                                        var transformFn = origTransformRequest[i];
                                        if (typeof transformFn == 'function') {
                                            val = transformFn(val, headerGetter);
                                        }
                                    }
                                }
                                if (val != undefined)
                                    formData.append(key, val);
                            }
                        }
                    }

                    if (config.file != null) {
                        var fileFormName = config.fileFormDataName || 'file';

                        if (Object.prototype.toString.call(config.file) === '[object Array]') {
                            var isFileFormNameString = Object.prototype.toString.call(fileFormName) === '[object String]';
                            for (var i = 0; i < config.file.length; i++) {
                                formData.append(isFileFormNameString ? fileFormName : fileFormName[i], config.file[i],
                                        (config.fileName && config.fileName[i]) || config.file[i].name);
                            }
                        } else {
                            formData.append(fileFormName, config.file, config.fileName || config.file.name);
                        }
                    }
                    return formData;
                };

                config.data = formData;

                return sendHttp(config);
            };

        }]);

    app.directive('ngFileSelect', ['$parse', '$timeout', function ($parse, $timeout) {
            return {
                restrict: 'AEC',
                require: '?ngModel',
                scope: {
                    fileModel: '=ngModel',
                    change: '&ngFileChange',
                    select: '&ngFileSelect',
                    resetOnClick: '&resetOnClick',
                    multiple: '&ngMultiple',
                    accept: '&ngAccept'
                },
                link: function (scope, elem, attr, ngModel) {
                    handleFileSelect(scope, elem, attr, ngModel, $parse, $timeout);
                }
            }
        }]);

    function handleFileSelect(scope, elem, attr, ngModel, $parse, $timeout) {
        if (scope.multiple()) {
            elem.attr('multiple', 'true');
            attr['multiple'] = 'true';
        }
        var accept = scope.accept();
        if (accept) {
            elem.attr('accept', accept);
            attr['accept'] = accept;
        }
        if (elem[0].tagName.toLowerCase() !== 'input' || (elem.attr('type') && elem.attr('type').toLowerCase()) !== 'file') {
            var fileElem = angular.element('<input type="file">')
            if (attr['multiple'])
                fileElem.attr('multiple', attr['multiple']);
            if (attr['accept'])
                fileElem.attr('accept', attr['accept']);
            fileElem.css('width', '1px').css('height', '1px').css('opacity', 0).css('position', 'absolute').css('filter', 'alpha(opacity=0)')
                    .css('padding', 0).css('margin', 0).css('overflow', 'hidden').attr('tabindex', '-1').attr('ng-file-generated-elem', true);
            elem.append(fileElem);
            elem.__afu_fileClickDelegate__ = function () {
                fileElem[0].click();
            };
            elem.bind('click', elem.__afu_fileClickDelegate__);
            elem.css('overflow', 'hidden');
            elem = fileElem;
        }
        if (scope.resetOnClick() != false) {
            elem.bind('click', function (evt) {
                if (elem[0].value) {
                    updateModel([], attr, ngModel, scope, evt);
                }
                elem[0].value = null;
            });
        }
        if (ngModel) {
            scope.$parent.$watch(attr['ngModel'], function (val) {
                if (val == null) {
                    elem[0].value = null;
                }
            });
        }
        if (attr['ngFileSelect'] != '') {
            scope.change = scope.select;
        }
        elem.bind('change', function (evt) {
            var files = [], fileList, i;
            fileList = evt.__files_ || evt.target.files;
            updateModel(fileList, attr, ngModel, scope, evt);
        });

        function updateModel(fileList, attr, ngModel, scope, evt) {
            $timeout(function () {
                var files = [];
                for (var i = 0; i < fileList.length; i++) {
                    files.push(fileList.item(i));
                }
                if (ngModel) {
                    scope.fileModel = files;
                    ngModel && ngModel.$setViewValue(files != null && files.length == 0 ? '' : files);
                }
                $timeout(function () {
                    scope.change({
                        $files: files,
                        $event: evt
                    });
                });
            });
        }
    }
}());