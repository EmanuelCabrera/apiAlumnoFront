/* 
 * En este documento se guardan las configuraciones propias de cada
 * sistema
 */



jconf = typeof jconf == "undefined" ? {} : jconf;

jconf.initData = {
    attrs: ['token'],
    data: {
        attrs: ['jwt']
    },
    user: {
        attrs: ['id', "name", "root", "profileImg", "cuit"],
        roles: {attrs: ['name', 'permissions']}
    }
};


/**
 * Valores de configuracion para cada sistema
 */
var config = {
    profileSocialNetworkShow: false,
    isRegister: false,
    nombreVisual: "ALUMNO",
    initState: "home",
    initStateSigned: "main",
    publicStates: ['login', 'home'],
    registerMD: 'https://ciudadano.misiones.gob.ar/#/registro-misiones-digital?appId=2398',
    mdAppId: "", //Aca va el id de la app
    pagination: {
        prefix: "base",
        ipp: 10
    },
    ciudadanoMisiones: true,
    ciudadanoOptions: {
        redirectLoginSuccess: 'main', //Indicar el state donde redirigir si el login SSO es correcto
        redirectLoginFailed: 'login', //Indicar el state donde redirigir si el login SSO tiene algun error
        redirectLoginNoCode: 'login', //Indicar el state donde redirigir si el login SSO no devuelve el code
        redirectLoginNoPermission: 'login', //Indicar el PATH donde redirigir si el login SSO no tiene permiso en la app que está intentando ingresar
        logoutWhenNonPermission: true, // Si su valor en true, hace el logout cuando se detecta que no tiene permiso en la app. Si está en false, no mata la session
//        uriToCiudadano: 'http://172.31.0.130/misionesdigital/#/', //Indicar el redirect_uri para ciudadano, segun el entorno en el que se esté probando
        uriPerfil: 'http://172.31.0.130/misionesdigital/#/' + 'perfil',
        uriPerfilImg: 'http://172.31.0.130/misionesdigital/#/' + 'security/profileimg',
        uriToCiudadano: 'http://172.31.0.130/misionesdigital/#/'

    },
    maranduOauthUrl: 'https://sso.misiones.gob.ar/auth/realms/Misiones/protocol/openid-connect/auth',
    clientId: {
//        facebook: "2053975818173169",
//        google: "473925276563-2n1o8uuvg1495r0527t1ufu9hn8nkeev.apps.googleusercontent.com",
        marandu: "base-test",
        ciudadano: "ciudadano",
    },
    inConstruction: {
        active: false,
        title: 'Sitio web en mantenimiento',
        body: 'En estos momentos estamos realizando tareas de mantenimineto, te pedimos disculpas. '
    },
    loading: false,
    inicialized: false,
//    JSErrorLogConfig: {
//        code: ""
//    },
    mapboxgl: {
        accessToken: "pk.eyJ1IjoiZW1hbnVlbGNhYnJlcmEiLCJhIjoiY2p6MTlxZjE5MDF4NDNpbWw0NzF6MDY5NSJ9.iZX0cX17xmaqeIpU3IYMjA"
    },
    recaptcha: {
        siteKey: "6LcAjGQUAAAAAPMnn434MbAq7jLOKA1dXAuoiRIF"
    },
    editorConfig: {
        sanitize: false,
        toolbar: [
            {name: 'basicStyling', items: ['bold', 'italic', 'underline', 'strikethrough', 'subscript', 'superscript', '-', 'leftAlign', 'centerAlign', 'rightAlign', 'blockJustify', '-']},
            {name: 'paragraph', items: ['orderedList', 'unorderedList', 'outdent', 'indent', '-']},
            {name: 'doers', items: ['removeFormatting', 'undo', 'redo', '-']},
            {name: 'colors', items: ['fontColor', 'backgroundColor', '-']},
            {name: 'links', items: ['image', 'hr', 'symbols', 'link', 'unlink', '-']},
            {name: 'tools', items: ['print', '-']},
            {name: 'styling', items: ['font', 'size', 'format']},
        ]
    },
    nominatimUrl: 'https://map.marandu.com.ar/nominatim/'
};

const ruteoGlobal = {
    'login-tradicional': {
        url: '/login-tradicional?nextState',
        templateUrl: 'pages/base/security/loginTradicional/login.html',
        controller: 'LoginTradicionalCont'
    },
    'loginSSO': {
        url: '/loginSSO?nextState',
        templateUrl: 'pages/base/security/loginCiudadanoMisiones/login.html',
        controller: 'LoginCiudadanoMisionesCont'
    },
    'perfil': {
        url: '/perfil',
        templateUrl: 'pages/base/security/profileCiudadanoMisiones/profile.html',
        controller: 'ProfileCiudadanoMisionesCont'
    },

    /**
     * Se puede personalizar para un sistema determinado copiando los archivos a una parte de tu nuevo proyecto
     * 
     * Comentar la importacion de de los archivos para usar solamente los presonalizados
     */

    'login': {
        url: '/login?code?sessionState?noUser?md?fromOtherSystem?nextState',
        templateUrl: 'pages/base/security/loginSSO/login.html',
        controller: 'LoginSSOCont'
    },

    /**
     * Se puede personalizar para un sistema determinado copiando los archivos a una parte de tu nuevo proyecto
     * Se puede sobrescribir sólo el archivo redirect.html
     * 
     * Si desea sobrescribir tambien el controlador, habria que cambiar de nombre distinto al que esta en el base  (LoginRedirectCont)
     */

    'loginRedirect': {
        url: '/login-redirect?code?sessionState?nextState?backUrl?params',
        templateUrl: 'pages/base/security/loginSSO/redirect/redirect.html',
        controller: 'LoginRedirectCont'
    }

    //ESTE SOLO SE HABILITA EN SISTEMAS DONDE NO SE INTEGRA CON MISIONES DIGITAL,
//    'perfil': {
//        url: '/perfil',
//        templateUrl: 'pages/base/security/profile/profile.html',
//        controller: 'ProfileCont'
//    }
};
