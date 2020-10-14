(function () {
    var app = angular.module('app');
    app.config(['$stateProvider', function ($stateProvider) {
            $stateProvider
//                    .state('login', {
//                        url: '/login?nextState',
//                        templateUrl: 'pages/base/security/login/login.html',
//                        controller: 'LoginCont'
//                    })
                    .state('registro', {
                        url: '/registro',
                        templateUrl: 'pages/base/security/registro/registro.html',
                        controller: 'RegistroCont'
                    })
                    .state('security/profileimg', {
                        url: '/security/profileimg',
                        templateUrl: 'pages/base/security/profile/profileimg/profileimg.html',
                        controller: 'ProfileImgCont'
                    })
                    .state('security/profilePublic', {
                        url: '/security/profilePublic/:id',
                        templateUrl: 'pages/base/security/profile/public/profilePublic.html',
                        controller: 'ProfilePublicCont'
                    })
                    .state('passchange', {
                        url: '/passchange',
                        templateUrl: 'pages/base/security/passChange/passChange.html',
                        controller: 'PassChangeCont'
                    })
                    .state('security/changePassword', {
                        url: '/security/changePassword/:id',
                        templateUrl: 'pages/base/security/usuario/changePassword/changePassword.html',
                        controller: 'ChangePasswordCont'
                    })
                    .state('passreset', {
                        url: '/passreset',
                        templateUrl: 'pages/base/security/passReset/passReset.html',
                        controller: 'PassResetCont'
                    })
                    .state('passresetconfirm', {
                        url: '/passresetconfirm?pass_reset_code?cuit?correo',
                        templateUrl: 'pages/base/security/passReset/passResetConfirm.html',
                        controller: 'PassResetConfirmCont'
                    })
                    .state('emailconfirmation?email', {
                        url: '/emailconfirmation?email&code',
                        templateUrl: 'pages/base/security/confirmationEmail/confirmationEmail.html',
                        controller: 'ConfirmationEmail'
                    })
                    .state('condiciones', {
                        url: '/condiciones',
                        templateUrl: 'pages/base/security/condiciones/condiciones.html',
                        controller: 'CondCont'
                    })
                    .state('security/usuario', {
                        url: '/usuario',
                        templateUrl: 'pages/base/security/usuario/user.html',
                        controller: 'UserCont'
                    })
                    .state('security/usuario-cm', {
                        url: '/usuario-cm',
                        templateUrl: 'pages/base/security/usuarioCiudadanoMisiones/user.html',
                        controller: 'UserCMCont'
                    })
                    .state('security/usuario-cm/add', {
                        url: '/usuario-cm/add',
                        templateUrl: 'pages/base/security/usuarioCiudadanoMisiones/act/userAct.html',
                        controller: 'UserCMAct'
                    })
                    .state('security/usuario-cm/edit', {
                        url: '/usuariocmmd/edit/:id',
                        templateUrl: 'pages/base/security/usuarioCiudadanoMisiones/act/userAct.html',
                        controller: 'UserCMAct'
                    })
                    .state('security/usuario/add', {
                        url: '/usuario/add',
                        templateUrl: 'pages/base/security/usuario/act/userAct.html',
                        controller: 'UserAct'
                    })
                    .state('security/usuario/edit', {
                        url: '/usuario/edit/:id',
                        templateUrl: 'pages/base/security/usuario/act/userAct.html',
                        controller: 'UserAct'
                    })
                    .state('security/rol', {
                        url: '/rol',
                        templateUrl: 'pages/base/security/rol/rol.html',
                        controller: 'RolCont'
                    })
                    .state('security/rol/add', {
                        url: '/rol/add',
                        templateUrl: 'pages/base/security/rol/act/rolAct.html',
                        controller: 'RolAct'
                    })
                    .state('security/rol/edit', {
                        url: '/rol/edit/:id',
                        templateUrl: 'pages/base/security/rol/act/rolAct.html',
                        controller: 'RolAct'
                    })
                    .state('security/rol/show', {
                        url: '/rol/show/:id',
                        templateUrl: 'pages/base/security/rol/showDetailRol/showDetailRol.html',
                        controller: 'ShowDetailRol'
                    })

                    .state('security/roluser/show', {
                        url: '/roldetail/show/:id',
                        templateUrl: 'pages/base/security/rol/detailRol/rolDetailUser.html',
                        controller: 'DetailRolCont'
                    })


                    .state('security/grupopermisos/show', {
                        url: '/grupopermisos/show',
                        templateUrl: 'pages/base/security/rol/detailGroupPermission/detailGroupPermission.html',
                        controller: 'DetailGroupPermissionCont'
                    })

                    .state('security/usergroup', {
                        url: '/grupousuarios',
                        templateUrl: 'pages/base/security/usergroup/usergroup.html',
                        controller: 'UserGroupCont'
                    })

                    .state('security/usergroup/add', {
                        url: '/grupousuarios/add',
                        templateUrl: 'pages/base/security/usergroup/act/usergroupAct.html',
                        controller: 'UserGroupAct'
                    })

                    .state('security/usergroup/edit', {
                        url: '/grupousuarios/edit/:id',
                        templateUrl: 'pages/base/security/usergroup/act/usergroupAct.html',
                        controller: 'UserGroupAct'
                    })
                    .state('security/espaciosusados', {
                        url: '/security/espaciosusados',
                        templateUrl: 'pages/base/security/espacioUsado/espacioUsado.html',
                        controller: 'EspacioUsadoCont'
                    })
                    ;
        }]);
}());