var jconf = typeof jconf == "undefined" ? {} : jconf;
jconf.calendario = typeof jconf.calendario == "undefined" ? {} : jconf.calendario;

jconf.calendario = {};
jconf.calendarioEvento = {};


jconf.calendario.list = {
    attrs: ['id', 'nombre', 'descripcion'],
    eventos: {attrs: ['id', 'title', 'descripcion', 'start', 'end', 'calendar.id', 'allDay'],
        adjuntos: jconf.contenidoList.object}
};
jconf.calendarioEvento.list = {
    attrs: ['id', 'title', 'descripcion', 'start', 'end', 'calendar.id'],
    adjuntos: jconf.contenidoList.object
};
