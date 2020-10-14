/* 
 * Chequea que cuando para vengan los parametros code y session_state redirecciones a 
 * 
 */


function getParameterByName(name, url) {
    if (!url)
        url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
            results = regex.exec(url);
    if (!results)
        return null;
    if (!results[2])
        return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

let _code = getParameterByName('code');
let _session = getParameterByName('session_state');
let _params = getParameterByName('params');


if (_code && _session) {

    let _redirectUri = location.protocol + '//' +
            location.hostname +
            (location.port ? ":" + location.port : "") +
            location.pathname;

    _redirectUri = _redirectUri + '#/';

    let _state = `login-redirect?code=${_code}&sessionState=${_session}&params=${_params}`;

    _redirectUri = _redirectUri + _state;

    location.replace(_redirectUri);
}
