var jconf = typeof jconf == "undefined" ? {} : jconf;
jconf.rrhh = typeof jconf.rrhh == "undefined" ? {} : jconf.rrhh;

jconf.rrhh.persona = {};

jconf.rrhh.persona.exportar = {
    attrs: [
        'nombres', 'apellido', 'tipoDoc', 'documento', 'fechaNac', 'sexo', 'estadoCivil',
        'contacto.correo', 'contacto.tel1', 'contacto.tel2',
        'direccion.localidad.codigo', 'direccion.barrio', 'direccion.calle', 'direccion.altura', 'direccion.piso', 'direccion.depto'
    ]
};

jconf.rrhh.persona.personaForm = {
    attrs: ['id', 'nombres', 'apellido', 'nombreCompleto', 'fechaNac', 'sexo', 'estadoCivil', 'tipoDoc', 'documento','cuit', 'user.name', 'user.id','user.cuit', 'deletedAt']


};

jconf.rrhh.persona.personaDireccionForm = {
    attrs: jconf.rrhh.persona.personaForm.attrs,
    direccion: jconf.direccion.form,
    contacto: jconf.contacto.form

};
 