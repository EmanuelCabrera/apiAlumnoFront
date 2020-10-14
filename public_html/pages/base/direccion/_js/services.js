var services = $.un(services) ? {} : services;
services.direccion = $.un(services.direccion) ? {} : services.direccion;

services.direccion.departamento = rootService + "direccion/departamento";
services.direccion.localidad = rootService + "direccion/localidad";
services.direccion.pais = rootService + "direccion/pais";
services.direccion.provincia = rootService + "direccion/provincia";
services.direccion.direccion = rootService + "rrhh/persona/direccion";