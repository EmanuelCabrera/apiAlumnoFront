var jconf = typeof jconf == "undefined" ? {} : jconf;
jconf.direccion = typeof jconf.direccion == "undefined" ? {} : jconf.direccion;

jconf.direccion = {};

jconf.direccion.pais = {};
jconf.direccion.pais.lst = {
    attrs: ['id', 'nombre']
};

jconf.direccion.provincia = {};
jconf.direccion.provincia.lst = {
    attrs: ['id', 'nombre', 'deletedAt']
};
jconf.direccion.provincia.act = {
    attrs: ['id', 'nombre', 'pais.id', 'pais.nombre', 'deletedAt']
};

jconf.direccion.departamento = {};
jconf.direccion.departamento.lst = {
    attrs: ['id', 'nombre', 'pais.id']
};
jconf.direccion.departamento.act = {
    attrs: ['id', 'nombre', 'provincia.id', 'deletedAt']
};


jconf.direccion.localidad = {};
jconf.direccion.localidad.lst = {
    attrs: ['id', 'nombre']
};
jconf.direccion.localidad.act = {
    attrs: ['id', 'nombre', 'codigo', 'departamento.id', 'deletedAt']
};


jconf.direccion.departamento.find = {
    attrs: ['id', 'nombre'],
    localidades: jconf.direccion.localidad.lst
};


jconf.direccion.form = {
    attrs: ['id', 'localidad.id','localidad.nombre', 'localidad.departamento.id','localidad.departamento.nombre', 'localidad.departamento.provincia.id','localidad.departamento.provincia.nombre', 'localidad.departamento.provincia.pais.nombre','localidad.departamento.provincia.pais.id', 'calle', 'altura', 'depto', 'barrio', 'piso', 'direccion', 'latitud', 'longitud']
};