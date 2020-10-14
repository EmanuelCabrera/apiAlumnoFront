var rootService = 'http://localhost:8080/e-base-web/services/';
services = typeof services == "undefined" ? {} : services;
services.sistem = {};
services.sistem.disable = rootService + "sistem/remove";