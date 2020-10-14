var jconf = typeof jconf == "undefined" ? {} : jconf;
jconf.comment = typeof jconf.comment == "undefined" ? {} : jconf.comment;


jconf.commentPlain = {};


jconf.commentPlain.form = {
    attrs: ['id', 'comment','createdBy.user']
};
jconf.commentPlain.list = {
    attrs: ['id', 'comment','createdAt'],
    attachments: jconf.contenidoList.object
};