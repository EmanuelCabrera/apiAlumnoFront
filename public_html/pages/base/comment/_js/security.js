/* 
 * Manejo de seguridad de acceso a paginas y visibilidad de enlaces
 * segun permisos del usuario logueado
 */

var security = typeof security == "undefined" ? [] : security;

security["commentplain"] = {perms: ['COMMENTPLAIN_ADD', 'COMMENTPLAIN_UPD', 'COMMENTPLAIN_REM']};


