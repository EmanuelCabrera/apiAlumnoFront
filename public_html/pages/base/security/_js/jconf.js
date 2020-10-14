var jconf = typeof jconf == "undefined" ? {} : jconf;
jconf.security = typeof jconf.sucurity == "undefined" ? {} : jconf.sucurity;

jconf.security.user = {};
jconf.security.rol = {};
jconf.security.usergroup = {};
jconf.security.espacioUsado = {};

jconf.security.user.list = {
    attrs: ['id', 'name', 'cuit', 'correo', 'password', 'deletedAt', 'emailstatus', 'marandu', 'lastAccess'],
    persona: {attrs: ['nombres', 'apellido']},
    roles: {attrs: ['name', 'permissions']}
};
 

jconf.security.user.exportar = {
    attrs: ['id', 'name', 'correo']
};


jconf.security.rol.list = {
    attrs: ['id', 'name', 'deletedAt']
};

jconf.security.rol.rolForm = {
    attrs: ['id', 'name', 'permissions']
};

jconf.security.user.userForm = {
    attrs: ['id', 'name', 'correo', 'cuit', 'password', 'persona.id', 'roles.id']
};

jconf.security.usergroup.list = {
    attrs: ['id', 'nombre', 'deletedAt'],
    users: {
        attrs: ['id', 'name', 'cuit']
    }
};

jconf.security.usergroup.form = {
    attrs: ['id', 'nombre', 'users.id'],
    users: {
        attrs: ['id']
    }
};

jconf.security.espacioUsado.list = {
    attrs: ['capacidadArchivoMax', 'capacidadTotalMax', 'capacidadUsada', 'capacidadTotal', 'userName', 'userId']
};
