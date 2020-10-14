/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var services = $.un(services) ? {} : services;
services.contenido = $.un(services.contenido) ? {} : services.contenido;
services.contenido.file = rootService + "file";
services.contenido.contenido = rootService + "contenido";
services.contenido.thumbnailList = rootService + "contenidolist/thumbnail";
services.contenido.thumbnail = rootService + "file/thumbnail";
