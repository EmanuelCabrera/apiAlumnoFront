/* 
 * CICHA Created: 26/03/2015
 */
(function () {
    var app = angular.module('app');
    app.directive('persona', ['PersonaServ', function (PersonaServ) {
            return{
                restrict: 'E',
                replace: true,
                templateUrl: templates.rrhh.persona,
                scope: {
                    persona: "=?",
                    findNumDoc: "=?",
                    requiredFields: "=?"
                },

                controller: function ($scope, $element, $attrs) {
                    var private = {};
                    $scope.findNumDoc = $.un($scope.findNumDoc) ? false : $scope.findNumDoc;
                    $scope.personaFounded = undefined;
                    $scope.findNumDocCanceled = true;
                    $scope.meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
                    $scope.persona = $.un($scope.persona) ? {} : $scope.persona;
                    $scope.persona.tipoDoc = !$scope.persona.id ? 'DNI' : $scope.persona.tipoDoc;
                    $scope.fechaNac = {};
                    $scope.maxDay = 31;
                    $scope.$watch('requiredFields', function () {
                        $scope.requiredFields = $.un($scope.requiredFields) ? ['apellido', 'nombres', 'tipoDoc', 'documento'] : $scope.requiredFields;
                        $scope.rf = {
                            apellido: $scope.requiredFields.indexOf('apellido') > -1,
                            nombres: $scope.requiredFields.indexOf('nombres') > -1,
                            tipoDoc: $scope.requiredFields.indexOf('tipoDoc') > -1,
                            documento: $scope.requiredFields.indexOf('documento') > -1,
                            fechaNac: $scope.requiredFields.indexOf('fechaNac') > -1,
                            sexo: $scope.requiredFields.indexOf('sexo') > -1,
                            estadoCivil: $scope.requiredFields.indexOf('estadoCivil') > -1
                        };
                    });


                    $scope.onChangeFechaNac = function () {
                        var day = 1;
                        var year = 1;
                        if (!$.un($scope.fechaNac.day) || $scope.fechaNac.day > $scope.maxDay) {
                            day = $scope.fechaNac.day;
                        }
                        if (!$.un($scope.fechaNac.year)) {
                            year = $scope.fechaNac.year;
                        }
                        $scope.maxDay = private.daysInMonth(parseInt($scope.fechaNac.month), year);
                        $scope.persona.fechaNac = new Date(year, $scope.fechaNac.month, day, 0, 0, 0, 0);
                    };

                    $scope.$watch('persona.fechaNac', function (n, o) {
                        //fechaNac
                        if (!$.un($scope.persona.fechaNac)) {
                            $scope.persona.edad = $.m_calculateAge($scope.persona.fechaNac);

                            if (!isNaN($scope.persona.edad)) {
                                var auxFechaNac = {};
                                auxFechaNac.year = $scope.persona.fechaNac.getFullYear();
                                auxFechaNac.month = $scope.persona.fechaNac.getMonth().toString();
                                auxFechaNac.day = $scope.persona.fechaNac.getDate();
                                if ((!$.un($scope.fechaNac.year) && auxFechaNac.year != $scope.fechaNac.year) ||
                                        auxFechaNac.month != $scope.fechaNac.month ||
                                        (!$.un($scope.fechaNac.day) && auxFechaNac.day != $scope.fechaNac.day)) {
                                    $scope.fechaNac = auxFechaNac;
                                }
                            }
                        } else {
                            delete $scope.persona.edad;
                        }
                    });

                    private.findPersona = function (documento, tipoDoc) {
                        $scope.findNumDocCanceled = false;

                        if (!$scope.findNumDoc || $.un(documento) || !documento || $.un(tipoDoc) || !tipoDoc) {
                            return;
                        }
                        PersonaServ.load({
                            documento: documento,
                            tipoDoc: tipoDoc,
                            jconf: JSON.stringify(jconf.rrhh.persona.personaDireccionForm)
                        }).success(function (data) {

                            if ($.un(data) || JSON.stringify(data) == '{}') {
                                $scope.personaFounded = undefined;
                                return false;
                            }

                            if (!$.un(data.fechaNac)) {
                                data.fechaNac = new Date(data.fechaNac);
                            }

                            $scope.personaFounded = data;

                        });
                    };

                    $scope.$watch('persona.documento', function (n, o) {
                        private.findPersona(n, $scope.persona.tipoDoc);
                    });

                    $scope.$watch('persona.tipoDoc', function (n, o) {
                        private.findPersona($scope.persona.documento, n);
                    });

                    $scope.cancelSetPersona = function () {
                        $scope.findNumDocCanceled = true;
                    };


                    $scope.setPersonaFounded = function () {
                        bootbox.confirm("Se cambiarán los datos por los de la persona encontrada: <b>" + $scope.personaFounded.nombreCompleto + "</b> <br> <h4>¿Está seguro de hacerlo?</h4>", function (result) {

                            if (result) {
                                $scope.persona = angular.copy($scope.personaFounded);
                                $scope.personaFounded = undefined;
                                $scope.$apply();
                            }

                        });
                    };

                    $scope.restaurarSetPersona = function () {
                        bootbox.confirm("Se restaurará la persona dada de baja y se cambiarán los datos por los de la persona encontrada: <b>" + $scope.personaFounded.nombreCompleto + "</b> <br> <h4>¿Está seguro de hacerlo?</h4>", function (result) {
                            if (result) {

                                PersonaServ.enable($scope.personaFounded.id).success(function (data) {
                                    $scope.persona = angular.copy($scope.personaFounded);
                                    $scope.personaFounded = undefined;

                                });

                            }

                        });
                    };

                    private.init = function () {

                    };

                    private.daysInMonth = function (month, year) {
                        return new Date(year, month + 1, 0).getDate();
                    };

                    private.init();


                    $scope.calcularCUIT = function () {

                        if ($scope.persona.cuit == "" || $scope.persona.cuit == null) {
                            if ($scope.persona.tipoDoc == 'PASAPORTE') {
                                $scope.persona.cuit = $scope.persona.documento;
                            } else {
                                var cuit = private.get_cuil_cuit($scope.persona.documento, $scope.persona.sexo);

                                $scope.persona.cuit = cuit;
                            }
                            $scope.haveCuit();
                        }
                    };


                    $scope.$watch('persona.documento', function (n) {
                        $scope.calcularCUIT();
                        $scope.haveCuit();
                    });

                    private.get_cuil_cuit = function (document_number, gender) {
                        /**
                         * Cuil format is: AB - document_number - C
                         * Author: Nahuel Sanchez, Woile
                         *
                         * @param {str} document_number -> string solo digitos
                         * @param {str} gender -> debe contener HOMBRE, MUJER o SOCIEDAD
                         *
                         * @return {str}
                         **/
                        'use strict';

                        if (gender === 'O') {
                            return
                        }

                        if ($.un(document_number) || $.un(gender)) {
                            return '';
                        }
                        var HOMBRE = ['HOMBRE', 'M', 'MALE'],
                                MUJER = ['MUJER', 'F', 'FEMALE'],
                                SOCIEDAD = ['SOCIEDAD', 'S', 'SOCIETY'];
                        var AB, C;

                        /**
                         * Verifico que el document_number tenga exactamente ocho numeros y que
                         * la cadena no contenga letras.
                         */
                        if (document_number.length != 8 || isNaN(document_number)) {
                            if (document_number.length == 7 && !isNaN(document_number)) {
                                document_number = '0'.concat(document_number);
                            } else {
                                // Muestro un error en caso de no serlo.
//                        throw 'El numero de document_number ingresado no es correcto.';
                                $.m_sms({
                                    error: {
                                        sms: "El número de documento ingresado no es correcto."
                                    }
                                });

                                return

                            }
                        }

                        /**
                         * De esta manera permitimos que el gender venga en minusculas,
                         * mayusculas y titulo.
                         */
                        gender = gender.toUpperCase();

                        // Defino el valor del prefijo.
                        if (HOMBRE.indexOf(gender) >= 0) {
                            AB = '20';
                        } else if (MUJER.indexOf(gender) >= 0) {
                            AB = '27';
                        } else {
                            AB = '30';
                        }

                        /*
                         * Los numeros (excepto los dos primeros) que le tengo que
                         * multiplicar a la cadena formada por el prefijo y por el
                         * numero de document_number los tengo almacenados en un arreglo.
                         */
                        var multiplicadores = [3, 2, 7, 6, 5, 4, 3, 2];

                        // Realizo las dos primeras multiplicaciones por separado.
                        var calculo = ((parseInt(AB.charAt(0)) * 5) + (parseInt(AB.charAt(1)) * 4));

                        /*
                         * Recorro el arreglo y el numero de document_number para
                         * realizar las multiplicaciones.
                         */
                        for (var i = 0; i < 8; i++) {
                            calculo += (parseInt(document_number.charAt(i)) * multiplicadores[i]);
                        }

                        // Calculo el resto.
                        var resto = (parseInt(calculo)) % 11;

                        /*
                         * Llevo a cabo la evaluacion de las tres condiciones para
                         * determinar el valor de C y conocer el valor definitivo de
                         * AB.
                         */
                        if ((SOCIEDAD.indexOf(gender) < 0) && (resto == 1)) {
                            if (HOMBRE.indexOf(gender) >= 0) {
                                C = '9';
                            } else {
                                C = '4';
                            }
                            AB = '23';
                        } else if (resto === 0) {
                            C = '0';
                        } else {
                            C = 11 - resto;
                        }

                        // Show example
                        console.log([AB, document_number, C].join('-'));

                        // Generate cuit
                        var cuil_cuit = [AB, document_number, C].join('');

                        return cuil_cuit;

                    };

                    $scope.haveCuit = function () {
                        if ($scope.persona.cuit != null && $scope.persona.cuit != "") {
                            $scope.persona.haveCuit = true;
                        } else if ($scope.persona.sexo === "O") {
                            $scope.persona.haveCuit = true;
                        } else {
                            $scope.persona.haveCuit = false;
                        }
                    }
                }
            };
        }]);
}());