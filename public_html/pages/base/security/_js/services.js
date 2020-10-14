var services = $.un(services) ? {} : services;

services.security = {};
services.security.session = {};
//services.security.session.loginGoogle = rootService + 'security/session/login/google';
//services.security.session.loginFacebook = rootService + 'security/session/login/facebook';
services.security.session.loginSistem = rootService + 'security/session/login/sistem';
services.security.session.loginMarandu = rootService + 'security/session/login/marandu';
services.security.session.loginSso = rootService + 'security/session/login/sso';
services.security.session.register = rootService + 'security/session/register';
services.security.session.logout = rootService + 'security/session/logout';
services.security.session.initData = rootService + 'security/session/init';

services.security.user = {};
services.security.user.user = rootService + 'security/user';
services.security.user.rol = rootService + 'security/rol';
services.security.user.me = rootService + 'security/user/me';
services.security.user.mypermissions = rootService + 'security/user/mypermissions';
services.security.user.permission = rootService + 'security/permission';

services.security.user.group_permission = rootService + 'security/permission/group';

services.security.user.loadAdmin = rootService + 'security/user/admin';
services.security.user.filtro = rootService + 'security/user/filtro';
services.security.user.loadRoles = rootService + 'security/user/roles';
services.security.user.aceptTermYcond = rootService + 'security/user/aceptTermYcond';
services.security.user.passReset = rootService + 'security/user/passreset';
services.security.user.passResetCUIT = rootService + 'security/user/passreset/cuit';
services.security.user.password = rootService + 'security/user/password';
services.security.user.changepassword = rootService + 'security/user/changepassword';
services.security.user.changeprofile = rootService + 'security/user/changeprofile';
services.security.user.profileimg = rootService + 'security/user/profileimg';
services.security.user.profileimgContenido = rootService + 'security/user/profileimg/contenido';

services.security.user.profilethumbnail = rootService + 'security/user/profilethumbnail';
services.security.user.confirmationEmail = rootService + 'security/user/email/confirmation',
services.security.usergroup = {};
services.security.usergroup.usergroup = rootService + 'security/usergroup';
services.security.user.espaciosusados = rootService + 'security/user/espaciosusados';