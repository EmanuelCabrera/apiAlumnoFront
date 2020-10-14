/* 
 * Manejo de seguridad de acceso a paginas y visibilidad de enlaces
 * segun permisos del usuario logueado
 */

var security = typeof security == "undefined" ? [] : security;

security["alumno"] = {perms: ['ALUMNO_ADD', 'ALUMNO_UPD', 'ALUMNO_REM']};
security["profesor"] = {perms: ['PROFESOR_ADD', 'PROFESOR_UPD', 'PROFESOR_REM']};
security["materia"] = {perms: ['MATERIA_ADD', 'MATERIA_UPD', 'MATERIA_REM']};
security["materiacursada"] = {perms: ['MATERIACURSADA_ADD', 'MATERIACURSADA_UPD', 'MATERIACURSADA_REM']};
security["mesaexamen"] = {perms: ['MESAEXAMEN_ADD', 'MESAEXAMEN_UPD', 'MESAEXAMEN_REM']};
security["inscripcion"] = {perms: ['INSCRIPCION_ADD', 'INSCRIPCION_UPD', 'INSCRIPCION_REM']};


