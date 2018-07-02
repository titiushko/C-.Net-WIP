/**
 * Enable/disable debugger
 */
var ALLOW_DEBUGGER = new Object();

/**
 * Allow only for 974px window screen resolution
 */
var IS_ALLOWABLE_RESOLUTION = $(window).width() > 974;

var Titiushko = new Object();

/*
 * Definición de constantes que se usan en la interfaz
 * Modificar los valores de las constantes podría causar diferentes comportamientos en la interfaz del sistema
 */
Titiushko["Constants"] = new function () {
    this.TRUE = "TRUE";
    this.FALSE = "FALSE";
    this.NO_MESSAGE = "Sin Mensaje";

    this.User = {
        Role: {
            ADMIN: "Admin",
            MANAGER: "Manager",
            PRJOECT_MANAGER: "Prjoect Manager",
            DEVELOPER: "Developer",
            TESTER: "Tester",
            USER: "User"
        }
    };

    this.Errors = new function () {
        this.DELETE = "No se puede recuperar después de eliminar. ¿Está seguro de continuar?";

        this.DEFAULT = function (elemento, mensaje) {
            return "<p>Algo salió mal" + (elemento == undefined || elemento == null ? "" : " en " + elemento) + (mensaje == undefined ? "." : ":<br>" + mensaje) + "</p><br><p><b>Por favor, inténtelo de nuevo más tarde.</b></p>";
        };

        this.Permission = {
            DENIED: "No tienes permiso para realizar esta acción.",
            PRIVILEGE: "No tienes privilegios",
            PRIVILEGE_DENIED: function (vista) {
                return "No tienes privilegios para ver " + (vista == "" || vista == undefined ? "esta" : "<b>" + vista.toLowerCase() + "</b>") + " página.";
            },
            ACCESS_DENIED: "Inicie sesión en el sistema para acceder al contenido."
        };

        this.Type = {
            UNDEFINED: -1,
            DEFAULT: 0,
            EXCEPCION: 1,
            CONTENT_NOT_FOUND: 2,
            PERMISSION_DENIED: 6,
            PERMISSION_PRIVILEGE: 4,
            PERMISSION_PRIVILEGE_DENIED: 5,
            PERMISSION_ACCESS_DENIED: 6,
            AUTHENTICATED_DENIED: 7
        }
    };
};