/* 
 * Manejo de seguridad de acceso a paginas y visibilidad de enlaces
 * segun permisos del usuario logueado
 */

var security = typeof security == "undefined" ? [] : security;

security["calendario"] = {perms: ['CALENDARIO_ADD', 'CALENDARIO_UPD', 'CALENDARIO_REM']};
security["calendarioevento"] = {perms: ['CALENDARIOEVENTO_ADD', 'CALENDARIOEVENTO_UPD', 'CALENDARIOEVENTO_REM']};


