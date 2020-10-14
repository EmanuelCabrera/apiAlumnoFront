/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


/* 
 * Manejo de seguridad de acceso a paginas y visibilidad de enlaces
 * segun permisos del usuario logueado
 */

var security = typeof security == "undefined" ? [] : security;

security["rrhh/persona"] = {perms: ['PERSONA_ADD','PERSONA_UPD','PERSONA_REM']};
security["rrhh/persona/add"] = {perms: ['PERSONA_ADD']};
security["rrhh/persona/edit"] = {perms: ['PERSONA_UPD']};
security["rrhh/persona/show"] = {perms: ['PERSONA_ADD','PERSONA_UPD','PERSONA_REM']};



