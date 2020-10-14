/**
 * CICHA Update: 02/02/2015
 *      Remove: $.genericResponse
 * CICHA Update: 16/12/2014
 *    $.m_errors
 * 
 * CICHA Created: 05/12/2014
 *       aqui se colocaran los metodos globales
 *       los metodos tienen el prefijo m_ de "marandu" para que de esta forma se diferencien
 *       de los metodos de las librerias y los nativos.
 */

//variable utilizada para setear el intervalID del pnotify
timerPnotify = undefined;

(function () {

    $.isMobile = (/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(navigator.userAgent.toLowerCase()));

    $.m_openPDF = function (resData, fileName, ventana) {
        var ieEDGE = navigator.userAgent.match(/Edge/g);
        var ie = navigator.userAgent.match(/.NET/g); // IE 11+
        var oldIE = navigator.userAgent.match(/MSIE/g);
        if (ie || oldIE || ieEDGE) {
            //                    window.navigator.msSaveBlob(resData, fileName);
            window.navigator.msSaveOrOpenBlob(resData, fileName);
            ventana.close();
        } else {
            var reader = new ventana.FileReader();
            reader.onloadend = function () {
                ventana.location.href = reader.result;
            };
            reader.readAsDataURL(resData);
        }
    };

    /**
     * 
     * Convierte un string base64 a un objetio del tipo file
     * 
     * @param {type} dataurl
     * @param {type} filename
     * @returns {File}
     */
    $.dataURLtoFile = function dataURLtoFile(dataurl, filename) {
        var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
                bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], filename, {type: mime});
    };

    $.extractExtension = function (nameFile) {
        if (nameFile) {
            return nameFile.replace(/\.[^/.]+$/, "");
        }
    };

    $.m_calculateAge = function (birthday) {
        var ageDifMs = Date.now() - birthday.getTime();
        var ageDate = new Date(ageDifMs); // miliseconds from epoch
        return Math.abs(ageDate.getUTCFullYear() - 1970);
    };

    $.m_genDataError = function (exception) {

        var data = {
            type: 'angular',
            url: window.location.href,
            localTime: Date.now(),
            userAgent: navigator.userAgent
        };
        if (exception) {
            if (exception.message) {
                data.message = exception.message;
            } else {
                data.message = "";
            }
            if (exception.name) {
                data.name = exception.name;
            }
            if (exception.stack) {
                data.stack = exception.stack;
            } else {
                data.stack = "";
            }
            if (exception.cause) {
                data.cause = exception.cause;
            }
        }
        return data;
    };

    $.m_sendError = function (exception) {
        var data = $.m_genDataError(exception);
        $.ajax({
            type: "POST",
            beforeSend: function (request) {
                request.setRequestHeader("Authorization", statics.accessToken);
            },
            url: services.sistem.errorJsLogServ,
            data: JSON.stringify(data),
            success: function (data) {
            },
            contentType: "application/json; charset=utf-8",
            dataType: 'json'
        });
        return data;
    };

    $.m_findCollection = function (id, collection) {
        var res;
        if ($.un(id) || $.un(collection)) {
            return res;
        }
        for (var i = 0; i < collection.length; i++) {
            var item = collection[i];
            if (item.id === id) {
                return item;
            }
        }
        return res;
    };

    /**
     * 
     * @param {Lista} lst1: [{id:1,..},{id,2,..}] o [1,2,3,..] 
     * @param {Lista} lst2: [{id:1,..},{id,2,..}] o [1,2,3,..] 
     * @returns {boolean}: Si el id de la lista uno esta en la lista 2, es decir el id debe estar en las dos listas
     */
    $.m_inCollections = function (lst1, lst2) {
        var res = false;
        $.each(lst1, function (index, obj) {
            var finded;
            if (typeof obj == 'object') {
                var finded = $.m_inCollectionId(obj.id, lst2);
            } else {
                var finded = $.m_inCollectionId(obj, lst2);
            }
            if (finded) {
                res = finded;
                return finded;
            }
        });
        return res;
    };
    /**
     * 
     * @param {type} id: Int
     * @param {type} lst: 
     * @returns {boolean}
     */
    $.m_inCollectionId = function (id, lst) {
        var res = false;
        $.each(lst, function (index, obj) {
            if (typeof obj === 'object') {
                if (obj.id === id) {
                    res = true;
                    return res;
                }
            } else {
                if (obj == id) {
                    res = true;
                    return res;
                }
            }
        });
        return res;
    };

    $.un = function (param) {
        return (typeof param === "undefined") || param === null;
    };
    $.unCascade = function (object, variableName) {
        if ($.un(object)) {
            return true;
        }
        var array = variableName.split(".");
        for (var i = 0; i < array.length; i++) {
            var attr = array[i];
            object = object[attr];
            if ($.un(object)) {
                return true;
            }
        }
        return false;
    };


    $.empty = function (param) {
        return (typeof param === "undefined") || param === '' || param === null;
    };

    $.m_b64toBlob = function (param) {
        //CICHA 04/03/2015
        //http://stackoverflow.com/questions/16245767/creating-a-blob-from-a-base64-string-in-javascript
        var byteCharacters = atob(param.b64);
        var byteNumbers = new Array(byteCharacters.length);
        for (var i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        var byteArray = new Uint8Array(byteNumbers);
        var file = new Blob([byteArray], {type: param.type});
        return file;
    };

    $.validateEmail = function (email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    };


    /**
     * CICHA Created: 12/12/2014
     * m_updImg: Forza actualizacion de imagen
     */
    $.m_updImg = function (img) {
        var join = "?";
        if (img.indexOf("?") != -1) {
            join = "&";
        }
        return img + join + (new Date()).getTime().toString();
    };
    /**
     * CICHA Created: 05/12/2014 
     *  m_sms: metodo global que se encargara de mostrar distintos tipos de mensajes al usuario
     *  ya sean de exito o error.
     *
     */
    $.m_sms = function (params) {
        /**
         * CICHA Created 05/12/2014
         * Muestra el mesaje de error
         */
        if (!$.un(params.error)) {
            var bodyText = "<div>" +
                    params.error.sms +
                    "<br>";
            if (!$.un(params.error.detail)) {
                bodyText += "<button onclick=\"$(this).parent().find('div').show(); $(this).parent().find('div').slimScroll({height: '200px'})\" class=\"btn btn-sm btn-default\">" +
                        "<i class=\"fa fa-angle-double-right\"></i>" +
                        "</button>" +
                        "<div style=\"display: none\">" +
                        params.error.detail +
                        "<button onclick=\"$(this).parent().hide()\" class=\"btn btn-sm btn-default\">" +
                        "Ocultar" +
                        "</button>" +
                        "</div>";
            }
            bodyText += "</div>";

            var stack = {"dir1": "down", "dir2": "right", "push": "top", "spacing1": 0, "spacing2": 0};
            new PNotify({
                styling: 'fontawesome',
                title: "Error",
                addclass: "stack-bar-top",
                text: bodyText,
                cornerclass: "",
                width: "100%",
                type: "error",
                delay: 5000,
                stack: stack,
                mouse_reset: false,
            });

            $("#btn-pnotify").show();


            var fnIntervalPnotify = function () {
                $("#btn-pnotify").hide();
            };

            if (!$.un(timerPnotify)) {
                clearInterval(timerPnotify);
            }

            timerPnotify = setInterval(fnIntervalPnotify, 120000);

        } else if (!$.un(params.sms)) {
            PNotify.removeAll();
            PNotify.prototype.options.stack.firstpos1 = 0;
            PNotify.prototype.options.stack.firstpos2 = ($(window).width() / 2) - (Number(PNotify.prototype.options.width.replace(/\D/g, '')) / 2);


            new PNotify({
                styling: 'fontawesome',
                title: 'Correcto',
                text: params.sms,
                type: 'success',
                addclass: "stack_center"
            });

        }
    };

    $.isImgFile = function (type) {

        if ($.un(type)) {
            return false;
        }

        if (((type === 'image/jpg' || type === 'image/bmp' || type === 'image/gif' || type === 'image/jpeg' || type === 'image/png'))) {
            return true;
        } else {
            return false;
        }
    };

    $.isAudioFile = function (type) {
        if ($.un(type)) {
            return false;
        }
        if (type.indexOf('audio') > -1) {
            return true;
        } else {
            return false;
        }
    };

    $.isVideoFile = function (type) {
        if ($.un(type)) {
            return false;
        }
        if (type.indexOf('video') > -1) {
            return true;
        } else {
            return false;
        }
    };

    $.isPDFFile = function (type) {
        if ($.un(type)) {
            return false;
        }
        if (type.indexOf('pdf') > -1) {
            return true;
        } else {
            return false;
        }
    };

}());
