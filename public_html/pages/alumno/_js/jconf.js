var jconf = typeof jconf == "undefined" ? {} : jconf;


jconf.materia = {};
jconf.profesor = {};
jconf.alumnos = {};


jconf.materia.form = {
    attrs: ['id', 'nombre', 'codigo'],
    profesor: {attrs: ['id', 'nombre', 'apellido']}
};
jconf.materia.list = {
    attrs: ['id', 'nombre', 'codigo'],
    profesor: {attrs: ['id', 'nombre', 'apellido']}
};

jconf.profesor.form = {
    attrs: ['id', 'nombre', 'apellido', 'deletedAt'],
    contacto: jconf.contacto.form
};
jconf.profesor.list = {
    attrs: ['id', 'nombre', 'apellido', 'deletedAt'],
    contacto: jconf.contacto.form
};


jconf.alumnos.form = {
    attrs: ['id', 'nombre', 'apellido', 'matricula', 'deletedAt'],
    contacto: jconf.contacto.form
};
jconf.alumnos.list = {
    attrs: ['id', 'nombre', 'apellido', 'matricula', 'deletedAt'],
    contacto: jconf.contacto.form
};