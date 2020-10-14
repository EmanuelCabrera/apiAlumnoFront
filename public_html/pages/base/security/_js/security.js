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

//Por ahora que sea publico esto
//security["perfil"] = {perms: ['USER_CHANGE_PASS_ME','USER_PROFILEIMG']};

security["passchange"] = {perms: ['USER_CHANGE_PROFILE', 'USER_PROFILEIMG']};
security["security/changePassword"] = {perms: ['USER_CHANGE_PASS_ANY']};
security["security/usuario"] = {perms: ['USER_ADD', 'USER_UPD', 'USER_REM', 'USER_CHANGE_PASS_ANY']};
security["security/usuario/add"] = {perms: ['USER_ADD']};
security["security/usuario/edit"] = {perms: ['USER_UPD']};
security["security/rol"] = {perms: ['ROL_ADD', 'ROL_UPD', 'ROL_REM']};
security["security/rol/add"] = {perms: ['ROL_ADD']};
security["security/rol/edit"] = {perms: ['ROL_UPD']};
security["security/grupopermisos/show"] = {perms: ['ROL_ADD', 'ROL_UPD', 'ROL_REM']};
security["security/usergroup"] = {perms: ['USERGROUP_ADD', 'USERGROUP_UPD', 'USERGROUP_REM']};
security["security/usergroup/add"] = {perms: ['USERGROUP_ADD']};
security["security/usergroup/edit"] = {perms: ['USERGROUP_UPD']};
security["perfil"] = {perms: ['USER_CHANGE_PROFILE', 'USER_PROFILEIMG', 'USER_PROFILEIMG_CONTENIDO', 'USER_CHANGE_PASS_ME']};
security["/security/profileimg"] = {perms: ['USER_PROFILEIMG', 'USER_PROFILEIMG_CONTENIDO']};


security["security/usuario-md"] = {perms: ['USER_CM_ADD', 'USER_CM_UPD']};
security["security/usuario-md/add"] = {perms: ['USER_CM_ADD', 'USER_CM_UPD']};
//security["security/usuario-md/edit"] = {perms: ['USER_UPD']};

security["@seguridad"] = [
    security["security/changePassword"],
    security["security/usuario"],
    security["security/rol"]
];


security["@usuario"] = [
    security["security/changePassword"],
    security["security/usuario"]
];

security["@usuario-md"] = [
    security["security/usuario-md"]
];

security["@rol"] = [
    security["security/rol"]
];
