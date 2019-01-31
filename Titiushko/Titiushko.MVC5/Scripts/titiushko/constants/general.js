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

    this.TypeError = new Object();
};