/* 
 * Manejo de seguridad de acceso a paginas y visibilidad de enlaces
 * segun permisos del usuario logueado
 */

var security = typeof security == "undefined" ? [] : security;

security["direccion/pais"] = {perms: ['PAIS_ADD', 'PAIS_UPD', 'PAIS_REM']};
security["direccion/provincia"] = {perms: ['PROVINCIA_ADD', 'PROVINCIA_UPD', 'PROVINCIA_REM']};
security["direccion/localidad"] = {perms: ['LOCALIDAD_ADD', 'LOCALIDAD_UPD', 'LOCALIDAD_REM']};
security["direccion/departamento"] = {perms: ['DEPARTAMENTO_ADD', 'DEPARTAMENTO_UPD', 'DEPARTAMENTO_REM']};
security["direccion/departamento/act"] = {perms: ['DEPARTAMENTO_ADD', 'DEPARTAMENTO_UPD']};
security["direccion/localidad/act"] = {perms:['LOCALIDAD_ADD', 'LOCALIDAD_UPD']};

