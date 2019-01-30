Titiushko.Constants["Messages"] = new function () {
    this.NO_MESSAGE = "Sin Mensaje";

    this.Error = new function () {
        this.DELETE = "No se puede recuperar después de eliminar. ¿Está seguro de continuar?";

        this.DEFAULT = function (pElement, pMessage) {
            return "<p>Algo salió mal" + (pElement == undefined || pElement == null ? "" : " en " + pElement) + (pMessage == undefined ? "." : ":<br>" + pMessage) + "</p><br><p><b>Por favor, inténtelo de nuevo más tarde.</b></p>";
        };

        this.Permission = {
            DENIED: "No tienes permiso para realizar esta acción.",
            PRIVILEGE: "No tienes privilegios",
            PRIVILEGE_DENIED: function (pView) {
                return "No tienes privilegios para ver " + (pView == "" || pView == undefined ? "esta" : "<b>" + pView.toLowerCase() + "</b>") + " página.";
            },
            ACCESS_DENIED: "Inicie sesión en el sistema para acceder al contenido."
        };
    };

    this.Request = new function () {
        this.SUCCESS = "Petición realizada exitosamente.";
    };
};