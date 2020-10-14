var jconf = typeof jconf == "undefined" ? {} : jconf;
jconf.contenido = typeof jconf.contenido == "undefined" ? {} : jconf.contenido;

jconf.contenido.attrs = ['id', 'name', 'contentType', 'extension', 'size', 'exist', 'url', 'thumbnail'];
jconf.contenido.object = {attrs: jconf.contenido.attrs};
jconf.contenidoList = {};
jconf.contenidoList.object = {
    attrs: ['id'],
    contenidos: jconf.contenido.object
};
jconf.contenido.info = {attrs: jconf.contenido.attrs.concat(['version', 'createdAt', 'createdByUser.name', 'updatedAt', 'updatedByUser.name', 'deletedAt', 'deletedByUser.name'])};