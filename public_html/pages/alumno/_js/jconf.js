var jconf = typeof jconf == "undefined" ? {} : jconf;


jconf.materia = {};
jconf.profesor = {};
jconf.alumnos = {};
jconf.mesaExamen = {};


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

jconf.mesaExamen.form = {
    attrs: ['id', 'fecha', 'deletedAt'],
    presidente: jconf.profesor.list,
    primerVocal: jconf.profesor.list,
    materia: jconf.materia.list
};
jconf.mesaExamen.list = {
    attrs: ['id', 'fecha', 'deletedAt'],
    presidente: jconf.profesor.list,
    primerVocal: jconf.profesor.list,
    materia: jconf.materia.list
};